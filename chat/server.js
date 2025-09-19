// src/server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const { Server } = require('socket.io');
const shortId = require('short-id');
const { authMiddleware, JWT_SECRET } = require('./auth');

const conversationsRouter = require('./routes/conversations');
const messagesRouter = require('./routes/messages');
const uploadsRouter = require('./routes/uploads');
const { default: pool } = require('./config/db');

const PORT = process.env.PORT || 4000;
const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.resolve(UPLOAD_DIR)));

app.post('/auth/test-token', async (req, res) => {
  // For testing only: return token for provided user_id
  const jwt = require('jsonwebtoken');
  const { user_id } = req.body;
  if (!user_id) return res.status(400).json({ error: 'user_id required' });
  const token = jwt.sign({ sub: user_id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

// Protected routes
app.use('/api/conversations', authMiddleware, conversationsRouter);
app.use('/api/messages', authMiddleware, messagesRouter);
app.use('/api/uploads', authMiddleware, uploadsRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// In-memory map: userId -> Set of socketIds
const onlineUsers = new Map();
function generateConversationId(userA, userB) {
  console.log(userA, userB)
  if (userA === userB) {
    throw new Error("Conversation requires two different users");
  }
  // Sort the two IDs lexicographically (alphabet + number ordering)
  return [userA, userB].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)).join('_');
}


io.use(async (socket, next) => {
  // simple JWT auth on socket handshake (token in query)
  try {
    const token = socket.handshake.auth?.token;

    if (!token) return next(new Error('Authentication error'));

    const jwt = require('jsonwebtoken');
    console.log(token, socket.handshake.query.user_id)
    const payload = jwt.verify(token, '1971-2022-2003-vendors'); 
    socket.user = { id: payload.id };  
    return next();
  } catch (err) {
    console.error('Socket auth failed', err.message); 
    return next(new Error('Authentication error'));  
  } 
});

io.on('connection', (socket) => {
  const userId = socket.user.id;
  // add socket to user's set
  if (!onlineUsers.has(userId)) onlineUsers.set(userId, new Set());
  onlineUsers.get(userId).add(socket.id);
  console.log(`User ${userId} connected via socket ${socket.id}. Online count: ${onlineUsers.get(userId).size}`);

  // join conversation room (client should emit 'join')
  socket.on('join', async ({ conversationId }) => {
    try {
      // verify user participant
      const check = await pool.query(`
        SELECT 1
        FROM messages
        WHERE conversation_id = $1
        AND ($2 = sender_id OR $2 = receiver_id);

      `, [conversationId, userId]);
      if (check.rowCount === 0) {
        return socket.emit('error', { message: 'Not a participant' });
      }
      socket.join(conversationId);
      console.log(`Socket ${socket.id} joined room ${conversationId}`);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('leave', ({ conversationId }) => {
    socket.leave(conversationId);
  });

 
  // send_message: client sends { conversationId, content, messageType, mediaUrl(optional) }
  socket.on('send_message', async (payload, callback) => {
   
    try {
      const { receiver_id, content, message_type = 'text', media_url = null } = payload;
      const conversationId = generateConversationId(userId, receiver_id);
      // ensure user is participant
      const ins = await pool.query(
        `INSERT INTO messages (
          id, 
          mssg_id, 
          conversation_id, 
          sender_id, 
          receiver_id, 
          content, 
          message_type, 
          media_url, 
          created_at, 
          status
        ) VALUES (
          DEFAULT, $1, $2, $3, $4, $5, $6, $7, NOW(), $8
        ) RETURNING *`,
        [
          shortId.generate(16),   // $1 -> mssg_id
          conversationId,         // $2 -> conversation_id
          userId,                 // $3 -> sender_id
          receiver_id,            // $4 -> receiver_id
          content,                // $5 -> content
          message_type,           // $6 -> message_type
          media_url,              // $7 -> media_url
          JSON.stringify({ id: receiver_id, status: "sent" }) // $8 -> status
        ]
      );


      const message = ins.rows[0];
      // if(create_mssg.rowCount > 0){
        // Emit to room (all sockets in conversation room)
      io.to(conversationId).emit('message', {
        message_id: message.mssg_id,
        conversation_id: conversationId,
        sender_id: message.sender_id,
        receiver_id: message.receiver_id,
        content: message.content,
        media_url: message.media_url,
        message_type: message.message_type,
        created_at: message.created_at,
        status: message.status
      });

      callback && callback({ success: true, message });
      // }

       
    } catch (err) {
      console.error('send_message error', err);
      callback && callback({ success: false, error: 'internal' });
    }
  });

  // When client acknowledges a message is delivered (client emits with messageId)
  socket.on('message_delivered', async ({ messageId, conversationId }) => {
    try {
      await pool.query('UPDATE message_status SET status = $1, updated_at = now() WHERE message_id = $2 AND user_id = $3 AND status != $1', ['delivered', messageId, userId]);
      // inform sender sockets
      const row = await pool.query('SELECT sender_id FROM messages WHERE id = $1', [messageId]);
      if (row.rowCount > 0) {
        const senderId = row.rows[0].sender_id;
        const sockets = onlineUsers.get(senderId) || new Set();
        for (const sid of sockets) {
          io.to(sid).emit('message_status_update', { messageId, userId, status: 'delivered' });
        }
      }
    } catch (err) { console.error(err); }
  });

  // When client marks as read
  socket.on('message_read', async ({ messageId, conversationId }) => {
    try {
      await pool.query('UPDATE message_status SET status = $1, updated_at = now() WHERE message_id = $2 AND user_id = $3 AND status != $1', ['read', messageId, userId]);
      // update last_read_message_id for participant
      await pool.query('UPDATE conversation_participants SET last_read_message_id = $1 WHERE conversation_id = $2 AND user_id = $3', [messageId, conversationId, userId]);

      // inform sender sockets
      const row = await pool.query('SELECT sender_id FROM messages WHERE id = $1', [messageId]);
      if (row.rowCount > 0) {
        const senderId = row.rows[0].sender_id;
        const sockets = onlineUsers.get(senderId) || new Set();
        for (const sid of sockets) {
          io.to(sid).emit('message_status_update', { messageId, userId, status: 'read' });
        }
      }
    } catch (err) { console.error(err); }
  });

  socket.on('typing', ({ conversationId, isTyping }) => {
    // broadcast to other participants in the room
    socket.to(conversationId).emit('typing', { userId, isTyping });
  });

  socket.on('get_chat_list', async ({ user_id }, callback) => {
    try {
      const res = await pool.query(
        `SELECT *
        FROM messages
        WHERE sender_id = $1
            OR receiver_id = $1`,
        [user_id]
      );

      // Group messages by conversation_id
      const conversations = res.rows.reduce((acc, msg) => {
        const convId = msg.conversation_id;

        if (!acc[convId]) {
          acc[convId] = { messages: [] }; // make it an object instead of raw array
        }

        acc[convId].messages.push(msg);

        return acc;
      }, {});

      // Now fetch recipient details for each conversation
      await Promise.all(
        Object.keys(conversations).map(async (convId) => {
          const participants = convId.split("_");
          const recipientId = participants.find((id) => id !== user_id);

          if (recipientId) {
            const recipientData = await pool.query(
              `SELECT * FROM users WHERE user_id = $1`,
              [recipientId]
            );

            conversations[convId].recipient = recipientData.rows[0] || null;
          } else {
            conversations[convId].recipient = null;
          }
        })
      );

      console.log(conversations);

      // ✅ Send result back to client
      callback({
        success: true,
        data: conversations,
      });
    } catch (err) {
      console.error("Error fetching chat list:", err);

      // ❌ Send error back to client
      callback({
        success: false,
        error: "Failed to fetch chat list",
      });
    }
  });


  socket.on('disconnect', () => {
    if (onlineUsers.has(userId)) {
      const s = onlineUsers.get(userId);
      s.delete(socket.id);
      if (s.size === 0) onlineUsers.delete(userId);
    }
    console.log(`Socket ${socket.id} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

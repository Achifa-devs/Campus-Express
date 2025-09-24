const express = require('express');
const { Server }  = require('socket.io')
const jwt = require('jsonwebtoken');
const Chat = require('./models');
const cors = require('cors');
const { generateConversationId } = require('./utils');
require('dotenv').config();

const CHAT = express();

CHAT.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'UPDATE'],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'cs-gender'],
}));

const server = CHAT.listen(process.env.PORT, () => {
  console.log('CHAT is live @', process.env.PORT);
});


const io = new Server(server, {
  cors: {
    origin: "*",   // or your client URL
    methods: ["GET", "POST"]
  }
});
const onlineUsers = new Map(); // userId -> Set of socketIds

io.use(async(socket, next) => {
  try {
    // const token = socket.handshake.auth?.token;

    // if (!token) return next(new Error('Authentication error'));

    // const payload = jwt.verify(token, process.env.JWT_SECRET); 
    // socket.user = { id: payload.id };  
    // console.log(socket.handshake.query)
    socket.user = { id: socket.handshake.query?.user_id };  

    return next();
  } catch (err) {
    console.error('Socket auth failed', err.message); 
    return next(new Error('Authentication error'));  
  } 
});


io.on('connection', async(socket) => {
  console.log('✅ New socket connected:', socket.id);
  const userId = socket.user.id;
  // add socket to user's set
  if (!onlineUsers.has(userId)) onlineUsers.set(userId, new Set());
  onlineUsers.get(userId).add(socket.id);
  console.log(`User ${userId} connected via socket ${socket.id}. Online count: ${onlineUsers.get(userId).size}`);
  // After adding user socket (inside io.on('connection'))
  // if (onlineUsers.get(userId).size === 1) {
  //   // User just came online (first active socket)
  //   const result = await Chat.getConversationPartner({ user_id: userId });
  //   const partners = result.rows.map(r => r.partner_id);

  //   partners.forEach(partnerId => {
  //     if (onlineUsers.has(partnerId)) {
  //       for (const socketId of onlineUsers.get(partnerId)) {
  //         io.to(socketId).emit("partner_online", { userId });
  //       }
  //     }
  //   });
  // }


  socket.on("send_message", async (data, callback) => {
    try {
      const senderId = socket.user.id;  // from JWT
      const { receiver_id, content, media_url, message_type, created_at } = data;
      const conversation_id = generateConversationId(senderId, receiver_id);

      // Save message to DB
      // const newMessage = await Chat.createNewMessage({
      //   sender_id: senderId,
      //   receiver_id,
      //   message: content,
      //   conversation_id,
      //   message_type: message_type || "text",
      //   media_url: media_url || null,
      //   created_at
      // });

      const newMessage = {
        sender_id: senderId,
        receiver_id,
        message: content,
        conversation_id,
        message_type: message_type || "text",
        media_url: media_url || null,
        created_at
      }

      // ✅ Make sure both users are in the conversation room
      socket.join(conversation_id);
      console.log('conversation_id: ', conversation_id)

      // ✅ Emit to ALL clients in the room (sender + receiver if connected)
      io.to(conversation_id).emit("new_message", newMessage);

      // ✅ Send ACK back only to the sender
      if (callback) callback({ success: true, message: newMessage });

      console.log(`📨 Message from ${senderId} to ${receiver_id}: ${content}`);
    } catch (err) {
      console.error("send_message error:", err);
      if (callback) callback({ success: false, error: "internal_error" });
    }
  });

  // socket.on("get_room_messages", async(data, callback) => {
  //   const { receiver_id } = data;
  //   const conversation_id = generateConversationId(userId, receiver_id);
  //   Chat.getRoomMessages({ conversation_id })
  //   .then((result) => {
  //     io.to().emit('room_messages', result);
  //   }).catch(err => {
  //     console.error("room_messages error:", err);
  //     if (callback) callback({ success: false, error: "internal_error" });
  //   });
  // })

  socket.on("get_all_messages", async(data, callback) => {
    const { user_id } = data
    Chat.getChatList({ user_id })
    .then((result) => {
      // io.to().emit('all_messages', result);
      callback({ success: true, messages: result });
    }).catch(err => {
      console.error("all_messages error:", err);
      if (callback) callback({ success: false, error: "internal_error" });
    });
  })

  socket.on('join_room', (data, callback) => {
    try {
      const userId = socket.user.id;
      const { otherUserId } = data;
      const conversation_id = generateConversationId(userId, otherUserId);
      socket.join(conversation_id);
      console.log(`User ${userId} joined room ${conversation_id}`);
      if (callback) callback({ success: true, room: conversation_id });
    } catch (err) {
      console.error("join_room error:", err);
      if (callback) callback({ success: false, error: "internal_error" });
    }
  });

  socket.on('message_delivered', (data, callback) => {
    const { conversation_id, receiver_id } = data;
    try {
      Chat.markAsDelivered({ conversation_id, receiver_id })
      .then((result) => {
        io.to(conversation_id).emit('message_delivered', result);
      }).catch(err => {
        console.error("message_delivered error:", err);
        if (callback) callback({ success: false, error: "internal_error" });
      });
    } catch (error) {
      console.error("message_delivered error:", err);
      if (callback) callback({ success: false, error: "internal_error" });
    }
  })

  socket.on('message_seen', (data, callback) => {
    const { conversation_id, receiver_id } = data;
    try {
      Chat.markAsSeen({ conversation_id, receiver_id })
      .then((result) => {
        io.to(conversation_id).emit('message_seen', result);
      }).catch(err => {
        console.error("message_seen error:", err);
        if (callback) callback({ success: false, error: "internal_error" });
      });
    } catch (error) {
      console.error("message_seen error:", err);
      if (callback) callback({ success: false, error: "internal_error" });
    }
  })

  socket.on('delete_message', (data, callback) => {
    try {
      
    } catch (error) {
      console.error("delete_message error:", err);
      if (callback) callback({ success: false, error: "internal_error" });
    }
  })

  socket.on('is_typing', (data, callback) => {
    const { conversation_id, isTyping } = data;
    try {
      io.to(conversation_id).emit("is_typing", isTyping);
    } catch (error) {
      console.error("typing error:", err);
      if (callback) callback({ success: false, error: "internal_error" });
    }
  })

  socket.on("disconnect", async () => {
    console.log("❌ Socket disconnected:", socket.id);

    const userId = socket.user.id;
    if (!onlineUsers.has(userId)) return;

    const userSockets = onlineUsers.get(userId);
    userSockets.delete(socket.id);

    if (userSockets.size === 0) {
      onlineUsers.delete(userId);

      // Get partners
      const result = await Chat.getConversationPartner({ user_id: userId });
      const partners = result.rows.map(r => r.partner_id);

      partners.forEach(partnerId => {
        if (onlineUsers.has(partnerId)) {
          for (const socketId of onlineUsers.get(partnerId)) {
            io.to(socketId).emit("partner_offline", { userId });
          }
        }
      });

      console.log(`User ${userId} is now fully offline`);
    }
  });

});



process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
});

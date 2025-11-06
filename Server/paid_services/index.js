const express = require('express');
const { Server }  = require('socket.io')
const jwt = require('jsonwebtoken');
const { Chat } = require('./models');
const cors = require('cors');
const { generateConversationId } = require('./utils/chat');
require('dotenv').config();
const { createNewDeal, findPartnerById, updateDealById, updateUserStatus, getConversationPartner, createNewProof, createShopReview, createNewDispute } = require('./models');
const { sendNotification, sendNotificationForDealUpdateFromVendorToBuyer, sendNotificationForDealUpdateFromBuyerToVendor } = require('./utils/deals');
const axios = require('axios')
const _$_ = express();

_$_.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'UPDATE'],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'cs-gender'],
}));

const server = _$_.listen(process.env.PORT, () => {
  console.log('_$_ is live @', process.env.PORT);
});

_$_.use(cors({
  origin: '*',
  origin: "https://campus-express-production.up.railway.app", // your frontend dev origin
  credentials: true,
}));

const io = new Server(server, {
  cors: {
    origin: '*',
    origin: "https://campus-express-production.up.railway.app",   // or your client URL
    methods: ["GET", "POST"],
    credentials: true
  }
});
const onlineUsers = new Map(); // userId -> Set of socketIds

io.use(async(socket, next) => {
  try {
    const token = socket.handshake.auth?.token || socket.handshake.query.token;

    console.log("Socket token:", token);
    if (!token) return next(new Error('Authentication error'));

    const payload = jwt.verify(token, 'kdiU$28Fs!9shF&2xZpD3Q#1gLx@R7TkWzPq'); 
    socket.user = { id: payload.id };  
    console.log("handshake", socket.handshake.query)
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
  if (onlineUsers.get(userId).size === 1) {
    // User just came online (first active socket)
    const partners = await Chat.getConversationPartner({ user_id: userId });

    partners.forEach(async(partnerId) => {
      if (onlineUsers.has(partnerId)) {
        for (const socketId of onlineUsers.get(partnerId)) {
          await Chat.updateUserStatus({lastseen: 'now', userId})
          io.to(socketId).emit("partner_online", { partnerId });
        }
      }
    });
  }

  socket.on("send_message", async (data, callback) => {
    try {
      const senderId = socket.user.id;  // from JWT
      const { receiver_id, content, media_url, message_type, created_at } = data;
      const conversation_id = generateConversationId(senderId, receiver_id);


      // Save message to DB
      const newMessage = await Chat.createNewMessage({
        sender_id: senderId,
        receiver_id,
        message: content,
        conversation_id,
        message_type: message_type || "text",
        media_url: media_url || null,
        created_at
      });

      const partner = await Chat.getUser({ user_id: receiver_id });
      console.log(receiver_id)

      // ✅ Make sure both users are in the conversation room
      socket.join(conversation_id);

      // ✅ Emit to ALL clients in the room (sender + receiver if connected)
      io.to(conversation_id).emit("message", {newMessage, partner});


      if(!partner){
        if (callback) callback({ success: false, err: "Vendor no longer exist!"});
        return;
      }
      if(!partner?.fcm){
        if (callback) callback({ success: true, partner});
        return;
      }
      const response = await axios.post(
        "https://cs-node.vercel.app/notify",
        {
          token: partner.fcm,
          data: {
            title: `New message from ${partner?.fname || ""}.${partner?.lname?.[0] || ""}`,
            body: content,
            room: generateConversationId(userId, partner.user_id),
            partner: JSON.stringify(partner)
          },
        },
        {
          headers: { "Content-Type": "application/json" },
          // prevent Axios from throwing if response is not JSON
          validateStatus: () => true,
          transformResponse: [
            (data) => {
              try {
                return JSON.parse(data);
              } catch {
                console.warn("⚠️ notify endpoint did not return valid JSON:", data?.slice(0, 100));
                return data;
              }
            },
          ],
        }
      );
      const resData = response.success;

      if (callback) callback({ success: true, partner, resData });
    } catch (err) {
      console.error("Error sending notification:", err);
    }

  });
  socket.on("get_room_messages", async(data, callback) => {
    const { receiver_id } = data;
    const conversation_id = generateConversationId(userId, receiver_id);
    Chat.getRoomMessages({ conversation_id })
    .then((result) => {
      // io.to().emit('room_messages', result);
      callback({ success: true, messages: result });
    }).catch(err => {
      console.error("room_messages error:", err);
      if (callback) callback({ success: false, error: "internal_error" });
    });
  })
  socket.on("get_all_messages", async (data, callback) => {
    console.log("get_all_messages data:", data);
    // const { user_id } = data;
    const user_id = userId;

    try {
      const result = await Chat.getChatList({ user_id });
      const entries = Object.entries(result);

      const refinedMssg = await Promise.all(
        entries.map(async ([key, value]) => {
          // Extract the other user's ID
          const partner_id = key.split('_').find(id => id !== user_id);

          // Fetch partner details
          const partner = await Chat.getUser({ user_id: partner_id });

          // Sort messages by date (descending)
          const mssgs = value.messages.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );

          const unread = value.messages.filter(msgs => msgs.status.status === 'sent' && msgs.status.id === userId).length;

          const lastMessage = mssgs[0];

          return {
            key,
            partner,
            lastMessage,
            unread
          };
        })
      );

      callback({ success: true, messages: refinedMssg });
    } catch (err) {
      console.error("all_messages error:", err);
      callback({ success: false, error: "internal_error" });
    }
  });
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
    const { conversation_id } = data;
    try {
      Chat.markAsSeen({ conversation_id, userId })
      .then((result) => {
        io.to(conversation_id).emit('message_seen', { result });
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
  });
  socket.on('is_typing', (data, callback) => {
    const { partner_id, isTyping } = data;
    const conversation_id = generateConversationId(socket.user.id, partner_id);
    try {
      io.to(conversation_id).emit("is_typing", { user_id: userId });
    } catch (error) {
      console.error("typing error:", err);
      if (callback) callback({ success: false, error: "internal_error" });
    }
  })
  socket.on('not_typing', (data, callback) => {
    const { partner_id, isTyping } = data;
    const conversation_id = generateConversationId(socket.user.id, partner_id);
    try {
      io.to(conversation_id).emit("not_typing", { user_id: socket.user.id });
    } catch (error) {
      console.error("typing error:", err);
      if (callback) callback({ success: false, error: "internal_error" });
    }
  })
  socket.on('deal_update', async (data, callback) => {
    try {
      const { order, new_stage, date, userId, nxt_stage, formData=null } = data;


      const room_id = generateConversationId(order.user_id, order.vendor_id);
      // 1️⃣ Update the deal record
      const response = await updateDealById({ order, new_stage, date, userId, nxt_stage, formData });
      if (!response) return callback({ success: false, data: '' });

      if (new_stage === 'delivery' && userId === order.user_id) {
        const {
          rows
        } = await pool.query(`SELECT shop_id from shops WHERE user_id = $1`, [order.vendor_id])
        await createShopReview({
          shop_id: rows[0].shop_id, 
          product_id: order.product_id, 
          buyer_id: order.user_id, 
          review: formData.review, 
          date, 
          comment: formData.comment, 
          rating: formData.rating
        })
      }

      // 2️⃣ Get both parties
      const partner = await findPartnerById({ user_id: order.vendor_id });
      const customer = await findPartnerById({ user_id: order.user_id });

      // 3️⃣ Helper to emit and callback
      const handleResult = (result) => {
        if (result.success) {
          io.to(room_id).emit('deal_update', { data: response});
          callback?.({ success: true, data: response });
        } else {
          callback?.({ success: false, data: '' });
        }
      };

      // 4️⃣ Determine direction and send notification
      let result;

      // Vendor → Buyer updates
      if (
        new_stage === 'delivery' && userId === order.vendor_id &&
        ['dispatched', 'delivery', 'evidence', 'payment'].includes(new_stage) ||
        (new_stage === 'cancelled' && userId === order.vendor_id) ||
        (userId === order.vendor_id && !['confirmed'].includes(new_stage))
      ) {
        result = await sendNotificationForDealUpdateFromVendorToBuyer({
          customer,
          order,
          room_id,
          new_stage,
          role: 'vendor',
        });
      }

      // Buyer → Vendor updates
      else if (
        new_stage === 'confirmed' ||
        (new_stage === 'cancelled' && userId !== order.vendor_id) ||
        (userId !== order.vendor_id && !['dispatched'].includes(new_stage))
      ) {
        result = await sendNotificationForDealUpdateFromBuyerToVendor({
          partner,
          order,
          room_id,
          new_stage,
          role: 'buyer',
        });
      }


      // 5️⃣ Emit event and callback
      handleResult(result || { success: false });
    } catch (error) {
      console.error('❌ Error in /deal/update:', error);
      callback?.({ success: false, error: error.message });
    }
  });
  socket.on('deal_proof', async (data, callback) => {
    try {
      const {
        method,
        location,
        description,
        uploadedImages,
        deal,
        date
      } = data;

      // ✅ Create the proof record
      const proof = await createNewProof({
        order: deal,
        method,
        location,
        description,
        files: JSON.stringify(uploadedImages),
        date,
      });

      // ✅ Update the deal stage
      const updatedDeal = await updateDealById({
        order: deal,
        new_stage: 'evidence',
        date,
        userId: deal.vendor_id, // or from deal data if available
        nxt_stage: 'payment',
      });

      const room_id = generateConversationId(deal.user_id, deal.vendor_id);
      // console.log('Emitting to room:', room_id);
      io.to(room_id).emit('deal_proof', { data: 
        {
          proof,
          updatedDeal,
        } 
      });

      // ✅ Return success response
      callback({
        success: true,
        data: {
          proof,
          updatedDeal,
        }
      });

    } catch (error) {
      console.error('Error in deal_proof event:', error);
      callback({
        success: false,
        error: error.message,
      });
    }
  });
  socket.on('deal_dispute', async (data, callback) => {
    try {
      const {
        room_id,
        date,
        order,
        formData
      } = data;

      const {
        disputeType,
        disputeTypeOthers=null,
        disputeDescription,
        preferredResolution,
        disputeProof=[],
      } = formData

      // console.log(disputeProof)

      // ✅ Create the proof record 
      const proof = await createNewDispute({
        order_id: order.order_id,
        reason: disputeTypeOthers ? disputeTypeOthers : disputeType,
        description: disputeDescription,
        resolution: preferredResolution,
        proof: disputeProof,
        date: date,
        user_id: userId === order.user_id ? userId : order.vendor_id,
        to: userId === order.user_id ? order.vendor_id : order.user_id
      });

      // ✅ Update the deal stage
      const updatedDeal = await updateDealById({
        order,
        new_stage: 'dispute',
        date,
        userId: order.user_id, // or from deal data if available
        nxt_stage: 'return',
      });
      const partner = await findPartnerById({ user_id: order.vendor_id });

      io.to(room_id).emit('deal_dispute', { data: 
        {
          proof,
          updatedDeal,
        } 
      });

      result = await sendNotificationForDealUpdateFromBuyerToVendor({
        partner,
        order,
        room_id,
        new_stage: 'dispute',
        role: 'buyer',
      });

      // ✅ Return success response
      callback({
        success: true,
        data: {
          proof,
          updatedDeal,
        }
      });

    } catch (error) {
      console.error('Error in deal_proof event:', error);
      callback({
        success: false,
        error: error.message,
      });
    }
  });
  socket.on("offline", async () => {
    console.log("❌ Socket disconnected:", socket.id);
    
    try {

      const userId = socket.user.id;
      if (!onlineUsers.has(userId)) return;

      const userSockets = onlineUsers.get(userId);
      userSockets.delete(socket.id);

      const now = new Date();
      const lagosISO = now.toLocaleString('sv-SE', { timeZone: 'Africa/Lagos' }); 
      const lagosDate = new Date(lagosISO.replace(' ', 'T')).toString(); // ISO-like format

      console.log(lagosDate)
      // if (userSockets.size === 0) {
      onlineUsers.delete(userId);

      // Get partners
      const partners = await Chat.getConversationPartner({ user_id: userId });

      partners.forEach(async(partnerId) => {
        // console.log(partnerId, onlineUsers.has(partnerId))
        if (onlineUsers.has(partnerId)) {
          for (const socketId of onlineUsers.get(partnerId)) {
            await Chat.updateUserStatus({lastseen: lagosDate, userId})
            io.to(socketId).emit("partner_offline", { partnerId, lagosDate });
          }
        }
      });

      console.log(`User ${userId} is now fully offline`);
      // }
      
    } catch (error) {
      console.log(error)
    }
  })
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
});

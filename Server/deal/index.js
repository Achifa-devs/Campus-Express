const express = require('express');
const { Server }  = require('socket.io')
const jwt = require('jsonwebtoken');
const cors = require('cors');
// const { generateDealId } = require('./utils');
require('dotenv').config();
const axios = require('axios');
const { createNewDeal, findPartnerById, updateDealById, updateUserStatus, getConversationPartner } = require('./models');
const { sendNotification, generateConversationId, sendNotificationForDealUpdateFromVendorToBuyer, sendNotificationForDealUpdateFromBuyerToVendor } = require('./utils');
const Deal = express();

Deal.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'UPDATE'],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'cs-gender'],
}));

const server = Deal.listen(process.env.PORT, () => {
  console.log('Deal is live @', process.env.PORT);
});

Deal.use(cors({
  origin: '*',
  // origin: "https://campus-express-production.up.railway.app", // your frontend dev origin
  // credentials: true,
}));

const io = new Server(server, {
  cors: {
    origin: '*',
    // origin: "https://campus-express-production.up.railway.app",   // or your client URL
    methods: ["GET", "POST"],
    // credentials: true
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
        const partners = await getConversationPartner({ user_id: userId });

        partners.forEach(async(partnerId) => {
        if (onlineUsers.has(partnerId)) {
            for (const socketId of onlineUsers.get(partnerId)) {
            await updateUserStatus({lastseen: 'now', userId})
            io.to(socketId).emit("partner_online", { partnerId });
            }
        }
        });
    }

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


    socket.on('/deal/created', async (data, callback) => {
        try {
            const { user_id, product_id, stock, price, locale, vendor_id, shipping_fee, date, order_id, type } = data;

            if (!data) {
                if (callback) callback({ success: false, message: 'Failed to create deal.' });
                return;
            }

            // 2️⃣ Fetch both partners
            const partner = await findPartnerById({ user_id: vendor_id });
            const customer = await findPartnerById({ user_id });

            // 3️⃣ Generate room ID (consistent for both)
            const room_id = generateConversationId(partner.user_id, customer.user_id);

            // 4️⃣ Send notification
            const result = await sendNotification({ customer, partner, order: data, room_id });

            // 5️⃣ Emit the deal to that room if success
            if (result?.success) {
                io.to(room_id).emit('/deal/create', { deal: data });
            } else {
                console.warn('⚠️ Notification failed for room:', room_id);
            }

            // 6️⃣ Callback to the sender
            if (callback) {
                callback({ success: true, deal: response });
            }

        } catch (err) {
            console.error('❌ Error in /deal/create:', err);
            if (callback) callback({ success: false, message: err.message });
        }
    });

    socket.on('deal_update', async (data, callback) => {
        console.log(data)
        try {
            const { order, new_stage, date, userId, room_id, nxt_stage } = data;

            // 1️⃣ Update the deal record
            const response = await updateDealById({ order, new_stage, date, userId, nxt_stage });
            if (!response) return callback({ success: false, data: '' });

            // 2️⃣ Get both parties
            const partner = await findPartnerById({ user_id: order.vendor_id });
            const customer = await findPartnerById({ user_id: order.user_id });

            // 3️⃣ Helper to emit and callback
            const handleResult = (result) => {
                if (result.success) {
                    io.to(room_id).emit('deal_update', { data: response });
                    callback?.({ success: true, data: response });
                } else {
                    callback?.({ success: false, data: '' });
                }
            };

            // 4️⃣ Determine direction and send notification
            let result;

            // Vendor → Buyer updates
            if (
                ['shipping', 'delivered', 'evidence', 'payment'].includes(new_stage) ||
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
                (userId !== order.vendor_id && !['shipping', 'delivered'].includes(new_stage))
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

    

    socket.on('/deal/complaint', (data) => {
        
    })


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
        const partners = await getConversationPartner({ user_id: userId });

        partners.forEach(async(partnerId) => {
            // console.log(partnerId, onlineUsers.has(partnerId))
            if (onlineUsers.has(partnerId)) {
            for (const socketId of onlineUsers.get(partnerId)) {
                await updateUserStatus({lastseen: lagosDate, userId})
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



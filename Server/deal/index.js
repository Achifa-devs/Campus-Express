const express = require('express');
const { Server }  = require('socket.io')
const jwt = require('jsonwebtoken');
const cors = require('cors');
// const { generateDealId } = require('./utils');
require('dotenv').config();
const axios = require('axios');
const { createNewDeal, findPartnerById, updateDealById } = require('./models');
const { sendNotification, generateConversationId } = require('./utils');
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


    socket.on('/deal/create', async (data, callback) => {
        try {
            const { buyer, product_id, stock, price, locale, vendor_id, shipping_fee, date } = data;

            // 1️⃣ Create the deal
            const response = await createNewDeal({ buyer, product_id, stock, price, locale, vendor_id, shipping_fee, date });

            if (!response) {
                if (callback) callback({ success: false, message: 'Failed to create deal.' });
                return;
            }

            // 2️⃣ Fetch both partners
            const partner = await findPartnerById({ user_id: response.vendor_id });
            const customer = await findPartnerById({ user_id: response.buyer });

            // 3️⃣ Generate room ID (consistent for both)
            const room_id = generateConversationId(partner.user_id, customer.user_id);

            // 4️⃣ Send notification
            const result = await sendNotification({ customer, partner, order: response, room_id });

            // 5️⃣ Emit the deal to that room if success
            if (result?.success) {
                io.to(room_id).emit('/deal/create', { deal: response });
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

    socket.on('/deal/update', async(data, callback) => {
        try {
            const { order_id,status } = data;

            const response = await updateDealById({ order_id,status });
            if(response){

            }
        } catch (error) {
            
        }
    })

    socket.on('/deal/payment/claim', (data) => {

    })

    socket.on('/deal/payment/release', (data) => {

    })

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

// services/socket.js
import { io } from "socket.io-client";
import Memory from "../utils/memory";

let socket = null; // ✅ must be let, not const

export const initSocket = async (userId) => {
  if (socket) return socket; // ✅ reuse existing socket

  const token = await Memory.get("token");

  // socket = io("http://192.168.0.3:2020", {  
  // socket = io("https://campus-express-1.onrender.com", { 
  socket = io("https://campus-express-production.up.railway.app", {
    transports: ["websocket"],
    query: { user_id: userId },   // ✅ keep consistent naming with server
    auth: { token },
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    socket?.emit("offline", {})
    console.log("❌ Socket disconnected");
  });

  socket.on("connect_error", (err) => {
    console.error("⚠️ Socket error:", err.message);
  });

  return socket;
};

export const getSocket = () => socket;

// services/socket.js
import { io } from "socket.io-client";
import Memory from "../utils/memoryHandler";

let socket = null; // ✅ must be let, not const

export const initSocket = async (userId) => {
  if (socket) return socket; // ✅ reuse existing socket

  const token = await Memory.get("token");

  socket = io("http://10.132.215.146:8080", {
    transports: ["websocket"],
    query: { user_id: userId },   // ✅ keep consistent naming with server
    auth: { token },
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  });

  socket.on("connect_error", (err) => {
    console.error("⚠️ Socket error:", err.message);
  });

  return socket;
};

export const getSocket = () => socket;

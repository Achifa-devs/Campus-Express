// ChatClient.js
import { io } from "socket.io-client";
import Memory from "../utils/memoryHandler";

export class Chat {
  static socket = null;

  /**
   * Initialize socket connection
   * @param {string} userId - Current user id
   * @param {string} serverUrl - Chat server URL
   */
  static async init(userId, serverUrl) {
    const token = await Memory.get("token");

    if (!this.socket) {
      this.socket = io(serverUrl, {
        transports: ["websocket"],
        query: { user_id: userId }, // optional, since JWT holds userId
        auth: { token },
      });

      // ✅ Connection lifecycle logs
      this.socket.on("connect", () => {
        console.log("✅ Connected as:", userId);
      });

      this.socket.on("disconnect", () => {
        console.log("❌ Disconnected from chat server");
      });

      this.socket.on("connect_error", (err) => {
        console.error("⚠️ Connection error:", err.message);
      });

      // ✅ Default message listener (for debugging)
      this.socket.off("message").on("message", (data) => {
        console.log("📩 Incoming message:", data);
      });
    }
  }

  /**
   * Send a message
   * @param {string} receiverId
   * @param {string} content
   * @param {function} ack
   */
  static sendMessage(payload, ack = () => {}) {
    if (!this.socket) return;
    this.socket.emit("send_message", payload, ack);
  }

  /**
   * Listen for new messages
   * @param {function} callback
   */
  static onMessage(callback) {
    if (!this.socket) return;
    this.socket.off("message").on("message", callback);
  }

  /**
   * Listen for new conversation notifications
   * @param {function} callback
   */
  static onNewConversation(callback) {
    if (!this.socket) return;
    this.socket.off("new_conversation").on("new_conversation", callback);
  }

  /**
   * Fetch chat list for a user
   * @param {string} userId
   * @param {function} callback
   */
  static fetchChatList(userId, callback) {
    if (!this.socket) return;
    this.socket.emit("get_chat_list", { user_id: userId }, callback);
  }

  /**
   * Fetch messages from a conversation
   * @param {string} conversationId
   * @param {function} callback
   */
  static fetchMessages(conversationId, callback) {
    if (!this.socket) return;
    this.socket.emit("get_messages", { conversation_id: conversationId }, callback);
  }

  /**
   * Mark messages as read
   * @param {string} conversationId
   * @param {string} userId
   * @param {function} ack
   */
  static markAsRead(conversationId, userId, ack = () => {}) {
    if (!this.socket) return;
    this.socket.emit("mark_as_read", { conversation_id: conversationId, user_id: userId }, ack);
  }

  /**
   * Join a conversation room
   * @param {string} conversationId
   */
  static joinConversation(conversationId) {
    if (!this.socket) return;
    this.socket.emit("join", { conversationId });
  }

  /**
   * Leave a conversation room
   * @param {string} conversationId
   */
  static leaveConversation(conversationId) {
    if (!this.socket) return;
    this.socket.emit("leave", { conversationId });
  }

  /**
   * Typing indicator
   * @param {string} conversationId
   * @param {boolean} isTyping
   */
  static typing(conversationId, isTyping) {
    if (!this.socket) return;
    this.socket.emit("typing", { conversationId, isTyping });
  }

  /**
   * Disconnect gracefully
   */
  static disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

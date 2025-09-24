const { nanoid } = require("nanoid");
const  pool = require("./db");

class Chat {
  static async getRoomMessages({ conversation_id }) {
    try {
      const result = await pool.query(
        `SELECT * FROM messages
         WHERE conversation_id = $1
         ORDER BY timestamp ASC`,
        [conversation_id]
      );
      return result.rows;
    } catch (error) {
      console.error("❌ Error fetching room messages:", error);
      throw error;
    }
  }

  static async createNewMessage({
    sender_id,
    receiver_id,
    message,
    conversation_id,
    message_type,
    media_url,
    created_at,
  }) {
    const mssg_id = nanoid(10);
    const status = {
      id: receiver_id,
      status: "sent",
    };

    try {
      const result = await pool.query(
        `INSERT INTO messages (
          mssg_id, conversation_id, sender_id, receiver_id,
          content, message_type, media_url, created_at, status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
        [
          mssg_id,
          conversation_id,
          sender_id,
          receiver_id,
          message,
          message_type,
          media_url,
          created_at,
          status,
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error("❌ Error inserting message:", error);
      throw error;
    }
  }

  static async updateMessageStatus({ receiver_id, conversation_id }) {
    try {
      const result = await pool.query(
        `UPDATE messages
         SET status = jsonb_set(status, '{status}', '"sent"')
         WHERE receiver_id = $1 AND conversation_id = $2
         RETURNING *`,
        [receiver_id, conversation_id]
      );
      return result.rows;
    } catch (error) {
      console.error("❌ Error updating message status:", error);
      throw error;
    }
  }

  static async getChatList({ user_id }) {
    try {
      const result = await pool.query(
        `SELECT * FROM messages
         WHERE sender_id = $1 OR receiver_id = $1`,
        [user_id]
      );

      return result.rows.reduce((acc, msg) => {
        const convId = msg.conversation_id;
        if (!acc[convId]) acc[convId] = { messages: [] };
        acc[convId].messages.push(msg);
        return acc;
      }, {});
    } catch (error) {
      console.error("❌ Error getting chat list:", error);
      throw error;
    }
  }

  static async verifyNewParticipants({ conversation_id, user_id }) {
    try {
      const result = await pool.query(
        `SELECT 1
         FROM messages
         WHERE conversation_id = $1
         AND ($2 = sender_id OR $2 = receiver_id)`,
        [conversation_id, user_id]
      );
      return result.rowCount > 0;
    } catch (error) {
      console.error("❌ Error verifying participants:", error);
      throw error;
    }
  }

  static async deleteMessage({ mssg_id, user_id }) {
    try {
      const result = await pool.query(
        `DELETE FROM messages
         WHERE mssg_id = $1 AND sender_id = $2
         RETURNING *`,
        [mssg_id, user_id]
      );
      return result.rows[0];
    } catch (error) {
      console.error("❌ Error deleting message:", error);
      throw error;
    }
  }

  static async getConversationPartner({ user_id }) {
    try {
      const result = await pool.query(
        `SELECT DISTINCT
           CASE
             WHEN sender_id = $1 THEN receiver_id
             ELSE sender_id
           END AS partner_id
         FROM messages
         WHERE sender_id = $1 OR receiver_id = $1`,
        [user_id]
      );
      return result.rows.map(row => row.partner_id);
    } catch (error) {
      console.error("❌ Error fetching conversation partners:", error);
      throw error;
    }
  }

  static async markAsDelivered({ conversation_id, receiver_id }) {
    try {
      const result = await pool.query(
        `UPDATE messages
        SET status = jsonb_set(status, '{status}', '"delivered"')
        WHERE conversation_id = $1
          AND receiver_id = $2
          AND status->>'status' = 'sent'   -- ✅ only upgrade from sent
        RETURNING *`,
        [conversation_id, receiver_id]
      );

      return result.rows;
    } catch (error) {
      console.error("❌ Error marking as delivered:", error);
      throw error;
    }
  }

  static async markAsSeen({ conversation_id, receiver_id }) {
    try {
      const result = await pool.query(
        `UPDATE messages
        SET status = jsonb_set(status, '{status}', '"seen"')
        WHERE conversation_id = $1
          AND receiver_id = $2
          AND status->>'status' IN ('sent','delivered')  -- ✅ override both
        RETURNING *`,
        [conversation_id, receiver_id]
      );

      return result.rows;
    } catch (error) {
      console.error("❌ Error marking as seen:", error);
      throw error;
    }
  }

}

module.exports = Chat;

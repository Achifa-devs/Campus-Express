const { nanoid } = require("nanoid");
const  pool = require("./db");

exports.Chat = class Chat {
  static async getRoomMessages({ conversation_id }) {
    try {
      const result = await pool.query(
        `SELECT * FROM messages
         WHERE conversation_id = $1
         ORDER BY created_at ASC`,
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
  static async markAsSeen({ conversation_id, userId }) {
    try {
      const result = await pool.query(
        `UPDATE messages
        SET status = jsonb_set(status, '{status}', '"seen"')
        WHERE conversation_id = $1
          AND receiver_id = $2
          AND status->>'status' IN ('sent','delivered')  -- ✅ override both
        RETURNING *`,
        [conversation_id, userId]
      );

      return result.rows[0];
    } catch (error) {
      console.error("❌ Error marking as seen:", error);
      throw error;
    }
  }
  static async getUser({ user_id }) {
    try {
      const result = await pool.query(
        `SELECT fname, lname, email, phone, user_id, photo, state, campus, lastseen, fcm FROM users WHERE user_id = $1`,
        [user_id]
      );
      return result.rows[0];
    } catch (error) {
      console.error("❌ Error fetching user:", error);
      throw error;
    }
  }
  static async updateUserStatus({lastseen,userId}){
    try {
      pool.query(
        `UPDATE users SET lastseen = $1 WHERE user_id = $2`, [lastseen, userId]
      )
    } catch (error) {
      
    }
  }
}


// Find all deals for user
exports.findDealsById = async function ({ user_id }) {
  const { rows } = await pool.query(
    `
      SELECT o.*, p.*
      FROM orders o
      JOIN products p ON o.product_id = p.product_id
      WHERE o.user_id = $1 OR o.vendor_id = $1
    `,
    [user_id]
  );
  return rows;
};

exports.findPartnerById = async function ({ user_id }) {
  const { rows } = await pool.query(
    `
      SELECT *
      FROM users
      WHERE user_id = $1
    `,
    [user_id]
  );
  return rows[0];
};

// Find a deal for user
exports.findDealById = async function ({ product_id }) {
  const { rows } = await pool.query(
    `
      SELECT o.*, p.*
      FROM orders o
      JOIN products p ON o.product_id = p.product_id
      WHERE o.product_id = $1;
    `,
    [product_id]
  );

  return rows;
}
// Update deal by stage
exports.updateDealById = async function ({ order, new_stage, date, userId, nxt_stage, formData=null}) {
  let newStatus;
  if(new_stage === 'completed'){
    newStatus = {
      outcome: "success",
      completed: true,
      completedAt: date,
      buyer: order.user_id === userId ? true: false,
      vendor: order.vendor_id === userId ? true: false
    };
  }else if(new_stage === 'cancelled'){
    newStatus = {
      outcome: "success",
      completed: true,
      completedAt: date,
      initiator: userId
    };
  }else if(new_stage === 'dispute'){
    newStatus = {
      outcome: "success",
      completed: true,
      completedAt: date,
      initiator: userId
    };
  }else if(new_stage === 'delivery'){
    newStatus = {
      outcome: "success",
      completed: true,
      completedAt: date,
      buyer: order.user_id === userId ? true: false,
      vendor: order.user_id === userId ? true : order.vendor_id === userId ? true: false
    };
  }else if(new_stage === 'dispatched'){
    newStatus = {
      outcome: "success",
      completed: true,
      completedAt: date,
      shipping_data: formData
    };
  }else{
    newStatus = {
      outcome: "success",
      completed: true,
      completedAt: date,
    };
  }

  const query = `
    UPDATE orders 
    SET 
      status = jsonb_set(
        status,
        '{${new_stage}}',           
        $1::jsonb,              
        true
      ),
      stage = $3
    WHERE order_id = $2
    RETURNING *;
  `;

  const nxt_stage_ = order.user_id === userId && new_stage === 'delivery' ? 'delivery' : nxt_stage 
  const values = [JSON.stringify(newStatus), order.order_id, nxt_stage_];

  const { rows } = await pool.query(query, values);

  return rows?.[0] || null;
};

exports.getConversationPartner = async({ user_id }) => {
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

exports.updateUserStatus = async({lastseen,userId}) => {
  try {
    pool.query(
      `UPDATE users SET lastseen = $1 WHERE user_id = $2`, [lastseen, userId]
    )
  } catch (error) {
    
  }
}

exports.createNewProof = async ({ order, method, location, description, files, date }) => {
  const { rows } = await pool.query(
    `INSERT INTO proofs (order_id, method, location, description, files, date)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [order, method, location, description, files, date]
  );

  return rows[0]; // returns the inserted record
};

// Create dispute
exports.createNewDispute = async ({
  order_id,
  reason,
  description,
  resolution,
  proof,
  date,
  user_id,
  to
}) => {
  try {
    // Validation: Ensure required fields are provided
    if (!order_id || !reason || !user_id || !to) {
      throw new Error("Missing required dispute fields.");
    }

    const query = `
      INSERT INTO disputes (
        order_id, reason, description, resolution, proof, date, status, "from", "to"
      )
      VALUES ($1, $2, $3, $4, $5, $6, 'open', $7, $8)
      RETURNING *;
    `;

    const values = [
      order_id,
      reason,
      description || null,
      resolution || null,
      proof || null,
      date || new Date(),
      user_id,
      to
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error creating dispute:", error.message);
    throw new Error("Unable to create dispute. Please try again later.");
  }
};
// Create new shop review
exports.createShopReview = async function ({ shop_id, product_id, buyer_id, review, date, comment, rating }) {
  const {
    rows
  } = await pool.query(
    `INSERT INTO reviews (id, shop_id, product_id, buyer_id, review, date, comment, rating) 
    VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)`,
    [shop_id, product_id, buyer_id, review, date, comment, rating]
  );
  return rows[0];
};
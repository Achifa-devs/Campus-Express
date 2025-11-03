const { nanoid } = require("nanoid");
const  pool = require("./db");


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
  }else if(new_stage === 'delivered'){
    newStatus = {
      outcome: "success",
      completed: true,
      completedAt: date,
      buyer: order.user_id === userId ? true: false,
      vendor: order.user_id === userId ? true : order.vendor_id === userId ? true: false
    };
  }else if(new_stage === 'shipping'){
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

  const nxt_stage_ = order.user_id === userId && new_stage === 'delivered' ? 'delivered' : nxt_stage 
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
  exports.createNewDispute = async ({ order_id, reason, description, resolution, proof, date }) => {
    const { rows } = await pool.query(
      `INSERT INTO disputes (order_id, reason, description, resolution, proof, date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [order_id, reason, description, resolution, proof, date]
    );

    return rows[0]; // returns the inserted record
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

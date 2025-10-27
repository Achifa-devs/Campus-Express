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
exports.updateDealById = async function ({ order, new_stage, date, userId, nxt_stage }) {
  let newStatus;
  if(new_stage === 'completed'){
    newStatus = {
      outcome: "success",
      completed: true,
      completedAt: date,
      buyer: order.user_id === userId ? true: false,
      vendor: order.vendor_id === userId ? true: false
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

  const values = [JSON.stringify(newStatus), order.order_id, nxt_stage];

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

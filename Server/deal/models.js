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
exports.updateDealById = async function ({ order, new_stage, date, userId }) {
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
      stage = $2
    WHERE order_id = $3
    RETURNING *;
  `;

  const values = [JSON.stringify(newStatus), stage, order.order_id];

  const { rows } = await pool.query(query, values);

  return rows?.[0] || null;
};

import pool from '../db';
import shortId from 'short-id';

// Find all deals for user
export async function findDealsByUserId({ user_id }) {
  const { rows } = await pool.query(
    `SELECT * FROM orders WHERE user_id = $1`,
    [user_id]
  );
  return rows;
}

export async function findDealsByVendorId({ user_id }) {
  const { rows } = await pool.query(
    `SELECT * FROM orders WHERE vendor_id = $1`,
    [user_id]
  );
  return rows;
}

export async function findRefundsByUserId({ user_id }) {
  const { rows } = await pool.query(
    `SELECT * FROM refunds WHERE user_id = $1`,
    [user_id]
  );
  return rows;
}

export async function findDisputesAsBuyer({ order_id }) {
  const { rows } = await pool.query(
    `SELECT * FROM disputes WHERE order_id = $1`,
    [order_id]
  );
  return rows;
}

export async function findDisputesAsVendor({ order_id }) {
  const { rows } = await pool.query(
    `SELECT * FROM disputes WHERE order_id = $1`,
    [order_id]
  );
  return rows;
}

export async function findDisputesByIds({ user_id }) {
  const { rows } = await pool.query(
    `SELECT * FROM disputes WHERE "to" = $1`,
    [user_id]
  );
  return rows;
}

export async function findRefundsByVendorId({ user_id }) {
  const { rows } = await pool.query(
    `SELECT * FROM refunds WHERE vendor_id = $1`,
    [user_id]
  );
  return rows;
}

export async function findTransactionByOrderId({ order_id }) {
  const { rows } = await pool.query(
    `SELECT * FROM transactions WHERE order_id = $1`,
    [order_id]
  );
  return rows[0];
}

export async function findPartnerById({ user_id }) {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE user_id = $1`,
    [user_id]
  );
  return rows[0];
}

// Find a deal by ID
export async function findDealById({ product_id }) {
  const { rows } = await pool.query(
    `SELECT o.*, p.*
     FROM orders o
     JOIN products p ON o.product_id = p.product_id
     WHERE o.product_id = $1`,
    [product_id]
  );
  return rows;
}

// Create new deal
export async function createNewDeal({
  buyer,
  product_id,
  stock,
  price,
  locale,
  vendor_id,
  shipping_fee,
  date,
}) {
  const status = {
    returned: { outcome: null, completed: false, completedAt: null },
    shipping: { outcome: null, completed: false, completedAt: null },
    cancelled: { outcome: null, completed: false, completedAt: null },
    completed: { outcome: null, completed: false, completedAt: null },
    delivered: { outcome: null, completed: false, completedAt: null },
    processing: { outcome: 'success', completed: true, completedAt: date },
  };

  const { rows } = await pool.query(
    `INSERT INTO orders (
      id, order_id, product_id, status, date, stock, user_id, price, pick_up_channels, havePaid, vendor_id, shipping_fee
    )
    VALUES (
      DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
    )
    RETURNING *;`,
    [
      shortId.generate(),
      product_id,
      JSON.stringify(status),
      date,
      stock,
      buyer,
      price,
      locale,
      false,
      vendor_id,
      shipping_fee,
    ]
  );
  return rows[0];
}

// Update deal
export async function updateDealById({ order_id, status, pick_up_channels }) {
  const { rows } = await pool.query(
    `UPDATE orders 
     SET status = $1, pick_up_channels = $2
     WHERE order_id = $3
     RETURNING *;`,
    [status, pick_up_channels, order_id]
  );
  return rows[0];
}

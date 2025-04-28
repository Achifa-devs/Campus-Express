// import pool from "../config/db.js"

import pool from "../../config/db.js";
import shortId from "short-id"
import { errorHandler } from "../../utils/erroHandler.js";

// Find order by ID
export async function findOrderById({ product_id, buyer_id }) {
    const result = await pool.query(
    `SELECT * FROM campus_express_buyer_orders WHERE product_id = $1 AND buyer_id = $2`,
    [product_id, buyer_id]
    );
  return result.rows;
};

// Find orders
export async function findOrders({ buyer_id }) {
  const result = await pool.query(
    `SELECT * FROM campus_express_buyer_orders WHERE buyer_id = $1`,
    [buyer_id]
  );
  return result.rows;
};

// Create order
export async function createOrder({ buyer,product_id,stock,price,locale }) {
  const result = await pool.query(
    `INSERT INTO campus_express_buyer_orders(
        id, order_id, product_id, status, date, stock, buyer_id, price, pick_up_channels, havePaid
    ) VALUES (
        DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9
    )`,
    [shortId.generate(10),product_id,'{"state": "pending"}',`${new Date()}`,stock,buyer,price,`${JSON.stringify(locale)}`,`${false}`]
    );
    
  let response = await errorHandler(result?.rowCount);
  return response;
};

// Confirm order
export async function confirmOrder({ order_id,buyer_id,product_id }) {
  const result = await pool.query(
    `UPDATE campus_express_buyer_orders set status='{"state": "completed"}' WHERE order_id=$1`,
    [order_id]
  );
  return result.rows;
};

// deleteOrder
export async function deleteOrder({ buyer_id, product_id }) {
  const result = await pool.query(
    `DELETE FROM campus_express_buyer_orders WHERE buyer_id=$1 AND product_id=$2`,
    [buyer_id, product_id]
  );
  let response = await errorHandler(result?.rowCount);
  return response;
};


export async function deleteOrderById({ order_id }) {
  const result = await pool.query(
    `DELETE FROM campus_express_buyer_orders WHERE order_id=$1`,
    [order_id]
  );
  let response = await errorHandler(result?.rowCount);
  return response;
};

// Create order with order_id
export async function createOrderWithId({ buyer_id, product_id, stock, price, locale, order_id }) {
  const result = await pool.query(
    `INSERT INTO campus_express_buyer_orders(
        id, order_id, product_id, status, date, stock, buyer_id, price, pick_up_channels, havePaid
    ) VALUES (
        DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9
    )`,
    [order_id,product_id,'{"state": "pending"}',`${new Date()}`,stock,buyer_id,price,`${JSON.stringify(locale)}`,`${false}`]
    );
    
  let response = await errorHandler(result?.rowCount);
  return response;
};

// cancel order
export async function cancelOrder({ order_id }) {
  const result = await pool.query(
    `UPDATE campus_express_buyer_orders set status='{"state": "cancelled"}' WHERE order_id=$1 RETURN havepaid`,
    [order_id]
  );
  return result.rows;
};

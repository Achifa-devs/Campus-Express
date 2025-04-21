// import pool from "../config/db.js"

import pool from "../../config/db.js";
import shortId from "short-id"
import { errorHandler } from "../../utils/erroHandler.js";

// Find order by ID
export async function findOrderById({ order_id }) {
    const result = await pool.query(
    `SELECT * FROM campus_express_buyer_orders WHERE order_id = $1`,
    [order_id]
    );
  return result.rows;
};

// Find orders
export async function findOrders({ seller_id }) {
  const result = await pool.query(
    `SELECT * FROM campus_express_buyer_orders WHERE seller_id = $1`,
    [seller_id]
  );
  return result.rows;
};


// cancel order
export async function cancelOrder({ order_id }) {
  const result = await pool.query(
    `UPDATE campus_express_buyer_orders set status='{"state": "cancelled"}' WHERE order_id=$1 RETURN havepaid`,
    [order_id]
  );
  let response = await errorHandler(result?.rowCount);
  return response;
};

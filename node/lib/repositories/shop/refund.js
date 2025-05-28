// import pool from "../config/db.js"

import pool from "../../config/db.js";
import shortId from "short-id";
import { errorHandler } from "../../utils/erroHandler.js";

// Find refund by ID
export async function findRefundById({
  refund_id
}) {
  const result = await pool.query(`SELECT * FROM refund_list WHERE refund_id = $1`, [refund_id]);
  return result.rows;
}
;

// Find refunds
export async function findRefunds({
  buyer_id
}) {
  const result = await pool.query(`SELECT * FROM refund_list WHERE buyer_id = $1`, [buyer_id]);
  return result.rows;
}
;

// Create refund
export async function createRefund({
  buyer_id,
  order_id,
  amount,
  reason
}) {
  const result = await pool.query(`INSERT INTO refund_list(
        id, buyer_id, order_id, amount, reason, status, created_at
    ) VALUES (
        DEFAULT, $1, $2, $3, $4, $5, $6
    )`, [buyer_id, order_id, amount, reason, 'pending', `${new Date()}`]);
  let response = await errorHandler(result?.rowCount);
  return response;
}
;

// Delete refund
export async function deleteRefundById({
  refund_id
}) {
  const result = await pool.query(`DELETE FROM refund_list WHERE refund_id=$1`, [refund_id]);
  let response = await errorHandler(result?.rowCount);
  return response;
}
;

// Confirm refund
export async function confirmRefund({
  refund_id
}) {
  const result = await pool.query(`UPDATE refund_list set status="completed" WHERE refund_id=$1`, [refund_id]);
  return result.rows;
}
;

// cancel order
export async function cancelRefund({
  refund_id
}) {
  const result = await pool.query(`UPDATE refund_list set status="cancelled" WHERE refund_id=$1`, [refund_id]);
  return result.rows;
}
;
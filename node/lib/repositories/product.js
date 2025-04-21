// import pool from "../config/db.js"

import pool from "../config/db.js";
import shortId from "short-id";
import { errorHandler } from "../utils/erroHandler.js";

// Find product by ID
export async function findProductById({
  product_id
}) {
  const result = await pool.query(`SELECT * FROM seller_shop WHERE product_id = $1`, [product_id]);
  return result.rows;
}
;

// Find products
export async function findProducts({
  limit
}) {
  const result = await pool.query(`SELECT * FROM seller_shop WHERE state->>'state' = 'active' LIMIT $1`, [limit]);
  return result.rows;
}
;

// Find products by category
export async function findProductsByCategory({
  category,
  limit
}) {
  const result = await pool.query(`SELECT * FROM seller_shop WHERE category = $1 AND state->>'state' = 'active'LIMIT $2`, [category, limit]);
  return result.rows;
}
;

// Find products by category
export async function findProductsByCategoryAndGender({
  category,
  cap_gender,
  limit
}) {
  const result = await pool.query(`SELECT * FROM seller_shop WHERE category = $1 AND state->>'state' = 'active' AND others->>'gender' = $2 LIMIT $3`, [category, cap_gender, limit]);
  return result.rows;
}
;

// Find product thumnail by ID
export async function findProductsThumbnailById({
  product_id
}) {
  const result = await pool.query(`SELECT thumbnail_id FROM seller_shop WHERE product_id = $1`, [product_id]);
  return result.rows;
}
;

// Create product view
export async function createProductView({
  product_id,
  buyer_id
}) {
  const result = await pool.query(`INSERT INTO views (
        id, view_id, product_id, buyer_id, date
    ) VALUES (
        DEFAULT, $1, $2, $3, $4
    )`, [shortId.generate(10), product_id, buyer_id, `${new Date()}`]);
  let response = await errorHandler(result?.rowCount);
  return response;
}
;

// Find product view by ID
export async function findProductViewById({
  product_id,
  buyer_id
}) {
  const result = await pool.query(`SELECT * FROM views WHERE product_id = $1 AND buyer_id = $2`, [product_id, buyer_id]);
  return result.rows;
}
;

// UPdate product view by ID
export async function updateProductView({
  product_id
}) {
  const result = await pool.query(`UPDATE seller_shop set views = views+1 WHERE product_id = $1'`, [product_id]);
  let response = await errorHandler(result?.rowCount);
  return response;
}
;
export async function updateProductViewForUnkownBuyer({
  unknown_buyer_id,
  registered_id
}) {
  const result = await pool.query(`UPDATE views set buyer_id = $1 WHERE buyer_id = $2`, [registered_id, unknown_buyer_id]);
  let response = await errorHandler(result?.rowCount);
  return response;
}
;
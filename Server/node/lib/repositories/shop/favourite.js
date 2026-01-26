import pool from "../../config/db.js";
import shortId from "short-id";
import { errorHandler } from "../../utils/erroHandler.js";

// Find order by ID
export async function findFavouriteById({
  user_id,
  product_id
}) {
  const result = await pool.query(`SELECT * FROM favourite WHERE user_id = $1 AND product_id = $2`, [user_id, product_id]);
  return result.rows;
}
;

// Find orders
export async function findFavourites({
  user_id
}) {
  const result = await pool.query(`SELECT * FROM favourite WHERE user_id = $1`, [user_id]);
  return result.rows;
}
;

// Create order
export async function createFavourite({
  user_id,
  product_id
}) {
  const result = await pool.query(`INSERT INTO favourite(
        id,savedItems_id,product_id ,date ,user_id
    ) VALUES (
        DEFAULT, $1, $2, $3, $4
    )`, [shortId.generate(10), product_id, `${new Date()}`, user_id]);
  let response = await errorHandler(result?.rowCount);
  return response;
}
;

// deleteOrder
export async function deleteFavourite({
  user_id,
  product_id
}) {
  console.log('Deleting favourite for:', {
    user_id,
    product_id
  });
  try {
    const result = await pool.query(`DELETE FROM favourite WHERE user_id = $1 AND product_id = $2`, [user_id, product_id]);
    return result.rowCount === 1;
  } catch (error) {
    console.error('Error deleting favourite:', error);
    return false;
  }
}
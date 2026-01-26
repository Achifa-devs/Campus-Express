import pool from "../config/db.js";
import shortId from "short-id";
import { errorHandler } from "../utils/erroHandler.js";

// Find order by ID
export async function findFavouriteById({
  saveditems_id
}) {
  const result = await pool.query(`SELECT * FROM campus_express_buyer_saveditems WHERE saveditems_id = $1`, [saveditems_id]);
  return result.rows;
}
;

// Find orders
export async function findFavourites({
  user_id
}) {
  const result = await pool.query(`SELECT * FROM campus_express_buyer_saveditems WHERE user_id = $1`, [user_id]);
  return result.rows;
}
;

// Create order
export async function createFavourite({
  user_id,
  product_id
}) {
  const result = await pool.query(`INSERT INTO campus_express_buyer_saveditems(
        id,savedItems_id ,product_id ,date ,user_id
    ) VALUES (
        DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9
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
  const result = await pool.query(`DELETE FROM campus_express_buyer_saveditems WHERE user_id=$1 AND product_id=$2`, [user_id, product_id]);
  let response = await errorHandler(result?.rowCount);
  return response;
}
;
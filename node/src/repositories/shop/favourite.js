
import pool from "../../config/db.js";
import shortId from "short-id"
import { errorHandler } from "../../utils/erroHandler.js";

// Find order by ID
export async function findFavouriteById({ saveditems_id }) {
    const result = await pool.query(
    `SELECT * FROM favourite WHERE saveditems_id = $1`,
    [saveditems_id]
    );
  return result.rows;
};

// Find orders
export async function findFavourites({ buyer_id }) {
  const result = await pool.query(
    `SELECT * FROM favourite WHERE buyer_id = $1`,
    [buyer_id]
  );
  return result.rows;
};

// Create order
export async function createFavourite({ buyer_id, product_id }) {
  const result = await pool.query(
    `INSERT INTO favourite(
        id,savedItems_id ,product_id ,date ,buyer_id
    ) VALUES (
        DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9
    )`,
    [shortId.generate(10),product_id,`${new Date()}`,buyer_id]
    );
    
  let response = await errorHandler(result?.rowCount);
  return response;
};


// deleteOrder
export async function deleteFavourite({ buyer_id, product_id }) {
  const result = await pool.query(
    `DELETE FROM favourite WHERE buyer_id=$1 AND product_id=$2`,
    [buyer_id, product_id]
  );
  let response = await errorHandler(result?.rowCount);
  return response;
};
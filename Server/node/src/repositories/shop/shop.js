// import pool from "../config/db.js"

import pool from "../../config/db.js";
import shortId from "short-id"
import { errorHandler } from "../../utils/erroHandler.js";

// Find shop owner by ID
export async function findShopOwnerById({ user_id }) {
  const result = await pool.query(
    `SELECT * FROM users WHERE user_id = $1`,
    [user_id]
  );
  return result.rows;
};

// Find shop reviews by ID
export async function findShopReviewsById({ shop_id }) {
  const result = await pool.query(
    `SELECT * FROM reviews WHERE shop_id = $1`,
    [shop_id]
  );
  return result.rows;
};


// Find shop details by ID
export async function findShopDetailsById({ user_id }) {
  const result = await pool.query(
    `SELECT * FROM shops WHERE user_id = $1`,
    [user_id]
  );
  return result.rows;
};

// Find shop content by ID
export async function findShopContentById({ user_id }) {
  const result = await pool.query(
    `SELECT * FROM products WHERE user_id = $1`,
    [user_id]
  );
  return result.rows;
};


// Create new shop review
export async function createShopReview({ shop_id, product_id, buyer_id, review, date, comment, rating }) {
  const result = await pool.query(
    `INSERT INTO reviews (
        id, shop_id, product_id, buyer_id, review, date, comment, rating
    ) VALUES (
        DEFAULT, $1, $2, $3, $4, $5, $6, $7
    )`,
    [
      shop_id, product_id, buyer_id, review, date, comment, rating
    ]
  );
  let response = await errorHandler(result?.rowCount);
  return response;
};


// // Create shop view
// export async function createShopView({ buyer_id, product_id }) {
//   const result = await pool.query(
//     `INSERT INTO views (
//         id, view_id, product_id, buyer_id, date
//     ) VALUES (
//         DEFAULT, $1, $2, $3, $4
//     )`,
//     [
//       shortId.generate(10), product_id, buyer_id, `${new Date()}`
//     ] 
//     );
    
//   let response = await errorHandler(result?.rowCount); 
//    return response ;
// };


// // Find shop view by ID
// export async function findShopViewById({ product_id, buyer_id }) {
//   const result = await pool.query(
//     `SELECT * FROM views WHERE product_id = $1 AND buyer_id = $2`,
//     [product_id, buyer_id]
//   );
//   return result.rows;
// };


// // UPdate shop view by ID
// export async function UpdateShopView({ product_id }) {
//   const result = await pool.query(
//     `UPDATE products set views = views+1 WHERE product_id = $1'`,
//     [product_id]
//   );
//   let response = await errorHandler(result?.rowCount); 
//    return response;
// };
// import pool from "../config/db.js"

import pool from "../../config/db.js";
import shortId from "short-id"
import { errorHandler } from "../../utils/erroHandler.js";

// Find product by ID
export async function findProductById({ product_id }) {
    // console.log('product_id: ', product_id)
    const result = await pool.query(
    `SELECT * FROM products WHERE product_id = $1`,
    [product_id]
    );
  return result.rows;
};

// Find products
export async function findProducts({ limit, campus }) {
  if (limit !== null) {
    const result = await pool.query(
      `SELECT * FROM products WHERE state->>'state' = 'active' AND campus = $1 LIMIT $2`,
      [campus, limit]
    );
    return result.rows;
  } else {
    const result = await pool.query(
      `SELECT * FROM products WHERE state->>'state' = 'active'`
    );
    return result.rows;
  }
};

export async function findProductsType({ type, limit }) {
   const result = await pool.query(
      `SELECT * FROM products WHERE state->>'state' = 'active' AND others->>'cType' = $1 LIMIT $2`,
      [type,limit]
    );
    return result.rows;
};

// Find products by category
export async function findProductsByCategory({ category,limit,campus }) {
  const result = await pool.query(
    `SELECT * FROM products WHERE category = $1 AND state->>'state' = 'active' AND campus = $2 LIMIT $3`,
    [category,campus,limit]
  );
  return result.rows;
};

// Find products by category
export async function findProductsByCategoryAndGender({ category, cap_gender, limit, campus }) {
  const result = await pool.query(
    `SELECT * FROM products WHERE ategory = $1 AND state->>'state' = 'active' AND others->>'gender' = $2 AND campus = $3 LIMIT $4`,
    [category,cap_gender, campus, limit]
  );
  return result.rows;
};



// Find product thumnail by ID
export async function findProductsThumbnailById({ product_id }) {
  const result = await pool.query(
    `SELECT thumbnail_id FROM products WHERE product_id = $1`,
    [product_id]
  );
  return result.rows;
};


// Create product view
export async function createProductView({ product_id, user_id }) {
  let date = new Date();
  const result = await pool.query(
    `INSERT INTO views (
        id, view_id, product_id, user_id, date
    ) VALUES (
        DEFAULT, $1, $2, $3, $4
    )`,
    [shortId.generate(10), product_id, user_id, date]
    );
    
  let response = await errorHandler(result?.rowCount);
  return response;
};


// Find product view by ID
export async function findProductViewById({ product_id, user_id }) {
  const result = await pool.query(
    `SELECT * FROM views WHERE product_id = $1 AND user_id = $2`,
    [product_id, user_id]
  );
  return result.rows;
};


// UPdate product view by ID
export async function updateProductView({ product_id }) {
  const result = await pool.query(
    `UPDATE products set views = views+1 WHERE product_id = $1`,
    [product_id]
  );
  let response = await errorHandler(result?.rowCount);
  return response;
};

export async function updateProductViewForUnkownBuyer({ unknown_user_id, registered_id }) {
  const result = await pool.query(
    `UPDATE views set user_id = $1 WHERE user_id = $2`,
    [registered_id, unknown_user_id]
  );
  let response = await errorHandler(result?.rowCount);
  return response;
};
// import pool from "../config/db.js"

import pool from "../../config/db.js";
import shortId from "short-id"
import { errorHandler } from "../../utils/erroHandler.js";

// Find product by ID (safe)
export async function findProductById({ product_id, user_id }) {
  const result = await pool.query(
    `SELECT * FROM products WHERE product_id = $1 AND user_id = $2`,
    [product_id, user_id]
  );
  return result.rows[0] || null; // return single object or null
}

// Find all products for a user
export async function findProducts({ user_id }) {
  const result = await pool.query(
    `SELECT * FROM products WHERE user_id = $1`,
    [user_id]
  );
  return result.rows; // return array
}

// Find product thumbnail by ID
export async function findProductsThumbnailById({ product_id }) {
  const result = await pool.query(
    `SELECT thumbnail_id FROM products WHERE product_id = $1`,
    [product_id]
  );
  return result.rows[0] || null; // return single object or null
}





// Create product view
export async function createProduct({ constantData, dynamicData, shipping_data }) {
  try {
    Object.keys(dynamicData).forEach(key => {
      if (dynamicData[key] === '') {
        delete dynamicData[key];
      }
    });

    const replacedDescription = constantData.description.replace(/'/g, '"');
    const replacedTitle = constantData.title.replace(/'/g, '"');

    const {
      category, price, stock, product_id, user_id, thumbnail_id,
      campus, state, thumbnail_public_id, purpose
    } = constantData;

    if (!dynamicData.lodge_data?.lodge_active) {
      delete dynamicData.lodge_data;
    }

    const date = new Date();

    const result = await pool.query(
      `INSERT INTO products(
        id, product_id, user_id, status, title, description, price, package,
        category, others, date, state, views, shares, stock, thumbnail_id,
        accept_refund, shipping_range, shipping_duration, campus, uni_state,
        thumbnail_public_id, purpose, contact_click, impression, search_appearances
      ) 
      VALUES(
        DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
        $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24
      )`,
      [
        product_id,
        user_id,
        'unsold',
        replacedTitle,
        replacedDescription,
        price || 0,
        0,
        category,
        JSON.stringify(dynamicData),
        date,
        JSON.stringify({ state: "active", reason: "rent paid" }),
        0,
        0,
        stock || 0,
        thumbnail_id,
        shipping_data?.shipping_policy,
        JSON.stringify(shipping_data?.shipping_range),
        shipping_data?.shipping_duration,
        campus,
        state,
        thumbnail_public_id,
        purpose,
        0,
        0,
        0
      ]
    );

    // ✅ Return true if rowCount === 1, otherwise false
    return result?.rowCount === 1;
  } catch (error) {
    console.error(error);
    return false; // in case of error, return false
  }
}



// DELETE product by ID
export async function deleteProduct({ product_id }) {
  const result = await pool.query(
    `DELETE FROM products WHERE product_id = $1`,
    [product_id]
  );
  return errorHandler(result?.rowCount);
}

// UPDATE product
export async function updateProduct({ constantData, dynamicData, shipping_data }) {
  Object.keys(dynamicData).forEach(key => {
    if (dynamicData[key] === '') {
      delete dynamicData[key];
    }
  });

  const replacedDescription = constantData.description.replace(/'/g, '"');
  const replacedTitle = constantData.title.replace(/'/g, '"');

  const {
    category,
    price,
    stock,
    product_id,   // ✅ use consistent naming
    user_id,
    thumbnail_id,
    campus,
    state,
    thumbnail_public_id
  } = constantData;

  if (!dynamicData.lodge_data?.lodge_active) {
    delete dynamicData.lodge_data;
  }

  const date = new Date();

  const result = await pool.query(
    `UPDATE products SET 
      status=$1,
      title=$2,
      description=$3,
      price=$4,
      package=$5,
      category=$6,
      others=$7,
      date=$8,
      state=$9,
      views=$10,
      shares=$11,
      stock=$12,
      thumbnail_id=$13,
      accept_refund=$14,
      shipping_range=$15,
      shipping_duration=$16,
      campus=$17,
      uni_state=$18,
      thumbnail_public_id=$19
     WHERE product_id = $20 AND user_id = $21`,
    [
      'unsold',
      replacedTitle,
      replacedDescription,
      price || 0,
      0,
      category,
      JSON.stringify(dynamicData),
      date,
      JSON.stringify({ state: "active", reason: "rent paid" }),
      0,
      0,
      stock || 0,
      thumbnail_id,
      shipping_data?.shipping_policy,
      JSON.stringify(shipping_data?.shipping_range),
      shipping_data?.shipping_duration,
      campus,
      state,
      thumbnail_public_id,
      product_id,  // ✅ aligned
      user_id
    ]
  );

  return errorHandler(result?.rowCount);
}



// Find subscription by user_id
export async function findSubscriptionById({ user_id }) {
  const query = 'SELECT * FROM subscriptions WHERE user_id = $1';
  const result = await pool.query(query, [user_id]);
  return result.rows[0] || null;  // return single object instead of array
}

// Decrement connections_remaining
export async function updateConnections({ user_id }) {
  const query = `
    UPDATE subscriptions 
    SET connections_remaining = connections_remaining - 1
    WHERE user_id = $1 AND connections_remaining > 0
    RETURNING *`;
    
  const result = await pool.query(query, [user_id]);
  return result.rows[0] || null;  // return updated subscription or null if no update
}


export async function updateAdQuota({ user_id }) {
  const query = `
    UPDATE subscriptions 
    SET ad_quota = ad_quota - 1 
    WHERE user_id = $1 AND ad_quota > 0
    RETURNING *`;
    
  const result = await pool.query(query, [user_id]);
  return result.rowCount === 1;
}
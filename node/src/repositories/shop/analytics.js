import pool from "../../config/db.js";
import shortId from "short-id";
import { errorHandler } from "../../utils/erroHandler.js";

// Find Shop View by ID
export async function findShopViewId({ shop_id, user_id }) {
  const result = await pool.query(
    `SELECT * FROM shop_views WHERE shop_id = $1 AND user_id = $2`,
    [shop_id, user_id]
  );
  return result.rows;
};

export async function createShopView({ shop_id, user_id }) {
  let date = new Date();
  const result = await pool.query(
    `INSERT INTO shop_views (
        id, shop_view_id, shop_id, user_id, date
    ) VALUES (
        DEFAULT, $1, $2, $3, $4
    )`,
    [shortId.generate(), shop_id, user_id, date]
  );
    
  return (result?.rowCount);
};

export async function updateShopView({ shop_id }) {
  const result = await pool.query(
    `UPDATE shops set views = views+1 WHERE shop_id = $1`,
    [shop_id]
  );
  let response = await errorHandler(result?.rowCount);
  return response;
};



// Create Contact Click
export async function createContactClick({ product_id, user_id }) {
  let date = new Date();
  const result = await pool.query(
    `INSERT INTO contact_clicks (
        id, click_id, product_id, user_id, date
    ) VALUES (
        DEFAULT, $1, $2, $3, $4
    )`,
    [shortId.generate(), product_id, user_id, date]
  );
    
  return (result?.rowCount);
};

// Find Contact Click by ID
export async function findContactClickId({ product_id, user_id }) {
  const result = await pool.query(
    `SELECT * FROM contact_clicks WHERE product_id = $1 AND user_id = $2`,
    [product_id, user_id]
  );
  return result.rows;
};

// Update Contact Click by ID
export async function updateContactClick({ product_id }) {
  const result = await pool.query(
    `UPDATE products set contact_click = contact_click+1 WHERE product_id = $1`,
    [product_id]
  );
  let response = await errorHandler(result?.rowCount);
  return response;
};

export async function updateContactClickForUnkownBuyer({ unknown_user_id, registered_id }) {
  const result = await pool.query(
    `UPDATE contact_clicks set user_id = $1 WHERE user_id = $2`,
    [registered_id, unknown_user_id]
  );
  let response = await errorHandler(result?.rowCount);
  return response;
};

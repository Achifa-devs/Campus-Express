// import pool from "../config/db.js"

import pool from "../../config/db.js";
import shortId from "short-id";

// Find shop shipping info
export async function findShopShippingInfoById({
  user_id
}) {
  const result = await pool.query(`SELECT * FROM shipping WHERE user_id = $1`, [user_id]);
  return result.rows;
}
;

// Create new shipping info
export async function createShopShippingInfo({
  Address1,
  Address2,
  Address3,
  Address4,
  City,
  State,
  Country,
  user_id
}) {
  try {
    const result = await pool.query(`INSERT INTO shipping (
          id, address1, address2, address3, address4, town, state, country,user_id
      ) VALUES (
          DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8
      )`, [Address1, Address2, Address3, Address4, City, State, Country, user_id]);
    return result;
  } catch (error) {
    console.error(error);
  }
}
;

// Update shop shipping info
export async function UpdateShopShippingInfo({
  Address1,
  Address2,
  Address3,
  Address4,
  City,
  State,
  Country,
  user_id
}) {
  try {
    const result = await pool.query(`UPDATE shipping set address1 = $1, address2 = $2, address3 = $3, address4 = $4, town = $5, state = $6, country = $7 WHERE user_id = $8`, [Address1, Address2, Address3, Address4, City, State, Country, user_id]);
    return result;
  } catch (error) {
    console.error(error);
  }
}
;

// Find shop reviews by ID
export async function findShopReviewsById({
  user_id
}) {
  const result = await pool.query(`SELECT * FROM reviews WHERE user_id = $1`, [user_id]);
  return result.rows;
}
;

// Find shop details by ID
export async function findShopDetailsById({
  user_id
}) {
  const result = await pool.query(`SELECT * FROM shops WHERE user_id = $1`, [user_id]);
  return result.rows;
}
;

// Create new shop
export async function createShop({
  logo = null,
  shopName,
  description,
  address1,
  address2,
  address3,
  user_id
}) {
  try {
    const subscription = {
      "plan": "free",
      "start_date": new Date(),
      "end_date": "NUll",
      "updated_at": new Date()
    };
    const result = await pool.query(`INSERT INTO shops (
        id,shop_id,user_id,title,category,status,description,logo_url,open_hrs,social_links,is_verified,created_at,street,lodge,town,views,subscription
      ) VALUES (
        DEFAULT,
        '${await shortId.generate(10)}', '${user_id}', '${shopName}', '', 'active', '${description}', '${logo ? logo : 'NULL'}', '', '', ${false}, '${new Date()}', '${address1}', '${address2}', '${address3}', ${0}, '${JSON.stringify(subscription)}'
      ) RETURNING *`);
    return result.rows[0];
  } catch (error) {
    throw new Error("Internal server error", error);
  }
}
;

// Update shop 
export async function UpdateShop({
  user_id,
  title,
  description,
  logo
}) {
  try {
    const result = await pool.query(`UPDATE shops 
      SET title = $2, description = $3, logo_url = $4
      WHERE user_id = $1 
      RETURNING *`, [user_id, title, description, logo]);
    return result.rows[0]; // this gives you the updated item
  } catch (error) {
    console.log(error);
  }
}
;
export async function UpdateShopCategory({
  user_id
}) {
  try {
    const result = await pool.query(`UPDATE shops set inventory='${JSON.stringify(inventory)}' WHERE user_id = $1'`, [user_id]);
    return result;
  } catch (error) {
    console.error(error);
  }
}
;
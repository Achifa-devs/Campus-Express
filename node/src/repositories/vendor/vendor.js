// import pool from "../config/db.js"

import pool from "../../config/db.js";
import { errorHandler } from "../../utils/erroHandler.js";




// Create new Vendor
export async function createVendor({ fname, lname, seller_id, email, phone, hashedPwd, state, campus, gender }) {
  const result = await pool.query(
    `INSERT INTO campus_sellers (
    id, fname, lname, seller_id, email, phone, password, state,
    campus, isActive, isVerified, isEmailVerified, isPhoneVerified,
    date, lastseen, gender
    ) VALUES (
    DEFAULT, $1, $2, $3, $4, $5, $6, $7,
    $8, $9, $10, $11, $12, $13, $14, $15
    )`,
    [
      fname, lname, seller_id, email, phone, hashedPwd, state, campus,
      false, false, false, false, `${new Date()}`, `${new Date()}`, gender
    ]
  );
  let response = await errorHandler(result?.rowCount);
  return response;
};

// Check Vendor email
export async function countEmail ({ email }) {
  
  const result = await pool.query(`
    SELECT COUNT(*) as count
    FROM campus_sellers
    WHERE email = '${email}'
  `)
  return parseInt(result.rows[0].count)
}

// Check Vendor phone
export async function countPhone ({ phone }) {
  const result = await pool.query(`
    SELECT COUNT(*) as count
    FROM campus_sellers
    WHERE phone = '${phone}'
  `)

  return parseInt(result.rows[0].count)
}

// Find user by ID
export async function findUserById({seller_id}) {
  const result = await pool.query(
    `SELECT * FROM campus_sellers WHERE seller_id = $1`,
    [seller_id]
  );
  return result.rows[0];
};

export async function findUserByEmail({ email }) {
  
  const result = await pool.query(
    `SELECT * FROM campus_sellers WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};

export async function updateVendorPhoneById({ seller_id, phone }) {
  
  const result = await pool.query(
    `UPDATE campus_sellers set phone = $1 WHERE seller_id = $2`,
    [phone, seller_id]
  );
  return result.rows[0];
};

export async function updateVendorEmailById({ seller_id, email }) {
  
  const result = await pool.query(
    `UPDATE campus_sellers set email = $1 WHERE seller_id = $2`,
    [email, seller_id]
  );
  return result.rows[0];
};

export async function updateVendorProfileById({ seller_id, fname, lname, gender }) {
  
  const result = await pool.query(
    `UPDATE campus_sellers set fname=$1, lname=$2, gender=$3 WHERE seller_id = $4`,
    [fname, lname, gender, seller_id]
  );
  return result.rows[0];
};

export async function updateVendorPasswordById({ seller_id, pwd }) {
  
  const result = await pool.query(
    `UPDATE campus_sellers set password=$1 WHERE seller_id = $2`,
    [pwd, seller_id]
  );
  return result.rows[0];
};

// import pool from "../config/db.js"

import pool from "../../config/db.js";
import { errorHandler } from "../../utils/erroHandler.js";

// Create new Vendor
export async function createVendor({
  fname,
  lname,
  user_id,
  email,
  phone,
  hashedPwd,
  state,
  campus,
  gender,
  deviceId
}) {
  const result = await pool.query(`INSERT INTO users (
    id, fname, lname, user_id, email, phone, password, state,
    campus, isActive, isVerified, isEmailVerified, isPhoneVerified,
    date, lastseen, gender, deviceid, photo
    ) VALUES (
    DEFAULT, $1, $2, $3, $4, $5, $6, $7,
    $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
    )`, [fname, lname, user_id, email, phone, hashedPwd, state, campus, false, false, false, false, `${new Date()}`, `${new Date()}`, null, deviceId, null]);
  let response = await errorHandler(result?.rowCount);
  return response;
}
;

// Check Vendor email
export async function countEmail({
  email
}) {
  const result = await pool.query(`
    SELECT COUNT(*) as count
    FROM users
    WHERE email = '${email}'
  `);
  return parseInt(result.rows[0].count);
}

// Check Vendor phone
export async function countPhone({
  phone
}) {
  const result = await pool.query(`
    SELECT COUNT(*) as count
    FROM users
    WHERE phone = '${phone}'
  `);
  return parseInt(result.rows[0].count);
}

// Find user by ID
export async function findUserById({
  user_id
}) {
  const result = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id]);
  return result.rows[0];
}
;
export async function findUserByEmail({
  email
}) {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
}
;
export async function findUserByPhone({
  phone
}) {
  const result = await pool.query(`SELECT * FROM users WHERE phone = $1`, [phone]);
  return result.rows[0];
}
;
export async function updateVendorPhoneById({
  user_id,
  phone
}) {
  const result = await pool.query(`UPDATE users set phone = $1 WHERE user_id = $2`, [phone, user_id]);
  return result.rows[0];
}
;
export async function updateVendorEmailById({
  user_id,
  email
}) {
  const result = await pool.query(`UPDATE users set email = $1 WHERE user_id = $2`, [email, user_id]);
  return result.rows[0];
}
;
export async function updateVendorProfileById({
  user_id,
  fname,
  lname,
  gender
}) {
  const result = await pool.query(`UPDATE users set fname=$1, lname=$2, gender=$3 WHERE user_id = $4`, [fname, lname, gender, user_id]);
  return result.rows[0];
}
;
export async function updateVendorPasswordById({
  user_id,
  pwd
}) {
  const result = await pool.query(`UPDATE users set password=$1 WHERE user_id = $2`, [pwd, user_id]);
  return result.rows[0];
}
;
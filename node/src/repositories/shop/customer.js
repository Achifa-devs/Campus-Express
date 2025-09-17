// import pool from "../config/db.js"

import pool from "../../config/db.js";
import { errorHandler } from "../../utils/erroHandler.js";





// Create new customer
export async function createCustomer({ fname, lname, user_id, email, phone, hashedPwd, state, campus, gender }) {
  const result = await pool.query(
    `INSERT INTO users (
    id, fname, lname, user_id, email, phone, password, state,
    campus, isActive, isVerified, isEmailVerified, isPhoneVerified,
    date, gender
    ) VALUES (
    DEFAULT, $1, $2, $3, $4, $5, $6, $7,
    $8, $9, $10, $11, $12, $13, $14
    )`,
    [
      fname, lname, user_id, email, phone, hashedPwd, state, campus,
      false, false, false, false, `${new Date()}`, gender
    ]
  );
  let response = await errorHandler(result?.rowCount);
  return response;
};

// Check customer email
export async function countEmail ({ email }) {
  
  const result = await pool.query(`
    SELECT COUNT(*) as count
    FROM users
    WHERE email = '${email}'
  `)
  return parseInt(result.rows[0].count)
}

// Check customer token
export async function findTokenByEmail ({ email }) {
  
  const result = await pool.query(`
    SELECT * FROM token
    WHERE recipient = $1
  `, [email]
  )
  return (result.rows[0])
}

export async function deleteTokenByEmail ({ email }) {
  
  const result = await pool.query(`
    DELETE FROM token
    WHERE recipient = $1 
  `, [email]
  )
  let response = await errorHandler(result?.rowCount);
  return response;
}

// Check customer phone
export async function countPhone ({ phone }) {
  const result = await pool.query(`
    SELECT COUNT(*) as count
    FROM users
    WHERE phone = '${phone}'
  `)

  return parseInt(result.rows[0].count)
}

// Find user by ID
export async function findUserById({user_id}) {
  const result = await pool.query(
    `SELECT * FROM users WHERE user_id = $1`,
    [user_id]
  );
  return result.rows[0];
};

export async function findUserByEmail({ email }) {
  
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};


export async function updateCustomerPhoneById({ user_id, phone }) {
  
  const result = await pool.query(
    `UPDATE users set phone = $1 WHERE user_id = $2`,
    [phone, user_id]
  );
  return result.rows[0];
};

export async function updateCustomerEmailById({ user_id, email }) {
  
  const result = await pool.query(
    `UPDATE users set email = $1 WHERE user_id = $2`,
    [email, user_id]
  );
  return result.rows[0];
};


export async function updateCustomerProfileById({ user_id, fname, lname, email, phone, gender, campus, state }) {
  
  const result = await pool.query(
    `UPDATE users set fname=$1, lname=$2, email=$3, phone=$4 gender=$5, campus=$6, state=$7 WHERE user_id = $8`,
    [fname, lname, email, phone, gender, campus, state, user_id]
  );
  return result.rows[0];
};

export async function updateCustomerPasswordById({ user_id, password }) {
  
  const result = await pool.query(
    `UPDATE users set password=$1 WHERE user_id = $2`,
    [password, user_id]
  );
  return result.rows[0];
};

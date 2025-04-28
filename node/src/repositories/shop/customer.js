// import pool from "../config/db.js"

import pool from "../../config/db.js";
import { errorHandler } from "../../utils/erroHandler.js";





// Create new customer
export async function createCustomer({ fname, lname, buyer_id, email, phone, hashedPwd, state, campus, gender }) {
  const result = await pool.query(
    `INSERT INTO campus_buyers (
    id, fname, lname, buyer_id, email, phone, password, state,
    campus, isActive, isVerified, isEmailVerified, isPhoneVerified,
    date, gender
    ) VALUES (
    DEFAULT, $1, $2, $3, $4, $5, $6, $7,
    $8, $9, $10, $11, $12, $13, $14
    )`,
    [
      fname, lname, buyer_id, email, phone, hashedPwd, state, campus,
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
    FROM campus_buyers
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
    FROM campus_buyers
    WHERE phone = '${phone}'
  `)

  return parseInt(result.rows[0].count)
}

// Find user by ID
export async function findUserById({buyer_id}) {
  const result = await pool.query(
    `SELECT * FROM campus_buyers WHERE buyer_id = $1`,
    [buyer_id]
  );
  return result.rows[0];
};

export async function findUserByEmail({ email }) {
  
  const result = await pool.query(
    `SELECT * FROM campus_buyers WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};


export async function updateCustomerPhoneById({ buyer_id, phone }) {
  
  const result = await pool.query(
    `UPDATE campus_buyers set phone = $1 WHERE buyer_id = $2`,
    [phone, buyer_id]
  );
  return result.rows[0];
};

export async function updateCustomerEmailById({ buyer_id, email }) {
  
  const result = await pool.query(
    `UPDATE campus_buyers set email = $1 WHERE buyer_id = $2`,
    [email, buyer_id]
  );
  return result.rows[0];
};


export async function updateCustomerProfileById({ buyer_id, fname, lname, gender }) {
  
  const result = await pool.query(
    `UPDATE campus_buyers set fname=$1, lname=$2, gender=$3 WHERE buyer_id = $4`,
    [fname, lname, gender, buyer_id]
  );
  return result.rows[0];
};

export async function updateCustomerPasswordById({ buyer_id, password }) {
  
  const result = await pool.query(
    `UPDATE campus_buyers set password=$1 WHERE buyer_id = $2`,
    [password, buyer_id]
  );
  return result.rows[0];
};

// import pool from "../config/db.js"

const pool = require('../config/database')


// Create new Vendor
exports.createUser =  async function ({ fname, lname, user_id, email, phone, hashedPwd, state, campus, gender, deviceId, fcm }) {
  const { rowCount } = await pool.query(
    `INSERT INTO users (
    id, fname, lname, user_id, email, phone, password, state,
    campus, isActive, isVerified, isEmailVerified, isPhoneVerified,
    date, lastseen, gender, deviceid, photo, connects, status, fcm
    ) VALUES (
    DEFAULT, $1, $2, $3, $4, $5, $6, $7,
    $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
    )`,
    [
      fname, lname, user_id, email, phone, hashedPwd, state, campus,
      false, false, false, false, `${new Date()}`, `${new Date()}`, null, deviceId, null, 0, null, fcm
    ]
  );
  let response = await rowCount > 0;
  return response;
};

exports.truncateUser =  async function ({user_id}) {
    // Code here
    return null
}

exports.updateUserPhotoById =  async function ({photo, user_id}) {
    const result = await pool.query(
    `UPDATE users set photo = $1 WHERE user_id = $2`,
    [photo, user_id]
  );
  return result.rows[0];
}

exports.createNewToken =  async function  ({ token, date, user_id }) {
  
    const { rows } = await pool.query(`
      INSERT INTO token (id, token, expires_at, user_id)
      VALUES (DEFAULT, $1, $2, $3)
      RETURNING *
      `, [token, date, user_id]
    );

    return rows[0];

}

exports.countToken =  async function  ({ token, user_id }) {
  
  const {
    rows
  } = await pool.query(`
    SELECT COUNT(*) as count
    FROM token
    WHERE token = $1 AND user_id = $2
  `, [token, user_id])
  return parseInt(rows[0].count)
}

// Check Vendor email
exports.countEmail =  async function  ({ email }) {
  
  const result = await pool.query(`
    SELECT COUNT(*) as count
    FROM users
    WHERE email = '${email}'
  `)
  return parseInt(result.rows[0].count)
}

// Check Vendor phone
exports.countPhone =  async function  ({ phone }) {
  const result = await pool.query(`
    SELECT COUNT(*) as count
    FROM users
    WHERE phone = '${phone}'
  `)

  return parseInt(result.rows[0].count)
}

// Find user by ID
exports.findUserById =  async function ({user_id}) {
  const result = await pool.query(
    `SELECT * FROM users WHERE user_id = $1`,
    [user_id]
  );
  return result.rows[0];
};

exports.findUserByEmail =  async function ({ email }) {
  
  const {
    rows
  } = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return rows[0];
};

exports.findUserByPhone =  async function ({ phone }) {
  
  const result = await pool.query(
    `SELECT * FROM users WHERE phone = $1`,
    [phone]
  );
  return result.rows[0];
};

exports.updateUserPhoneById =  async function ({ user_id, phone }) {
  
  const result = await pool.query(
    `UPDATE users set phone = $1 WHERE user_id = $2`,
    [phone, user_id]
  );
  return result.rows[0];
};

exports.updateUserEmailById =  async function ({ user_id, email }) {
  
  const result = await pool.query(
    `UPDATE users set email = $1 WHERE user_id = $2`,
    [email, user_id]
  );
  return result.rows[0];
};

exports.updateUserProfileById =  async function ({ user_id, fname, lname, gender }) {
  
  const result = await pool.query(
    `UPDATE users set fname=$1, lname=$2, gender=$3 WHERE user_id = $4`,
    [fname, lname, gender, user_id]
  );
  return result.rows[0];
};

exports.updateUserPasswordById =  async function ({ user_id, password }) {
  
  const {
    rows
  } = await pool.query(
    `UPDATE users set password=$1 WHERE user_id = $2 RETURNING *`,
    [password, user_id]
  );
  return rows[0];
};

exports.updateUserFcm =  async function ({ fcm, user_id }) {
  
  const result = await pool.query(
    `UPDATE users SET fcm = $1 WHERE user_id = $2
    RETURNING *`,
    [fcm, user_id]
  );
  return result.rows[0];
};


const pool =  require('../config/database')
const shortId =  require('short-id')

exports.getVendorPromo = async function () {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM activities WHERE title = $1`,
      ['vendor_promo']
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching vendor promo:', error);
    throw error;
  }
};

exports.getCurrentVersion = async function () {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM app ORDER BY id DESC LIMIT 1`
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching current version:', error);
    throw error;
  }
};

exports.updateFirebaseTokenById = async function ({ fcm, user_id }) {
  try {
    const { rows } = await pool.query(
      `UPDATE users SET fcm = $1 WHERE user_id = $2 RETURNING *`,
      [fcm, user_id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Error updating Firebase token:', error);
    throw error;
  }
};

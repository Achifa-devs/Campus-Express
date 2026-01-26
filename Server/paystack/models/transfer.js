const pool = require("../config/database");

module.exports = class Transact{

  static async createTransfer({
    ref,
    status,
    created_at = new Date(),
    updated_at = new Date(),
    amount,
    user_id
  }) {
    const query = `
      INSERT INTO transfers (
        ref,
        status,
        created_at,
        updated_at,
        amount,
        user_id
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [ref, status, created_at, updated_at, amount, user_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async updateTransferStatus({ status, ref, createdAt = new Date() }) {
    try {
      const query = `
        UPDATE transfers
        SET status = $1,
            updated_at = $2
        WHERE ref = $3
        RETURNING *;
      `;

      const values = [status, createdAt, ref];
      const result = await pool.query(query, values);

      // Return the updated row or null if no match found
      return result.rows?.[0] || null;
    } catch (error) {
      console.error('❌ Error updating transfer status:', error.message);
      throw error; // rethrow for higher-level handling
    }
  }

}
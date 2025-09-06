const pool = require('../config/database');

class Payment {
  static async create(paymentData) {
    const { amount, currency, status, reference } = paymentData;
    const query = `
      INSERT INTO subscription_transactions (subscription_id, amount, status, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *
    `;
    const values = [reference, amount, status];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByReference(reference) {
    const query = 'SELECT * FROM subscription_transactions WHERE subscription_id = $1';
    const result = await pool.query(query, [reference]);
    return result.rows[0];
  }

  static async updateStatus(reference, status) {
    const query = 'UPDATE subscription_transactions SET status = $1 WHERE subscription_id = $2 RETURNING *';
    const result = await pool.query(query, [status, reference]);
    return result.rows[0];
  }

  static async updateSubscriptions(subscriptionData) {
    const { plan, start_date, end_date, user_id } = subscriptionData;
    const query = 'UPDATE subscriptions SET plan = $1, start_date = $2, end_date = $3 WHERE user_id = $4 RETURNING *';
    const result = await pool.query(query, [plan, start_date, end_date, user_id]);
    return result.rows[0];
  }

  static async getAll() {
    const query = 'SELECT * FROM subscription_transactions ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = Payment;
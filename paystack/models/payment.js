const pool = require("../config/database");

class Payment {
  static async create(paymentData) {
    const { amount, status, reference, user_id } = paymentData;
    const query = `
      INSERT INTO subscription_transactions (subscription_id, amount, status, user_id, created_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *
    `;
    const values = [reference, amount, status, user_id];
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

    const connections_remaining = plan === 'Premium' ? 1000000 : plan === 'Standard' ? 22 : plan === 'Basic' ? 11 : 0
    const ad_quota = plan === 'Premium' ? 1000000 : plan === 'Standard' ? 11 : plan === 'Basic' ? 4 : 1
    const query = 'UPDATE subscriptions SET plan = $1, start_date = $2, end_date = $3, connections_remaining = $5, ad_quota = $6 WHERE user_id = $4 RETURNING *';
    const result = await pool.query(query, [plan, start_date, end_date, user_id, connections_remaining, ad_quota]);
    return result.rows[0];
  }

  static async getAll() {
    const query = 'SELECT * FROM subscription_transactions ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = Payment;
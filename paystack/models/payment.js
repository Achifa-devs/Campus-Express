const pool = require("../config/database");

class Payment {
  
  static async createConnect(paymentData) {
    const { amount, no_of_connects, reference, user_id } = paymentData;
    const query = `
      INSERT INTO connects (id connect_id, amount_paid, no_of_connects, user_id, created_at)
      VALUES (DEFAULT, $1, $2, $3, $4, NOW())
      RETURNING *
    `;
    const values = [reference, amount, no_of_connects, user_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async updateConnects(connectData) {
    const { no_of_connects, user_id } = connectData;
    const query = 'UPDATE users SET connects = connects+$1, WHERE user_id = $2 RETURNING *';
    const result = await pool.query(query, [no_of_connects, user_id]);
    return result.rows[0];
  }

  static async findConnectsByReference(reference) {
    const query = 'SELECT * FROM connects WHERE connect_id = $1';
    const result = await pool.query(query, [reference]);
    return result.rows[0];
  }

}

module.exports = Payment;
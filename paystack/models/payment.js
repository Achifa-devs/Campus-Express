const pool = require("../config/database");

class Payment {
  
  static async createConnect(paymentData) {
    const { amount, no_of_connects, reference, user_id } = paymentData;
    const query = `
      INSERT INTO connects (id, connect_id, amount_paid, no_of_connects, user_id, created_at)
      VALUES (DEFAULT, $1, $2, $3, $4, NOW())
      RETURNING *
    `;
    const values = [reference, amount, no_of_connects, user_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async updateConnects(connectData) {
    const { no_of_connects, user_id } = connectData;
    const query = 'UPDATE users SET connects = connects+$1 WHERE user_id = $2 RETURNING *';
    const result = await pool.query(query, [no_of_connects, user_id]);
    return result.rows[0];
  }

  static async findConnectsByReference(reference) {
    const query = 'SELECT * FROM connects WHERE connect_id = $1';
    const result = await pool.query(query, [reference]);
    return result.rows[0];
  }





  static async createTool(paymentData) {
    const { amount, plan, reference, user_id, start_date, end_date } = paymentData;
    const query = `
      INSERT INTO vendor_tools_subscription (id, tool_id, amount_paid, plan, user_id, start_date, end_date, created_at)
      VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, NOW())
      RETURNING *
    `;
    const values = [reference, amount, plan, user_id, start_date, end_date];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async updateTool(toolData) {
    const { plan, user_id } = toolData;
    const query = 'UPDATE shops SET tools = $1 WHERE user_id = $2 RETURNING *';
    const result = await pool.query(query, [plan, user_id]);
    return result.rows[0];
  }

  static async findToolsByReference(reference) {
    const query = 'SELECT * FROM vendor_tools_subscription WHERE tool_id = $1';
    const result = await pool.query(query, [reference]);
    return result.rows[0];
  }















  static async createPromotion(paymentData) {
    const { reference, product_id, duration, plan, amount, user_id, start_date, end_date } = paymentData;
    const query = `
      INSERT INTO promotions (id, promotion_id, product_id, duration, plan, amount_paid, user_id, start_date, end_date, created_at)
      VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, NOW())
      RETURNING *
    `;
    const values = [reference, product_id, duration, plan, amount, user_id, start_date, end_date];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async updatePromotion(promotionData) {
    const { product_id } = promotionData;
    const query = 'UPDATE products SET promotion = $1 WHERE product_id = $2 RETURNING *';
    const result = await pool.query(query, [true, product_id]);
    return result.rows[0];
  }

  static async findPromotionByReference(reference) {
    const query = 'SELECT * FROM promotions WHERE promotion_id = $1';
    const result = await pool.query(query, [reference]);
    return result.rows[0];
  }

}

module.exports = Payment;
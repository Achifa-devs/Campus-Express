const pool =  require('../config/database')
const shortId =  require('short-id')

// Find all products for a user
exports.findProductById = async function ({ product_id }) {
  const {rows} = await pool.query(
    `SELECT * FROM products WHERE product_id = $1`,
    [product_id]
  );
  return rows; // return array
}

// Find all products for a user
exports.findProducts = async function ({ gender,limit }) {
    const {rows} = await pool.query(`
        SELECT *
        FROM products
        WHERE
            ((others ? 'gender' AND others->>'gender' = $1)
            OR NOT (others ? 'gender'))
        LIMIT $2
    `, [gender, limit]);
    return rows; // return array
}

// Find all products type
exports.findProductsByType = async function ({ c_type, gender }) {
  const {rows} = await pool.query(
    `SELECT * FROM products WHERE others->>'cType' = $1 AND ((others ? 'gender' AND others->>'gender' = $2)
    OR NOT (others ? 'gender'))`,
    [c_type, gender]
  );
  return rows; // return array
}

// Find all products search
exports.findProductsBySearchQuery = async function ({ query, gender }) {
  const {rows} = await pool.query(
    `SELECT * FROM products WHERE title ILIKE '%' || $1 || '%' AND ((others ? 'gender' AND others->>'gender' = $2)
    OR NOT (others ? 'gender')) LIMIT 20`,
    [query, gender]
  );
  return rows; // return array
}

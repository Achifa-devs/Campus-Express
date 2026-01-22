import pool from '../db';

// Find product by ID
export async function findProductById({ product_id }) {
  const { rows } = await pool.query(
    `SELECT * FROM products WHERE product_id = $1`,
    [product_id]
  );
  return rows;
}

// Find all products
export async function findProducts({ gender, limit }) {
  const { rows } = await pool.query(
    `SELECT *
     FROM products
     WHERE
       ((others ? 'gender' AND others->>'gender' = $1)
       OR NOT (others ? 'gender'))
     LIMIT $2`,
    [gender, limit]
  );
  return rows;
}

// Find all products by type
export async function findProductsByType({ c_type, gender }) {
  const { rows } = await pool.query(
    `SELECT * FROM products 
     WHERE others->>'cType' = $1 
     AND ((others ? 'gender' AND others->>'gender' = $2)
     OR NOT (others ? 'gender'))`,
    [c_type, gender]
  );
  return rows;
}

// Find products by search query
export async function findProductsBySearchQuery({ query, gender }) {
  const { rows } = await pool.query(
    `SELECT * FROM products 
     WHERE title ILIKE '%' || $1 || '%' 
     AND ((others ? 'gender' AND others->>'gender' = $2)
     OR NOT (others ? 'gender')) 
     LIMIT 20`,
    [query, gender]
  );
  return rows;
}

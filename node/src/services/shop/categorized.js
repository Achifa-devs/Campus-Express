import pool from "../../config/db.js";

// fetch products by category type (cType inside others JSON)
export async function getProductsByCategory({ type }) {
  try {
    const LIMIT = 50; // total products you want to return

    const query = `
      SELECT p.*
      FROM products p
      WHERE (p.others->>'cType') = $1
        AND (p.state->>'state') = 'active'
      ORDER BY 
        (CASE WHEN p.promotion = 'true' THEN 1 ELSE 0 END) DESC,
        p.date DESC
      LIMIT $2
    `;

    const { rows } = await pool.query(query, [type, LIMIT]);
    console.log("rows:", rows.length);

    return rows;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
}

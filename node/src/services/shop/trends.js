import pool from "../../config/db.js";

/**
 * Get dashboard products ordered by promotion first, then newest first
 */
export async function getDashboardProducts({ purpose, campus = null, limit = 50 }) {
  try {
    const { rows } = await pool.query(
      `
      SELECT p.*
      FROM products p
      WHERE (p.state->>'state') = $3
        AND p.purpose = $1
        AND ($2::text IS NULL OR p.campus = $2)
      ORDER BY 
        (CASE WHEN p.promotion = 'true' THEN 1 ELSE 0 END) DESC,
        p.date DESC
      LIMIT $4
      `,
      [
        purpose,
        campus === 'null' ? null : campus === null ? null : campus,
        'active',
        limit
      ]
    );

    return rows;
  } catch (error) {
    console.error("Error fetching dashboard products:", error);
    throw error;
  }
}

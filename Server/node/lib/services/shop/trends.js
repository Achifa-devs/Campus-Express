import pool from "../../config/db.js";

/**
 * Get dashboard products ordered by promotion first, then newest first
 */
export async function getDashboardProducts({
  purpose,
  campus = null,
  limit = 50
}) {
  try {
    const query = `
      SELECT p.*
      FROM products p
      WHERE (p.state->>'state') = $1
        AND p.purpose = $2
        AND ($3::text IS NULL OR p.campus = $3)
      ORDER BY
        -- treat many possible text values as "promoted"
        (CASE WHEN LOWER(COALESCE(p.promotion::text, 'false')) IN ('true','t','1','yes') THEN 1 ELSE 0 END) DESC,
        -- ensure date sorts properly (fallback to epoch if null)
        COALESCE(p.date, '1970-01-01')::timestamptz DESC
      LIMIT $4
    `;
    const params = ['active',
    // $1 -> state
    purpose,
    // $2 -> purpose
    campus === 'null' ? null : campus,
    // $3 -> campus (normalize string 'null')
    limit // $4 -> limit
    ];
    const {
      rows
    } = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.error("Error fetching dashboard products:", error);
    throw error;
  }
}
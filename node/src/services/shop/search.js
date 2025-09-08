import pool from "../../config/db.js";
import shortId from "short-id";

export async function searchProducts({ word, user_id, purpose = null, campus = null, limit = 100 }) {
  const searchTerm = `%${word}%`;

  // 1. Fetch all matching products, promoted first
  const { rows: products } = await pool.query(
    `
    SELECT p.*,
      (CASE 
        WHEN LOWER(COALESCE(p.promotion::text, 'false')) IN ('true','t','1','yes') 
        THEN true ELSE false 
      END) AS is_promoted
    FROM products p
    WHERE (p.title ILIKE $1 OR p.description ILIKE $1)
      AND ($2::text IS NULL OR p.purpose = $2)
      AND ($3::text IS NULL OR p.campus = $3)
      AND (p.state->>'state') = 'active'
    ORDER BY 
      is_promoted DESC,
      COALESCE(p.date, '1970-01-01')::timestamptz DESC
    LIMIT $4
    `,
    [searchTerm, purpose, campus, limit]
  );

  // 2. Track promoted searches
  FilterForsearch(products, user_id, word);

  return products;
}

/**
 * Track search appearances only for promoted products
 */
function FilterForsearch(products, user_id, word) {
  const promoted = products.filter(item => item.is_promoted === true);
  if (promoted.length > 0) {
    promoted.forEach(async (item) => {
      const isNotDuplicate = await checkDuplicates(item, user_id);
      if (isNotDuplicate) {
        await insertSearchAppearance(item, user_id, word);
        await updateSearchAppearances(item);
      }
    });
  }
}

async function checkDuplicates(data, user_id) {
  const { rows } = await pool.query(
    `SELECT 1 FROM search_appearances WHERE product_id = $1 AND user_id = $2`,
    [data?.product_id, user_id]
  );
  return rows.length === 0;
}

async function insertSearchAppearance(item, user_id, word) {
  const result = await pool.query(
    `INSERT INTO search_appearances(id, search_id, user_id, vendor_id, product_id, query, appeared_at) 
     VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)`,
    [
      shortId.generate(10),
      user_id,
      item?.user_id,
      item?.product_id,
      word,
      new Date()
    ]
  );
  return result.rowCount > 0;
}

async function updateSearchAppearances(item) {
  const result = await pool.query(
    `UPDATE products SET search_appearances = search_appearances + 1 WHERE product_id = $1`,
    [item?.product_id]
  );
  return result.rowCount > 0;
}


import pool from "../../config/db.js";

/**
 * Helper to take items with fallback
 */
function takeWithFallback(resultsByTier, tier, count, alreadyPicked) {
  const picked = [];
  const source = resultsByTier[tier] || [];

  for (const product of source) {
    if (picked.length >= count) break;
    if (!alreadyPicked.has(product.id)) {
      picked.push(product);
      alreadyPicked.add(product.id);
    }
  }

  return picked;
}

/**
 * Get dashboard products with distribution + filters (purpose + campus)
 */
export async function getDashboardProducts({ purpose, campus = null, limit = 50 }) {
  try {
    // Distribution percentages
    const distribution = {
      premium: Math.floor(limit * 0.6),  // 60%
      standard: Math.floor(limit * 0.2), // 20%
      basic: Math.floor(limit * 0.15),   // 15%
      free: limit - (
        Math.floor(limit * 0.6) +
        Math.floor(limit * 0.2) +
        Math.floor(limit * 0.15)
      ) // remainder (~5%)
    };

    // Query products with subscription
    const { rows } = await pool.query(
      `
      SELECT p.*, COALESCE(s.plan, 'free') AS plan
      FROM products p
      LEFT JOIN subscriptions s ON p.user_id = s.user_id AND s.is_active = true
      WHERE (p.state->>'state') = $3
        AND p.purpose = $1
        AND ($2::text IS NULL OR p.campus = $2)
      ORDER BY p.date DESC
      `,
      [purpose, campus, 'active']
    );

    // Group products by subscription tier
    const resultsByTier = {
      premium: [],
      standard: [],
      basic: [],
      free: []
    };

    rows.forEach((row) => {
      const tier = row.plan?.toLowerCase();
      if (resultsByTier[tier]) {
        resultsByTier[tier].push(row);
      } else {
        resultsByTier.free.push(row); // unknown → free
      }
    });

    // Pick products with fallback
    const picked = [];
    const alreadyPicked = new Set();

    picked.push(...takeWithFallback(resultsByTier, "premium", distribution.premium, alreadyPicked));
    picked.push(...takeWithFallback(resultsByTier, "standard", distribution.standard, alreadyPicked));
    picked.push(...takeWithFallback(resultsByTier, "basic", distribution.basic, alreadyPicked));
    picked.push(...takeWithFallback(resultsByTier, "free", distribution.free, alreadyPicked));

    // If not enough products picked, fill remaining from all tiers
    if (picked.length < limit) {
      for (const tier of ["premium", "standard", "basic", "free"]) {
        for (const product of resultsByTier[tier]) {
          if (picked.length >= limit) break;
          if (!alreadyPicked.has(product.id)) {
            picked.push(product);
            alreadyPicked.add(product.id);
          }
        }
      }
    }

    return picked;
  } catch (error) {
    console.error("Error fetching dashboard products:", error);
    throw error;
  }
}

import pool from "../../config/db.js";

/**
 * Helper: take with fallback chain (Premium → Standard → Basic → Free)
 */
function takeWithFallbackChain(resultsByTier, preferredTier, count, alreadyPicked) {
  const order = {
    premium: ["premium", "standard", "basic", "free"],
    standard: ["standard", "basic", "free"],
    basic: ["basic", "free"],
    free: ["free"]
  };

  const picked = [];

  for (const tier of order[preferredTier]) {
    if (picked.length >= count) break;

    const source = resultsByTier[tier] || [];
    for (const product of source) {
      if (picked.length >= count) break;
      if (!alreadyPicked.has(product.id)) {
        picked.push(product);
        alreadyPicked.add(product.id);
      }
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
      [purpose, eval(campus), 'active']
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

    // Pick products with proper fallback
    const picked = [];
    const alreadyPicked = new Set();

    picked.push(...takeWithFallbackChain(resultsByTier, "premium", distribution.premium, alreadyPicked));
    picked.push(...takeWithFallbackChain(resultsByTier, "standard", distribution.standard, alreadyPicked));
    picked.push(...takeWithFallbackChain(resultsByTier, "basic", distribution.basic, alreadyPicked));
    picked.push(...takeWithFallbackChain(resultsByTier, "free", distribution.free, alreadyPicked));

    // Final safeguard: if still not enough, fill remaining from any available
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

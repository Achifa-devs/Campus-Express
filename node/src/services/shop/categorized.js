import pool from "../../config/db.js";

// helper to take N items with fallback from other arrays
function takeWithFallback(sourceBuckets, counts) {
  const results = [];
  const shortages = [];

  // First, try to take requested count from each bucket
  counts.forEach((count, i) => {
    const items = sourceBuckets[i].splice(0, count);
    results.push(...items);
    const shortage = count - items.length;
    if (shortage > 0) {
      shortages.push({ shortage, index: i });
    }
  });

  // Fill shortages from lower-tier buckets
  shortages.forEach(({ shortage }) => {
    for (let i = 0; i < sourceBuckets.length && shortage > 0; i++) {
      const items = sourceBuckets[i].splice(0, shortage);
      results.push(...items);
      shortage -= items.length;
    }
  });

  return results;
}

// fetch products by category type (cType inside others JSON)
export async function getProductsByCategory(cType) {
//   const client = await pool.connect();

  try {
    // Distribution: 60% premium, 20% standard, 15% basic, 5% free
    const LIMIT = 50; // total products you want to return
    const premiumCount = Math.round(LIMIT * 0.6);
    const standardCount = Math.round(LIMIT * 0.2);
    const basicCount = Math.round(LIMIT * 0.15);
    const freeCount = LIMIT - (premiumCount + standardCount + basicCount);

    // query all products grouped by vendor subscription
    const query = `
      SELECT p.*, s.plan
      FROM products p
      JOIN subscriptions s ON s.user_id = p.user_id
      WHERE (p.others->>'cType') = $1
      ORDER BY p.created_at DESC
    `;

    const { rows } = await pool.query(query, [cType]);

    // bucket products by subscription plan
    const premium = rows.filter(r => r.plan === "premium");
    const standard = rows.filter(r => r.plan === "standard");
    const basic = rows.filter(r => r.plan === "basic");
    const free = rows.filter(r => r.plan === "free");

    const result = takeWithFallback(
      [premium, standard, basic, free],
      [premiumCount, standardCount, basicCount, freeCount]
    );

    return result;
  } finally {
    client.release();
  }
}

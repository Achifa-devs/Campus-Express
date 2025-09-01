import pool from "../../config/db.js";

// helper to take N items with fallback from other arrays
function takeWithFallback(sourceBuckets, counts) {
  const results = [];

  counts.forEach((count, i) => {
    let needed = count;

    // Try to fill from this bucket first
    let taken = sourceBuckets[i].splice(0, needed);
    results.push(...taken);
    needed -= taken.length;

    // If shortage, fall back to lower buckets one by one
    let j = i + 1;
    while (needed > 0 && j < sourceBuckets.length) {
      let fallback = sourceBuckets[j].splice(0, needed);
      results.push(...fallback);
      needed -= fallback.length;
      j++;
    }
  });

  return results;
}



// fetch products by category type (cType inside others JSON)
export async function getProductsByCategory({ type }) {

  try {
    // Distribution: 60% premium, 20% standard, 15% basic, 5% free
    const LIMIT = 50; // total products you want to return
    const premiumCount = Math.round(LIMIT * 0.6);
    const standardCount = Math.round(LIMIT * 0.2);
    const basicCount = Math.round(LIMIT * 0.15);
    const freeCount = LIMIT - (premiumCount + standardCount + basicCount);

    // query all products grouped by vendor subscription
    const query = `
      SELECT p.*, COALESCE(s.plan, 'free') AS plan
      FROM products p
      LEFT JOIN subscriptions s ON p.user_id = s.user_id AND s.is_active = true
      WHERE (p.others->>'cType') = $1
      ORDER BY p.date DESC
    `;

    const { rows } = await pool.query(query, [type]);
    console.log('rows: ', rows.length)


    // bucket products by subscription plan
    const premium = rows.filter(r => r.plan === "premium");
    const standard = rows.filter(r => r.plan === "standard");
    const basic = rows.filter(r => r.plan === "basic");
    const free = rows.filter(r => r.plan === "free");

    const result = takeWithFallback(
      [premium, standard, basic, free],
      [premiumCount, standardCount, basicCount, freeCount]
    );
    console.log('result: ', result.length)

    return result;
  } catch (error) {
    console.error("Error fetching dashboard products:", error);
    throw error;
  }
}

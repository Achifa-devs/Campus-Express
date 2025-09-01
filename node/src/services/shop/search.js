import pool from "../../config/db.js";
import shortId from "short-id"

export async function searchProducts({ word, user_id, purpose, campus, limit = 100 }) {
  const searchTerm = `%${word}%`;

  // 1. Fetch all matching products + subscription plan
  const result = await pool.query(
    ` 
    SELECT p.*, COALESCE(s.plan, 'free') AS plan
    FROM products p
    LEFT JOIN subscriptions s 
      ON p.user_id = s.user_id 
     AND s.is_active = true
    WHERE p.title ILIKE $1 OR p.description ILIKE $1
    `,
    [searchTerm]
  );

  const products = result.rows;

  // 2. Group results by subscription plan
  const groups = {
    premium: [],
    standard: [],
    basic: [],
    free: []
  };

  FilterForsearch([...products], user_id, word);
  for (let product of products) {
    const tier = product.plan?.toLowerCase();
    if (groups[tier]) {
      groups[tier].push(product);
    } else {
      groups.free.push(product); // fallback to free if unknown
    }
  }

  // 3. Define quotas
  const counts = {
    premium: Math.floor(limit * 0.6),   // 60%
    standard: Math.floor(limit * 0.25), // 25%
    basic: Math.floor(limit * 0.1),     // 10%
    free: limit - (
      Math.floor(limit * 0.6) +
      Math.floor(limit * 0.25) +
      Math.floor(limit * 0.1)
    )
  };

  // 4. Helper with full fallback chain
  function takeWithFallbackChain(groups, preferred, count) {
    const order = {
      premium: ["premium", "standard", "basic", "free"],
      standard: ["standard", "basic", "free"],
      basic: ["basic", "free"],
      free: ["free"]
    };

    const taken = [];
    for (const tier of order[preferred]) {
      if (taken.length >= count) break;
      const available = groups[tier].splice(0, count - taken.length);
      taken.push(...available);
    }
    return taken;
  }

  // 5. Merge results in priority order
  let finalResults = [
    ...takeWithFallbackChain(groups, "premium", counts.premium),
    ...takeWithFallbackChain(groups, "standard", counts.standard),
    ...takeWithFallbackChain(groups, "basic", counts.basic),
    ...takeWithFallbackChain(groups, "free", counts.free),
  ];

  // 6. Final safeguard: if still fewer than limit, top up from any tier
  if (finalResults.length < limit) {
    for (const tier of ["premium", "standard", "basic", "free"]) {
      while (finalResults.length < limit && groups[tier].length > 0) {
        finalResults.push(groups[tier].shift());
      }
    }
  }


  return finalResults;
}

// Example usage:
// (async () => {
//   const results = await searchProducts({ word: "shoes", limit: 50 });
//   console.log(results.length); // should always be <= limit, but filled as much as possible
// })();



function FilterForsearch(res, user_id, word) {
  let data = res.filter(item => item.plan === 'premium' || item.plan === 'standard');
  if(data.length > 0){
    data.map(async(item) => {
      let isNotDuplicate = await checkDuplicates(item, user_id);
      if(isNotDuplicate){
        insertSearchAppearance(item, user_id, word);
      }
    })
  }
}


async function checkDuplicates(data, user_id) {
  const { rows } = await pool.query(`SELECT * FROM search_appearances WHERE product_id = $1 AND user_id = $2`, [
    data?.product_id, 
    user_id
  ]);

  if(!rows.length > 0){
    return true
  }
  return false;
}

async function insertSearchAppearance(item, user_id, word) {
  const { rows } = await pool.query(`INSERT INTO search_appearances(id,search_id,user_id,vendor_id,product_id,query,appeared_at) VALUES(DEFAULT, $1, $2, $3, $4, $5, $6)`, [
    shortId.generate(10),
    user_id,
    item?.user_id,
    item?.product_id,
    word,
    new Date()
  ]);

  if(rows.rowCount> 0){
    return true
  }
  return false;
}
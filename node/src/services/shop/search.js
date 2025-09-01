import pool from "../../config/db.js";


export async function searchProducts({word, purpose, campus, limit = 100}){
  
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

  for (let product of products) {
    if (groups[product.plan]) {
      groups[product.plan].push(product);
    } else {
      groups.free.push(product); // fallback to free if plan unknown
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
    ) // leftover goes to free
  };

  // 4. Fallback-aware selection
  function takeWithFallback(groups, group, count) {
    let taken = groups[group].slice(0, count);
    let shortage = count - taken.length;

    if (shortage > 0) {
      // try to borrow from the next lower tier
      if (group === 'premium') {
        taken = taken.concat(groups.standard.splice(0, shortage));
      } else if (group === 'standard') {
        taken = taken.concat(groups.basic.splice(0, shortage));
      } else if (group === 'basic') {
        taken = taken.concat(groups.free.splice(0, shortage));
      }
      // if free has shortage, we just accept fewer results
    }

    return taken;
  }

  // 5. Merge results in priority order
  const finalResults = [
    ...takeWithFallback(groups, 'premium', counts.premium),
    ...takeWithFallback(groups, 'standard', counts.standard),
    ...takeWithFallback(groups, 'basic', counts.basic),
    ...takeWithFallback(groups, 'free', counts.free),
  ];

  return finalResults;
}

// Example usage:
(async () => {
  const results = await searchProducts("shoes", 50);
  console.log(results);
})();

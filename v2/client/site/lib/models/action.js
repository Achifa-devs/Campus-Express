import pool from '../db';
import shortId from 'short-id';

// Find shop owner by ID
export async function findShopOwnerById({ user_id }) {
  const result = await pool.query(
    `SELECT * FROM users WHERE user_id = $1`,
    [user_id]
  );
  return result.rows;
}

// Find shop reviews by ID
export async function findShopReviewsById({ shop_id }) {
  const result = await pool.query(
    `SELECT * FROM reviews WHERE shop_id = $1`,
    [shop_id]
  );
  return result.rows;
}

// Find shop details by ID
export async function findShopDetailsById({ user_id }) {
  const result = await pool.query(
    `SELECT * FROM shops WHERE user_id = $1`,
    [user_id]
  );
  return result.rows;
}

// Find shop content by ID
export async function findShopContentById({ user_id }) {
  const result = await pool.query(
    `SELECT * FROM products WHERE user_id = $1`,
    [user_id]
  );
  return result.rows;
}

// Create new shop review
export async function createShopReview({
  shop_id,
  product_id,
  buyer_id,
  review,
  date,
  comment,
  rating,
}) {
  const result = await pool.query(
    `INSERT INTO reviews (
      id, shop_id, product_id, buyer_id, review, date, comment, rating
    ) VALUES (
      DEFAULT, $1, $2, $3, $4, $5, $6, $7
    )`,
    [shop_id, product_id, buyer_id, review, date, comment, rating]
  );
  return result.rowCount > 0;
}

// Find favourite by ID
export async function findFavouriteById({ user_id, product_id }) {
  const result = await pool.query(
    `SELECT * FROM favourite WHERE user_id = $1 AND product_id = $2`,
    [user_id, product_id]
  );
  return result.rows;
}

// Find all favourites
export async function findFavourites({ user_id }) {
  const result = await pool.query(
    `SELECT * FROM favourite WHERE user_id = $1`,
    [user_id]
  );
  return result.rows;
}

// Create favourite
export async function createFavourite({ user_id, product_id }) {
  const result = await pool.query(
    `INSERT INTO favourite(
      id, savedItems_id, product_id, date, user_id
    ) VALUES (
      DEFAULT, $1, $2, $3, $4
    )`,
    [shortId.generate(10), product_id, `${new Date()}`, user_id]
  );
  return result.rowCount > 0;
}

// Delete favourite
export async function deleteFavourite({ user_id, product_id }) {
  console.log('Deleting favourite for:', { user_id, product_id });

  try {
    const result = await pool.query(
      `DELETE FROM favourite WHERE user_id = $1 AND product_id = $2`,
      [user_id, product_id]
    );
    return result.rowCount === 1;
  } catch (error) {
    console.error('Error deleting favourite:', error);
    return false;
  }
}

// Find Shop View by ID
export async function findShopViewId({ shop_id, user_id }) {
  const result = await pool.query(
    `SELECT * FROM shop_views WHERE shop_id = $1 AND user_id = $2`,
    [shop_id, user_id]
  );
  return result.rows;
}

export async function createShopView({ shop_id, user_id }) {
  const date = new Date();
  const result = await pool.query(
    `INSERT INTO shop_views (
      id, shop_view_id, shop_id, user_id, date
    ) VALUES (
      DEFAULT, $1, $2, $3, $4
    )`,
    [shortId.generate(), shop_id, user_id, date]
  );
  return result.rowCount;
}

export async function updateShopView({ shop_id }) {
  const result = await pool.query(
    `UPDATE shops set views = views+1 WHERE shop_id = $1`,
    [shop_id]
  );
  return result.rowCount > 0;
}

// Create Contact Click
export async function createContactClick({ product_id, user_id }) {
  const date = new Date();
  const result = await pool.query(
    `INSERT INTO contact_clicks (
      id, click_id, product_id, user_id, date
    ) VALUES (
      DEFAULT, $1, $2, $3, $4
    )`,
    [shortId.generate(), product_id, user_id, date]
  );
  return result.rowCount;
}

// Find Contact Click by ID
export async function findContactClickId({ product_id, user_id }) {
  const result = await pool.query(
    `SELECT * FROM contact_clicks WHERE product_id = $1 AND user_id = $2`,
    [product_id, user_id]
  );
  return result.rows;
}

// Update Contact Click
export async function updateContactClick({ product_id }) {
  const result = await pool.query(
    `UPDATE products set contact_click = contact_click+1 WHERE product_id = $1`,
    [product_id]
  );
  return result.rowCount > 0;
}

export async function updateContactClickForUnknownBuyer({ unknown_user_id, registered_id }) {
  const result = await pool.query(
    `UPDATE contact_clicks set user_id = $1 WHERE user_id = $2`,
    [registered_id, unknown_user_id]
  );
  return result.rowCount > 0;
}

// Find Share by ID
export async function findShareId({ product_id, user_id }) {
  const result = await pool.query(
    `SELECT * FROM shares WHERE product_id = $1 AND user_id = $2`,
    [product_id, user_id]
  );
  return result.rows;
}

export async function createShare({ product_id, user_id }) {
  const date = new Date();
  const result = await pool.query(
    `INSERT INTO shares (
      id, share_id, product_id, user_id, date
    ) VALUES (
      DEFAULT, $1, $2, $3, $4
    )`,
    [shortId.generate(), product_id, user_id, date]
  );
  return result.rowCount;
}

export async function updateShare({ product_id }) {
  const result = await pool.query(
    `UPDATE products set shares = shares+1 WHERE product_id = $1`,
    [product_id]
  );
  return result.rowCount > 0;
}

// Find Impression by ID
export async function findImpressionId({ product_id, user_id }) {
  const result = await pool.query(
    `SELECT * FROM impression WHERE product_id = $1 AND user_id = $2`,
    [product_id, user_id]
  );
  return result.rows;
}

export async function createImpression({ product_id, user_id }) {
  const date = new Date();
  const result = await pool.query(
    `INSERT INTO impression (
      id, impression_id, product_id, user_id, date
    ) VALUES (
      DEFAULT, $1, $2, $3, $4
    )`,
    [shortId.generate(), product_id, user_id, date]
  );
  return result.rowCount;
}

export async function updateImpression({ product_id }) {
  const result = await pool.query(
    `UPDATE products set impression = impression+1 WHERE product_id = $1`,
    [product_id]
  );
  return result.rowCount > 0;
}

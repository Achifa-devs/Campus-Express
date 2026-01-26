const pool =  require('../config/database')

// Find shop owner by ID
exports.findShopOwnerById =  async function ({ user_id }) {
  const result = await pool.query(
    `SELECT * FROM users WHERE user_id = $1`,
    [user_id]
  );
  return result.rows;
};

// Find shop reviews by ID
exports.findShopReviewsById = async function ({ shop_id }) {
  const result = await pool.query(
    `SELECT * FROM reviews WHERE shop_id = $1`,
    [shop_id]
  );
  return result.rows;
};


// Find shop details by ID
exports.findShopDetailsById = async function ({ user_id }) {
  const result = await pool.query(
    `SELECT * FROM shops WHERE user_id = $1`,
    [user_id]
  );
  return result.rows;
};

// Find shop content by ID
exports.findShopContentById = async function ({ user_id }) {
  const result = await pool.query(
    `SELECT * FROM products WHERE user_id = $1`,
    [user_id]
  );
  return result.rows;
};


// Create new shop review
exports.createShopReview = async function ({ shop_id, product_id, buyer_id, review, date, comment, rating }) {
  const result = await pool.query(
    `INSERT INTO reviews (
        id, shop_id, product_id, buyer_id, review, date, comment, rating
    ) VALUES (
        DEFAULT, $1, $2, $3, $4, $5, $6, $7
    )`,
    [
      shop_id, product_id, buyer_id, review, date, comment, rating
    ]
  );
  let response = await errorHandler(result?.rowCount);
  return response;
};


// Find order by ID
exports.findFavouriteById = async function ({ user_id, product_id }) {
    const result = await pool.query(
    `SELECT * FROM favourite WHERE user_id = $1 AND product_id = $2`,
    [user_id, product_id]
    );
  return result.rows;
};

// Find orders
exports.findFavourites = async function ({ user_id }) {
  const result = await pool.query(
    `SELECT * FROM favourite WHERE user_id = $1`,
    [user_id]
  );

  return result.rows;
};

// Create order
exports.createFavourite = async function ({ user_id, product_id }) {
  const result = await pool.query(
    `INSERT INTO favourite(
        id,savedItems_id,product_id ,date ,user_id
    ) VALUES (
        DEFAULT, $1, $2, $3, $4
    )`,
    [shortId.generate(10),product_id,`${new Date()}`,user_id]
    );
    
  let response = await errorHandler(result?.rowCount);
  return response;
};


// deleteOrder
exports.deleteFavourite = async function ({ user_id, product_id }) {
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
exports.findShopViewId = async function ({ shop_id, user_id }) {
  const result = await pool.query(
    `SELECT * FROM shop_views WHERE shop_id = $1 AND user_id = $2`,
    [shop_id, user_id]
  );
  return result.rows;
};

exports.createShopView = async function ({ shop_id, user_id }) {
  let date = new Date();
  const result = await pool.query(
    `INSERT INTO shop_views (
        id, shop_view_id, shop_id, user_id, date
    ) VALUES (
        DEFAULT, $1, $2, $3, $4
    )`,
    [shortId.generate(), shop_id, user_id, date]
  );
    
  return (result?.rowCount);
};

exports.updateShopView = async function ({ shop_id }) {
  const result = await pool.query(
    `UPDATE shops set views = views+1 WHERE shop_id = $1`,
    [shop_id]
  );
  let response = await errorHandler(result?.rowCount);
  return response;
};



// Create Contact Click
exports.createContactClick = async function ({ product_id, user_id }) {
  let date = new Date();
  const result = await pool.query(
    `INSERT INTO contact_clicks (
        id, click_id, product_id, user_id, date
    ) VALUES (
        DEFAULT, $1, $2, $3, $4
    )`,
    [shortId.generate(), product_id, user_id, date]
  );
    
  return (result?.rowCount);
};

// Find Contact Click by ID
exports.findContactClickId = async function ({ product_id, user_id }) {
  const result = await pool.query(
    `SELECT * FROM contact_clicks WHERE product_id = $1 AND user_id = $2`,
    [product_id, user_id]
  );
  return result.rows;
};

// Update Contact Click by ID
exports.updateContactClick = async function ({ product_id }) {
  const result = await pool.query(
    `UPDATE products set contact_click = contact_click+1 WHERE product_id = $1`,
    [product_id]
  );
  let response = await errorHandler(result?.rowCount);
  return response;
};

exports.updateContactClickForUnkownBuyer = async function ({ unknown_user_id, registered_id }) {
  const result = await pool.query(
    `UPDATE contact_clicks set user_id = $1 WHERE user_id = $2`,
    [registered_id, unknown_user_id]
  );
  let response = await errorHandler(result?.rowCount);
  return response;
};



// Find Share by ID
exports.findShareId = async function ({ product_id, user_id }) {
  const result = await pool.query(
    `SELECT * FROM shares WHERE product_id = $1 AND user_id = $2`,
    [product_id, user_id]
  );
  return result.rows;
};

exports.createShare = async function ({ product_id, user_id }) {
  let date = new Date();
  const result = await pool.query(
    `INSERT INTO shares (
        id, share_id, product_id, user_id, date
    ) VALUES (
        DEFAULT, $1, $2, $3, $4
    )`,
    [shortId.generate(), product_id, user_id, date]
  );
    
  return (result?.rowCount);
};

exports.updateShare = async function ({ product_id }) {
  const result = await pool.query(
    `UPDATE products set shares = shares+1 WHERE product_id = $1`,
    [product_id]
  );
  let response = await errorHandler(result?.rowCount);
  return response;
};


// Find Share by ID
exports.findImpressionId = async function ({ product_id, user_id }) {
  const result = await pool.query(
    `SELECT * FROM impression WHERE product_id = $1 AND user_id = $2`,
    [product_id, user_id]
  );
  return result.rows;
};

exports.createImpression = async function ({ product_id, user_id }) {
  let date = new Date();
  const result = await pool.query(
    `INSERT INTO impression (
        id, impression_id, product_id, user_id, date
    ) VALUES (
        DEFAULT, $1, $2, $3, $4
    )`,
    [shortId.generate(), product_id, user_id, date]
  );
    
  return (result?.rowCount);
};

exports.updateImpression = async function ({ product_id }) {
  const result = await pool.query(
    `UPDATE products set impression = impression+1 WHERE product_id = $1`,
    [product_id]
  );
  let response = await errorHandler(result?.rowCount);
  return response;
};




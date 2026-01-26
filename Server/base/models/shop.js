const pool =  require('../config/database')
const shortId =  require('short-id')

// Find shop shipping info
exports.findShopShippingInfoById = async function ({ user_id }) {
  const {rows} = await pool.query(
    `SELECT * FROM shipping WHERE user_id = $1`,
    [user_id]
  );
  return rows;
};

// Create new shipping info
exports.createShopShippingInfo = async function ({ Address1,Address2,Address3,Address4,City,State,Country,user_id }) {
  try {
    const {rowCount} = await pool.query(
      `INSERT INTO shipping (
          id, address1, address2, address3, address4, town, state, country,user_id
      ) VALUES (
          DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8
      )`,
      [
        Address1,Address2,Address3,Address4,City,State,Country,user_id
      ]
    );
    return rowCount > 0;;
  } catch (error) {
    console.error(error);
  }
};

// Update shop shipping info
exports.updateShopShippingInfo = async function ({ Address1,Address2,Address3,Address4,City,State,Country,user_id }) {
  try {
    const {rowCount} = await pool.query(
      `UPDATE shipping set address1 = $1, address2 = $2, address3 = $3, address4 = $4, town = $5, state = $6, country = $7 WHERE user_id = $8`,
      [
        Address1,Address2,Address3,Address4,City,State,Country,user_id
      ]
    );
    return rowCount;
  } catch (error) {
    console.error(error);
  }
};

// Find shop reviews by ID
exports.findShopReviewsById = async function ({ user_id }) {
  const {rows} = await pool.query(
    `SELECT * FROM reviews WHERE user_id = $1`,
    [user_id]
  );
  return rows;
};

// Find shop details by ID
exports.findShopDetailsById = async function ({ user_id }) {
  const {rows} = await pool.query(
    `SELECT * FROM shops WHERE user_id = $1`,
    [user_id]
  );
  return rows;
};

// Create new shop
exports.registerShop = async function ({
  logo = null,
  shopName,
  description,
  address1,
  address2,
  address3,
  user_id
}) {
  try {
    const subscription = {
      plan: "free",
      start_date: new Date(),
      end_date: null,
      updated_at: new Date()
    };

    const shop_id = await shortId.generate(10);
    const created_at = new Date();

    const query = `
      INSERT INTO shops (
        shop_id,
        user_id,
        title,
        category,
        status,
        description,
        logo_url,
        open_hrs,
        social_links,
        is_verified,
        created_at,
        street,
        lodge,
        town,
        views,
        subscription,
        account_data
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9,
        $10, $11, $12, $13, $14, $15, $16, $17
      )
      RETURNING *;
    `;

    const values = [
      shop_id,
      user_id,
      shopName,
      '', // category (optional)
      'active',
      description,
      logo,
      '', // open_hrs (optional)
      '', // social_links (optional)
      false,
      created_at,
      address1,
      address2,
      address3,
      0, // views
      subscription,
      null // account_data
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];

  } catch (error) {
    console.error("Error registering shop:", error);
    throw new Error("Internal server error");
  }
};


// Update shop 
exports.updateShopById = async function ({ user_id, title, description, logo }) {
  try {
    const {rows} = await pool.query(
      `UPDATE shops 
      SET title = $2, description = $3, logo_url = $4
      WHERE user_id = $1 
      RETURNING *`,
      [user_id, title, description, logo]
    );
    return rows[0]; // this gives you the updated item
  } catch (error) {
    console.log(error)
  }
};



// Update shop 
exports.updateShopPaymentById = async function ({ validatedAcct, user_id }) {
  try {
    const {rows} = await pool.query(
      `UPDATE shops 
      SET account_data = $1
      WHERE user_id = $2
      RETURNING *`,
      [JSON.stringify(validatedAcct), user_id]
    );
    return rows[0]; // this gives you the updated item
  } catch (error) {
    console.log(error)
  }
};

// exports. = async function UpdateShopCategory({ user_id }) {
//   try {
//     const result = await pool.query(
//       `UPDATE shops set inventory='${JSON.stringify(inventory)}' WHERE user_id = $1'`,
//       [user_id]
//     );
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// };

// Find product by ID (safe)
exports.findProductById = async function ({ product_id, user_id }) {
  const {rows} = await pool.query(
    `SELECT * FROM products WHERE product_id = $1 AND user_id = $2`,
    [product_id, user_id]
  );
  return rows[0] || null; // return single object or null
}

// Find all products for a user
exports.findProductsById = async function ({ user_id }) {
  const {rows} = await pool.query(
    `SELECT * FROM products WHERE user_id = $1`,
    [user_id]
  );
  return rows; // return array
}

// Create product view
exports.createProductById = async function ({ constantData, dynamicData, shipping_data }) {
  try {
    Object.keys(dynamicData).forEach(key => {
      if (dynamicData[key] === '') {
        delete dynamicData[key];
      }
    });

    const replacedDescription = constantData.description.replace(/'/g, '"');
    const replacedTitle = constantData.title.replace(/'/g, '"');

    const {
      category, price, stock, product_id, user_id, thumbnail_id,
      campus, state, thumbnail_public_id, purpose
    } = constantData;

    if (!dynamicData.lodge_data?.lodge_active) {
      delete dynamicData.lodge_data;
    }

    const date = new Date();

    const {rowCount} = await pool.query(
      `INSERT INTO products(
        id, product_id, user_id, status, title, description, price, promotion,
        category, others, date, state, views, shares, stock, thumbnail_id,
        accept_refund, shipping_range, shipping_duration, campus, uni_state,
        thumbnail_public_id, purpose, contact_click, impression, search_appearances
      ) 
      VALUES(
        DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
        $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25
      )`,
      [
        product_id,
        user_id,
        'unsold',
        replacedTitle,
        replacedDescription,
        price || 0,
        false,
        category,
        JSON.stringify(dynamicData),
        date,
        JSON.stringify({ state: "active", reason: "rent paid" }),
        0,
        0,
        stock || 0,
        thumbnail_id,
        shipping_data?.shipping_policy,
        JSON.stringify(shipping_data?.shipping_range),
        shipping_data?.shipping_duration,
        campus,
        state,
        thumbnail_public_id,
        purpose,
        0,
        0,
        0
      ]
    );

    // ✅ Return true if rowCount === 1, otherwise false
    return rowCount > 0;
  } catch (error) {
    console.error(error);
    return false; // in case of error, return false
  }
}

// DELETE product by ID
exports.deleteProductById = async function ({ product_id }) {
  const {rowCount} = await pool.query(
    `DELETE FROM products WHERE product_id = $1`,
    [product_id]
  );
  return (rowCount) > 0;
}

// exports. = async function deleteProductPromotion({ product_id }) {
//   const result = await pool.query(
//     `DELETE FROM promotions WHERE product_id = $1`,
//     [product_id]
//   );
//   return;
// }

// UPDATE product
exports.updateProductById = async function ({ constantData, dynamicData, shipping_data }) {
  Object.keys(dynamicData).forEach(key => {
    if (dynamicData[key] === '') {
      delete dynamicData[key];
    }
  });

  const replacedDescription = constantData.description.replace(/'/g, '"');
  const replacedTitle = constantData.title.replace(/'/g, '"');

  const {
    category,
    price,
    stock,
    product_id,   // ✅ use consistent naming
    user_id,
    thumbnail_id,
    campus,
    state,
    thumbnail_public_id
  } = constantData;

  if (!dynamicData.lodge_data?.lodge_active) {
    delete dynamicData.lodge_data;
  }

  const date = new Date();

  const {rowCount} = await pool.query(
    `UPDATE products SET 
      status=$1,
      title=$2,
      description=$3,
      price=$4,
      package=$5,
      category=$6,
      others=$7,
      date=$8,
      state=$9,
      views=$10,
      shares=$11,
      stock=$12,
      thumbnail_id=$13,
      accept_refund=$14,
      shipping_range=$15,
      shipping_duration=$16,
      campus=$17,
      uni_state=$18,
      thumbnail_public_id=$19
     WHERE product_id = $20 AND user_id = $21`,
    [
      'unsold',
      replacedTitle,
      replacedDescription,
      price || 0,
      0,
      category,
      JSON.stringify(dynamicData),
      date,
      JSON.stringify({ state: "active", reason: "rent paid" }),
      0,
      0,
      stock || 0,
      thumbnail_id,
      shipping_data?.shipping_policy,
      JSON.stringify(shipping_data?.shipping_range),
      shipping_data?.shipping_duration,
      campus,
      state,
      thumbnail_public_id,
      product_id,  // ✅ aligned
      user_id
    ]
  );

  return rowCount > 0;
}

exports.findShopMetrics = async function ({product_id}) {
    
    const {rows} = await pool.query(
      `
        SELECT 'views' AS source, v.id, v.user_id, u.campus, u.lname, u.fname, u.email, u.phone, v.date::timestamp AS created_at
        FROM views v
        JOIN users u ON v.user_id = u.user_id
        WHERE v.product_id = $1

        UNION ALL

        SELECT 'impression' AS source, i.id, i.user_id, u.campus, u.lname, u.fname, u.email, u.phone, i.date::timestamp AS created_at
        FROM impression i
        JOIN users u ON i.user_id = u.user_id
        WHERE i.product_id = $1

        UNION ALL

        SELECT 'contact_clicks' AS source, c.id, c.user_id, u.campus, u.lname, u.fname, u.email, u.phone, c.date::timestamp AS created_at
        FROM contact_clicks c
        JOIN users u ON c.user_id = u.user_id
        WHERE c.product_id = $1

        UNION ALL

        SELECT 'search_appearances' AS source, s.id, s.user_id, u.campus, u.lname, u.fname, u.email, u.phone, s.appeared_at::timestamp AS created_at
        FROM search_appearances s
        JOIN users u ON s.user_id = u.user_id
        WHERE s.product_id = $1

        UNION ALL

        SELECT 'shares' AS source, sh.id, sh.user_id, u.campus, u.lname, u.fname, u.email, u.phone, sh.date::timestamp AS created_at
        FROM shares sh
        JOIN users u ON sh.user_id = u.user_id
        WHERE sh.product_id = $1

        ORDER BY created_at DESC;
      `,
      [product_id]
    );
    // Return combined data 
    return rows[0]
}
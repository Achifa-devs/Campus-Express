const pool =  require('../config/database')
const shortId =  require('short-id')

// Find all deals for user
exports.findDealsById = async function ({ user_id }) {
  const { rows } = await pool.query(
    `
      SELECT o.*, p.*
      FROM orders o
      JOIN products p ON o.product_id = p.product_id
      WHERE o.user_id = $1;
    `,
    [user_id]
  );
  return rows;
};

// Find a deal for user
exports.findDealById = async function ({ product_id }) {
    const { rows } = await pool.query(
        `
            SELECT o.*, p.*
            FROM orders o
            JOIN products p ON o.product_id = p.product_id
            WHERE o.product_id = $1;
        `,
        [product_id]
    );

    return rows;
}

// Create new deal
exports.createNewDeal = async function ({ buyer, product_id, stock, price, locale, vendor_id, shipping_fee, date }) {
    
    let status = {
        returned: {
            outcome: null,
            completed: false,
            completedAt: null
        },
        shipping: {
            outcome: null,
            completed: false,
            completedAt: null
        },
        cancelled: {
            outcome: null,
            completed: false,
            completedAt: null
        },
        completed: {
            outcome: null,
            completed: false,
            completedAt: null
        },
        delivered: {
            outcome: null,
            completed: false,
            completedAt: null
        },
        processing: {
            outcome: "success",
            completed: true,
            completedAt: date
        }
    }
    const { rows } = await pool.query(
      `
        INSERT INTO orders (
          id, order_id, product_id, status, date, stock, user_id, price, pick_up_channels, havePaid, vendor_id, shipping_fee
        )
        VALUES (
          DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
        )
        RETURNING *;
      `,
      [
        shortId.generate(),              // order_id
        product_id,                      // product_id
        JSON.stringify(status),            // status (should be JSONB column)
        date,                      // date
        stock,                           // stock
        buyer,                           // user_id
        price,                           // price
        locale,                          // pick_up_channels (if JSONB)
        false,                           // havePaid
        vendor_id,                       // vendor_id
        shipping_fee                     // shipping_fee
      ]
    );
    return rows[0]; // return inserted record
};

// Update new deal
exports.updateDealById = async function ({ order_id,status,stock,price,pick_up_channels }) {
    const { rows } = pool.query(
        `   UPDATE orders 
            SET 
            status = $1,
            stock = $2,
            price = $3,
            pick_up_channels = $4
            WHERE order_id = $5
            RETURNING *;
        `,
        [
            status,
            stock,
            price,
            pick_up_channels,
            order_id
        ]
    )

    return rows[0]; // return inserted record
}










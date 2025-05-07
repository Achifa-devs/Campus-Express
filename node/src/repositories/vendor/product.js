// import pool from "../config/db.js"

import pool from "../../config/db.js";
import shortId from "short-id"
import { errorHandler } from "../../utils/erroHandler.js";

// Find product by ID
export async function findProductById({ product_id, user_id }) {
    const result = await pool.query(
    `SELECT * FROM products WHERE product_id = $1 AND user_id = '${user_id}'`,
    [product_id, user_id]
    );
  return result.rows;
};

// Find products
export async function findProducts({ user_id }) {

  const result = await pool.query(
    `SELECT * FROM products WHERE user_id = $1 `
    [user_id]
  );
  return result.rows;
};



// Find product thumnail by ID
export async function findProductsThumbnailById({ product_id }) {
  const result = await pool.query(
    `SELECT thumbnail_id FROM products WHERE product_id = $1`,
    [product_id]
  );
  return result.rows;
};




// Create product view
export async function createProduct({ constantData, dynamicData, shipping_data }) {

    Object.keys(dynamicData).forEach(key => {
        if (dynamicData[key] === '') {
          delete dynamicData[key];
        }
    });

    let replacedDescription = constantData.description.replace(/'/g, '"');
    let replacedTitle = constantData.title.replace(/'/g, '"');

    let {
        category, price, stock, productId, user_id, thumbnail_id, campus, state, thumbnail_public_id
    }=constantData

    
    dynamicData.lodge_data.lodge_active ? '' : delete dynamicData.lodge_data

    let date = new Date();
    
    const result = await pool.query(
        `INSERT INTO products(
            id,
            product_id,
            user_id,
            status,
            title,
            description,
            price,
            package,
            category,
            others,
            date,
            state,
            views,
            shares,
            stock,
            thumbnail_id,
            accept_refund,
            shipping_range,
            shipping_duration,
            campus,
            uni_state,
            thumbnail_public_id
        ) 
        VALUES(
            DEFAULT,
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
        )`,
        [
            productId,
            user_id,
            'unsold',
            replacedTitle,
            replacedDescription,
            price,
            0,
            category,
            JSON.stringify(dynamicData),
            date,
            JSON.stringify({"state": "active",
                "reason": "rent paid"}),
            0,
            0,
            stock,
            thumbnail_id,
            shipping_data?.shipping_policy,
            JSON.stringify(shipping_data?.shipping_range),
            shipping_data?.shipping_duration,
            campus,
            state,
            thumbnail_public_id
        ]
    );
    
  let response = await errorHandler(result?.rowCount);
  return response;
};


// DELETE product view by ID
export async function deleteProduct({ product_id }) {
  const result = await pool.query(
    `DELETE FROM products WHERE product_id = $1`,
    [product_id]
  );
  let response = await errorHandler(result?.rowCount);
  return response;
};


// Update product
export async function updateProduct({ constantData, dynamicData, shipping_data }) {

    Object.keys(dynamicData).forEach(key => {
        if (dynamicData[key] === '') {
          delete dynamicData[key];
        }
    });

    let replacedDescription = constantData.description.replace(/'/g, '"');
    let replacedTitle = constantData.title.replace(/'/g, '"');

    let {
        category, price, stock, productId, user_id, thumbnail_id, campus, state, thumbnail_public_id
    }=constantData

    
    dynamicData.lodge_data.lodge_active ? '' : delete dynamicData.lodge_data

    let date = new Date();
    
    const result = await pool.query(
        `UPDATE products set 
            status=$1,
            title=$2,
            description=$3,
            price=$4,
            package=$5,
            category=$6,
            others=$7,
            date=$8,
            state=$9,
            views=$10
            shares=$11,
            stock=$12,
            thumbnail_id=$13,
            accept_refund=$14,
            shipping_range=$15,
            shipping_duration=$16,
            campus=$17,
            uni_state=$18,
            thumbnail_public_id=$19
            WHERE product_id = $20 AND user_id = $21
        `,
        [
            'unsold',
            replacedTitle,
            replacedDescription,
            price,
            0,
            category,
            JSON.stringify(dynamicData),
            date,
            JSON.stringify({"state": "active",
                "reason": "rent paid"}),
            0,
            0,
            stock,
            thumbnail_id,
            shipping_data?.shipping_policy,
            JSON.stringify(shipping_data?.shipping_range),
            shipping_data?.shipping_duration,
            campus,
            state,
            thumbnail_public_id,
            productId,
            user_id
        ]
    );
    
  let response = await errorHandler(result?.rowCount);
  return response;
};

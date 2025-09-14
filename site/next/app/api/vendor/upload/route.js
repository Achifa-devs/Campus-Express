'use server'
import shortid from 'shortid';
import pool from '../../db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  try {
    const {
      constantData,
      dynamicData,
      shipping_data
    } = await body

  

  
    let {
      category,
      product_id,
      price,
      stock,
      user_id,
      thumbnail_id,
      campus,
      state,
      thumbnail_public_id,
      purpose
    }=constantData

    

    Object.keys(dynamicData).forEach(key => {
        if (dynamicData[key] === '') {
          delete dynamicData[key];
        }
    });

    let replacedDescription = constantData.description.replace(/'/g, '"');
    let replacedTitle = constantData.title.replace(/'/g, '"');

    // Optional cleanup
    if (dynamicData?.lodge_data && !dynamicData.lodge_data.lodge_active) {
      delete dynamicData.lodge_data
    }

    const status = {
      state: 'active',
      reason: 'rent paid',
    }

    const result = await pool.query(
      `
      INSERT INTO products (
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
        thumbnail_public_id,
        purpose
      ) VALUES (
        DEFAULT,
        $1, $2, 'unsold', $3, $4,
        $5, $6, $7, $8, NOW(),
        $9, 0, 0, $10, $11,
        $12, $13, $14, $15, $16, $17, $18
      )
      `,
      [
        product_id,
        user_id,
        replacedTitle,
        replacedDescription,
        price,
        0,
        category,
        JSON.stringify(dynamicData),
        JSON.stringify(status),
        stock,
        thumbnail_id,
        shipping_data?.shipping_policy || null,
        JSON.stringify(shipping_data?.shipping_range || {}),
        shipping_data?.shipping_duration || null,
        campus,
        state,
        thumbnail_public_id,
        purpose
      ]
    )

    if (result.rowCount > 0) {
      return NextResponse.json({ success: result.rowCount > 0 ? true : false}, { status: result.rowCount > 0 ? 200 : 501 });
        
    } else {
      return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 });
      
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ bool: false, message: 'Server error' }, { status: 500 });
    
  }
}

'use server';

import pool from '@/app/api/db';
import { wp } from '@/files/utils.js/whatsapp';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { statusType, order_id, product_id } = body;

    const status = {
      completed: true,
      completedAt: new Date().toISOString(),
      outcome: 'success'
    };

    const query = `
      UPDATE orders 
      SET status = jsonb_set(
        status,
        '{${statusType}}', 
        $2::jsonb,
        true
      )
      WHERE order_id = $1
      RETURNING *;
    `;
    
    const result = await pool.query(query, [order_id, JSON.stringify(status)]);

    // Get user info
    const userRes = await pool.query(
      `SELECT * FROM users WHERE user_id = $1`, 
      [result.rows[0].user_id]
    );

    // Get product info
    const productRes = await pool.query(
      `SELECT * FROM products WHERE product_id = $1`, 
      [product_id]
    );

    let phone = userRes.rows[0].phone;
    let fname = userRes.rows[0].fname;
    console.log('processing whatapp messages')

    // Call WhatsApp utility (make sure wp has the right method!)
    if(statusType === 'processing'){
      await wp.processing(statusType, fname, result.rows[0], productRes.rows[0], `234${phone}`)
    }else if(statusType === 'shipping'){
      await wp.shipping(statusType, fname, result.rows[0], productRes.rows[0], `234${phone}`)
    }else if(statusType === 'delivered'){
      await wp.delivered(statusType, fname, result.rows[0], productRes.rows[0], `234${phone}`)
    }

    
    return NextResponse.json({ 
      message: 'Order updated successfully', 
      success: true, 
      // wp: wp,
      order: result.rows[0]
    }, { status: 201 });

  } catch (err) {
    console.error('Order update error:', err);
    return NextResponse.json({ 
      message: 'Internal Server Error', 
      success: false 
    }, { status: 500 });
  }
}

'use server'

import pool from '@/app/api/db';
import { get_mssg } from '@/app/utils/inbox';
// app/api/og/route.js
import { NextResponse } from 'next/server';


export async function POST(req) {
  try {
    const body = await req.json()
    const { buyer_id, product_id, stock, price, locale, order_id } = body
    const date = new Date()

    const { rowAffected: deletedOrderCount } = await pool.query(
      `DELETE FROM campus_express_buyer_orders WHERE buyer_id=$1 AND product_id=$2`,
      [buyer_id, product_id]
    )


    if (deletedOrderCount > 0) {
      const { rowCount: existingOrderCount } = await pool.query(
        `SELECT * FROM campus_express_buyer_orders WHERE buyer_id=$1 AND product_id=$2`,
        [buyer_id, product_id]
      )
  
      if (existingOrderCount > 0) {
        return NextResponse.json({data: '', bool: true}, { status: 500 });
      }
  
      const { rowCount: insertCount } = await pool.query(
        `INSERT INTO campus_express_buyer_orders(
          id, order_id, product_id, status, date, stock, buyer_id, price, pick_up_channels, havePaid
        ) VALUES (
          DEFAULT, $1, $2, '{"state": "pending"}', $3, $4, $5, $6, $7, false
        )`,
        [order_id, product_id, date, stock, buyer_id, price, JSON.stringify(locale)]
      )
  
      if (insertCount === 0) {
        return NextResponse.json({data: '', bool: false}, { status: 500 })
      }
  
      const mssg_obj = get_mssg('new-order');
      await pool.query(
        `INSERT INTO buyer_inbox (
          id, message_content, subject, created_at, buyer_id, action_id
        ) VALUES (
          DEFAULT, $1, $2, $3, $4, $5
        )`,
        [mssg_obj.mssg, mssg_obj.subject, new Date(), buyer_id, product_id]
      )
  
      return NextResponse.json({data: '', bool: true}, { status: 200 });
    }
    return NextResponse.json({data: '', bool: false}, { status: 500 })

  } catch (err) {
    console.error('Order creation error:', err)
    return NextResponse.json({data: '', bool: false}, { status: 500 })
  }
}

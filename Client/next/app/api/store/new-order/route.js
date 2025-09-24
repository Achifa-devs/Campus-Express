'use server';

import { get_mssg } from '@/app/utils/inbox';
import { NextResponse } from 'next/server';
import shortId from 'shortid';
import pool from '../../db';

export async function POST(req) {
  const client = await pool.connect();
  
  try {
    const body = await req.json();
    const { user_id, product_id, stock, price, locale } = body;
    const date = new Date();
    const order_id = shortId.generate();

    // ✅ Check for existing order
    const { rows } = await client.query(
      `SELECT 1 FROM orders WHERE user_id=$1 AND product_id=$2 LIMIT 1`,
      [user_id, product_id]
    );
    if (rows.length > 0) {
      return NextResponse.json({ message: 'Order already exists', bool: false }, { status: 409 });
    }

    // ✅ Start transaction
    await client.query('BEGIN');

    // ✅ Insert new order
    const insertOrder = await client.query(
      `INSERT INTO orders(
        id, order_id, product_id, status, date, stock, user_id, price, pick_up_channels, havePaid
      ) VALUES (
        DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, false
      ) RETURNING id`,
      [order_id, product_id, JSON.stringify({ state: 'pending' }), date, stock, user_id, price, JSON.stringify(locale)]
    );

    if (insertOrder.rowCount === 0) {
      await client.query('ROLLBACK');
      return NextResponse.json({ message: 'Failed to create order', bool: false }, { status: 500 });
    }

    // ✅ Insert into inbox
    const mssg_obj = get_mssg('new-order');
    await client.query(
      `INSERT INTO buyer_inbox (
        id, message_content, subject, created_at, user_id, action_id
      ) VALUES (DEFAULT, $1, $2, $3, $4, $5)`,
      [mssg_obj.mssg, mssg_obj.subject, new Date(), user_id, product_id]
    );

    await client.query('COMMIT');
    return NextResponse.json({ message: 'Order created successfully', bool: true }, { status: 201 });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Order creation error:', err);
    return NextResponse.json({ message: 'Internal Server Error', bool: false }, { status: 500 });
  } finally {
    client.release(); // ✅ Release connection back to pool
  }
}
 
'use server';

import pool from '@/app/api/db';
import { NextResponse } from 'next/server';
import shortId from 'shortid';
// import pool from '../../db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { user_id, product_id } = body;

    if (!user_id || !product_id) {
      return NextResponse.json(
        { message: 'user_id and product_id are required', success: false },
        { status: 400 }
      );
    }

    const cart_id = shortId.generate();
    const created_at = new Date();

    // ✅ Check if cart item already exists
    const { rows: existing } = await pool.query(
      `SELECT 1 FROM cart WHERE user_id = $1 AND product_id = $2 LIMIT 1`,
      [user_id, product_id]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { message: 'Cart item already exists', success: false },
        { status: 409 }
      );
    }

    // ✅ Insert new cart item
    const { rows } = await pool.query(
      `INSERT INTO cart (id, cart_id, product_id, date, user_id, unit)
       VALUES (DEFAULT, $1, $2, $3, $4, $5)
       RETURNING *`,
      [cart_id, product_id, created_at, user_id, 1]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: 'Failed to create cart', success: false },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Cart created successfully', success: true, cart_item: rows[0] },
      { status: 201 }
    );

  } catch (err) {
    console.error('Cart creation error:', err.message);
    return NextResponse.json(
      { message: 'Internal Server Error', success: false },
      { status: 500 }
    );
  }
}

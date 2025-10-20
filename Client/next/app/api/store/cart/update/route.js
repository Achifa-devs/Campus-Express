'use server';

import pool from '@/app/api/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { cart_id, type } = body;

    if (!cart_id || !type) {
      return NextResponse.json(
        { message: 'cart_id and type are required', success: false },
        { status: 400 }
      );
    }

    let query = '';
    if (type === 'add') {
      query = `UPDATE cart SET unit = unit + 1 WHERE cart_id = $1 RETURNING *`;
    } else if (type === 'reduce') {
      query = `UPDATE cart SET unit = GREATEST(unit - 1, 0) WHERE cart_id = $1 RETURNING *`;
    } else {
      return NextResponse.json(
        { message: 'Invalid type. Use "add" or "reduce".', success: false },
        { status: 400 }
      );
    }

    const { rows } = await pool.query(query, [cart_id]);

    if (rows.length === 0) {
      return NextResponse.json(
        { message: 'Cart item not found', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message:
          type === 'add'
            ? 'Cart quantity increased successfully'
            : 'Cart quantity decreased successfully',
        success: true,
        cart_item: rows[0],
      },
      { status: 200 }
    );

  } catch (err) {
    console.error('Cart update error:', err.message);
    return NextResponse.json(
      { message: 'Internal Server Error', success: false },
      { status: 500 }
    );
  }
}

'use server';

import pool from '@/app/api/db';
import { NextResponse } from 'next/server';
// import pool from '../../db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { cart_id } = body;

    if (!cart_id) {
      return NextResponse.json({ message: 'cart_id is required', success: false }, { status: 400 });
    }

    const deleteCart = await pool.query(
      `DELETE FROM cart WHERE cart_id = $1 RETURNING *`,
      [cart_id]
    );

    if (deleteCart.rowCount === 0) {
      return NextResponse.json({ message: 'Cart item not found', success: false }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Cart deleted successfully', 
      deleted: deleteCart.rows[0],
      success: true 
    }, { status: 200 });

  } catch (err) {
    console.error('Cart deletion error:', err.message);
    return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });
  }
}

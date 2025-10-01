'use server'
import { NextResponse } from 'next/server';
import pool from '../../db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url, 'http://localhost:3000'); // fallback for local
    const user_id = searchParams.get('user_id');

    if (!user_id) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const res = await pool.query(
      `SELECT * FROM shops WHERE user_id = $1`,
      [user_id]
    );

    return NextResponse.json(
      { success: res?.rows?.length > 0, shop: res?.rows[0] },
      { status: 200 }
    );

  } catch (err) {
    console.error('Error getting shop:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

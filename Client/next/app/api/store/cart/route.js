'use server';

import { NextResponse } from 'next/server';
import pool from '../../db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json({ error: "user_id is required" }, { status: 400 });
    }

    const result = await pool.query(
      `SELECT c.*, p.*
       FROM cart c
       JOIN products p ON c.product_id = p.product_id
       WHERE c.user_id = $1`,
      [user_id]
    );

    return NextResponse.json({ data: result.rows, success: true }, { status: 200 });

  } catch (error) {
    console.error("Error fetching cart:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

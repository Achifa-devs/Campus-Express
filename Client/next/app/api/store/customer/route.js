import { NextResponse } from 'next/server';
import pool from '../../db';

export const runtime = "nodejs"; // ensure Node runtime, not Edge

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url, 'http://localhost:3000');
    const user_id = searchParams.get('user_id');

    if (!user_id) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `SELECT * FROM users WHERE user_id = $1`,
      [user_id]
    );


    return NextResponse.json(
      { data: result.rows[0], success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

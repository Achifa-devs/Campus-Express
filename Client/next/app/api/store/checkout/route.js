import { NextResponse } from 'next/server';
import pool from '../../db';

export const runtime = "nodejs"; // ensure Node runtime, not Edge

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url, 'http://localhost:3000');
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.json(
        { success: false, message: "reference id is required" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `SELECT * FROM transactions WHERE reference = $1`,
      [reference]
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

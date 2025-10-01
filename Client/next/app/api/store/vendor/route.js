import { NextResponse } from 'next/server';
import pool from '../../db'; // Ensure this uses a shared pool instance

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get('user_id');

    if (!user_id) {
      return NextResponse.json({ message: "Missing user_id", success: false }, { status: 400 });
    }

    const result = await pool.query(
      'SELECT * FROM users WHERE user_id = $1 LIMIT 1',
      [user_id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    }

    return NextResponse.json({ data: result.rows[0], success: true }, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({
      message: "An error occurred while fetching user",
      success: false
    }, { status: 500 });
  }
}

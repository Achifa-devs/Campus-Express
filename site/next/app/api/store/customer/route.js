import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import pool from '../../db';

export async function GET(req) {

  try {
    const searchParams = new URL(req.url).searchParams;
    let user_id = searchParams.get('user_id');

    const result = await pool.query(
      `SELECT * FROM users WHERE user_id = $1`,
      [user_id]
    );

    return NextResponse.json({data: result.rows[0], bool: true}, { status: 200 });

  } catch (error) {
    console.log(error)
    return NextResponse.json({
      Mssg: "An error occurred ",
      bool: false
    }, { status: 500 });
  }
}

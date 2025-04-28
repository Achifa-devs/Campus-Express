import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../../db';

export async function GET(req) {

  try {
    const searchParams = new URL(req.url).searchParams;
    let buyer_id = searchParams.get('buyer_id');

    const result = await pool.query(
      `SELECT * FROM campus_buyers WHERE buyer_id = $1`,
      [buyer_id]
    );

    return NextResponse.json({data: result.rows[0], bool: true}, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      Mssg: "An error occurred ",
      bool: false
    }, { status: 500 });
  }
}

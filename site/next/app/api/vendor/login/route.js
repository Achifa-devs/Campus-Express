import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../../db';

export async function POST(req) {
  try {
    const { email, pwd } = await req.json();
    console.log(email)
    const result = await pool.query(
      `SELECT id FROM campus_sellers WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({
        message: "Email is not registered",
        success: false
      }, { status: 400 });
    }

    const sellerId = result.rows[0].id;

    const userResult = await pool.query(
      `SELECT seller_id, email, password, fname, lname, gender, state, campus, phone FROM campus_sellers WHERE id = $1`,
      [sellerId]
    );

    const user = userResult.rows[0];
    const passwordMatch = await bcrypt.compare(pwd, user.password);

    if (!passwordMatch) {
      return NextResponse.json({
        message: "Invalid password",
        success: false
      }, { status: 400 });
    }

    // Create token
    const token = jwt.sign(
      { id: user.seller_id },
      'kdiU$28Fs!9shF&2xZpD3Q#1gLx@R7TkWzPq',
      { expiresIn: '7d' }
    );

    // Set cookie (optional)
    cookies().set('seller_secret', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return NextResponse.json({
      success: true,
      user,
      cookie: token
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      message: "An error occurred during login",
      success: false
    }, { status: 500 });
  }
}

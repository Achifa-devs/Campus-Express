// app/api/register/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import shortId from 'shortid';
import pool from '../../db';
import { createToken } from '../../auth';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    const body = await req.json();
    const { fname, lname, email, phone, pwd, state, campus, gender } = body;

    const date = new Date().toLocaleString();
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const buyer_id = `CE-${shortId.generate()}`;

    // Check if email already exists
    const emailCheck = await pool.query(
      'SELECT COUNT(*) FROM campus_buyers WHERE email = $1',
      [email]
    );
    if (parseInt(emailCheck.rows[0].count) > 0) {
      return NextResponse.json({ bool: false, message: 'Email already exists' }, { status: 400 });
    }

    // Check if phone already exists
    const phoneCheck = await pool.query(
      'SELECT COUNT(*) FROM campus_buyers WHERE phone = $1',
      [phone]
    );
    if (parseInt(phoneCheck.rows[0].count) > 0) {
      return NextResponse.json({ bool: false, message: 'Phone already exists' }, { status: 400 });
    }

    // Insert buyer
    const insertbuyer = await pool.query(
      `INSERT INTO campus_buyers (
        id, fname, lname, buyer_id, email, phone, password, state,
        campus, isActive, isVerified, isEmailVerified, isPhoneVerified,
        date, gender
      ) VALUES (
        DEFAULT, $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13, $14
      )`,
      [
        fname, lname, buyer_id, email, phone, hashedPwd, state, campus,
        false, false, false, false, date, gender
      ]
    );

    // Insert empty coverphoto row
    await pool.query(
      `INSERT INTO coverphoto (id, file, user_id, date)
       VALUES (DEFAULT, $1, $2, $3)`,
      ['null', buyer_id, new Date()]
    );

    // Create JWT and Set Secure Cookie
    const token = createToken({ id: buyer_id }, 'kdiU$28Fs!9shF&2xZpD3Q#1gLx@R7TkWzPq');

    cookies().set('buyer_secret', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ bool: true, id: buyer_id }, { status: 200 });

  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json({ bool: false, message: 'Something went wrong' }, { status: 500 });
  }
}
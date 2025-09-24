'use server'
import pool from '../../db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { user_id } = body;

    const res = await pool.query(`SELECT * FROM users WHERE user_id='${user_id}'`);
    return NextResponse.json({ bool: true, user: res?.rows[0] }, { status: 200 });

  } catch (err) {
    console.error('Error getting seller:', err);
    return NextResponse.json({ bool: false, message: 'Something went wrong' }, { status: 500 });
  }
}





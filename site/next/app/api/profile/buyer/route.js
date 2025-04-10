'use server'
import pool from '../../db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { buyer_id } = body;

    const res = await pool.query(`SELECT * FROM campus_buyers WHERE buyer_id='${buyer_id}'`);
    return NextResponse.json({ bool: true, user: res?.rows[0] }, { status: 200 });

  } catch (err) {
    console.error('Error getting buyer:', err);
    return NextResponse.json({ bool: false, message: 'Something went wrong' }, { status: 500 });
  }
}





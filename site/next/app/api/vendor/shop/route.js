'use server'
import pool from '../../db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { seller_id } = body;
    console.log(seller_id)

    const res = await pool.query(`SELECT * FROM campus_shops WHERE seller_id='${seller_id}'`);
    return NextResponse.json({ bool: res?.rows?.length > 0 ? true : false, shop: res?.rows[0] }, { status: 200 });

  } catch (err) {
    console.error('Error getting shop:', err);
    return NextResponse.json({ bool: false, message: 'Something went wrong' }, { status: 500 });
  }
}





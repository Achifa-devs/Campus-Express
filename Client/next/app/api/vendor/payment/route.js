'use server'
import pool from '../../db';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const user_id = searchParams.get("user_id");
        const res = await pool.query(`SELECT * FROM payment WHERE user_id='${user_id}'`);
        return NextResponse.json({ bool: res?.rows?.length > 0 ? true : false, data: res?.rows[0]}, { status: 200 });

  } catch (err) {
    console.error('Error getting seller:', err);
    return NextResponse.json({ bool: false, message: 'Something went wrong' }, { status: 500 });
  }
}





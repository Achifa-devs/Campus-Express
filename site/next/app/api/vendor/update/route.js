'use server'
import pool from '../../db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const { user_id, title } = body;

        const res = await pool.query(`UPDATE shopss set title = '${title}' WHERE user_id='${user_id}'`);
        return NextResponse.json({ bool: res?.rowCount > 0 ? true : false }, { status: 200 });

  } catch (err) {
    console.error('Error getting seller:', err);
    return NextResponse.json({ bool: false, message: 'Something went wrong' }, { status: 500 });
  }
}





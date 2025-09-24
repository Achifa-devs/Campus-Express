'use server'

import pool from '../../db';
import { NextResponse } from 'next/server';
// import pool from '../db';

// export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  

  if (searchParams.get('user_id')) {
    const user_id = searchParams.get('user_id') || 'Default Product';
    const res = await pool.query(`SELECT * FROM products WHERE user_id='${user_id}'`);
    return NextResponse.json({bool: true, data: res.rows});
  }

}




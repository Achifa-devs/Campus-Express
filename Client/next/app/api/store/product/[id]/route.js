'use server'

import pool from '@/app/api/db';
// app/api/og/route.js
import { ImageResponse } from 'next/og';
import { NextResponse } from 'next/server';
// import pool from '../db';

// export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') || 'Default Product';
  const res = await pool.query(`SELECT * FROM products WHERE product_id='${slug}'`);
  return NextResponse.json(res.rows[0]);

}




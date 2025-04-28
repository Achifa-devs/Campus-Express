'use server'

import pool from '@/app/api/db';
// app/api/og/route.js
import { NextResponse } from 'next/server';
// import pool from '../db';

// export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  

  if (searchParams.get('slug')) {
    const slug = searchParams.get('slug') || 'Default Product';
    const res = await pool.query(`SELECT * FROM seller_shop WHERE product_id='${slug}'`);

    return NextResponse.json({data: res.rows[0], bool: true}, { status: 200 });

  }

}




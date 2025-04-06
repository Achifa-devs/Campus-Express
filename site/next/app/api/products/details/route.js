'use server'

// app/api/og/route.js
import { ImageResponse } from 'next/og';
import pool from '../../db';
import { NextResponse } from 'next/server';
// import pool from '../db';

// export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  

  if (searchParams.get('slug')) {
    const title = searchParams.get('slug') || 'Default Product';
    const res = await pool.query(`SELECT * FROM seller_shop WHERE product_id='${title}'`);
    let result = res?.rows ? NextResponse.json(res.rows[0]) : ''
    return result
  }

}




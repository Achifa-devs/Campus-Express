'use server'

import pool from '../../db';
import { NextResponse } from 'next/server';
// import pool from '../db';

// export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  

  if (searchParams.get('seller_id')) {
    const seller_id = searchParams.get('seller_id') || 'Default Product';
    const res = await pool.query(`SELECT * FROM seller_shop WHERE seller_id='${seller_id}'`);
    return NextResponse.json({bool: true, data: res.rows});
  }

}




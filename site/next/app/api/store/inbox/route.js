'use server'

import {
  NextResponse
} from 'next/server';
import pool from '../../db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');
    const result = await pool.query(`SELECT * FROM buyer_inbox WHERE user_id = $1`, [user_id]);
  
    return NextResponse.json({data: result.rows, bool: true}, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ bool: false, data: '' }, { status: 500 });
  }

}




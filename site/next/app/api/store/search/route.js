'use server'

import {
  NextResponse
} from 'next/server';
import pool from '../../db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const word = searchParams.get('word');

    const result = await pool.query(`SELECT * FROM products`);
  
    const list = result.rows;
    const filteredList = list.filter(item => item.title.toLowerCase().indexOf(word.toLowerCase()) > -1);
    return NextResponse.json({data: filteredList, bool: true}, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ bool: false, data: '' }, { status: 500 });
  }

}




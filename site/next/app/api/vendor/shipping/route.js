'use server'
import pool from '../../db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const seller_id = searchParams.get("seller_id");
    console.log(seller_id)

    const shipping_response = await pool.query(`SELECT * FROM shipping WHERE seller_id='${seller_id}'`);
    // const return_response = await pool.query(`SELECT * FROM return WHERE seller_id='${seller_id}'`);
    
    return NextResponse.json({ bool: shipping_response?.rows?.length > 0 ? true : false, data: {shipping_response: shipping_response?.rows} }, { status: 200 });

  } catch (err) {
    console.error('Error getting seller:', err);
    return NextResponse.json({ bool: false, message: 'Something went wrong' }, { status: 500 });
  }
}





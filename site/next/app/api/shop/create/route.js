'use server'
import shortid from 'shortid';
import pool from '../../db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
      const { seller_id,title } = body;
      let shop_id = shortid.generate()

    const res = await pool.query(`INSERT INTO campus_shops(id,shop_id,seller_id,title,category,status,description,logo_url,open_hrs,social_links,is_verified,created_at,updated_at) values(DEFAULT,'${shop_id}','${seller_id}','${title}','','active','','','','',${false},'${new Date()}','${new Date()}')`);
    return NextResponse.json({ bool: res.rowCount > 0 ? true : false}, { status: res.rowCount > 0 ? 200 : 501 });

  } catch (err) {
    console.error('Error getting seller:', err);
    return NextResponse.json({ bool: false, message: 'Something went wrong' }, { status: 500 });
  }
}





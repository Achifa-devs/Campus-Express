'use server'
import shortid from 'shortid';
import pool from '../../db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { 
      logo,
      name,
      summary,
      address1,
      address2,
      address3,
      user_id
    } = body;
    let shop_id = shortid.generate()

    const res = await pool.query(`INSERT INTO shops(
        id,shop_id,user_id,title,category,status,description,logo_url,open_hrs,social_links,is_verified,created_at,town,street,lodge
      ) VALUES (
        DEFAULT,
        '${shortid.generate(10)}', '${user_id}', '${name}', '', 'active', '${summary}', '${logo}', '', '', ${false}, '${new Date()}', '${address1}', '${address2}', '${address3}'
      )`
    );
    return NextResponse.json({ bool: res.rowCount > 0 ? true : false}, { status: res.rowCount > 0 ? 200 : 501 });

  } catch (err) {
    console.error('Error creating shop:', err);
    return NextResponse.json({ bool: false, message: 'Something went wrong' }, { status: 500 });
  }
}





// app/api/register/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import shortId from 'shortid';
import pool from '../../db';
import { createToken } from '../../auth';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    const body = await req.json();
    const { product_id, user_id } = body;
    const view_id = shortId.generate()

    const date = new Date().toLocaleString();

    const countView = await pool.query(
      `SELECT * FROM "views" WHERE product_id = $1 AND user_id = $2`, 
      [product_id, user_id]
    )

   if (countView.rows.length == 0 ) {
      // Insert new view
      await pool.query(
        `INSERT INTO views(
          id, $1, $2, $3, $4
        ) values(
          DEFAULT, '${view_id}', '${product_id}', '${user_id}', '${date}'
        )`,
        [
          view_id, product_id, user_id, date
        ]
      );
  
      const updateView = await pool.query(
        `UPDATE products SET views = views+1 WHERE product_id = $1`, 
        [product_id]
      )
      if (updateView.rowCount > 0) {
        return NextResponse.json({ bool: true}, { status: 200 });
        
      }
      // return NextResponse.json({ bool: true}, { status: 200 });

    }

    return NextResponse.json({ bool: true}, { status: 200 });

  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json({ bool: false, message: 'Something went wrong' }, { status: 500 });
  }
}
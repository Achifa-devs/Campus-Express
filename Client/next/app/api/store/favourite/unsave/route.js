'use server'

import pool from '@/app/api/db';
import { NextResponse } from 'next/server';
// import pool from '../../db';

export async function DELETE(req) {
  try {
    // Extract user_id from the request query parameters
    const { searchParams } = new URL(req.url);
    const saved_id = searchParams.get("saved_id");
    const user_id = searchParams.get("user_id");
  

    if (!saved_id) {
      return NextResponse.json({ error: "saved_id is required" }, { status: 400 });
    }

    // Delete favourite for the buyer
    const unsaveResult = await pool.query(
      `DELETE FROM "favourite" WHERE saveditems_id = $1`,
      [saved_id]
    );

    // If no favourites found
    if (unsaveResult.rowCount === 0) {
      return NextResponse.json({success: false}, { status: 400 });
    }

    const data = await pool.query(`SELECT * FROM favourite WHERE user_id = $1`, [user_id])
    if (data.rows.length === 0) {
      return NextResponse.json({ success: true, data: [] })
    }

    const favourites = data.rows.map(async(favourite) => {
    const productRes = await pool.query(`
      SELECT * FROM products WHERE product_id = $1
    `, [favourite.product_id])
      return { saved_item: favourite, product: productRes.rows[0] || null };
    })
    const response = await Promise.all(favourites);

    return NextResponse.json({data: response, success: true}, { status: 200 });

  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}




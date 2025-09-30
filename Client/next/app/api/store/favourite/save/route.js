import pool from "@/app/api/db";
import { NextResponse } from "next/server";
import shortid from "shortid";

export async function POST(req) {

  const body = await req.json();
  const { user_id, product_id } = body;
  try {
    // Extract user_id and product_id from the request body

    if (!user_id || !product_id) {
      return NextResponse.json({ error: "user_id and product_id are required" }, { status: 400 });
    }

    // Insert favourite for the buyer
    const saveResult = await pool.query(
      `INSERT INTO "favourite" (id,saveditems_id,product_id,date,user_id) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *`,
      [shortid.generate(),product_id,new Date(), user_id]
    );

    if (saveResult.rows === 0) {
      return NextResponse.json({ bool: false }, { status: 400 });
    }

    const data = await pool.query(`SELECT * FROM favourite WHERE user_id = $1`, [user_id])
    if (data.rows.length === 0) {
      return NextResponse.json({ bool: true, data: [] })
    }

    const favourites = data.rows.map(async(favourite) => {
    const productRes = await pool.query(`
      SELECT * FROM products WHERE product_id = $1
    `, [favourite.product_id])
      return { saved_item: favourite, product: productRes.rows[0] || null };
    })
    const response = await Promise.all(favourites);

    return NextResponse.json({data: response, bool: true}, { status: 200 });

  } catch (error) {
    console.error("Error saving favourite:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

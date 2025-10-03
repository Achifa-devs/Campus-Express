import { wp } from "@/files/utils.js/whatsapp";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { status, buyerName, order, product, buyer_locale } = body;

    const res = await pool.query(
      `SELECT * from users WHERE user_id = $1`, [product.user_id]
    )

    const result = await wp.pending(status, buyerName, res.rows[0].fname, order, product, res.rows[0].phone, buyer_locale);
    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

'use server'

// app/api/og/route.js
import { ImageResponse } from 'next/og';
import pool from '../../db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // Extract buyer_id from the request query parameters
    const { searchParams } = new URL(req.url);
    const buyer_id = searchParams.get("buyer_id");
    const product_id = searchParams.get("product_id");

    if (!buyer_id || !product_id) {
      return NextResponse.json({ error: "id(s) is required" }, { status: 400 });
    }

    // Fetch orders for the buyer
    const ordersResult = await pool.query(
      `SELECT * FROM "campus_express_buyer_orders" WHERE buyer_id = $1 AND product_id = $2`,
      [buyer_id, product_id]
    );
    const order = ordersResult.rows;

    // If no orders found
    if (order.length === 0) {
      return NextResponse.json([]);
    }

    // Fetch product details for each order
    const productPromises = order.map(async (order) => {
      const productResult = await pool.query(
        `SELECT * FROM "seller_shop" WHERE product_id = $1`,
        [order.product_id]
      );
      return { order, product: productResult.rows[0] || null };
    });

    const response = await Promise.all(productPromises);

    return NextResponse.json({data: response[0], bool: true}, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}




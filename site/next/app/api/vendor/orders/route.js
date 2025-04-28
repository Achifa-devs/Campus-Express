'use server'

import pool from '../../db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // Extract seller_id from the request query parameters
    const { searchParams } = new URL(req.url);
    const seller_id = searchParams.get("seller_id");

    if (!seller_id) {
      return NextResponse.json({ error: "seller_id is required" }, { status: 400 });
    }

    const productResult = await pool.query(
    `SELECT * FROM "seller_shop" WHERE seller_id = $1`,
      [seller_id]
    )

    
    const products = productResult.rows;

    // If no orders found
    if (products.length === 0) {
      return NextResponse.json([]);
    }

    // Fetch product details for each order
    const productPromises = products.map(async (product) => {
      const ordersResult = await pool.query(
      `SELECT * FROM "campus_express_buyer_orders" WHERE product_id = $1`,
      [product?.product_id]
      );
      return { product, order: ordersResult.rows[0] || null };
    });

    const response = await Promise.all(productPromises);

    return NextResponse.json({data: response, bool: true}, { status: 200 });

  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}




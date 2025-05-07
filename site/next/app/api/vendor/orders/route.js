'use server'

import pool from '../../db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // Extract user_id from the request query parameters
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json({ error: "user_id is required" }, { status: 400 });
    }

    const productResult = await pool.query(
    `SELECT * FROM "products" WHERE user_id = $1`,
      [user_id]
    )

    
    const products = productResult.rows;

    // If no orders found
    if (products.length === 0) {
      return NextResponse.json([]);
    }

    // Fetch product details for each order
    const productPromises = products.map(async (product) => {
      const ordersResult = await pool.query(
      `SELECT * FROM "orders" WHERE product_id = $1`,
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




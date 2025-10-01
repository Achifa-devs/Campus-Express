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

    const orderResult = await pool.query(
    `SELECT * FROM "orders" WHERE vendor_id = $1`,
      [user_id]
    )

    
    const orders = orderResult.rows;

    // If no orders found
    if (orders.length === 0) {
      return NextResponse.json([]);
    }

    // Fetch order details for each order
    const orderPromises = orders.map(async (order) => {
      const productsResult = await pool.query(
      `SELECT * FROM "products" WHERE product_id = $1`,
      [order?.product_id]
      );
      return { order, product: productsResult.rows[0] || null };
    });

    const response = await Promise.all(orderPromises);

    return NextResponse.json({data: response, success: true}, { status: 200 });

  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}




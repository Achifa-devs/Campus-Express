'use server'

import pool from '@/app/api/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // Extract user_id from the request query parameters
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json({ error: "id(s) is required" }, { status: 400 });
    }

    // Fetch delivered orders for the buyer
    const ordersResult = await pool.query(
      `
        SELECT *
        FROM orders
        WHERE user_id = $1
          AND (status->'delivered') IS NOT NULL
          AND (status->'delivered'->>'completed')::boolean = true
          AND status->'delivered'->>'outcome' = 'success';
      `,
      [user_id]
    );

    const orders = ordersResult.rows;

    if (orders.length === 0) {
      return NextResponse.json({ success: false, message: "No delivered orders found" });
    }

    // Get product(s) for those orders
    const productIds = orders.map(o => o.product_id);
    const prodRes = await pool.query(
      `SELECT * FROM products WHERE product_id = $1`, 
      [productIds[0]]
    );

    return NextResponse.json(
      { data: prodRes.rows[0], success: true },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

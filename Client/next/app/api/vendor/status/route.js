'use server';

import pool from '@/app/api/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { statusType, order_id } = body;

    const status = {
      completed: true,
      completedAt: new Date().toISOString(),
      outcome: 'success'
    };

    const query = `
      UPDATE orders 
      SET status = jsonb_set(
        status,
        '{${statusType}}', 
        $2::jsonb,
        true
      )
      WHERE order_id = $1
      RETURNING *;
    `;
    
    const result = await pool.query(query, [order_id, JSON.stringify(status)]);
    return NextResponse.json({ 
      message: 'Order updated successfully', 
      success: true, 
      order: result.rows[0] 
    }, { status: 201 });

  } catch (err) {
    console.error('Order update error:', err);
    return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });
  }
}

'use server';

import pool from '@/app/api/db';
import { wp } from '@/files/utils.js/whatsapp';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { statusType, product_id, user_id, reason = "Empty cart" } = body;

    const status = {
      completed: true,
      completedAt: new Date().toISOString(),
      outcome: statusType === 'rejected' ? 'failure' : 'success'
    };

    // Update order with correct statusType key
    const query = `
      UPDATE orders 
      SET status = jsonb_set(status, '{completed}', $2::jsonb, true)
      WHERE product_id = $1
      AND user_id = $3
      RETURNING *;
    `;

    const result = await pool.query(query, [product_id, JSON.stringify(status), user_id]);
    const order = result.rows[0];

    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    // Fetch user & product
    const userRes = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id]);
    const productRes = await pool.query(`SELECT * FROM products WHERE product_id = $1`, [product_id]);

    const user = userRes.rows[0];
    const product = productRes.rows[0];

    let phone = user.phone.startsWith('0') ? `234${user.phone.slice(1)}` : `234${user.phone}`;
    let fname = user.fname;

    // Vendor info
    const vendorRes = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [order.vendor_id]);
    const vendor = vendorRes.rows[0];

    if (statusType === 'rejected') {
      // Insert refund
      await pool.query(
        `INSERT INTO refunds (order_id, product_id, price, reason, date, is_refunded, fee) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          order.order_id,
          product_id,
          parseInt(product.price) - parseInt(order.shipping_fee),
          reason,
          new Date().toISOString(),
          false,
          0
        ]
      );

      // Notify vendor + buyer
      await wp.rejected(statusType, fname, order, product, phone, vendor, reason);
    } else {
      // Call the correct status handler
      const statusHandlers = {
        processing: wp.processing,
        shipping: wp.shipping,
        delivered: wp.delivered,
        completed: wp.completed
      };

      if (statusHandlers[statusType]) {
        await statusHandlers[statusType](statusType, fname, order, product, phone, vendor);
      }
    }

    return NextResponse.json({ 
      message: 'Order updated successfully', 
      success: true, 
      order 
    }, { status: 201 });

  } catch (err) {
    console.error('Order update error:', err);
    return NextResponse.json({ 
      message: 'Internal Server Error', 
      success: false 
    }, { status: 500 });
  }
}

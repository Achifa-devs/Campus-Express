import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import pool from '../../db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const seller_id = searchParams.get('seller_id');

  if (!seller_id) {
    return NextResponse.json({ error: 'Missing seller_id' }, { status: 400 });
  }

  try {

    const sellerShopRes = await pool.query(
      'SELECT * FROM seller_shop WHERE seller_id = $1',
      [seller_id]
    );
    const sellerShops = sellerShopRes.rows;

    const getOrders = async (item) => {
      try {
        const orderRes = await pool.query(
          'SELECT * FROM campus_express_buyer_orders WHERE product_id = $1',
          [item.product_id]
        );

        if (orderRes.rows.length > 0) {
          return { order: orderRes.rows[0], product: item };
        }

        return null;
      } catch (err) {
        console.error('Error fetching order:', err);
        return null;
      }
    };

    const mappedOrders = await Promise.all(
      sellerShops.map((item) => getOrders(item))
    );

    const filteredOrders = mappedOrders.filter((item) => item !== null);
    
      
    const reports = await pool.query(
      'SELECT * FROM reports WHERE seller_id = $1',
      [seller_id]
    );
    
    const reviews = await pool.query(
      'SELECT * FROM reviews WHERE seller_id = $1',
      [seller_id]
    );
    
    const earnings = await pool.query(
      'SELECT * FROM seller_earnings WHERE seller_id = $1',
      [seller_id]
    );

    return NextResponse.json({orders: filteredOrders, reviews, reports, earnings}, { status: 200 });
  } catch (err) {
    console.error('DB Error:', err);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
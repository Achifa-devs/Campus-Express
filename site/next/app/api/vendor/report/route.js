import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import pool from '../../db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id');

  if (!user_id) {
    return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });
  }

  try {

    const sellerShopRes = await pool.query(
      'SELECT * FROM products WHERE user_id = $1',
      [user_id]
    );
    const sellerShops = sellerShopRes.rows;

    const getOrders = async (item) => {
      try {
        const orderRes = await pool.query(
          'SELECT * FROM orders WHERE product_id = $1',
          [item.product_id]
        );

        if (orderRes.rows.length > 0) {
          return orderRes.rows[0];
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
      'SELECT * FROM reports WHERE user_id = $1',
      [user_id]
    );
    
    const reviews = await pool.query(
      'SELECT * FROM reviews WHERE user_id = $1',
      [user_id]
    );
    
    const earnings = await pool.query(
      'SELECT * FROM campus_express_seller_wallet WHERE user_id = $1',
      [user_id]
    );

    return NextResponse.json({orders: filteredOrders, reviews, reports, earnings}, { status: 200 });
  } catch (err) {
    console.error('DB Error:', err);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
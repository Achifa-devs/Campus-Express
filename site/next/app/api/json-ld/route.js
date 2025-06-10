import { NextResponse } from 'next/server';
import pool from '@/app/api/db';

export const dynamic = 'force-dynamic'; // Ensure fresh data on each request

export async function GET() {
  console.log('loading')
  try {
    const query = `
      SELECT 
        product_id,
        title,
        thumbnail_id,
        price,
        state->>'state' as status
      FROM products 
      WHERE state->>'state' = 'active'
      ORDER BY created_at DESC
      LIMIT 10
    `;

    const result = await pool.query(query);
    
    if (!result.rows || result.rows.length === 0) {
      return new Response(
        JSON.stringify({ 
          bool: false, 
          message: 'No active products found' 
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    const productData = result.rows.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": item.title,
        "image": `https://cdn.campussphere.net/images/${item.thumbnail_id}`,
        "url": `https://www.campussphere.net/store/product/${item.product_id}`,
        "offers": {
          "@type": "Offer",
          "price": item.price,
          "priceCurrency": "NGN",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition"
        }
      }
    }));

    return new Response(
      JSON.stringify({
        bool: true,
        data: {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Trending Products",
          "description": "Discover trending products on Campus Sphere",
          "numberOfItems": result.rows.length,
          "url": "https://www.campussphere.net/store/",
          "itemListElement": productData
        }
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=3600' // Cache for 1 hour
        }
      }
    );

  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(
      JSON.stringify({ 
        bool: false, 
        error: 'Internal server error' 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
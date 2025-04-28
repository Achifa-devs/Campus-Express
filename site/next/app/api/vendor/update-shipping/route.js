'use server'
import pool from '../../db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { seller_id, data } = body;
    let {
        shippingZone
    } = data

    let {
      Address1,
      Address2,
      Address3,
      Address4,
      City,
      State,
      Country
    }= shippingZone;


    const shippingExist = await pool.query(`SELECT * FROM shipping WHERE seller_id = '${seller_id}'`);
    
    if (shippingExist.rows.length > 0) {
      const res = await pool.query(`UPDATE shipping set 
        address1 = $1, 
        address2 = $2, 
        address3 = $3, 
        address4 = $4, 
        town = $5, 
        state = $6, 
        country = $7
        WHERE seller_id = $8`,
        [Address1, Address2, Address3, Address4, City, State, Country, seller_id]);
      return NextResponse.json({ bool: res?.rowCount > 0 ? true : false }, { status: 200 });
    } else {
      const res = await pool.query(`INSERT INTO shipping(
        id,address1, address2, address3, address4, town, state, country,seller_id
      ) VALUES(
        DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8
      )`, [Address1, Address2, Address3, Address4, City, State, Country, seller_id]);
      return NextResponse.json({ bool: res?.rowCount > 0 ? true : false }, { status: 200 });
      
      
    }

  } catch (err) {
    console.error('Error getting seller:', err);
    return NextResponse.json({ bool: false, message: 'Something went wrong' }, { status: 500 });
  }
}





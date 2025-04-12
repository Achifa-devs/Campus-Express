'use server'
import pool from '../../db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const { seller_id, account_num, beneficiary, bank } = body;
        console.log(seller_id, account_num, beneficiary, bank)

        const res = await pool.query(`UPDATE payment set account_num = '${account_num}', beneficiary = '${beneficiary}', bank = '${bank}' WHERE seller_id='${seller_id}'`);
        return NextResponse.json({ bool: res?.rowCount > 0 ? true : false }, { status: 200 });

  } catch (err) {
    console.error('Error getting seller:', err);
    return NextResponse.json({ bool: false, message: 'Something went wrong' }, { status: 500 });
  }
}





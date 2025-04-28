'use server'
import shortid from 'shortid';
// import pool from '../../../db';
import { NextResponse } from 'next/server';
import pool from '@/app/api/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { acct_num,bank,beneficiary,seller_id } = body;

    const res = await pool.query(`INSERT INTO payment(id,acct_num,bank,beneficiary,seller_id,date) values(DEFAULT,'${acct_num}','${bank}','${beneficiary}','${seller_id}','${new Date()}')`);
    return NextResponse.json({ bool: res.rowCount > 0 ? true : false}, { status: res.rowCount > 0 ? 200 : 501 });

  } catch (err) {
    console.error('Error getting seller:', err);
    return NextResponse.json({ bool: false, message: 'Something went wrong' }, { status: 500 });
  }
}





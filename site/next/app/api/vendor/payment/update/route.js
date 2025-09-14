'use server'
import { NextResponse } from 'next/server';
import pool from '../../../db';

export async function POST(req) {
    try {
        const body = await req.json();
        const { user_id, data } = body;
        const {
          accountBeneficiary, bankName, bankAccountNumber
        }=data;
        // console.log(user_id, acct_num, beneficiary, bank)
        const paymentExist = await pool.query(`SELECT * FROM payment WHERE user_id='${user_id}'`);

      if (paymentExist.rows.length === 1) {
        const res = await pool.query(`UPDATE payment set acct_num = '${bankAccountNumber}', beneficiary = '${accountBeneficiary}', bank = '${bankName}' WHERE user_id='${user_id}'`);
        return NextResponse.json({ bool: res?.rowCount > 0 ? true : false }, { status: 200 });
      } else {
       const res = await pool.query(
          `
          INSERT INTO payment(
            id,
            acct_num,
            bank,
            beneficiary,
            user_id
          ) 
          values(
            DEFAULT,
            '${bankAccountNumber}', 
            '${bankName}', 
            '${accountBeneficiary}', 
            '${user_id}'
          )
          `
        )
        return NextResponse.json({ bool: res?.rowCount > 0 ? true : false }, { status: 200 });

      }

        

  } catch (err) {
    console.error('Error updating payment:', err);
    return NextResponse.json({ bool: false, message: 'Something went wrong' }, { status: 500 });
  }
}





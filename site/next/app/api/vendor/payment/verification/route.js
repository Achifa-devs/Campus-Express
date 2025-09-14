'use server'
import { NextResponse } from 'next/server';
import Flutterwave from 'flutterwave-node-v3'
export async function POST(req) {
  try {
    const body = await req.json();
      const { acct, code } = body;
      
        const FLW_PUBLIC_KEY = 'FLWPUBK-502f1f73c8abf430f161a528241c198a-X'
        const FLW_SECRET_KEY = 'FLWSECK-9a453e783758c676333484b51ccfce66-18bd053d0bfvt-X'
        // const FLW_ECRYPTION_KEY = '9a453e783758755bf8c9ea63'


    const flw = new Flutterwave(FLW_PUBLIC_KEY, FLW_SECRET_KEY);
    const details = {
      account_number: acct,
      account_bank: code
    };
    const result = await flw.Misc.verify_Account(details);
    return NextResponse.json({ name: result.data.account_name, bool: true }, { status: 200 });

  } catch (err) {
    console.error('Error getting seller:', err);
    return NextResponse.json({ bool: false, message: 'Something went wrong' }, { status: 500 });
  }
}






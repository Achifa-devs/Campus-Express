// app/api/seller-auth/route.js

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const cookieStore = cookies();
    const buyer_secret = cookieStore.get('buyer_secret')?.value;

    if (!buyer_secret) {
      return NextResponse.json({ bool: false, id: '' }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(buyer_secret, 'kdiU$28Fs!9shF&2xZpD3Q#1gLx@R7TkWzPq');
      return NextResponse.json({ bool: true, id: decoded.id }, { status: 200 });
    } catch (err) {
      console.error('JWT error:', err.message);
      return NextResponse.json({ bool: false, id: '' }, { status: 401 });
    }
  } catch (err) {
    console.error('Server error:', err.message);
    return NextResponse.json({ bool: false, id: '' }, { status: 500 });
  }
}

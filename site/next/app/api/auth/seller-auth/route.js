// app/api/seller-auth/route.js

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import pool from '../../db';

export async function GET(req) {
  try {
    const cookieStore = cookies();
    const seller_secret = cookieStore.get('seller_secret')?.value;

    if (!seller_secret) {
      return Response.json({ bool: false, id: '' }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(seller_secret, 'kdiU$28Fs!9shF&2xZpD3Q#1gLx@R7TkWzPq');
      return Response.json({ bool: true, id: decoded.id }, { status: 200 });
    } catch (err) {
      console.error('JWT error:', err.message);
      return Response.json({ bool: false, id: '' }, { status: 401 });
    }
  } catch (err) {
    console.error('Server error:', err.message);
    return Response.json({ bool: false, id: '' }, { status: 500 });
  }
}

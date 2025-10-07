'use server'

import pool from '@/app/api/db';
import { get_mssg } from '@/app/utils/inbox';
// app/api/og/route.js
import { NextResponse } from 'next/server';

import shortId from 'shortid'

export async function POST(req) {
  try {
    const body = await req.json()
    const { user_id, receiver_id, content, message_type, media_url, date } = body
    const mssg_id = shortId.generate(10);
    const conversation_id = await generateConversationId(user_id, receiver_id);
   
    if (!user_id || !receiver_id || !content || !message_type || !media_url) {
      return NextResponse.json({data: '', success: false}, { status: 400 })
    }
    
    const status = {
      id: receiver_id,
      status: "sent",
    };

    const result = await pool.query(
    `INSERT INTO messages (
        mssg_id, conversation_id, sender_id, receiver_id,
        content, message_type, media_url, created_at, status
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`,
    [
        mssg_id,
        conversation_id,
        user_id,
        receiver_id,
        content,
        message_type,
        media_url,
        date,
        status,
    ]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({data: '', success: false}, { status: 500 })
    }

    return NextResponse.json({data: result.rows[0], success: true}, { status: 200 })
  } catch (err) {
    console.error('Order creation error:', err)
    return NextResponse.json({data: '', success: false}, { status: 500 })
  }
}


async function generateConversationId(userA, userB) {
  console.log(userA, userB)
  if (userA === userB) {
    throw new Error("Conversation requires two different users");
  }
  // Sort the two IDs lexicographically (alphabet + number ordering)
  return [userA, userB].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)).join('_');
}

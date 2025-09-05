/**
 * User registration API with improved security and error handling
 */
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import pool from '../db';
import { createToken } from '../auth';
import { cookies } from 'next/headers';
import { queryWithRetry, createApiResponse, createErrorResponse, validateRequiredFields } from '../../utils/api-helpers';

export async function POST(req) {
  try {
    const body = await req.json();
    const { fname, lname, email, phone, pwd, state, campus, gender } = body;

    // Validate required fields
    const validation = validateRequiredFields(
      { fname, lname, email, phone, pwd, state, campus, gender },
      ['fname', 'lname', 'email', 'phone', 'pwd', 'state', 'campus', 'gender']
    );

    if (!validation.isValid) {
      return createErrorResponse(`Missing required fields: ${validation.missingFields.join(', ')}`, 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return createErrorResponse('Invalid email format', 400);
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
      return createErrorResponse('Invalid phone number format', 400);
    }

    // Validate password strength
    if (pwd.length < 6) {
      return createErrorResponse('Password must be at least 6 characters long', 400);
    }

    const date = new Date().toISOString();
    const hashedPwd = await bcrypt.hash(pwd, 12); // Increased rounds for better security
    const user_id = `CE-${nanoid(10)}`;
    const wallet_id = `CEW-${nanoid(10)}`;

    // Use transaction for atomic operations
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Check if email already exists with retry
      const emailCheck = await queryWithRetry(
        client,
        'SELECT COUNT(*) FROM users WHERE email = $1',
        [email]
      );

      if (parseInt(emailCheck.rows[0].count) > 0) {
        await client.query('ROLLBACK');
        return createErrorResponse('Email already exists', 409);
      }

      // Check if phone already exists with retry
      const phoneCheck = await queryWithRetry(
        client,
        'SELECT COUNT(*) FROM users WHERE phone = $1',
        [phone]
      );

      if (parseInt(phoneCheck.rows[0].count) > 0) {
        await client.query('ROLLBACK');
        return createErrorResponse('Phone number already exists', 409);
      }

      // Insert user with retry
      await queryWithRetry(
        client,
        `INSERT INTO users (
          id, fname, lname, user_id, email, phone, password, state,
          campus, isActive, isVerified, isEmailVerified, isPhoneVerified,
          date, lastseen, gender, deviceid
        ) VALUES (
          DEFAULT, $1, $2, $3, $4, $5, $6, $7,
          $8, $9, $10, $11, $12, $13, $14, $15, $16
        )`,
        [
          fname, lname, user_id, email, phone, hashedPwd, state, campus,
          false, false, false, false, date, date, gender, 'NULL'
        ]
      );

      // Insert wallet with retry
      await queryWithRetry(
        client,
        `INSERT INTO wallet (
          id, wallet_id, user_id, wallet_balance, wallet_pin, wallet_number, date
        ) VALUES (
          DEFAULT, $1, $2, $3, $4, $5, $6
        )`,
        [wallet_id, user_id, 0, '0000', phone, date]
      );

      // Insert empty coverphoto row with retry
      await queryWithRetry(
        client,
        `INSERT INTO coverphoto (id, file, user_id, date) VALUES (DEFAULT, $1, $2, $3)`,
        ['null', user_id, date]
      );

      await client.query('COMMIT');

      // Create JWT with environment variable
      const jwtSecret = process.env.JWT_SECRET || process.env.BUYER_SECRET;
      if (!jwtSecret) {
        console.error('JWT_SECRET not configured');
        return createErrorResponse('Server configuration error', 500);
      }

      const token = createToken({ id: user_id }, jwtSecret);

      // Set secure cookie
      const cookieStore = cookies();
      cookieStore.set('user_secret', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      return createApiResponse(true, {
        user: { fname, lname, user_id, email, phone, state, campus, gender },
        token
      }, 'Registration successful');

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Registration error:', error);
    return createErrorResponse('Registration failed', 500, error);
  }
}

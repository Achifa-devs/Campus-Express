import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db';
import { queryWithRetry, createApiResponse, createErrorResponse, validateRequiredFields } from '../../utils/api-helpers';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, pwd } = body;

    // Validate required fields
    const validation = validateRequiredFields({ email, pwd }, ['email', 'pwd']);
    if (!validation.isValid) {
      return createErrorResponse(`Missing required fields: ${validation.missingFields.join(', ')}`, 400);
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return createErrorResponse('Invalid email format', 400);
    }

    // Check if user exists with retry logic
    const userCheckResult = await queryWithRetry(
      pool,
      `SELECT id FROM users WHERE email = $1`,
      [email]
    );

    if (userCheckResult.rows.length === 0) {
      return createErrorResponse('Email is not registered', 401);
    }

    const buyerId = userCheckResult.rows[0].id;

    // Get user details with retry logic
    const userResult = await queryWithRetry(
      pool,
      `SELECT user_id, email, password, fname, lname FROM users WHERE id = $1`,
      [buyerId]
    );

    const user = userResult.rows[0];
    if (!user) {
      return createErrorResponse('User data not found', 404);
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(pwd, user.password);
    if (!passwordMatch) {
      return createErrorResponse('Invalid password', 401);
    }

    // Remove password from user object
    const { password, ...userWithoutPassword } = user;

    // Create token with environment variable
    const jwtSecret = process.env.JWT_SECRET || process.env.BUYER_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET not configured');
      return createErrorResponse('Server configuration error', 500);
    }

    const token = jwt.sign(
      { id: user.user_id },
      jwtSecret,
      { expiresIn: '7d' }
    );

    // Set secure cookie
    const cookieStore = cookies();
    cookieStore.set('user_secret', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return createApiResponse(true, {
      user: userWithoutPassword,
      token
    }, 'Login successful');

  } catch (error) {
    console.error('Login error:', error);
    return createErrorResponse('An error occurred during login', 500, error);
  }
}

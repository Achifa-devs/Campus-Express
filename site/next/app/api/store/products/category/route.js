import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import pool from '@/app/api/db';
import { queryWithRetry, createApiResponse, createErrorResponse, validateRequiredFields } from '@/app/utils/api-helpers';

export async function GET(req) {
  try {
    const searchParams = new URL(req.url).searchParams;
    let category = searchParams.get('category');
    let limit = parseInt(searchParams.get('limit'), 10);

    // Decode base64 category
    category = category ? atob(category).trim() : '';

    // Validate limit
    if (isNaN(limit) || limit <= 0) {
      limit = 10; // Default limit
    }

    // Validate required parameters
    if (!category) {
      return createErrorResponse('Category parameter is required', 400);
    }

    // Get headers
    const headerList = headers();
    let gender = headerList.get('gender');

    // Capitalize gender if provided
    const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    let capGender = gender ? capitalizeFirstLetter(gender) : '';

    let query = '';
    let queryParams = [];

    if (category === 'trends') {
      query = `SELECT * FROM products WHERE state->>'state' = 'active' AND others->>'gender' = $1 LIMIT $2`;
      queryParams = [capGender, limit];
    } else if (['fashion', 'lodge & apartments'].includes(category.toLowerCase())) {
      query = `SELECT * FROM products WHERE category = $1 AND state->>'state' = 'active' AND others->>'gender' = $2 LIMIT $3`;
      queryParams = [category, capGender, limit];
    } else if (category !== '') {
      query = `SELECT * FROM products WHERE category = $1 AND state->>'state' = 'active' LIMIT $2`;
      queryParams = [category, limit];
    } else {
      return createErrorResponse('Invalid category parameter', 400);
    }

    // Use retry logic for database query
    const result = await queryWithRetry(pool, query, queryParams);
    return createApiResponse(true, result.rows, 'Products fetched successfully');

  } catch (error) {
    console.error('Error fetching products:', error);
    return createErrorResponse('Failed to fetch products', 500, error);
  }
}

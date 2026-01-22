import { NextResponse } from 'next/server';
import { getProductSearchQuery } from '@/lib/services/product';
import { successResponse, errorResponse } from '@/lib/utils';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const gender = searchParams.get('gender');

    const response = await getProductSearchQuery({ query, gender });
    return successResponse(response, 200);
  } catch (error) {
    return errorResponse(error.message, 400);
  }
}

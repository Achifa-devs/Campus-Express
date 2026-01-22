import { NextResponse } from 'next/server';
import { getShopAnalytics } from '@/lib/services/shop';
import { successResponse, errorResponse } from '@/lib/utils';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const product_id = searchParams.get('product_id');

    const response = await getShopAnalytics({ product_id });
    return successResponse(response, 200);
  } catch (error) {
    return errorResponse(error.message, 400);
  }
}

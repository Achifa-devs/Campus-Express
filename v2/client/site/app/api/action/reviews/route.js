import { NextResponse } from 'next/server';
import { getShopReviewsService } from '@/lib/services/action';
import { successResponse, errorResponse } from '@/lib/utils';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const shop_id = searchParams.get('shop_id');

    const response = await getShopReviewsService({ shop_id });
    return successResponse(response, 200);
  } catch (error) {
    return errorResponse(error.message, 400);
  }
}

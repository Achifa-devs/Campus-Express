import { NextResponse } from 'next/server';
import { getProduct } from '@/lib/services/product';
import { successResponse, errorResponse } from '@/lib/utils';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const product_id = searchParams.get('product_id');

    const response = await getProduct({ product_id });
    return successResponse(response, 200);
  } catch (error) {
    return errorResponse(error.message, 400);
  }
}

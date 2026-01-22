import { NextResponse } from 'next/server';
import { deleteProduct } from '@/lib/services/shop';
import { successResponse, errorResponse } from '@/lib/utils';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const product_id = searchParams.get('product_id');
    const type = searchParams.get('type');

    const response = await deleteProduct({ product_id, type });
    return successResponse(response, 200);
  } catch (error) {
    return errorResponse(error.message, 400);
  }
}

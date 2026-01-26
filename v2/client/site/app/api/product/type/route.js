import { NextResponse } from 'next/server';
import { getProductType } from '@/lib/services/product';
import { successResponse, errorResponse } from '@/lib/utils';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const c_type = searchParams.get('c_type');
    const gender = searchParams.get('gender');

    const response = await getProductType({ c_type, gender });
    return successResponse(response, 200);
  } catch (error) {
    return errorResponse(error.message, 400);
  }
}

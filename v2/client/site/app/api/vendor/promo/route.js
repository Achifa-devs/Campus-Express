import { NextResponse } from 'next/server';
import { checkVendorPromo } from '@/lib/services/general';
import { successResponse, errorResponse } from '@/lib/utils';

export async function GET(request) {
  try {
    const response = await checkVendorPromo();
    return successResponse(response, 200);
  } catch (error) {
    return errorResponse(error.message, 400);
  }
}

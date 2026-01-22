import { NextResponse } from 'next/server';
import { getDeals } from '@/lib/services/deals';
import { successResponse, errorResponse } from '@/lib/utils';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');

    const response = await getDeals({ user_id });
    return successResponse(response, 200);
  } catch (error) {
    return errorResponse(error.message, 400);
  }
}

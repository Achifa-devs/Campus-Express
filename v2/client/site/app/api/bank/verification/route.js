import { NextResponse } from 'next/server';
import { verifyAccountNumber } from '@/lib/services/general';
import { successResponse, errorResponse } from '@/lib/utils';

export async function POST(request) {
  try {
    const { account_number, bank_code } = await request.json();

    const result = await verifyAccountNumber({ account_number, bank_code });

    if (!result.status) {
      return errorResponse(result.message, 503);
    }

    return successResponse(result.data, 201);
  } catch (error) {
    console.error('Error verifying account:', error);
    return errorResponse(error.message, 503);
  }
}

import { NextResponse } from 'next/server';
import { updateFirebaseToken } from '@/lib/services/general';
import { successResponse, errorResponse } from '@/lib/utils';

export async function POST(request) {
  try {
    const body = await request.json();
    const response = await updateFirebaseToken(body);
    return successResponse(response, 201);
  } catch (error) {
    return errorResponse(error.message, 400);
  }
}

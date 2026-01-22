import { NextResponse } from 'next/server';
import { updateUserPhone } from '@/lib/services/users';
import { successResponse, errorResponse } from '@/lib/utils';

export async function POST(request) {
  try {
    const body = await request.json();
    const response = await updateUserPhone(body);
    return successResponse(response, 201);
  } catch (error) {
    return errorResponse(error.message, 400);
  }
}

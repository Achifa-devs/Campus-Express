import { NextResponse } from 'next/server';
import {
  getFavouriteService,
  createFavouriteService,
  deleteFavouriteService,
} from '@/lib/services/action';
import { successResponse, errorResponse } from '@/lib/utils';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');
    const product_id = searchParams.get('product_id');

    const response = await getFavouriteService({ user_id, product_id });
    return successResponse(response, 200);
  } catch (error) {
    return errorResponse(error.message, 400);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const response = await createFavouriteService(body);
    return successResponse(response, 201);
  } catch (error) {
    return errorResponse(error.message, 400);
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');
    const product_id = searchParams.get('product_id');

    const response = await deleteFavouriteService({ user_id, product_id });
    return successResponse(response, 200);
  } catch (error) {
    return errorResponse(error.message, 400);
  }
}

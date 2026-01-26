import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/services/product';
import { successResponse, errorResponse } from '@/lib/utils';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const gender = searchParams.get('gender');
    const limit = searchParams.get('limit') || 30;
    
    console.log('Products API called with:', { gender, limit });
    
    const response = await getProducts({ gender, limit: parseInt(limit) });
    return successResponse(response, 200);
  } catch (error) {
    console.error('Products API error:', error);
    return errorResponse(error.message, 500);
  }
}

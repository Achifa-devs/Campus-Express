import { NextResponse } from 'next/server';
import { uploadMediaToCloudinary } from '@/lib/services/general';
import { successResponse, errorResponse } from '@/lib/utils';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const productId = formData.get('productId');

    if (!file) {
      return errorResponse('No file uploaded', 400);
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response = await uploadMediaToCloudinary({
      file: {
        buffer,
        size: file.size,
        mimetype: file.type,
        originalname: file.name,
      },
      productId,
    });

    return successResponse(response, 201);
  } catch (error) {
    return errorResponse(error.message, 400);
  }
}

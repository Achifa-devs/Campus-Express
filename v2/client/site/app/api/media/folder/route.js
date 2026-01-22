import { NextResponse } from 'next/server';
import { getMediaFolderFromCloudinary } from '@/lib/services/general';
import { successResponse, errorResponse } from '@/lib/utils';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const folderName = searchParams.get('folderName');

    const response = await getMediaFolderFromCloudinary({ folderName });
    return successResponse(response, 200);
  } catch (error) {
    return errorResponse(error.message, 400);
  }
}

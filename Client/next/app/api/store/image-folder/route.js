import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

// Use cloudinary.v2 for the correct API
cloudinary.v2.config({
  cloud_name: 'daqbhghwq',
  api_key: '244892476618978',
  api_secret: '9cK2GEvtfholKpvWjzbGUnBJJ5o',
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get('folder');

    const result = await cloudinary.v2.search
      .expression(`folder:${folder}`)
      .sort_by('public_id', 'desc')
      .max_results(100)
      .execute();

    return NextResponse.json({ data: result.resources, bool: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { data: "An error occurred", bool: false },
      { status: 500 }
    );
  }
}

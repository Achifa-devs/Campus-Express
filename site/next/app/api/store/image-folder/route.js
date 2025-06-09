import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary'
cloudinary.v2.config({
  cloud_name: 'daqbhghwq',
  api_key: '244892476618978',
  api_secret: '9cK2GEvtfholKpvWjzbGUnBJJ5o',
});

export async function GET(req) {

  try {
    const searchParams = new URL(req.url).searchParams;
    const folder = searchParams.get('folder')

    const result = await cloudinary.search
    .expression(`folder:${folder}`)
    .sort_by('public_id', 'desc') // Optional: Sort results by public_id
    .max_results(100) // Adjust as needed; max is 500
    .execute();
    
    return NextResponse.json({data: result.resources, bool: true}, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      data: "An error occurred ",
      bool: false
    }, { status: 500 });
  }
}
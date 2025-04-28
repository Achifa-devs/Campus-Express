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
    console.log("folder: ", folder)

    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder, // Ensure this folder name is correct
      resource_type: 'image'
    });
    
    return NextResponse.json({data: result.resources, bool: true}, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      data: "An error occurred ",
      bool: false
    }, { status: 500 });
  }
}
    
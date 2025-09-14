import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import shortId from 'shortid';

cloudinary.config({ 
    cloud_name: 'daqbhghwq',
    api_key: '244892476618978',
    api_secret: '9cK2GEvtfholKpvWjzbGUnBJJ5o'
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file'); // Get the uploaded file
    const product_id = formData.get('product_id');
    const file_name = formData.get('file_name');

    if (!file || !product_id || !file_name) {
      return NextResponse.json({ error: 'Missing file, product_id, or file_name' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);


    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: product_id.trim(), // Organize files in a folder
          public_id: `${shortId.generate()}-${product_id}`,
          use_filename: false, // Keep original filename
          unique_filename: false, // Allow duplicates
          overwrite: false, // Overwrite existing files with same name
          transformation: [
            { width: 1000, height: 1000, crop: 'limit' }, // Limit dimensions
            { quality: 'auto' }, // Auto-optimize quality
          ],
        },
        (error, result) => {
          if (error) {
            reject(NextResponse.json({ error: 'Upload failed', details: error.message }, { status: 500 }));
          } else {
            resolve(NextResponse.json({ url: result.secure_url, id: result.public_id, success: true }));
          }
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}

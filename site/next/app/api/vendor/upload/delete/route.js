'use server'
import pool from '../../../db';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'daqbhghwq',
    api_key: '244892476618978',
    api_secret: '9cK2GEvtfholKpvWjzbGUnBJJ5o'
});
export async function GET(req) {
  try {
      // const body = await req.json();
      // const { product_id } = body;
      const { searchParams } = new URL(req.url);
      const product_id = searchParams.get("product_id");

    const res = await pool.query(`DELETE FROM products WHERE product_id='${product_id}'`);
    
    if (res?.rowCount > 0) {
      try {
        // Step 1: Delete all resources in the folder
        await cloudinary.api.delete_resources_by_prefix(`${folderName}/`);
    
        // Step 2: Delete the folder itself
        await cloudinary.api.delete_folder(product_id);
    
        return res.status(200).json({ message: `Folder "${product_id}" deleted successfully` });
      } catch (error) {
        console.error('Error deleting Cloudinary folder:', error);
        return res.status(500).json({ message: 'Failed to delete folder', error: error.message });
      }
    }else{
      return NextResponse.json({ bool: false, message: 'Something went wrong' }, { status: 500 });
    }

  } catch (err) {
    console.error('Error getting seller:', err);
    return NextResponse.json({ bool: false, message: 'Something went wrong' }, { status: 500 });
  }
}




// pages/api/delete-folder.js


// export default async function handler(req, res) {
//   if (req.method !== 'DELETE') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { folderName } = req.body;

//   if (!folderName) {
//     return res.status(400).json({ message: 'Missing folderName in request body' });
//   }

//   try {
//     // Step 1: Delete all resources in the folder
//     await cloudinary.api.delete_resources_by_prefix(`${folderName}/`);

//     // Step 2: Delete the folder itself
//     await cloudinary.api.delete_folder(folderName);

//     return res.status(200).json({ message: `Folder "${folderName}" deleted successfully` });
//   } catch (error) {
//     console.error('Error deleting Cloudinary folder:', error);
//     return res.status(500).json({ message: 'Failed to delete folder', error: error.message });
//   }
// }




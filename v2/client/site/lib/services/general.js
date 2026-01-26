import { sendNoticeForNewMsg, sendPushOnNewDeal } from '../firebase';
import cloudinary from '../cloudinary';
import shortId from 'short-id';
import { getVendorPromo, updateFirebaseTokenById, getCurrentVersion } from '../models/general';

export async function verifyAccountNumber(payload) {
  const { account_number, bank_code } = payload;

  const response = await fetch(
    `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  const data = await response.json();
  return data;
}

export async function checkVersion() {
  const response = await getCurrentVersion();
  return response;
}

export async function checkVendorPromo() {
  const response = await getVendorPromo();
  return response;
}

export async function updateFirebaseToken(payload) {
  const { fcm, user_id } = payload;
  const response = await updateFirebaseTokenById({ fcm, user_id });
  return response;
}

export async function sendFirebaseNotification(payload) {
  try {
    const { token, data } = payload;
    const { type } = data;

    if (type === 'deal') {
      const { title, body, media, order_id } = data;
      const result = await sendPushOnNewDeal(token, title, body, media, order_id);
      console.log('Firebase notification result: ', result);
      if (result.success) return result;
      else throw new Error('Error sending firebase notification: ' + result.message);
    } else if (type) {
      // Chat notification
      const { title, body, room, partner } = data;
      const result = await sendNoticeForNewMsg(token, title, body, room, partner);
      if (result.success) return result;
      else throw new Error('Error sending firebase notification: ' + result.error);
    }
  } catch (error) {
    console.log('error: ', error);
    throw new Error('Internal server error: ' + error.message);
  }
}

export async function getMediaFolderFromCloudinary(payload) {
  const { folderName } = payload;

  async function fetchFolderAssets(folderName) {
    try {
      const { resources } = await cloudinary.search
        .expression(`folder:${folderName}`)
        .sort_by('public_id', 'desc')
        .max_results(100)
        .execute();
      return resources;
    } catch (error) {
      throw new Error('Error fetching folder assets: ' + error.message);
    }
  }

  return fetchFolderAssets(folderName);
}

export async function uploadMediaToCloudinary(payload) {
  const { file, productId } = payload;

  try {
    if (!file) throw new Error('No file uploaded');

    const MAX_FILE_SIZE = 15 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size exceeds 15MB limit');
    }

    const uploadOptions = {
      resource_type: 'auto',
      folder: productId ? productId.trim() : undefined,
      public_id: `${shortId.generate()}-${productId}`,
      use_filename: false,
      unique_filename: false,
      overwrite: false,
      transformation: [
        { width: 1000, height: 1000, crop: 'limit' },
        { quality: 'auto' },
      ],
    };

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
      uploadStream.end(file.buffer);
    });

    return {
      success: true,
      message: 'File uploaded successfully',
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      },
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Error uploading file: ' + error.message);
  }
}

export async function deleteMediaFromCloudinary(payload) {
  try {
    const { url, type } = payload;

    const extractPublicId = (url) => {
      const parts = url.split('/upload/');
      if (parts.length < 2) throw new Error('Invalid Cloudinary URL');
      const pathWithVersion = parts[1];
      const pathParts = pathWithVersion.split('/');
      if (pathParts[0].startsWith('v')) pathParts.shift();
      const fileWithExt = pathParts.pop();
      const fileName = fileWithExt.split('.')[0];
      return [...pathParts, fileName].join('/');
    };

    const publicId = extractPublicId(url);
    if (!publicId) throw new Error('Could not extract public ID');

    const result = await cloudinary.uploader.destroy(publicId, {
      timeout: 60000,
      invalidate: true,
      resource_type: type === 'video' ? 'video' : 'image',
    });

    if (result.result === 'ok') return true;
    if (result.result === 'not found') throw new Error('File not found');
    throw new Error('Failed to delete file');
  } catch (error) {
    throw new Error('Internal server error: ' + error.message);
  }
}

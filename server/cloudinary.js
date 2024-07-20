const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload video
const uploadVideo = async (filePaths, refs, folder) => {
  try {
    const uploadPromises = filePaths.map(async (filePath) => {
      const result = await cloudinary.uploader.upload_large(filePath, {
        resource_type: 'video',
        folder: folder,
        public_id: refs, // Use corresponding reference for each file
        timeout: 5000000,
      });
      
      return result;
    });

    // Wait for all uploads to complete
    const results = await Promise.all(uploadPromises);
    console.log('All uploads completed successfully:', results);
    return true;
  } catch (error) {
    console.error('Error uploading videos:', error);
    return false;
  }
};


// Replace 'path/to/your/video.mp4' with the path to your video file
module.exports={uploadVideo}
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import dotenv from "dotenv";
import { CUSTOMER_ROUTE } from "./src/routes/shop.js";
import { VENDOR_ROUTE } from "./src/routes/vendor.js";
// import sendNotification from "./src/utils/FCM.js";
import multer from "multer";
import { v2 } from 'cloudinary'
import pool from "./src/config/db.js";
import shortId from 'short-id'
import { parser } from "./src/utils/parser.js";
v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
dotenv.config();

const CAMPUSSPHERE_SERVER = express();

CAMPUSSPHERE_SERVER.use(cookieParser());
CAMPUSSPHERE_SERVER.use(morgan('dev'));
CAMPUSSPHERE_SERVER.use(express.json()); // <- this is necessary to parse JSON

CAMPUSSPHERE_SERVER.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'UPDATE'],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'cs-gender'],
}));

// Firebase notification endpoint
// CAMPUSSPHERE_SERVER.post('/notify', (req, res) => {
//   const { token, title, body, media, price, product_id } = req.body;
//   sendNotification(token, title, body, media, price, product_id);
//   res.send({ status: 'Notification sent!' });
// });

CAMPUSSPHERE_SERVER.use(CUSTOMER_ROUTE);
CAMPUSSPHERE_SERVER.use(VENDOR_ROUTE);

const server = CAMPUSSPHERE_SERVER.listen(process.env.PORT, () => {
  console.log('CAMPUSSPHERE_SERVER is live @', process.env.PORT);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
});


CAMPUSSPHERE_SERVER.post('/save-article', async (req, res) => {
  const { title, thumbnail, content, description } = req.body;
  console.log( thumbnail)

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO notice (title, thumbnail, content, date, description)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING *`,
      [title, thumbnail, content, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting notification:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

CAMPUSSPHERE_SERVER.get('/notice', async (req, res) => {
  try {
    // Query to select all notices
    const result = await pool.query('SELECT * FROM notice ORDER BY date DESC');
    
    // Send the result as a response
    res.status(200).json({ data: result.rows });
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


CAMPUSSPHERE_SERVER.post('/version-check', parser, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM app
      ORDER BY id DESC
      LIMIT 1`
    );

    const {
      current_version
    } = req?.body;

    let response = result.rows[0];
    console.log("body: ", parseInt(current_version) === parseInt(response?.version))

    if(parseInt(current_version) === parseInt(response?.version)){
      res.status(201).json({success: true, is_latest: false, url: response?.file_url, summary: response?.summary});
      
    } else {
      res.status(201).json({success: true, is_latest: true, url: response?.file_url, summary: response?.summary});

    }

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
  
});



// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


//  = require('cloudinary');
// const upload = require('../middleware/multer'); // Assuming you have multer configured

CAMPUSSPHERE_SERVER.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Validate request
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }
    const productId = req.body.productId;
    // Validate file size (example: limit to 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (req.file.size > MAX_FILE_SIZE) {
      return res.status(400).json({
        success: false,
        message: 'File size exceeds 5MB limit',
      });
    }

    // Upload to Cloudinary with additional options
    const uploadOptions = {
      resource_type: 'auto',
      folder: productId.trim(), // Organize files in a folder
      public_id: `${shortId.generate()}-${productId}`,
      use_filename: false, // Keep original filename
      unique_filename: false, // Allow duplicates
      overwrite: false, // Overwrite existing files with same name
      transformation: [
        { width: 1000, height: 1000, crop: 'limit' }, // Limit dimensions
        { quality: 'auto' }, // Auto-optimize quality
      ],
    };

    // Use promise-based API instead of callback
    const result = await new Promise((resolve, reject) => {
      const uploadStream = v2.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      
      uploadStream.end(req.file.buffer);
    });

    // Return success response
    return res.status(200).send({
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
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error uploading file',
      error: error.message,
    });
  }
});

CAMPUSSPHERE_SERVER.post('/delete', async (req, res) => {
  try {
    const { url } = req.body;
    console.log(url)

    // Validate input
    // if (!publicId) {
    //   return res.status(400).json({ 
    //     success: false,
    //     message: 'publicId is required' 
    //   });
    // }

    // Extract public ID from URL
    const extractPublicId = (url) => {
      try {
        const parts = url.split('/upload/');

        if (parts.length < 2) {
          throw new Error('Invalid Cloudinary URL');
        }

        // Remove version and extension
        const pathWithVersion = parts[1]; // e.g., v1746561234/user_uploads/file.jpg
        const pathParts = pathWithVersion.split('/');

        // Remove the version (starts with 'v')
        if (pathParts[0].startsWith('v')) {
          pathParts.shift(); // remove version
        }

        // Extract file name without extension
        const fileWithExt = pathParts.pop(); // e.g., file.jpg
        const fileName = fileWithExt.split('.')[0]; // e.g., file

        // Reconstruct the public_id
        return [...pathParts, fileName].join('/');
      } catch (error) {
        console.error('Error extracting public ID:', error);
        throw new Error('Failed to extract public ID from URL');
      }
    };


    const publicId = extractPublicId(url);
    
    if (!publicId) {
      return res.status(400).json({ 
        success: false,
        message: 'Could not extract public ID from URL' 
      });
    }

    // Delete from Cloudinary
    const result = await v2.uploader.destroy(publicId, { 
      timeout: 60000, // 60 seconds timeout (more reasonable than 60,000,000 ms)
      invalidate: true // Optional: invalidate CDN cache
    });

    console.log('Cloudinary deletion result:', result);

    if (result.result === 'ok') {
      return res.status(200).json({ 
        success: true,
        message: 'File deleted successfully',
        data: result 
      });
    } else if (result.result === 'not found') {
      return res.status(404).json({ 
        success: false,
        message: 'File not found on Cloudinary',
        data: result 
      });
    } else {
      return res.status(500).json({ 
        success: false,
        message: 'Failed to delete file',
        data: result 
      });
    }
  } catch (error) {
    console.error('Error in delete endpoint:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: error.message 
    });
  }
});


app.get('/image-folder', (req,res) => {
  let {folderName} = req.query
  // Configure Cloudinary with your credentials
  

  async function fetchFolderAssets(folderName) {
    try {
      const result = await v2.search
      .expression(`folder:${folderName}`)
      .sort_by('public_id', 'desc') // Optional: Sort results by public_id
      .max_results(100) // Adjust as needed; max is 500
      .execute();
      
      console.log(result.resources);
      res.send(result.resources);
    } catch (error) {
      console.error('Error fetching folder assets:', error);
    }
  }

  // Call the function and pass the folder name you want to fetch assets from
  fetchFolderAssets(folderName);
})


CAMPUSSPHERE_SERVER.get('/vendor/report', async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: 'Missing user_id' });
  }

  try {
    // Get seller's products
    const sellerShopRes = await pool.query(
      'SELECT * FROM products WHERE user_id = $1',
      [user_id]
    );
    const sellerShops = sellerShopRes.rows;

    // Helper function to get orders for each product
    const getOrders = async (item) => {
      try {
        const orderRes = await pool.query(
          'SELECT * FROM orders WHERE product_id = $1',
          [item.product_id]
        );

        if (orderRes.rows.length > 0) {
          return orderRes.rows[0];
        }

        return null;
      } catch (err) {
        console.error('Error fetching order:', err);
        return null;
      }
    };

    // Get orders for all products
    const mappedOrders = await Promise.all(
      sellerShops.map((item) => getOrders(item))
    );
    const filteredOrders = mappedOrders.filter((item) => item !== null);

    // Get other data
    const reports = await pool.query(
      'SELECT * FROM reports WHERE seller_id = $1',
      [user_id]
    );
    
    const reviews = await pool.query(
      'SELECT * FROM reviews WHERE seller_id = $1',
      [user_id]
    );
    
    const earnings = await pool.query(
      'SELECT * FROM wallet WHERE user_id = $1',
      [user_id]
    );

    // Return combined data
    res.status(200).json({
      orders: filteredOrders,
      reviews: reviews.rows,
      reports: reports.rows,
      earnings: earnings.rows
    });

  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});


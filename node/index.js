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

import bcrypt from "bcryptjs"
import { findUserById } from "./src/repositories/shop/customer.js";
CAMPUSSPHERE_SERVER.post('/account/delete', async (req, res) => {
  const { user_id, password, reason} = req.body;

  const user = await findUserById({user_id});

  const auth = await bcrypt.compare(password, user?.password);
  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' });
  }
  if(!auth){
    return res.status(400).json({ error: 'password is incorrect' });

  }

  try {
    await pool.query('BEGIN');
    await pool.query(`DELETE FROM products WHERE user_id = $1`, [user_id]);
    await pool.query(`DELETE FROM shops WHERE user_id = $1`, [user_id]);
    const result = await pool.query(`DELETE FROM users WHERE user_id = $1`, [user_id]);
    await pool.query('COMMIT');

    if (result.rowCount === 1) {
      return res.status(200).json({ message: 'Account and related data deleted successfully' });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Error deleting account:', err);
    return res.status(500).json({ error: 'Server error' });
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

    if(!parseInt(current_version) === parseInt(response?.version)){
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
      folder: productId ? productId.trim() : undefined, // Only create folder if productId is defined
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
    const { url, type } = req.body;
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
    console.log(publicId)
    
    if (!publicId) {
      return res.status(400).json({ 
        success: false,
        message: 'Could not extract public ID from URL' 
      });
    }

    // Delete from Cloudinary
    const result = await v2.uploader.destroy(publicId, { 
      timeout: 60000, // 60 seconds timeout (more reasonable than 60,000,000 ms)
      invalidate: true, // Optional: invalidate CDN cache
      resource_type: type === 'video' ? 'video' : 'image'
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


CAMPUSSPHERE_SERVER.get('/image-folder', (req,res) => {
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

CAMPUSSPHERE_SERVER.post('/update-photo', parser, async (req, res) => {
  const { photo, user_id } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET photo = $1 WHERE user_id = $2 RETURNING *`,
      [photo, user_id]
    );

    const updatedUser = result.rows[0]; // no need for await here

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }

});


CAMPUSSPHERE_SERVER.get('/packages', async (req, res) => {

  try {
    // Get seller's products
    const packages = await pool.query(
      'SELECT * FROM packages'
    );
    const packageData = packages.rows;

    // Return combined data 
    res.status(200).json({packageData});

  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

CAMPUSSPHERE_SERVER.get('/subscription', async (req, res) => {

  const {user_id} = req?.query;

  try {
    // Get seller's products
    const result = await pool.query(
      'SELECT * FROM subscriptions WHERE user_id = $1',
      [user_id]
    );
    // Return combined data 
    res.status(200).send({subscribed: result.rows[0].plan !== 'Free' ? true: false, data: result.rows[0]});

  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).send({ error: 'Server Error' });
  }
});

CAMPUSSPHERE_SERVER.get('/promo', async (req, res) => {

  const {product_id} = req?.query;

  try {
    // Get seller's products
    const result = await pool.query(
      'SELECT * FROM promotions WHERE product_id = $1',
      [product_id]
    );
    // Return combined data 
    res.status(200).send(result.rows[0]);

  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).send({ error: 'Server Error' });
  }
});


CAMPUSSPHERE_SERVER.get('/plans', async (req, res) => {
  try {
    const promoPlans = await pool.query(`SELECT * FROM promo_plans`);
    const connectionPricing = await pool.query(`SELECT * FROM connection_pricing`);
    const vendors = await pool.query(`SELECT * FROM subscription_plans`);

    res.status(200).json({
      promo_plans: promoPlans.rows,
      connection_pricing: connectionPricing.rows,
      vendors: vendors.rows
    });

  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});


CAMPUSSPHERE_SERVER.post('/minus-connect', parser, async (req, res) => {

  const {user_id} = req?.body;

  try {
    // Get seller's products
    const result = await pool.query(
      'UPDATE users SET connects = connects-1 WHERE user_id = $1 RETURNING *',
      [user_id]
    );
    // Return combined data 
    const updatedUser = result.rows[0]; // no need for await here

    res.status(200).json({
      success: true,
      data: updatedUser,
    });

  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).send({ error: 'Server Error' });
  }
});


CAMPUSSPHERE_SERVER.get('/boosted-metrics', parser, async (req, res) => {

  const {
    product_id
  } = req?.query;

  try {
    // Get seller's products
    const result = await pool.query(
      `
        SELECT 'views' AS source, v.id, v.user_id, u.campus, u.lname, u.fname, u.email, u.phone, v.date::timestamp AS created_at
        FROM views v
        JOIN users u ON v.user_id = u.user_id
        WHERE v.product_id = $1

        UNION ALL

        SELECT 'impression' AS source, i.id, i.user_id, u.campus, u.lname, u.fname, u.email, u.phone, i.date::timestamp AS created_at
        FROM impression i
        JOIN users u ON i.user_id = u.user_id
        WHERE i.product_id = $1

        UNION ALL

        SELECT 'contact_clicks' AS source, c.id, c.user_id, u.campus, u.lname, u.fname, u.email, u.phone, c.date::timestamp AS created_at
        FROM contact_clicks c
        JOIN users u ON c.user_id = u.user_id
        WHERE c.product_id = $1

        UNION ALL

        SELECT 'search_appearances' AS source, s.id, s.user_id, u.campus, u.lname, u.fname, u.email, u.phone, s.appeared_at::timestamp AS created_at
        FROM search_appearances s
        JOIN users u ON s.user_id = u.user_id
        WHERE s.product_id = $1

        UNION ALL

        SELECT 'shares' AS source, sh.id, sh.user_id, u.campus, u.lname, u.fname, u.email, u.phone, sh.date::timestamp AS created_at
        FROM shares sh
        JOIN users u ON sh.user_id = u.user_id
        WHERE sh.product_id = $1

        ORDER BY created_at DESC;
      `,
      [product_id]
    );


    // Return combined data 
    console.log(result.rows)
    const list = result.rows; // no need for await here

    res.status(200).json({
      success: true,
      data: list,
    });

  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).send({ error: 'Server Error' });
  }
});





import cron from "node-cron";

async function checkAndUpdatePromotions() {
  try {
    // 1. Get all active promotions
    const promotionsRes = await pool.query(`
      SELECT id, product_id, start_date, end_date
      FROM promotions
      WHERE is_active = TRUE
    `);

    const now = new Date();
    console.log("promotionsRes: ", promotionsRes)


    for (const promo of promotionsRes.rows) {
      const { id, product_id, start_date, end_date } = promo;
      const endDate = new Date(end_date);

      console.log(end_date)
      // 2. Check if promotion is expired
      if (!endDate < now) {
        console.log(
          `Promotion ${id} for product ${product_id} has expired. Updating product...`
        ); 

        // Update Products table
        await pool.query(
          `UPDATE products SET promotion = FALSE WHERE product_id = $1`,
          [product_id]
        );

        // Mark promotion as inactive
        await pool.query(
          `UPDATE promotions SET is_active = FALSE WHERE id = $1`,
          [id]
        );
      } else {
        // Still active → log remaining time
        const timeRemaining = endDate - now;
        const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
        console.log(
          `Promotion ${id} for product ${product_id} expires in ${daysRemaining} days.`
        );
      }
    }

    // pool.release();
  } catch (err) {
    console.error("Error checking promotions:", err);
  }
}

// Schedule: run every day at 12 midnight
// Cron format: second minute hour day month dayOfWeek
// "0 0 * * *" → every day at 00:00
cron.schedule("0 0 * * *", () => {
  console.log("⏰ Running promotion check at midnight...");
  checkAndUpdatePromotions();
});

// If you also want to run immediately at server start, uncomment below
// checkAndUpdatePromotions(); 























































































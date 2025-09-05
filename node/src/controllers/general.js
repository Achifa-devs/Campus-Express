import pool from '../config/db.js';
import { v2 } from 'cloudinary';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import { findUserById } from '../repositories/shop/customer.js';

// Configure Cloudinary
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const saveArticle = async (req, res) => {
  const { title, thumbnail, content, description } = req.body;

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
};

export const getNotices = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM notice ORDER BY date DESC');
    res.status(200).json({ data: result.rows });
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteAccount = async (req, res) => {
  const { user_id, password } = req.body;

  const user = await findUserById({ user_id });

  const auth = await bcrypt.compare(password, user?.password);
  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' });
  }
  if (!auth) {
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
};

export const versionCheck = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM app
       ORDER BY id DESC
       LIMIT 1`
    );

    const { current_version } = req.body || {};
    const response = result.rows[0];

    if (parseInt(current_version) !== parseInt(response?.version)) {
      res.status(201).json({ success: true, is_latest: false, url: response?.file_url, summary: response?.summary });
    } else {
      res.status(201).json({ success: true, is_latest: true, url: response?.file_url, summary: response?.summary });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }
    const productId = req.body.productId;
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (req.file.size > MAX_FILE_SIZE) {
      return res.status(400).json({
        success: false,
        message: 'File size exceeds 5MB limit',
      });
    }

    const uploadOptions = {
      resource_type: 'auto',
      folder: productId ? productId.trim() : undefined,
      public_id: `${nanoid()}-${productId}`,
      use_filename: false,
      unique_filename: false,
      overwrite: false,
      transformation: [
        { width: 1000, height: 1000, crop: 'limit' },
        { quality: 'auto' },
      ],
    };

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
};

export const deleteFile = async (req, res) => {
  try {
    const { url, type } = req.body;

    const extractPublicId = (url) => {
      try {
        const parts = url.split('/upload/');
        if (parts.length < 2) {
          throw new Error('Invalid Cloudinary URL');
        }
        const pathWithVersion = parts[1];
        const pathParts = pathWithVersion.split('/');
        if (pathParts[0].startsWith('v')) {
          pathParts.shift();
        }
        const fileWithExt = pathParts.pop();
        const fileName = fileWithExt.split('.')[0];
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

    const result = await v2.uploader.destroy(publicId, {
      timeout: 60000,
      invalidate: true,
      resource_type: type === 'video' ? 'video' : 'image'
    });

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
};

export const getImageFolder = async (req, res) => {
  const { folderName } = req.query;

  async function fetchFolderAssets(folderName) {
    try {
      const result = await v2.search
        .expression(`folder:${folderName}`)
        .sort_by('public_id', 'desc')
        .max_results(100)
        .execute();

      res.send(result.resources);
    } catch (error) {
      console.error('Error fetching folder assets:', error);
    }
  }

  fetchFolderAssets(folderName);
};

export const getVendorReport = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: 'Missing user_id' });
  }

  try {
    const sellerShopRes = await pool.query(
      'SELECT * FROM products WHERE user_id = $1',
      [user_id]
    );
    const sellerShops = sellerShopRes.rows;

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

    const mappedOrders = await Promise.all(
      sellerShops.map((item) => getOrders(item))
    );
    const filteredOrders = mappedOrders.filter((item) => item !== null);

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
};

export const updatePhoto = async (req, res) => {
  const { photo, user_id } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET photo = $1 WHERE user_id = $2 RETURNING *`,
      [photo, user_id]
    );

    const updatedUser = result.rows[0];

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
};

export const getPackages = async (req, res) => {
  try {
    const packages = await pool.query('SELECT * FROM packages');
    const packageData = packages.rows;

    res.status(200).json({ packageData });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

export const getSubscription = async (req, res) => {
  const { user_id } = req.query || {};

  try {
    const result = await pool.query(
      'SELECT * FROM subscriptions WHERE user_id = $1',
      [user_id]
    );

    res.status(200).send({
      subscribed: result.rows[0].plan !== 'Free' ? true : false,
      data: result.rows[0]
    });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).send({ error: 'Server Error' });
  }
};
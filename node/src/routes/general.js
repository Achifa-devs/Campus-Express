import express from 'express';
import multer from 'multer';
import { parser } from '../utils/parser.js';
import { authenticate } from '../middleware/auth.js';
import {
  saveArticle,
  getNotices,
  deleteAccount,
  versionCheck,
  uploadFile,
  deleteFile,
  getImageFolder,
  getVendorReport,
  updatePhoto,
  getPackages,
  getSubscription
} from '../controllers/general.js';
import { v2 } from 'cloudinary';

const router = express.Router();

// Configure Cloudinary
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Save article
router.post('/save-article', saveArticle);

// Get notices
router.get('/notice', getNotices);

// Delete account
router.post('/account/delete', authenticate, deleteAccount);

// Version check
router.post('/version-check', parser, versionCheck);

// Upload file
router.post('/upload', upload.single('file'), uploadFile);

// Delete file
router.post('/delete', deleteFile);

// Get image folder
router.get('/image-folder', getImageFolder);

// Vendor report
router.get('/vendor/report', getVendorReport);

// Update photo
router.post('/update-photo', parser, updatePhoto);

// Get packages
router.get('/packages', getPackages);

// Get subscription
router.get('/subscription', getSubscription);

export { router as GENERAL_ROUTE };
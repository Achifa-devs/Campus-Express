// src/routes/uploads.js
const express = require('express');
const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.bin';
    cb(null, `${Date.now()}_${Math.random().toString(36).slice(2,8)}${ext}`);
  }
});
const upload = multer({ storage });

router.post('/file', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`; // serve statically
  res.json({ url, filename: req.file.filename });
});

module.exports = router;

// src/auth.js
const jwt = require('jsonwebtoken');
const db = require('./config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

async function authMiddleware(req, res, next) {
  try {
    const auth = req.headers.authorization;
    console.log('auth: ', auth)
    if (!auth) return res.status(401).json({ error: 'Missing token' });
    const parts = auth.split(' ');
    if (parts.length !== 2) return res.status(401).json({ error: 'Invalid token' });
    const token = parts[1];
    const payload = jwt.verify(token, JWT_SECRET);
    // Optionally you can fetch the user from DB
    const { rows } = await db.query('SELECT id, fname, lname, email, photo FROM users WHERE user_id = $1', [payload.sub]);
    if (!rows[0]) return res.status(401).json({ error: 'User not found' });
    req.user = rows[0];
    next();
  } catch (err) {
    console.error('Auth error', err);
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = { authMiddleware, JWT_SECRET };

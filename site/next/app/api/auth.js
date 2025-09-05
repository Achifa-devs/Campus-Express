/**
 * JWT authentication utilities with environment-based secrets
 */
import jwt from 'jsonwebtoken';

/**
 * Create JWT token with environment-based secret
 * @param {Object} payload - Token payload
 * @param {string} secret - JWT secret (optional, uses env var if not provided)
 * @returns {string} JWT token
 */
export const createToken = (payload, secret = null) => {
  const jwtSecret = secret || process.env.JWT_SECRET || process.env.BUYER_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET environment variable is required');
  }

  return jwt.sign(payload, jwtSecret, { expiresIn: '7d' });
};

/**
 * Verify JWT token with environment-based secret
 * @param {string} token - JWT token to verify
 * @param {string} secret - JWT secret (optional, uses env var if not provided)
 * @returns {Object|null} Decoded token payload or null if invalid
 */
export const verifyToken = (token, secret = null) => {
  try {
    const jwtSecret = secret || process.env.JWT_SECRET || process.env.BUYER_SECRET;

    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is required');
    }

    return jwt.verify(token, jwtSecret);
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return null;
  }
};

/**
 * Extract token from request headers
 * @param {Request} req - Next.js request object
 * @returns {string|null} Token or null if not found
 */
export const extractTokenFromHeader = (req) => {
  const authHeader = req.headers.get('authorization');

  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  return null;
};

/**
 * Middleware to verify JWT token
 * @param {Request} req - Next.js request object
 * @returns {Object} User object or throws error
 */
export const authenticateRequest = (req) => {
  const token = extractTokenFromHeader(req);

  if (!token) {
    throw new Error('No token provided');
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    throw new Error('Invalid token');
  }

  return decoded;
};

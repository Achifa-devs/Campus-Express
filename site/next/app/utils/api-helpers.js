/**
 * API Helper utilities with retry logic and error handling
 */

import { NextResponse } from 'next/server';

/**
 * Sleep function for delays
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise}
 */
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise}
 */
export const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 1000) => {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === maxRetries) {
        break;
      }

      // Calculate delay with exponential backoff and jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      console.warn(`Attempt ${attempt + 1} failed, retrying in ${delay}ms:`, error.message);
      await sleep(delay);
    }
  }

  throw lastError;
};

/**
 * Database query with retry logic
 * @param {Object} pool - Database connection pool
 * @param {string} query - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise}
 */
export const queryWithRetry = async (pool, query, params = []) => {
  return retryWithBackoff(async () => {
    const result = await pool.query(query, params);
    return result;
  }, 3, 500);
};

/**
 * API response helper
 * @param {boolean} success - Success status
 * @param {any} data - Response data
 * @param {string} message - Optional message
 * @param {number} status - HTTP status code
 * @returns {NextResponse}
 */
export const createApiResponse = (success, data = null, message = '', status = 200) => {
  const response = {
    success,
    data,
    message,
    timestamp: new Date().toISOString()
  };

  return NextResponse.json(response, { status });
};

/**
 * Error response helper
 * @param {string} message - Error message
 * @param {number} status - HTTP status code
 * @param {Error} error - Optional error object
 * @returns {NextResponse}
 */
export const createErrorResponse = (message, status = 500, error = null) => {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };

  if (error && process.env.NODE_ENV === 'development') {
    response.error = error.message;
    response.stack = error.stack;
  }

  return NextResponse.json(response, { status });
};

/**
 * Validate required fields
 * @param {Object} data - Data object to validate
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} - Validation result
 */
export const validateRequiredFields = (data, requiredFields) => {
  const missing = requiredFields.filter(field => !data[field]);
  return {
    isValid: missing.length === 0,
    missingFields: missing
  };
};

/**
 * Sanitize input data
 * @param {string} input - Input string to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

/**
 * Rate limiting helper (basic implementation)
 * @param {string} identifier - Unique identifier for rate limiting
 * @param {number} limit - Maximum requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {boolean} - Whether request is allowed
 */
export const checkRateLimit = (identifier, limit = 100, windowMs = 15 * 60 * 1000) => {
  // This is a basic implementation - in production, use Redis or similar
  const key = `rate_limit_${identifier}`;
  const now = Date.now();

  // For now, just return true (implement proper rate limiting with Redis in production)
  return true;
};
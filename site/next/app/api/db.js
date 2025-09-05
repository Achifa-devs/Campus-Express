/**
 * Database configuration with connection pooling
 * Uses environment variables for security
 */

import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
  connectionTimeoutMillis: 10000, // 10s to establish connection
  idleTimeoutMillis: 30000,       // close idle clients after 30s
  max: 20,                        // maximum number of clients in pool
  min: 2,                         // minimum number of clients in pool
});

// Handle connection errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Handle successful connections
pool.on('connect', () => {
  console.log('New client connected to database');
});

export default pool;

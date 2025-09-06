
const { Pool } = require('pg');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;

// Build config supporting both DATABASE_URL and discrete credentials
const baseConfig = DATABASE_URL
  ? {
      connectionString: DATABASE_URL,
      ssl:
        process.env.DB_SSL === 'false'
          ? false
          : { require: true, rejectUnauthorized: false },
    }
  : {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 5432),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl:
        process.env.DB_SSL === 'true'
          ? { require: true, rejectUnauthorized: false }
          : false,
    };

const config = {
  ...baseConfig,
  connectionTimeoutMillis: 10_000,
  idleTimeoutMillis: 30_000,
  max: 20,
};

// Reuse pool across serverless invocations
let pool = global._pgPool;
if (!pool) {
  pool = new Pool(config);
  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
  });
  global._pgPool = pool;
}

module.exports = pool;

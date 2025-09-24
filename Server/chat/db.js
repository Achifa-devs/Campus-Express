
require('dotenv').config();
// dotenv.config();

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,                     // Neon suggests small pools
  connectionTimeoutMillis: 50000,
  idleTimeoutMillis: 10000,
});


pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;









































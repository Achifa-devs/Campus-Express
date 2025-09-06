
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

const config = {
  connectionString: DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false, // Neon serverless
  },
  // Keep pool small for serverless to avoid connection storms
  max: 3,
  // Increase connection timeout to reduce ECONN timeout on cold starts/network jitter
  connectionTimeoutMillis: 15000,
  // Keep idle connections around a bit longer to improve reuse between invocations
  idleTimeoutMillis: 30000,
  // Improve reliability on some platforms
  keepAlive: true,
  keepAliveInitialDelayMillis: 0,
  application_name: 'paystack-server',
  // Add a client-side query timeout as a safety net
  query_timeout: 10000
};

const pool = new Pool(config);

// Set server-side timeouts for each new connection
pool.on('connect', async (client) => {
  try {
    await client.query("SET statement_timeout TO '10s'");
    await client.query("SET idle_in_transaction_session_timeout TO '10s'");
  } catch (err) {
    console.error('Failed to set session timeouts', err);
  }
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  // Do not exit; in serverless environments this would crash the instance
});

module.exports = pool;

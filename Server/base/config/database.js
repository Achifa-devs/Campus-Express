
const pkg = require('pg')
require('dotenv').config()


const { Pool } = pkg;
const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false, // needed for Neon
  },
  connectionTimeoutMillis: 100000,
  idleTimeoutMillis: 300000,
  max: 20,
};

const pool = new Pool(config);

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;









































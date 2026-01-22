import { Pool } from 'pg';

const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 100000,
  idleTimeoutMillis: 300000,
  max: 20,
};

// Create a singleton pool instance
let pool;

function getPool() {
  if (!pool) {
    pool = new Pool(config);
    
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }
  return pool;
}

export default getPool();

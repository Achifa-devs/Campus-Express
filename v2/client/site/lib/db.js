import { Pool } from 'pg';

const connectionString = process.env.NEXT_PUBLIC_DATABASE_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ No DATABASE_URL or NEXT_PUBLIC_DATABASE_URL found in environment');
}

const config = {
  connectionString,
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
    console.log('🔗 Creating new database pool...');
    pool = new Pool(config);
    
    pool.on('error', (err) => {
      console.error('❌ Unexpected error on idle client', err);
    });
    
    pool.on('connect', () => {
      console.log('✅ Database connected');
    });
  }
  return pool;
}

export default getPool();

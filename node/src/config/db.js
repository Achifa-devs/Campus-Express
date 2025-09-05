// import pkg from 'pg';
// const { Pool } = pkg;

// const DATABASE_URL = "postgres://achifa.io.llc:cflV8XEbCO7h@ep-billowing-sunset-28191429-pooler.us-east-2.aws.neon.tech/neondb";

// const config = {
//   connectionString: DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   },
//   // Better timeout settings
//   connectionTimeoutMillis: 10000, // 10 seconds (not 1 billion!)
//   idleTimeoutMillis: 30000,       // 30 seconds
//   max: 20,                        // Maximum number of clients in the pool
// };

// const pool = new Pool(config);

// // Handle connection errors
// pool.on('error', (err) => {
//   console.error('Unexpected error on idle client', err);
//   process.exit(-1);
// });

// export default pool;

import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;
const DATABASE_URL = process.env.DATABASE_URL;

const config = {
  connectionString: DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false, // needed for Neon
  },
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
  max: 20,
};

const pool = new Pool(config);

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;

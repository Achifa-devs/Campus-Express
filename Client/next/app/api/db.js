// lib/db.js
import { Pool } from 'pg';

const DATABASE_URL = "postgres://achifa.io.llc:cflV8XEbCO7h@ep-billowing-sunset-28191429-pooler.us-east-2.aws.neon.tech/neondb";

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
  connectionTimeoutMillis: 10000, // 10s to establish connection
  idleTimeoutMillis: 10000        // close idle clients after 10s
});

export default pool;

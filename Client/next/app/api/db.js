// lib/db.js
import { Pool } from 'pg';

const DATABASE_URL = "postgresql://achifa.io.llc:cflV8XEbCO7h@ep-billowing-sunset-28191429-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

let pool;

if (!global.pgPool) {
  global.pgPool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // required by Neon
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });
}

pool = global.pgPool;

export default pool;

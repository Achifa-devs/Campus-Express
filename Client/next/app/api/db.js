// lib/db.js
import { Pool } from 'pg';

const DATABASE_URL = "postgresql://achifa.io.llc:cflV8XEbCO7h@ep-small-block-a55csuu3-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

// Force IPv4 by adding `?options=--inet-family=ipv4`
const connectionString = DATABASE_URL.includes('?')
  ? `${DATABASE_URL}`
  : `${DATABASE_URL}`;

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required by Neon
  },
  max: 10, // max connections in pool
  idleTimeoutMillis: 30000, // close idle connections after 30s
  connectionTimeoutMillis: 10000, // fail if no connection after 10s
});

export default pool;

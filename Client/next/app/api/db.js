
// lib/db.js
import { Pool } from 'pg';

let  DATABASE_URL  = "postgres://achifa.io.llc:cflV8XEbCO7h@ep-billowing-sunset-28191429-pooler.us-east-2.aws.neon.tech/neondb";

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    createTimeoutMillis: 8000,
    connectionTimeoutMillis: 10000000,
    acquireTimeoutMillis: 8000,
    idleTimeoutMillis: 8000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100
});

export default pool;

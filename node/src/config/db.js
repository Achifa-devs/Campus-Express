import  Pool  from 'pg';

const DATABASE_URL = "postgres://achifa.io.llc:cflV8XEbCO7h@ep-billowing-sunset-28191429-pooler.us-east-2.aws.neon.tech/neondb";

const config = {
  connectionString: DATABASE_URL,
  ssl: { 
    rejectUnauthorized: false,
  },
  // Optional pool tuning (can remove if not needed)
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 10000,
};

const pool = new Pool.Pool(config);

export default pool;

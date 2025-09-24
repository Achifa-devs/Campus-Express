import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const {
  Pool
} = pkg;
const DATABASE_URL = "postgres://achifa.io.llc:cflV8XEbCO7h@ep-billowing-sunset-28191429-pooler.us-east-2.aws.neon.tech/neondb";
const config = {
  connectionString: DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false // needed for Neon
  },
  connectionTimeoutMillis: 100000,
  idleTimeoutMillis: 300000,
  max: 20
};
const pool = new Pool(config);
pool.on('error', err => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});
export default pool;
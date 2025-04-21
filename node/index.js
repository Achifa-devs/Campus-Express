
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import dotenv from "dotenv";    
import { CUSTOMER_ROUTE } from "./src/routes/shop.js";
import { VENDOR_ROUTE } from "./src/routes/vendor.js";

dotenv.config();
const CAMPUSSPHERE_SERVER = express();  

CAMPUSSPHERE_SERVER.use(cookieParser()); 
CAMPUSSPHERE_SERVER.use(morgan('dev'));   
CAMPUSSPHERE_SERVER.options('*', cors());

CAMPUSSPHERE_SERVER.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'UPDATE'],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'cs-gender'],
})); 

const server = CAMPUSSPHERE_SERVER.listen(process.env.PORT,_ => console.log('CAMPUSSPHERE_SERVER is live @',process.env.PORT));


CAMPUSSPHERE_SERVER.use(CUSTOMER_ROUTE)
CAMPUSSPHERE_SERVER.use(VENDOR_ROUTE)

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
});
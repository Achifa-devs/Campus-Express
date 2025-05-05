import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import dotenv from "dotenv";
import { CUSTOMER_ROUTE } from "./src/routes/shop.js";
import { VENDOR_ROUTE } from "./src/routes/vendor.js";
import sendNotification from "./src/utils/FCM.js";

dotenv.config();

const CAMPUSSPHERE_SERVER = express();

CAMPUSSPHERE_SERVER.use(cookieParser());
CAMPUSSPHERE_SERVER.use(morgan('dev'));
CAMPUSSPHERE_SERVER.use(express.json()); // <- this is necessary to parse JSON

CAMPUSSPHERE_SERVER.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'UPDATE'],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'cs-gender'],
}));

// Firebase notification endpoint
CAMPUSSPHERE_SERVER.post('/notify', (req, res) => {
  const { token, title, body, media, price, product_id } = req.body;
  sendNotification(token, title, body, media, price, product_id);
  res.send({ status: 'Notification sent!' });
});

CAMPUSSPHERE_SERVER.use(CUSTOMER_ROUTE);
CAMPUSSPHERE_SERVER.use(VENDOR_ROUTE);

const server = CAMPUSSPHERE_SERVER.listen(process.env.PORT, () => {
  console.log('CAMPUSSPHERE_SERVER is live @', process.env.PORT);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
});

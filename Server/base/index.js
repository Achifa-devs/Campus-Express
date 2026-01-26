const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { v2 } = require('cloudinary');
const cron = require('node-cron')
const pool = require('./config/database')

// Load environment variables FIRST
require('dotenv').config();

const userRouter = require('./routes/user');
const shopRouter = require('./routes/shop');
const generalRouter = require('./routes/general');
const productRouter = require('./routes/product');
const dealRouter = require('./routes/deals');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'UPDATE'],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'cs-gender'],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(userRouter);
app.use(shopRouter);
app.use(generalRouter);
app.use(productRouter);
app.use(dealRouter);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Campus Sphere API is running',
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development'
  });
});


// Start server
const PORT = process.env.PORT || 5432;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Process handlers
process.on('unhandledRejection', (reason, promise) => {
  console.log('❌ Unhandled Rejection at:', reason.stack || reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed.');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed.');
    process.exit(0);
  });
});

// If you also want to run immediately at server start, uncomment below
// checkAndUpdatePromotions(); 
// checkAndUpdateSubscriptions()


cron.schedule("* * * * *", async () => { 
  try {
    await pool.query("DELETE FROM token WHERE expires_at < NOW() - INTERVAL '1 minute'");
    console.log("Expired tokens deleted"); 
  } catch (err) {  
    console.error("Error deleting tokens:", err);  
  } 
});    
// Remove or comment out the test email code at the bottom

// const registrationTemplate = require('./email_templates/welcome');
// const tools = require('./utils/tools');

// (async () => {
//   try {
//     // Generate the email HTML template
//     const mail = registrationTemplate('Akpulu.F', 'akpulufabian@gmail.com', 'Unizik, Awka');
    
//     // Send the email
//     const emailSent = await tools.send_email(
//       'Token for Password Recovery',
//       mail,
//       'akpulufabian@gmail.com'
//     );

//     console.log('Email sent:', emailSent);
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// })
// ();

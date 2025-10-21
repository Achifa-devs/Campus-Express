const express = require('express');
const mocha = require('mocha');
const cors = require('cors');
const morgan = require('morgan');
const cookieparser = require('cookie-parser');
const bodyParser = require('body-parser');
const { v2 } = require('cloudinary');
const userRouter = require('./routes/user');
const shopRouter = require('./routes/shop');
const generalRouter = require('./routes/general');
const app = express();

app.use(morgan('dev'));
app.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'UPDATE'],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'cs-gender'],
}));

app.use(userRouter)
app.use(shopRouter)
app.use(generalRouter)

require('dotenv').config()

app.listen(process.env.PORT, (port) => {
    console.log(`Listening to port ${process.env.PORT}`)
})

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
});


const { 
  express,
  parser,
  morgan,
  cors,
  io, 
  shortId,
  bcrypt
} = require('./reuseables/modules');
const fs = require('fs-extra');
const {
  seller_route 
} = require('./route/seller')
const cookieParser = require('cookie-parser');
const { 
  buyer_route 
} = require('./route/buyer');
const greetingTime = require("greeting-time");
const { send_email, send_mail_via_outlook, send_mail_via_brevo } = require('./reuseables/utils');
const multer = require('multer');
const { NeonDB } = require('./reuseables/db');
greetingTime(new Date());
require'dotenv').config();    
const app = express();  

app.use(cookieParser()); 
app.use(morgan('dev'));   
app.options('*', cors());

app.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'UPDATE'],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'cs-gender'],
})); 
app.use(seller_route) 
app.use(buyer_route)
// app.use(admin_route)


var server = app.listen(process.env.PORT,_ => console.log('app is live @',process.env.PORT));
io(server, {cors: {origin: '*'}}).on('connection',(socket) => {});


app.post("/bank-verification", parser, (req,res) => {
  let {acct,code} = req.body;

  const Flutterwave = require('flutterwave-node-v3');
    const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
    const details = {
      account_number: acct,
      account_bank: code
    };
    flw.Misc.verify_Account(details)
    .then(result => result.status === 'success' ? res.status(200).send({name:result.data.account_name, bool: true}) : res.status(503).send('error'))
    .catch(err => console.log(err));

})

app.get('/image-folder', (req,res) => {
  let {folderName} = req.query
  // Configure Cloudinary with your credentials
  const cloudinary = require('cloudinary').v2;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  async function fetchFolderAssets(folderName) {
    try {
      const result = await cloudinary.search
      .expression(`folder:${folderName}`)
      .sort_by('public_id', 'desc') // Optional: Sort results by public_id
      .max_results(100) // Adjust as needed; max is 500
      .execute();
      
      console.log(result.resources);
      res.send(result.resources);
    } catch (error) {
      console.error('Error fetching folder assets:', error);
    }
  }

  // Call the function and pass the folder name you want to fetch assets from
  fetchFolderAssets(folderName);
})



process.on('unhandledRejection', (reason, promise) => {
  // console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use  
});

// Execute the function
// setThumbnails();
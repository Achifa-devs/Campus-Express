const { 
  express,
  parser,
  morgan,
  cors,
  io 
} = require('./reuseables/modules');
const FormData = require('form-data');
const axios = require('axios');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs-extra');
const {
  seller_route 
} = require('./route/seller')
const {
  admin_route
} = require('./route/admin')
const cookieParser = require('cookie-parser');
const { 
  buyer_route 
} = require('./route/buyer');
const greetingTime = require("greeting-time");
greetingTime(new Date());
require('dotenv').config();    
const app = express();  


app.use(cookieParser());
app.use(morgan('tiny'));   
app.options('*', cors());

app.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'UPDATE'],
  credentials: true,
  optionsSuccessStatus: 200
})); 
app.use(seller_route) 
app.use(buyer_route)
// app.use(admin_route)


var server = app.listen(process.env.PORT,_ => console.log('app is live @',process.env.PORT));
io(server, {cors: {origin: '*'}}).on('connection',(socket) => {});


app.post("/bank-verification", parser, (req,res) => {
  let {acct,code} = req.body;

  console.log('dara:',req.body)

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

process.on('unhandledRejection', (reason, promise) => {
  // console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use  
});






// Function to decode Base64 and save video file
function saveBase64Video(base64String, outputPath) {
  const base64Data = base64String.replace(/^data:video\/\w+;base64,/, '');
  const videoBuffer = Buffer.from(base64Data, 'base64');

  return new Promise((resolve, reject) => {
    fs.writeFile(outputPath, videoBuffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(outputPath);
      }
    });
  });
}


app.post('/video-trimmer', parser, (req,res) => {
  let {video, originalFilename} = req.body;

})


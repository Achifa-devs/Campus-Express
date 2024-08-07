const { 
  express,
  parser,
  morgan,
  cors,
  io 
} = require('./reuseables/modules');  
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
  console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use  
});


// Copyright 2016 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * Usage: node upload.js PATH_TO_VIDEO_FILE
 */






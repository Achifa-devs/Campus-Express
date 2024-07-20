const { 
  express,
  path,
  fs,
  parser,
  mocha, 
  morgan,
  cors,
  shortId,
  jwt,
  io 
} = require('./modules');  
const {
  NeonDB 
} = require('./db');
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
const { 
  default: axios 
} = require('axios');
const { 
  retrieve_room, 
  retrieve_seller,     
  retrieve_products, 
  campus_coin_payment_for_seller,
  shop_rent_payment_for_seller,
  deactivate_listing_due_to_debt,
  send_email,
  retrieve_product_with_id,
  retrive_item_with_seller_id
} = require('./utils');
const { 
    adsMail, cronListingDeativation
} = require("./templates");
const { 
  v4 
} = require('uuid');
   
greetingTime(new Date());
require('dotenv').config();    
const app = express();  


app.use(cookieParser());
app.use(morgan('dev'));   
app.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'UPDATE'],
  credentials: true,
  optionsSuccessStatus: 200
})); 
app.use(seller_route) 
app.use(buyer_route)
app.use(admin_route)



var server = app.listen(process.env.PORT,_ => console.log('app is live @',process.env.PORT));
io(server, {cors: {origin: '*'}}).on('connection',(socket) => {
  
  

});

app.post("/bank-verification", parser, (req,res) => {
  let {acctNum,Bank} = req.body;

  console.log('dara:',req.body)

  const Flutterwave = require('flutterwave-node-v3');
    const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
    const details = {
      account_number: acctNum,
      account_bank: Bank
    };
    flw.Misc.verify_Account(details)
    .then(result => result.status === 'success' ? res.status(200).send({name:result.data.account_name}) : res.status(503).send('error'))
    .catch(err => console.log(err));

})

app.post("/transfer", parser, async(req,res) => { 
  let {withdrwawalAmount,acctNum,Bank,acctName} = req.body;
  const https = require('https')
  const { v4: uuidv4, v4 } = require('uuid');
  console.log(withdrwawalAmount)


  function initiateTransfer(recipient) {
    const params = JSON.stringify({
      "source": "balance",
      "amount": withdrwawalAmount,
      "reference": uuidv4(),
      "recipient": recipient,
      "reason": "Withdrawal"
    })
  
    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transfer',
      method: 'POST',
      headers: {
        Authorization: process.env.PAYSTACK_SECRET_KEY,
        'Content-Type': 'application/json'
      }
    }
  
    const request = https.request(options, res => {
      let data = ''
  
      res.on('data', (chunk) => {
        data += chunk
      });
  
      res.on('end', () => {
        console.log(JSON.parse(data))
      })
    }).on('error', error => {
      console.error(error)
    })
  
    request.write(params)
    request.end()
  
  }
  
  async function createRecipient() {
    try {
      const params = {
        type: 'nuban',
        name: acctName,
        account_number: acctNum,
        bank_code: bank,
        currency: 'NGN',
      };

      const response = await axios.post('https://api.paystack.co/transferrecipient', params, {
        headers: {
          Authorization: process.env.PAYSTACK_SECRET_KEY,
          'Content-Type': 'application/json',
        },
      });

      const result = response.data;
      let code = result.data.recipient_code;
      return(code)

      // Handle the result or return the code as needed

    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  }
  
  try {
    let code = await createRecipient();
    initiateTransfer(code)
  } catch (error) {
    console.log(error)
  }
})

app.post('/share-image', parser, (req,res) => {

  let {user} = req.body;

  let user_id = JSON.parse(user.id)
  let dates = JSON.parse(user.date)
  let counts = JSON.parse(user.visits)
  NeonDB.then((pool) => 
    pool.query(`INSERT INTO visitors(id, user_id, dates, counts, isRegistered, buyer_id) values(DEFAULT, ${user_id}, ${JSON.stringify(dates)}, ${counts})`)
    .then(result => res.send(result.rows[0].file))
    .catch(err => {
      console.log(err)
    })
  )
  .catch(err => console.log(err))
 
  
})

const { Client } = require('pg');
const cron = require('node-cron');
const { regTxtMail } = require('./mail/reg');
const { algo } = require('./promotional_algo');
const { accessSync } = require('fs');


// Function to check registration dates
async function checkUserRegistrationDates() {
  try {

    let dateList = await NeonDB.then((pool) => 
      pool.query(`SELECT * FROM campus_sellers`)
      .then(result => result.rows)
      .catch(err => {
        console.log(err)
      })
    )
    .catch(err => console.log(err));

    const currentDate = new Date().getTime();

    dateList.forEach(async(user) => {
      const registrationDate = new Date(user.date).getTime();
      const timeDiff = Math.abs(currentDate - registrationDate);
      const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      if(diffDays >= 15){
        let response = await campus_coin_payment_for_seller(10,user.seller_id);
        if(response){
          let rent = await shop_rent_payment_for_seller(10,15,user.seller_id)
          if(rent){

          }
        }
      }

    });
  } catch (err) {
    console.error('Error checking registration dates', err.stack);
  }
}

async function checkSellerListing() {
  try {

    let dateList = await NeonDB.then((pool) => 
      pool.query(`SELECT * FROM campus_shop`)
      .then(result => result.rows)
      .catch(err => {
        console.log(err)
      })
    )
    .catch(err => console.log(err));

    const currentDate = new Date().getTime();

    dateList.forEach(async(user) => {
      const registrationDate = new Date(user.rent.date).getTime();
      const timeDiff = Math.abs(currentDate - registrationDate);
      const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      if(diffDays >= 30){
        let response = await deactivate_listing_due_to_debt(user.seller_id);
        if(response){
          let seller = await retrieve_seller(user.seller_id)
          let html = cronListingDeativation()
          BrevoTemp('Rent Expiration', seller.email, html)
        }
      }

    });
  } catch (err) {
    console.error('Error checking registration dates', err.stack);
  }
}

// Schedule the task to run every 24 hours
cron.schedule('0 0 * * *', () => {
    console.log('Running daily registration date check');
    checkUserRegistrationDates();
}, {
    scheduled: true,
    timezone: "UTC" // Adjust the timezone as needed
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Closing database connection');
    client.end()
        .then(() => {
            console.log('Database connection closed');
            process.exit(0);
        })
        .catch(err => {
            console.error('Error closing database connection', err.stack);
            process.exit(1);
        });
});


// Function to delete rows older than 5 minutes
const deleteOldTokens = async() => {
 
  await NeonDB.then((pool) => 
    pool.query(`select * from pwd_token`)
    .then(result => {
      let data = result.rows;
      data.map(async(item) => {
        const createdAt = new Date(item.date);
        const now = new Date();
        const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

          if (createdAt < fiveMinutesAgo) {
            NeonDB.then((pool) => 
              pool.query(`DELETE FROM pwd_token 
              WHERE token='${item.token}'`)
              .then(result => console.log('pwd:',result.rows))
              .catch(err => {
                console.log(err)
              })
            )
            .catch(err => {
              console.log(err)
            })
          }
      })
    })
    .catch(err => {
      console.log(err)
    })
  )
  .catch(err => console.log(err));


  await NeonDB.then((pool) => 
    pool.query(`select * from phone_token`)
    .then(result => {
      let data = result.rows;
      data.map(async(item) => {
        const createdAt = new Date(item.date);
        const now = new Date();
        const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

          if (createdAt < fiveMinutesAgo) {
            NeonDB.then((pool) => 
              pool.query(`DELETE FROM phone_token 
              WHERE token='${item.token}'`)
              .then(result => console.log('phone:',result.rows))
              .catch(err => {
                console.log(err)
              })
            )
            .catch(err => {
              console.log(err)
            })
          }
      })
    })
    .catch(err => {
      console.log(err)
    })
  )
  .catch(err => console.log(err));


  await NeonDB.then((pool) => 
    pool.query(`select * from email_token`)
    .then(result => {
      let data = result.rows;
      data.map(async(item) => {
        const createdAt = new Date(item.date);
        const now = new Date();
        const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

          if (createdAt < fiveMinutesAgo) {
            NeonDB.then((pool) => 
              pool.query(`DELETE FROM email_token 
              WHERE token='${item.token}'`)
              .then(result => console.log('email:',result.rows))
              .catch(err => {
                console.log(err)
              })

            )
            .catch(err => {
              console.log(err)
            })
          }
      })
    })
    .catch(err => {
      console.log(err)
    })
  )
  .catch(err => console.log(err));
  
};

// Schedule the task to run every 5 minutes
// cron.schedule('*/10 * * * * ', () => {
//   console.log('Running the deleteOldTokens function...');
//   deleteOldTokens();
// });

// Handle script termination
process.on('SIGINT', () => {
  connection.end((err) => {
      if (err) {
          console.error('Error ending the database connection:', err.stack);
      }
      console.log('Database connection closed.');
      process.exit();
  });
});


process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use  
});


app.get('/hello', async(req,res)=> {

  let book = []
  let result = await retrieve_products();
  

})




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


// if (module === require.main) {
//   const fileName = process.argv[2]; 
//   runSample('./vids/VID_20240403_071234.mp4').catch(console.error);
// }

// runSample('./vids/VID_20240403_071234.mp4'); 






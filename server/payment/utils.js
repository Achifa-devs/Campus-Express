const { NeonDB } = require("./db");
const { coinTxtMail } = require("./mails/coin");
const { express,path,fs,parser,mocha,morgan,cors,shortId,jwt,io} = require('./modules');
require('dotenv').config(); 
async function save_buyer_tansaction(buyer_id,payment_src,payment_type,app_fee,amount,date,reason) {
    return(
      await NeonDB.then((pool) => 
        pool.query(`insert into buyer_transactions(
          id,
          buyer_id,
          payment_src,
          payment_type,
          app_fee,
          amount,
          date,
          reason
        ) 
        values(
          DEFAULT, 
          '${buyer_id}',
          '${payment_src}',
          '${payment_type}',
          '${app_fee}',
          '${amount}',
          '${date}',
          '${reason}')
          `)

            .then(result => result.rowCount > 0 ? ({bool: true}) : ({bool: false}))
            .catch(err => console.log(err))
            // .finally(() => pool.end())
          
        )
      .catch(err => console.log(err))
    )
}

async function save_seller_tansaction(seller_id,payment_src,payment_type,app_fee,amount,date,reason) {
    return(
      await NeonDB.then((pool) => 
        pool.query(`insert into seller_transactions(
          id,
          seller_id,
          payment_src,
          payment_type,
          app_fee,
          amount,
          date,
          reason
        ) 
        values(
          DEFAULT, 
          '${seller_id}',
          '${payment_src}',
          '${payment_type}',
          ${app_fee},
          ${amount},
          '${date}',
          '${reason}')
          `)

            .then(result => result.rowCount > 0 ? ({bool: true}) : ({bool: false}))
            .catch(err => console.log(err))
            // .finally(() => pool.end())
          
        )
      .catch(err => console.log(err))
    )
}

function retrieve_seller(product_id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT seller_id FROM seller_shop WHERE product_id = '${product_id}'`)
            .then(result => (result.rows[0].seller_id))
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
    // return book;
}

function retrieve_seller_info(seller_id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT * FROM users WHERE seller_id = '${seller_id}'`)
            .then(result => (result.rows[0]))
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
    // return book;
}

async function retrieve_room(buyer_id,seller_id) {
    return(
        await NeonDB.then((pool) => 
            pool.query(`SELECT * FROM room_id`)
            .then(result => {
                let m = result.rows;
                let room = m.filter(item => JSON.parse(item.members_id).buyer_id === buyer_id && JSON.parse(item.members_id).seller_id === seller_id);
                return room.map(item => ({room_id: item.room_id, seller_id}));
                // room.map(item => (item.room_id));
            })
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
}

async function retrieve_buyer_info(buyer_id) {
    return(
        await NeonDB.then((pool) => 
            pool.query(`SELECT * FROM users WHERE buyer_id = '${buyer_id}'`)
            .then(result => result.rows[0])
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
}

function retrieve_room_with_room_id(id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT members_id FROM room_id WHERE room_id = '${id}'`)
            .then(result => result.rows[0])
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
}

function retrieve_mssg_meta_data(buyer_id,room_id,order_id) {
    // console.log('order_id: ', order_id)
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT * FROM message_meta_data WHERE sender_id = '${buyer_id}' AND room_id = '${room_id}' AND order_id = '${order_id}'`)
            .then(result => (result.rows))
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
}

function retrieve_mssg_meta_data_via_room(room_id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT * FROM message_meta_data WHERE room_id = '${room_id}'`)
            .then(result => (result.rows))
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
}

function retrive_cart(buyer_id) { 
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT * FROM campus_express_buyer_cart WHERE buyer_id = '${buyer_id}'`)
            .then(result => (result.rows))
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
}

function send_email(to,subject,message) {
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('token', process.env.KUDIAPI);
    data.append('senderEmail', 'campus-express@campusexpressng.com');
    data.append('senderName', 'Campus Express Nigeria');
    data.append('senderFrom', 'campus-express@campusexpressng.com');
    data.append('transactionName', 'Campus Express Nigeria');
    data.append('recipient', to);
    data.append('subject', subject);
    data.append('message', message);

    var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://my.kudisms.net/api/transactional',
    headers: { 
        ...data.getHeaders()
    },
    data : data
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });

}

function send_mail_via_outlook(email,subject,html) {
    const nodemailer = require('nodemailer');

    // Create a transporter using Outlook's SMTP settings
    let transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'campusexpress@outlook.com', // your Outlook email address
            pass: 'A!nianuli82003', // your Outlook email password
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    // Setup email data
    let mailOptions = {
        from: '"Campus Express" <campusexpress@outlook.com>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        // text: mssg, // plain text body
        html: html // html body
    }

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return true

    })

}

function send_sms(recipient,message) {
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('token', 'rXdAgTsFBOS8ECK7MZk1i6WojUmqy9unDv34cQablpz0JLHhIV5NfPG2teYwxR');
    data.append('senderID', 'CampusXpres');
    data.append('recipients', recipient);
    data.append('message', message);
    data.append('gateway', '2');

    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://my.kudisms.net/api/sms?token=rXdAgTsFBOS8ECK7MZk1i6WojUmqy9unDv34cQablpz0JLHhIV5NfPG2teYwxR&senderID=CampusXpres&recipients=${recipient}&message=${message}&gateway=2`,
        headers: { 
            ...data.getHeaders()
        },
        data : data
    };

    return (axios(config)
    .then(function (response) {
        console.log(response)
        return(
            response.data
        )
    })
    .catch(function (error) {
        console.log(error);
    }))
}

async function retrive_order(buyer_id,product_id) { 
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT order_id FROM campus_express_buyer_orders WHERE buyer_id = '${buyer_id}' AND product_id = '${product_id}'`)
            .then(result => (result.rows[0]))
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
}

async function delete_cart(product_id,buyer_id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`DELETE FROM campus_express_buyer_cart WHERE buyer_id = '${buyer_id}' AND product_id = '${product_id}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
}

async function delete_cart_with_id(id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`DELETE FROM campus_express_buyer_cart WHERE cart_id = '${id}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
}

async function send_proposal_message(mssg_type,mssg,order_id,sender_id,room_id) {
    let mssg_id = shortId.generate()
    let date = new Date()
    return(
        await NeonDB.then((pool) => 
        pool.query(`insert into messages(id,mssg_id,mssg_type,mssg,order_id,sender_id,room_id,date) values(DEFAULT,'${mssg_id}','${mssg_type}','${mssg}','${order_id}','${sender_id}','${room_id}','${date}')`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
            // .finally(() => pool.end())
        )
        .catch(err => console.log(err))
    )
}

async function update_order(product_id,buyer_id) {
    //stock
    let order_id = shortId.generate()
    let date = new Date()
    console.log(product_id,buyer_id)
    return(
      await NeonDB.then((pool) => 
        pool.query(`UPDATE campus_express_buyer_orders SET havePaid=${true} WHERE buyer_id='${buyer_id}' AND product_id='${product_id}' RETURNING order_id, stock, pick_up_channels`)
            .then(result => {
                return result.rowCount > 0 ? ({bool: true, order_id: result.rows[0].order_id, stock: result.rows[0].stock, address: result.rows[0].pick_up_channels[0].locale}) : ({bool: false})
            })
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        ) 
      .catch(err => console.log(err))
    )
}

async function create_room_id(seller_id,buyer_id) {
    let room_id = shortId.generate()
    let date = new Date()

    let check = await check_if_room_exist(seller_id,buyer_id);
    console.log('check :', check)

  
    if(check){
        await NeonDB.then((pool) => 
        pool.query(`insert into room_id (id,room_id,members_id,date) values(DEFAULT,'${room_id}','${JSON.stringify({buyer_id: buyer_id, seller_id: seller_id})}','${date}')`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    }else{
        return true
    }
}

async function check_if_room_exist(seller_id,buyer_id) {
  return(
    await NeonDB.then((pool) => 
      pool.query(`SELECT * FROM room_id`)
        .then(result => {
            let l = result.rows.filter(item => JSON.parse(item.members_id).buyer_id === buyer_id && JSON.parse(item.members_id).seller_id === seller_id)
        //   if(l.length > 0){return false}else{return true}
            let response =l.length > 0 ? false : true
            return response;
        // console.log('room id: ',l)
        })
        .catch(err => console.log(err))
        // .finally(() => pool.end())

      )
    .catch(err => console.log(err))
  )
}

async function update_buyer_assets(amount,buyer_id) {
    return(
        await NeonDB.then((pool) => 
            pool.query(`update campus_buyer_assets set coin = coin + ${amount} where buyer_id = '${buyer_id}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
            )
        .catch(err => console.log(err))
        
    )
}

async function update_seller_shop(amount,seller_id) {
    
    return(
        await NeonDB.then((pool) => 
            pool.query(`UPDATE campus_shop set coin=coin+${amount} WHERE seller_id = '${seller_id}'`)
            .then(result => {
                result.rowCount > 0 ?(true) :(false)
            })
            .catch(err => console.log(err))
        .catch(err => console.log(err)))
    )

}

function refill_coin(role,user,payment_src,payment_type,amount,date,coin,fee) {
    let message = coinTxtMail(`${user.fname} ${user.lname}`,coin,amount,transaction_ref,date)
    if(role === 'buyer'){

        new Promise((resolve,reject) => {
            let result = save_buyer_tansaction(user.buyer_id,payment_src,payment_type,fee,amount,date,'coin refill')
            result?resolve(result):reject(false)
        })
        .then(() => {
            let result = update_buyer_assets(amount,user.buyer_id)
            return result?(true):(false)
        })
        .then(() => {
            let result = send_email(user.email,'Confirmation of Successful Coin Purchase', message)
            return result?(true):(false)
        })
        .then(() => {
            let result = send_sms(user.phone,message)
            return result?res.send(true):res.send(false)
        })
        .catch(err => console.log(err))
        
    }else{
        
        new Promise((resolve,reject) => {
            let result = save_seller_tansaction(user.seller_id,payment_src,payment_type,fee,amount,date,'coin refill')
            result?resolve(result):reject(false)
        })
        .then(() => {
            let result = update_seller_shop(amount,user.seller_id)
            return result?(true):(false)
        })
        .then(() => {
            let result = send_email(user.email,'Confirmation of Successful Coin Purchase', message)
            return result?(true):(false)
        })
        .then(() => {
            let result = send_sms(user.phone,message)
            return result?res.send(true):res.send(false)
        })
        .catch(err => console.log(err))
    }
}

module.exports = {
    retrive_cart,
    refill_coin,
    create_room_id,
    send_sms,
    send_email,
    update_order,
    send_proposal_message,
    delete_cart,
    update_buyer_assets,
    retrieve_room_with_room_id,
    delete_cart_with_id,
    save_buyer_tansaction,
    retrieve_mssg_meta_data_via_room,
    retrieve_seller,
    retrieve_room,
    retrive_order,
    send_mail_via_outlook,
    retrieve_mssg_meta_data,
    retrieve_buyer_info,
    retrieve_seller_info
}


// let wallet_update = NeonDB.then((pool) => 
//     pool.query(`update campus_express_seller_wallet set wallet_balance = wallet_balance + ${payload.data.metadata.amount} where seller_id = '${payload.data.metadata.seller_id}'`)
//       .then(result => result.rowCount > 0 ? (true) : (false))
//       .catch(err => console.log(err))
//     )
//     .catch(err => console.log(err))

//     let transaction_update = NeonDB.then((pool) => 
//     pool.query(`insert into campus_express_seller_transactions (id,document,seller_id) values(DEFAULT, '${JSON.stringify(payload.data)}', '${payload.data.metadata.seller_id}')`)
//       .then(result => result.rowCount > 0 ? (true) : (false))
//       .catch(err => console.log(err))
//     )
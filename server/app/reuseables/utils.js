const { NeonDB } = require("./db");
const { shortId } = require("./modules");
require('dotenv').config();    

async function retrieve_room(seller_id,buyer_id) {

    return(
 
        await NeonDB
        .then(pool => {
            return pool.query(`SELECT * FROM room_id`)
            .then(result => {
                let m = result?.rows; 
                let room = m.filter(item => JSON.parse(JSON.parse(item.members_id).seller_id === seller_id) && JSON.parse(JSON.parse(item.members_id).buyer_id === buyer_id));
                return room.map(item => ({room_id: item.room_id, buyer_id: JSON.parse(item.members_id).buyer_id }));
                // room.map(item => (item.room_id));
            })
            .catch(err => console.log(err)) 
        })
        .catch(err => console.log(err))
    )
}

async function retrieve_room_with_buyer(buyer_id) {

    return(
 
        await NeonDB
        .then(pool => {
            return pool.query(`SELECT * FROM room_id`)
            .then(result => {
                let m = result?.rows; 
                let room = m.filter(item => JSON.parse(JSON.parse(item.members_id).buyer_id === buyer_id));
                return room.map(item => ({room_id: item.room_id, seller_id: JSON.parse(item.members_id).seller_id }));
                // room.map(item => (item.room_id));
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    )
}

async function retrieve_room_with_seller(seller_id) {

    return(
 
        await NeonDB
        .then(pool => {
            return pool.query(`SELECT * FROM room_id`)
            .then(result => {
                // console.log('seller room : ', result)

                let m = result?.rows; 
                let room = m.filter(item => JSON.parse(JSON.parse(item.members_id).seller_id === seller_id));
                // console.log('seller room : ', room)
                
                return room.map(item => ({room_id: item.room_id, buyer_id: JSON.parse(item.members_id).buyer_id }));
                // room.map(item => (item.room_id));
                
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    )
}


async function retrieve_buyer(buyer_id) {
    return(
        
        await NeonDB
        .then(pool => {
            // let conn = pool.connect();

            // if(conn){
                return pool.query(`SELECT * FROM campus_buyers WHERE buyer_id = '${buyer_id}'`)
                .then(result => result.rows[0])
                .catch(err => console.log(err))
            // }
        })
        .catch(err => console.log(err))
    )
}


async function retrieve_seller(seller_id) {
    return(
        
        await NeonDB
        .then(pool => {
            // let conn = pool.connect();

            // if(conn){
                return pool.query(`SELECT * FROM campus_sellers WHERE seller_id = '${seller_id}'`)
                .then(result => result.rows[0])
                .catch(err => console.log(err))
            // }
        })
        .catch(err => console.log(err))
    )
}


async function retrieve_message_meta_data(room_id) {
    return( 
        
        await NeonDB
        .then(pool => {
            // let conn = pool.connect();

            // if(conn){
                return pool.query(`SELECT * FROM messages_meta WHERE room_id = '${room_id}'`)
                .then(result => result?.rows) 
                .catch(err => console.log(err))
            // } 
        })
        .catch(err => console.log(err)) 
    )
}


async function retrieve_message_meta_data_with_type(room_id) {
    return( 
        
        await NeonDB
        .then(pool => {
            // let conn = pool.connect();

            // if(conn){
                return pool.query(`SELECT * FROM messages_meta WHERE room_id = '${room_id}' AND mssg_type = 'text'`)
                .then(result => result?.rows) 
                .catch(err => console.log(err))
            // } 
        })
        .catch(err => console.log(err)) 
    )
}

async function retrieve_message(mssg_id) {

    return(
        await NeonDB
        .then(pool => 
            pool.query(`SELECT * FROM messages WHERE mssg_id = '${mssg_id}'`)
            .then(result => (result?.rows[0]))
            .catch(err => console.log(err))
            
        )
        .catch(err => console.log(err))
    )
        // return data

    // }


}


async function retrieve_product_with_id(product_id) {
    return(
        await NeonDB
        .then(pool => 
            pool.query(`SELECT * FROM seller_shop WHERE product_id = '${product_id}'`)
            .then(result => (result?.rows))
            .catch(err => console.log(err))
            
        )
        .catch(err => console.log(err))
    )
}

async function retrieve_products() {
    
    return(
        await NeonDB
        .then(pool => 
            pool.query(`SELECT * FROM seller_shop`)
            .then(result => (result?.rows))
            .catch(err => console.log(err))
            
        )
        .catch(err => console.log(err))
    )
}

async function retrieve_thumbnails(product_id) {
    return(
        await NeonDB
        .then(pool => 
            pool.query(`select file from product_photo where product_id = '${product_id}'`)
            .then(result =>  (result.rows[0]))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}
















async function upload_chat_meta_data(mssg_id,mssg_type,sender_id,room_id,date) {
    let meta_upload = await NeonDB.then(pool => 
        pool.query(`insert into messages_meta(id,mssg_id,mssg_type,sender_id,room_id,date)values(DEFAULT,'${mssg_id}','${mssg_type}','${sender_id}','${room_id}','${date}')`)
        .then(result => result.rowCount > 0 ? (true) : (false))
        .catch(err => {console.log('error from upload_chat_meta_data', err); return false})    
    )
    .catch(err => console.log(err)) 

    return meta_upload  
}

async function upload_chat(mssg,mssg_id,date) {

    let mssg_upload = await NeonDB.then(pool => 
        pool.query(`insert into messages(id,mssg_id,mssg,date)values(DEFAULT,'${mssg_id}','${mssg}','${date}')`)
        .then(result => result.rowCount > 0 ? (true) : (false))
        .catch(err => {console.log('error from upload_chat', err); return false})    
    )
    .catch(err => console.log(err)) 
    
    return mssg_upload;
}


async function upload_meta_data(replacedTitle,replacedDescription,category,price,stock,seller_id,thumbnail_id,productId,others,shipping_data,campus,state,thumbnail_public_id) {      
    
    // let response = await check_rent_listing(seller_id);

    // let status = response ? 'inactive' : 'active'
    // let reason = response ? 'rent not paid' : 'new'
    others.lodge_data.lodge_active ? '' : delete others.lodge_data

    let date = new Date();

    return(
        NeonDB.then((pool) => 
            pool.query(`
                insert into seller_shop(
                    id,
                    product_id,
                    seller_id,
                    status,
                    title,
                    description,
                    price,
                    package,
                    category,
                    others,
                    date,
                    state,
                    views,
                    shares,
                    stock,
                    thumbnail_id,
                    accept_refund,
                    shipping_range,
                    shipping_duration,
                    campus,
                    uni_state,
                    thumbnail_public_id
                ) 

                values(
                    DEFAULT,
                    '${productId}',
                    '${seller_id}',
                    'unsold',
                    '${replacedTitle}',
                    '${replacedDescription}',
                    '${price}',
                    '${0}',
                    '${category}',
                    '${JSON.stringify(others)}',
                    '${date}',
                    '{"state": "active",
                     "reason": "rent paid"}',
                    ${0},
                    ${0},
                    ${stock},
                    '${thumbnail_id}',
                    '${shipping_data?.shipping_policy}',
                    '${JSON.stringify(shipping_data?.shipping_range)}',
                    '${shipping_data?.shipping_duration}',
                    '${campus}',
                    '${state}',
                    '${thumbnail_public_id}'
                )
            `)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

async function upload_photos(productId, seller_id, photos, imageId) {
    let mssg = 'Your ads is under review.'

    let book = []
    return(
        new Promise((resolve, reject) => {
            photos.map((item) => {
                NeonDB.then((pool) => 
                    pool.query(`insert into product_photo(id,product_id,seller_id,file,image_id) values(DEFAULT, '${productId}', '${seller_id}', '${item}', '${imageId}')`)
                    .then(result => {
                        if(result.rowCount > 0){
                            book.push(true)
                            console.log(result.rowCount)
                            if(book.length === photos.length){
                                resolve(true)
                            }
                        }
                    })
                    .catch(err => console.log(err), book.push(false), reject(false))
                ) 
            })
        })
        .then((result) => {
            let response = create_notice(seller_id, mssg, date)
            return response
        })
        .catch(err => err)
        
    )
}





async function delete_meta_data(productId) {        

    return(
        NeonDB.then((pool) => 
            pool.query(`delete from seller_shop where product_id = '${productId}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

async function delete_photos(productId) {
    
    return(
        NeonDB.then((pool) => 
            pool.query(`delete from product_photo where product_id = '${productId}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}



async function delete_chat_meta_data(mssg_id) {        

    return(
        NeonDB.then((pool) => 
            pool.query(`delete from messages_meta where mssg_id = '${mssg_id}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

async function delete_chat(mssg_id) {
    
    return(
        NeonDB.then((pool) => 
            pool.query(`delete from messages where mssg_id = '${mssg_id}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}





async function update_chat_meta_data(mssg_id,date) {
    let meta_upload = await NeonDB.then(pool => 
        pool.query(`update messages_meta set date = '${date}' where mssg_id = '${mssg_id}'`)
        .then(result => result.rowCount > 0 ? (true) : (false))
        .catch(err => {console.log('error from upload_chat_meta_data', err); return false})    
    )
    .catch(err => console.log(err)) 

    return meta_upload  
}

async function update_chat(mssg,mssg_id,date) {

    let mssg_upload = await NeonDB.then(pool => 
        pool.query(`update messages set date = '${date}', mssg = '${mssg}' where mssg_id = '${mssg_id}'`)
        .then(result => result.rowCount > 0 ? (true) : (false))
        .catch(err => {console.log('error from upload_chat', err); return false})    
    )
    .catch(err => console.log(err)) 
    
    return mssg_upload;
}


async function update_meta_data(replacedTitle,replacedDescription,category,price,seller_id,productId,others) {        
    let date = new Date();


    return(
        NeonDB.then((pool) => 

            pool.query(`update seller_shop set status='${unsold}',title='${replacedTitle}',description='${replacedDescription}',price='${price}',package='${0}',category='${category}',others='${JSON.stringify(others)}',date='${date}',state='{"state": "pending", "reason": "new"}' where product_id = '${productId}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

async function update_photos(productId, seller_id, photos, imageId) {
    let mssg = 'Your ads is under review.'

    let book = []

    let result2 = await delete_photos(productId)

    if(result2){
        return(
            new Promise((resolve, reject) => {
                photos.map((item) => {
                    NeonDB.then((pool) => 
                        pool.query(`insert into product_photo(id,product_id,seller_id,file,image_id) values(DEFAULT, '${productId}', '${seller_id}', '${item}', '${imageId}')`)
                        .then(result => {
                            if(result.rowCount > 0){
                                book.push(true)
                                console.log(result.rowCount)
                                if(book.length === photos.length){
                                    resolve(true)
                                }
                            }
                        })
                        .catch(err => console.log(err), book.push(false), reject(false))
                    ) 
                })
            })
            .then((result) => {
                let response = create_notice(seller_id, mssg, date)
                return response
            })
            .catch(err => err)
            
        )
    }
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

  async function upload_new_view(buyer_id,product_id,view_id,) {
    let date = new Date();
    let duplicateViews = await NeonDB.then((pool) => 
        pool.query(`SELECT * FROM views WHERE buyer_id = ${buyer_id} AND product_id = ${product_id}`)
          .then(result => result.rows.length > 0 ? false : true)
          .catch(err => console.log(err))
        )
    .catch(err => console.log(err))

    if(duplicateViews){
        await NeonDB.then((pool) => 
            pool.query(`insert into views(id,buyer_id,product_id,view_id,date) values(DEFAULT, '${buyer_id}','${product_id}','${view_id}','${date}')` )
            .then(result => result.rowCount > 0 ? result.send(true) : result.send(false))
            .catch(err => console.log(err))
            )
        .catch(err => console.log(err))
    }
  }

//   const { authorize_seller } = require("../Authorization/seller");
    // const { create_notice } = require("./send_mssgs");
    let date = new Date();

async function upload_photos(productId, seller_id, photos, imageId) {
    let mssg = 'Your ads is under review.'

    let book = []
    return(
        new Promise((resolve, reject) => {
            photos.map((item) => {
                NeonDB.then((pool) => 
                    pool.query(`insert into product_photo(id,product_id,seller_id,file,image_id) values(DEFAULT, '${productId}', '${seller_id}', '${item}', '${imageId}')`)
                    .then(result => {
                        if(result.rowCount > 0){
                            book.push(true)
                            console.log(result.rowCount)
                            if(book.length === photos.length){
                                resolve(true)
                            }
                        }
                    })
                    .catch(err => console.log(err), book.push(false), reject(false))
                ) 
            })
        })
        .then((result) => {
            // let response = create_notice(seller_id, mssg, date)
            return response
        })
        .catch(err => err)
        
    )
}

// function send_email(subject,template,email) {
//     const nodemailer = require('nodemailer');

//     // Create a transporter using SMTP
//     const transporter = nodemailer.createTransport({
//         // host: 'smtp.privateemail.com',  // Replace with your SMTP server hostname
//         // port: 465, // Replace with your SMTP server port
//         // secure: true, // Set to true if using SSL/TLS
//         // auth: { 
//         //     user: 'campus-express@campusexpressng.com', // Replace with your email address
//         //     pass: 'A!nianuli82003', // Replace with your email password or app-specific password
//         // },
//         service: 'gmail',
//             auth: {
//             user: 'akpulufabian@gmail.com', // Replace with your email address
//             pass: 'A!nianuli82003', // Replace with your email password or app-specific password
//         },
//     }); 
 
//     // Email content 
//     const mailOptions = {
//         from: 'campusexpressnaija@gmail.com', // Replace with your email address
//         to: `${email}`, // Replace with the recipient's email address
//         subject: subject,
//         html: template 
//     };

//     // Send the email
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error:', error);
//         } else {
//             console.log('Email sent:', info.response);
//         }
//     });


// }

async function check_rent_listing(seller_id) {
    
    let result1 = await NeonDB.then((pool) => 
        pool.query(`SELECT * FROM campus_shop WHERE seller_id = '${seller_id}'`)
        .then(result => result.rows[0].rent.listing)
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

    let result2 = await NeonDB.then((pool) => 
        pool.query(`SELECT * FROM seller_shop WHERE seller_id = '${seller_id}'`)
        .then(result => result.rows.length)
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))


    let response = (parseInt(result1) <= parseInt(result2)) ? true : false
    return response;
}

async function campus_coin_payment_for_seller(coinAmt, seller_id) {
    let result = await NeonDB.then((pool) => 
        pool.query(`SELECT * FROM campus_shop WHERE seller_id = '${seller_id}'`)
        .then(result => result.rows.rent[0].price === '0' ? true : false)
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

    if(result){
        return(
            NeonDB.then((pool) => 
            pool.query(`UPDATE campus_shop set coin=coin-${coinAmt} WHERE seller_id = '${seller_id}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
        )
    }else{
        return(false)
    }
}

async function shop_rent_payment_for_seller(coinAmt,listing, seller_id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`UPDATE campus_shop set rent=jsonb_set(
                jsonb_set(
                    rent, 
                    '{listing}', 
                    '"${listing}"', 
                    false
                ), 
                '{price}', 
                '"${coinAmt}"', 
                false
            ), date = '${new Date()}' WHERE seller_id = '${seller_id}'`)
            .then(result => {
                result.rowCount > 0 ? (true) : (false)
            })
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

async function deactivate_listing_due_to_debt(seller_id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`UPDATE seller_shop set state=jsonb_set(
                jsonb_set(
                    rent, 
                    '{state}', 
                    '"rejected"', 
                    false
                ), 
                '{reason}', 
                '"rent not paid"', 
                false
            ), date = '${new Date()}' WHERE seller_id = '${seller_id}'`)
            .then(result => {
                result.rowCount > 0 ? (true) : (false)
            })
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

function send_email(to,subject,message) {
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('token', 'rXdAgTsFBOS8ECK7MZk1i6WojUmqy9unDv34cQablpz0JLHhIV5NfPG2teYwxR');
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

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });


}

function send_mail_via_brevo(email,subject,html) {
    const nodemailer = require('nodemailer');

    // Create a transporter using Outlook's SMTP settings
    // let transporter = nodemailer.createTransport({
    //      host: 'smtp-relay.brevo.com', // Zoho SMTP server     
    //     port: 587, // SSL Port
    //     secure: true, // Use SSL
    //     auth: {
    //         user: '686134001@smtp-brevo.com', // your Outlook email address
    //         pass: 'P0pRUWShnOmJGvcr', // your Outlook email password
    //     }
    // });

    // // Setup email data
    // let mailOptions = {
    //     from: '"Campus Sphere" <campus-sphere@campussphere.net>', // sender address
    //     to: email, // list of receivers
    //     subject: subject, // Subject line
    //     // text: mssg, // plain text body
    //     html: html // html body
    // };

    // // Send mail with defined transport object
    // transporter.sendMail(mailOptions, (error, info) => {
    // if (error) {
    //     return console.log(error);
    // }
    // console.log('Message sent: %s', info.messageId);
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // });





    const SibApiV3Sdk = require('sib-api-v3-sdk');

    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = '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';

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.sender = { name: "Campus Sphere", email: "campus-sphere@campussphere.net" };

    sendSmtpEmail.to = [
    { email: email, name: "User One" }
    ];

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;

    // Optional: if you're using dynamic templates
    // sendSmtpEmail.templateId = 1;
    // sendSmtpEmail.params = { name: "John Doe", orderNumber: "A123" };

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
        console.log("Transactional Email sent successfully:", data);
    },
    function (error) {
        console.error("Error sending transactional email:", error.response.body);
    }
    );

}



async function savePwdToken(email,token) {
    return(await NeonDB.then((pool) => 
            pool.query(`insert into pwd_token (
                id,
                email,
                token,
                date
                ) 
                values(
                DEFAULT,
                '${email}',
                '${token}',
                '${new Date()}'
                )` 
            )
        .then(result => result.rowCount > 0 ? (true) : (false)))
        .catch(err => {
            console.log('error: ',err)
            return(false)
        }).catch(err => console.log('error: ',err)))
}

async function saveEmailToken(email,user_id,token) {
    return(await NeonDB.then((pool) => 
            pool.query(`insert into email_token (
                id,
                email,
                user_id,
                token,
                date
                ) 
                values(
                DEFAULT,
                '${email}',
                '${user_id}',
                '${token}',
                '${new Date()}'
                )` 
            )
        .then(result => result.rowCount > 0 ? (true) : (false)))
        .catch(err => {
            console.log('error: ',err)
            return(false)
        }).catch(err => console.log('error: ',err)))
}

async function savePhoneToken(phone,user_id,token) {
    return(await NeonDB.then((pool) => 
            pool.query(`insert into pwd_token (
                id,
                phone,
                user_id,
                token,
                date
                ) 
                values(
                DEFAULT,
                '${phone}',
                '${user_id}',
                '${token}',
                '${new Date()}'
                )` 
            )
        .then(result => result.rowCount > 0 ? (true) : (false)))
        .catch(err => {
            console.log('error: ',err)
            return(false)
        }).catch(err => console.log('error: ',err)))
}

async function retrive_item_with_seller_id(seller_id) {
   return(
        await NeonDB.then((pool) => 
            pool.query(`select * from seller_shop where seller_id = '${seller_id}'`)
            .then(result => (result.rows))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}
 

async function create_inbox(buyer_id,subject,message_content,action_id) {
    
    return (
        await NeonDB.then((pool) => 
            pool.query(`insert into buyer_inbox(id,message_content,subject ,created_at,buyer_id,action_id) values(DEFAULT, '${message_content}', '${subject}', '${new Date()}', '${buyer_id}', '${action_id}')`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
    
}

module.exports ={
    retrive_item_with_seller_id,

    savePwdToken,
    savePhoneToken,
    saveEmailToken,
    send_email,
    send_sms,
    campus_coin_payment_for_seller,
    shop_rent_payment_for_seller,
    retrieve_room,
    retrieve_buyer,
    retrieve_seller,
    retrieve_message_meta_data,
    retrieve_message,
    retrieve_thumbnails,
    retrieve_product_with_id,
    retrieve_products,
    retrieve_room_with_buyer,
    retrieve_room_with_seller,
    retrieve_message_meta_data_with_type,
    send_mail_via_brevo,
    upload_chat_meta_data,
    upload_chat,

    delete_meta_data,
    delete_photos,
    delete_chat_meta_data,
    delete_chat,

    update_chat,
    update_chat_meta_data,
    update_meta_data,
    update_photos,

    create_room_id,
    upload_new_view,

    upload_meta_data,
    upload_photos,
    send_email,
    deactivate_listing_due_to_debt,
    check_rent_listing,
    create_inbox
}
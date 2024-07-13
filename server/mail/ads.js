const { retrieve_products, retrieve_thumbnails } = require('../utils');

async function sendAdsCampaigne(req,res) {
    let {email} = req.body;
    let book = [

    ]

    // console.log(email)
    let data = await retrieve_products()

    // data.map(async(item) => book.push({item: item, thumbnails: }))

    let cards = data.map((item) =>{ 
            // let img = await retrieve_thumbnails(item.product_id)
            return(`<div href={https://www.campusexpressng.com/product?product_id=${item.product_id}} class="mailAds">
                        <img src='' class="adsImg" alt="" />
                        <p>${item.title}</p>
                        <h5>&#8358; ${item.price}</h5>
                    </div>`)
            }
    )
 
    const nodemailer = require('nodemailer'); 
 
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        host: 'smtp.privateemail.com',  // Replace with your SMTP server hostname
        port: 465, // Replace with your SMTP server port
        secure: true, // Set to true if using SSL/TLS
        auth: { 
            user: 'campus-express@campusexpressng.com', // Replace with your email address
            pass: 'A!nianuli82003', // Replace with your email password or app-specific password
        },
    }); 

    // Email content 
    const mailOptions = {
        from: 'campus-express@campusexpressng.com', // Replace with your email address
        to: `${email}`, // Replace with the recipient's email address
        subject: 'Verify Your Email Address',
        html: 
        `
    
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Email Template</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    height: auto;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    width: 100%;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                h1 {
                    color: #333333;
                }
                p {
                    color: #555555;
                }
                a {
                    color: #007BFF;
                    text-decoration: none;
                }
                .button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 10px 20px;
                    background-color: #FF4500;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .mailHead{
                    height: auto;
                    width: 97%;
                    background: #FF4500;
                    color: #fff;
                    font-family: Times-New-Roman;
                    text-align: center;
                    padding: 10px;
                    font-weight: 1000;
                }
                .mailPurpose{
                    height: auto;
                    width: 97%;
                    background: #000;
                    color: #fff;
                    text-align: center;
                    padding: 10px;
                    font-weight: 1000;
                }
                .mailAdsCnt{
                    height: fit-content;
                    width: 100%;
                    padding: 0px;
                    
                }
                .mailAds{
                    height: 135px;
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #fff;
                    margin: 0px;
                }
                .adsImg{
                    height: 100%;
                    width: 35%
                    
                }
                p{
                    width: 65%;
                    font-size: small;
                }
                .footer{
                    height: 50px;
                    width: 100%; 
                    text-align: center;
                    font-size: medium;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1 style="color: #FF4500">UP TO 55% OFF Iphone 12 pro max, HP pavilion, Samsung T.V... </h1>
                
                <div class="mailHead">
                    Campus Express
                    
                </div>
                <div class="mailPurpose">
                    OnSale Now
                </div>
                
                <div class="mailAdsCnt">
                    ${
                        cards
                    }
                </div>
            </div>
            <footer>
                <div class="footer">
                    Sent with ❤️ from Campus Express.
                </div>
            </footer>
        </body>
        
        </html>
        `
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });

 
 
}

module.exports={sendAdsCampaigne}
 
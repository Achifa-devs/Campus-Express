const { shortId, bcrypt, jwt } = require("../reuseables/modules");
const { NeonDB } = require("../reuseables/db");
const maxAge = 90 * 24 * 60 * 60; 
const createToken = (id) => {
    return jwt.sign({ id }, 'seller_secret', {
        expiresIn: maxAge
    });
};
require('dotenv').config();

// async function SendTokenViaEmail(req,res) {
//     let {email,fname,lname} = req.body;
//     const { MailtrapClient } = require("mailtrap");

//     const TOKEN = process.env.EMAIL_TOKEN;
//     let key = shortId.generate()
//     const ENDPOINT = "https://send.api.mailtrap.io/";

//     const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

//     const sender = {
//     email: "campusexpressnaija@gmail.com",
//     name: "Campus Express Nigeria",
//     };
//     const recipients = [
//         {
//             email: email,
//         }
//     ];

//     client
//     .send({
//         from: sender,
//         to: recipients,
//         subject: "Campus Express Email Verification",
//         text: `

//         Dear ${fname} ${lname},
        
//         Thank you for signing up with Campus Express Nigeria! We're thrilled to have you on board.
        
//         To ensure the security of your account and activate your subscription, we need to verify your email address. Please copy and paste the Token below in the field provided to complete the verification process:
        
//         ${key}
        
//         Once your email address is verified, you'll have full access to all the features and benefits of our platform.
        
//         If you did not sign up for Campus Express Nigeria, please ignore this email. Someone may have entered your email address by mistake.
        
//         If you have any questions or need assistance, feel free to reply to this email, and our support team will be happy to help.
        
//         Thank you for choosing Campus Express Nigeria.
        
//         Best regards,
//         Campus Express Nigeria
//         `,
//         category: "Email Verification",
//     })
//     .then(console.log, console.error);
// }

async function GetAdmin(req,res) {
    let {admin_id} = req.body;
    NeonDB.then((pool) => 
        pool.query(`SELECt * FROM campus_admin WHERE admin_id = '${admin_id}'`)
        .then(result => res.send(result.rows[0]))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

async function GetUsers(req,res) {
    let sellers = await NeonDB.then((pool) => 
        pool.query(`SELECt * FROM campus_sellers`)
        .then(result => result.rows)
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

    let buyers = await NeonDB.then((pool) => 
        pool.query(`SELECt * FROM campus_buyers`)
        .then(result => result.rows)
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

    console.log(buyers, sellers)

    res.send({buyers: buyers, sellers: sellers})

}

function updateSellerProfile(req,res) {
    let {
        fname,lname,state,campus,seller_id
    } = req.body;

    console.log(fname,lname,state,campus,seller_id)

    let date = new Date();

    new Promise((resolve, reject) => {
        NeonDB.then((pool) => 
            pool.query(`UPDATE campus_sellers set date='${date}', fname='${fname}', lname='${lname}', state='${state}', campus='${campus}' WHERE seller_id = '${seller_id}'`)
            .then(result => {
                result.rowCount > 0 ? resolve(true) : reject(false)
            })
            .catch(err => console.log(err))
        )
        .then((result) => res.send(result))
        .catch(err => console.log(err))

    })
   
    .catch(err => console.log(err))
}

function uploadProduct(req,res) {

    let { 
        title,description,category,price,photos,seller_id,others
    } = req.body;
    console.log(title,description,category,seller_id,others)


    let date = new Date();
    let productId = shortId.generate()
    let replacedDescription = description.replace(/'/g, '"');;
    let replacedTitle = title.replace(/'/g, '"');
    let imageId = shortId.generate();
    let book = []

    new Promise((resolve, reject) => {
        let uploadData = NeonDB.then((pool) => 
            pool.query(`insert into seller_shop (id,product_id,seller_id,status,title,description,price,package,category,others,date) values(DEFAULT, '${productId}','${seller_id}','unsold','${replacedTitle}','${replacedDescription}','${price}','${0}','${category}','${others.map(item => item)}','${date}' )`)
            .then(result => result.rowCount > 0 ? resolve(true) : reject(false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))

    })
    .then((response) => 

        photos.map(item => 
            NeonDB.then((pool) => 
                pool.query(`insert into product_photo(id,product_id,seller_id,file,image_id) values(DEFAULT, '${productId}', '${seller_id}', '${item}', '${imageId}')`)
                .then(result => result.rowCount > 0 ? book.push(true) : book.push(false))
                .catch(err => console.log(err))
            )    
        )

    )
    .then(async(response) => {
        let bool = book.filter(item => item !== true)


        if(bool.length < 1){
            res.send(true)
        }else{
            res.send(false)
        }

    })
    .catch(err => console.log(err))


}

function DeleteProduct(req,res) {
    let {
        product_id
    } = req.query;

    let book = []

    console.log(product_id)


    new Promise((resolve, reject) => {
        NeonDB.then((pool) => 
            pool.query(`DELETE FROM seller_shop WHERE product_id = '${product_id}'`)
            .then(result => result.rowCount > 0 ? resolve(true) : reject(false))
            .catch(err => console.log('mssg',err))
        )
        .catch(err => console.log('mssg 1',err))
    })
    .then((response) => 
        NeonDB.then((pool) => 
            pool.query(`DELETE FROM  product_photo WHERE product_id = '${product_id}'`)
            .then(result => result.rowCount > 0 ? book.push(true) : book.push(false))
            .catch(err => console.log('mssg 2',err))
        )    
    )
    .then(async(response) => {
        let bool = book.filter(item => item !== true)
        if(bool.length < 1){
            res.send(true)
        }else{
            res.send(false)
        }
    })
    .catch(err => console.log('mssg 0',err))
}

function updateProduct(req,res) {

    let {
        title,description,category,price,photos,seller_id,product_id,others
    } = req.body;

    console.log(product_id)

    let date = new Date();
    let replacedDescription = description.replace(/'/g, '"');;
    let replacedTitle = title.replace(/'/g, '"');
    let book = []
    let imageId = shortId.generate();

    new Promise((resolve, reject) => {
        NeonDB.then((pool) => 
            pool.query(`UPDATE seller_shop set date='${date}', title='${replacedTitle}', category='${category}', others='${others}', price='${price}', description='${replacedDescription}' WHERE product_id = '${product_id}'`)
            .then(result => {
                result.rowCount > 0 ? resolve(true) : reject(false)
            })
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))

    })
    .then((response) => 

        response
        ?
        NeonDB.then((pool) => 
            pool.query(`DELETE FROM product_photo WHERE product_id = '${product_id}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )  
        : 
        false
    )
    .then(async(response) => {
       
        photos.map(item => 
            NeonDB.then((pool) => 
                pool.query(`insert into product_photo(id,product_id,seller_id,file,image_id) values(DEFAULT, '${product_id}', '${seller_id}', '${item}', '${imageId}')`)
                .then(result => {
                    console.log('jbkjbk',result)

                    result.rowCount > 0 ? book.push(true) : book.push(false)
                    if(book.length === photos.length){
                        res.send(true)
                    }
                })
                .catch(err => console.log(err))
            )    
        )

    })
    
    .catch(err => console.log('hbkhk',err))


}

async function RegisterAdmin(req,res) {

    let {fname,lname,email,phone,pwd} = req.body;
    // console.log(fname,lname,email,phone,pwd,state,campus)
    let date = new Date().toLocaleString();
    let isActive,isVerified,isEmailVerified,isPhoneVerified = false;
    let hPwd = await bcrypt.hash(pwd, 10)
    let admin_id = `CE-${shortId.generate()}`
    let wallet_id = `CEW-${admin_id}`

    async function CreateNewAdmin(params) {
        return(
            NeonDB.then((pool) => 
                pool.query(`insert into campus_admin(id,fname, lname,admin_id,email,phone,password,isActive,isVerified,isEmailVerified,isPhoneVerified,date ) values(DEFAULT, '${fname}', '${lname}', '${admin_id}', '${email}', '${phone}', '${hPwd}', '${false}','${false}','${false}','${false}', '${date}')`)
                .then(result => result.rowCount > 0 ?(true) : (false))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }
    
    
    async function SendEmail(params) {
        let token = shortId.generate()
    
        function createEmailToken(params) {
            return(
                NeonDB.then((pool) => 
                    pool.query(`insert into email_token(id,email,user_id,token,date) values(DEFAULT, '${email}', '${admin_id}', '${token}', '${date}')`)
                    .then(result => (result.rowCount))
                    .catch(err => {
                        console.log(err)
                    })
                )
                .catch(err => {
                    console.log(err)
                })
            )
        }
    
        function sendEmailToken(params) {
            const nodemailer = require('nodemailer');
    
            // Create a transporter using SMTP
            const transporter = nodemailer.createTransport({
            host: 'mail.privateemail.com',  // Replace with your SMTP server hostname
            port: 465, // Replace with your SMTP server port
            secure: true, // Set to true if using SSL/TLS
            auth: { 
                user: 'security-team@campusexpressng.com', // Replace with your email address
                pass: 'A!nianuli82003', // Replace with your email password or app-specific password
            },
            }); 
    
            // Email content 
            const mailOptions = {
                from: 'security-team@campusexpressng.com', // Replace with your email address
                to: `${email}`, // Replace with the recipient's email address
                subject: 'Verify Your Email Address',
                text: ` 
    
                    Hello Dear,
                    
                    Thank you for choosing Campus Express Nigeria! To complete your Email Verification, please click the link below:
                    
                    www.campusexpressng.com/email-verification/${token}?email=${email}
                    
                    This link is valid for 5 minutes. Please do not share this link with anyone, as it is used for identity verification purposes only.
                    
                    If you did not initiate this action, please contact our support team immediately.
                    
                    Thank you for using Campus Express Nigeria.
                    
                    Best regards,
                    Campus Express Nigeria. 
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
    
        let response1 = await createEmailToken();

        if(response1 > 0){
            console.log(response1)
            let response2 = sendEmailToken();
            res.send(true)
        }

        function deleteToken(params) {
            NeonDB.then((pool) => 
                pool.query(`DELETE from email_token WHERE token = '${token}'`)
                .then(result => {
                    if(result.rowCount > 0){
                        res.send(true)
                    }else{
                        res.send(false)
                    }
                })
                .catch(err => {
                    console.log(err)
    
                })
            )
            .catch(err => {
                console.log(err)
            })
        }

        setTimeout(deleteToken, 300000)
      
    }

    async function checkEmail(params) {
        return(
            await NeonDB.then((pool) => 
                pool.query(`SELECt * FROM campus_admin WHERE email = '${email}'`)
                .then(result => result.rows.length > 0 ? {err: 'duplicate email', bool: false} : {bool: true})
                .catch(err => (err))
            )
        )
    }

    async function checkPhone(params) {
        return(
            await NeonDB.then((pool) => 
                pool.query(`SELECt * FROM campus_admin WHERE phone = '${phone}'`)
                .then(result => result.rows.length > 0 ? {err: 'duplicate phone', bool: false} : {bool: true})
                .catch(err => (err))
            )
        )
    }

    try{
        let email = await checkEmail(data => data)
        let phone = await checkPhone(data => data)
        new Promise((resolve, reject) => {
            

            
            console.log(email,phone)

            if(!email.bool){
                reject(email.err)
            }else if(!phone.bool){
                reject(phone.err)
            }else{
                resolve(true)
            }



        })
        .then((result) => {
            // console.log('overview',result)
            let newSeller = CreateNewAdmin()
            return(newSeller ? (true) : (false))
        })
        .then((result) => {
            // console.log('email',result)
            let newSellerEmailToken = result ? SendEmail() : false;
            return(newSellerEmailToken ? (true) : (false))
        })
        
        .catch((err) => {
            // console.log(err)
            res.status(500).send(err)
        })
    }catch(err){
        // console.log(err)
        res.status(500).send(err)

    }
}

async function LogAdminIn(req, res) {

    
    let {email,pwd} = req.body;
 
    new Promise((resolve, reject) => {
        NeonDB
        .then(async(pool) => {
                
            pool.query(`select "id" from "campus_admin" where "email" = '${email}'`, (err, result) => {
                
                if(!err){
                    if(result.rows.length > 0){
                        const id = result.rows[0].id;
                        resolve(id)
                    }else{
                        
                        reject({Mssg: "Email is not registered..."});
                    }
                }else{
                    console.log(err)
                }
                
            })
            
        });
    })
    .then(async(id) => {
        return(
            NeonDB
            .then(async(pool) => {
                let database_return_value = await pool.query(
                    `select "admin_id","email","password","fname","lname" from  "campus_admin" where "id" = '${id}'`
                )
                .then(result => result.rows[0])
                .catch(err => console.log(err))

                return database_return_value
            })
        )
        
    })
    .then(async(user) => {
        if(user){
            console.log(email,pwd)
            const auth = await bcrypt.compare(pwd, user.password);
            if (auth) {
                const token = createToken(user.admin_id);
                res.status(200).send({bool: true, id: user.admin_id, name: `${user.fname[0]}.${user.lname[0]}`});
    
            }else{
                res.status(400).send({
                    Mssg: "Invalid password"
                })
            }
        }else{
            res.status(400).send({
                Mssg: "Email is not registered"
            })
        }
    })
    .catch(err => {
        console.log(err)
    })
    
}


async function Shop(req,res)  {
    NeonDB.then((pool) => 
        pool.query(`select * from seller_shop`)
        .then(result => res.send(result.rows))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}

async function WalletData(req,res)  {
    let {seller_id} = req.body;

    function walletBalance() {
        return(
            NeonDB.then((pool) => 
                pool.query(`select * from campus_express_seller_wallet where seller_id = '${seller_id}'`)
                .then(result => result.rows)
                .catch(err => console.log(err))
                )
            .catch(err => console.log(err))
        )
    }

    function Transactions() {
        return(
            NeonDB.then((pool) => 
                pool.query(`select * from campus_express_seller_transactions where seller_id = '${seller_id}'`)
                .then(result => result.rows)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    let wallet = await walletBalance()
    let documents = await Transactions()


    res.send({walletBalance: wallet, TransactionHistory: documents})

}

async function GetEditedItem(req,res)  {
    let {product_id} = req.query;
    function getMetadata(params) {
        return(
            NeonDB.then((pool) => 
                pool.query(`select * from seller_shop where product_id = '${product_id}'`)
                .then(result => (result.rows))
                .catch(err => {
                    console.log(err)
                })
            )
            .catch(err => {
                console.log(err)
            })
        )
    }

    function getThumnails(params) {
        return(
            NeonDB.then((pool) => 
                pool.query(`select file from product_photo where product_id = '${product_id}'`)
                .then(result => (result.rows))
                .catch(err => {
                    console.log(err)
                })
            )
            .catch(err => {
                console.log(err)
            })
        )
    }

    let meta_data = await getMetadata()
    let photos = await getThumnails()

    res.status(200).send({meta_data, photos})
}

async function ResetPwd(req,res){

    let {email,seller_id} = req.body;

    let date = new Date()
    async function SendEmail(params) {
        let token = shortId.generate()

        function createEmailToken(params) {
            return(
                NeonDB.then((pool) => 
                    pool.query(`insert into password_token(id,email,token,date) values(DEFAULT, '${email}', '${token}', '${date}')`)
                    .then(result => (result.rowCount))
                    .catch(err => {
                        console.log(err)
                    })
                )
                .catch(err => {
                    console.log(err)
                })
            )
        }

        function sendEmailToken(params) {
            const nodemailer = require('nodemailer');
    
            // Create a transporter using SMTP
            const transporter = nodemailer.createTransport({
            host: 'mail.privateemail.com',  // Replace with your SMTP server hostname
            port: 465, // Replace with your SMTP server port
            secure: true, // Set to true if using SSL/TLS
            auth: { 
                user: 'security-team@campusexpressng.com', // Replace with your email address
                pass: 'A!nianuli82003', // Replace with your email password or app-specific password
            },
            }); 
    
            // Email content 
            const mailOptions = {
                from: 'security-team@campusexpressng.com', // Replace with your email address
                to: `${email}`, // Replace with the recipient's email address
                subject: 'Password Reset',
                html: ` 
    
                    Hello Dear,
                    
                    Thank you for choosing Campus Express Nigeria! 
                    To complete your password reset, please click the link below:
                    
                    www.campusexpressng.com/seller/password-reset/${token}?seller_id=${seller_id}
                    
                    This link is valid for 5 minutes. Please do not share this link with anyone, as it is used for identity verification purposes only.
                    
                    If you did not initiate this action, please contact our support team immediately.
                    
                    Thank you for using Campus Express Nigeria.
                    
                    Best regards,
                    Campus Express Nigeria. 
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
    
        let response1 = await createEmailToken();

        if(response1 > 0){
            console.log(response1)
            let response2 = sendEmailToken();
            res.send(true)
        }
      
    }

    SendEmail()

    
}

async function updatePwd(req,res) {
    let {seller_id, pwd} = req.body;
    
    let hPwd = await bcrypt.hash(pwd, 10)

    NeonDB.then((pool) => 
        pool.query(`UPDATE campus_sellers set password='${hPwd}' WHERE seller_id = '${seller_id}'`)
        .then(result => {
            result.rowCount > 0 ? resolve(true) : reject(false)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

async function GetSellerInbox(req,res) {
    let {seller_id} = req.body;
    
    
    NeonDB.then((pool) => 
        pool.query(`SELECT * FROM seller_inbox  WHERE seller_id = '${seller_id}'`)
        .then(result => {
            res.send(result.rows)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

async function GetSellerOrder(req,res) {
    let {seller_id} = req.body;
    
    NeonDB.then((pool) => 
        pool.query(`SELECT * FROM seller_orders  WHERE seller_id = '${seller_id}'`)
        .then(result => {
            res.send(result.rows)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}

async function SendEmail(req,res) {

   
}


async function verify_item(req,res) {
    let {action,item,product_id} = req.body;
    NeonDB.then((pool) => 
        pool.query(`UPDATE seller_shop set state='{"state": "${action}", "reason": "${item}"}' WHERE product_id = '${product_id}'`)
        .then(result => res.send(result.rowsAffected))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}
 

module.exports = {uploadProduct,verify_item,GetUsers,SendEmail,updatePwd,GetEditedItem,GetAdmin,Shop,RegisterAdmin,updateSellerProfile,WalletData,LogAdminIn,updateProduct,ResetPwd,DeleteProduct,GetSellerInbox,GetSellerOrder}
const { uploadVideo } = require("../../cloudinary");
const { NeonDB } = require("../../db");
const { BrevoTemp } = require("../../mail/mailTemp");
const { emailRegMail, phoneRegMail, mailTemplate, pwdMailTemplate } = require("../../mail/reg");
const { shortId, bcrypt, jwt } = require("../../modules");
const { verification_email, newItem } = require("../../templates");
const { upload_meta_data, upload_photos, send_email, send_sms, send_mail_via_outlook, savePwdToken, savePhoneToken, saveEmailToken } = require("../../utils");



async function UploadNewItem(req,res) {

    let {constantData, dynamicData}= req.body;

    Object.keys(dynamicData).forEach(key => {
        if (dynamicData[key] === '') {
          delete dynamicData[key];
        }
    });

    let date = new Date();
    let productId = shortId.generate()
    let imageId = shortId.generate();
    let book = []

    let replacedDescription = constantData.description.replace(/'/g, '"');
    let replacedTitle = constantData.title.replace(/'/g, '"');

    if(constantData.category.toLowerCase() === 'lodge/apartments'){
        let videoResponse = await uploadVideo(constantData.videos,productId,replacedTitle)
        if(videoResponse.bool){
            let meta_data_respons = await upload_meta_data(replacedTitle,replacedDescription,constantData.category,constantData.price,constantData.seller_id,productId,dynamicData)
            if(meta_data_respons){
                res.send(true);
            }else{
                res.send(false);

            }
        }else{
            res.send(videoResponse);
        }
    }else{
        
        let photoresponse = upload_photos(productId, constantData.seller_id, constantData.photos, imageId)
        if(photoresponse){
            let meta_data_respons = await upload_meta_data(replacedTitle,replacedDescription,constantData.category,constantData.price,constantData.seller_id,productId,dynamicData)
            if(meta_data_respons){
                res.send(true);
            }
        }else{
            res.send(false);

        }
    }


    

    
}

async function SendEmail(req,res) {
    let {email,seller_id, name, type} = req.body;
    let token = shortId.generate();

    if(type === 'password token'){
        let response = await savePwdToken(email,token)
        if(response){
            let emailTemp = pwdMailTemplate(token,email)
            send_mail_via_outlook(email, 'Password Recovery', emailTemp) 
            // console.log(response)

        }
    }else{
        let response = await saveEmailToken(email,seller_id,token)
        if(response){
            let emailTemp = mailTemplate(name,token,email)
            send_mail_via_outlook(email, 'Email Verification', emailTemp) 
        }
    } 

    
} 


async function SendSMS(req,res) { 
    let {phone, name, seller_id,type} = req.body;
    let token = shortId.generate()

    let response = await savePhoneToken(phone,token,seller_id)
    if(response){
        let emailMssg = phoneRegMail(name,token,phone) 
        send_sms(phone,emailMssg)
    }

    
}

async function ShopSetup(req,res) {

    let {seller_id} = req.body
    let shop_id = shortId.generate() 

    async function CreateNewShop() {
        NeonDB.then((pool) => 
            pool.query(`insert into campus_shop (
                id,
                shop_id,
                shop_title,
                shop_description,
                seller_id,
                inventory,
                isActive,
                isEmpty,
                date,
                rent,
                subscription,
                coin
                ) 
                values(
                DEFAULT,
                '${shop_id}',
                '',
                '',
                '${seller_id}',
                '',
                ${false},
                ${true},
                '${new Date()}',
                '{
                        "date": "${new Date()}",
                        "price": "0",
                        "listing": "3"
                }',
                '{
                        "date": "${new Date()}",
                        "price": "0",
                        "package": "regular"
                }',
                ${10}
                )` 
            )
        .then(result => result.rowCount > 0 ? res.status(200).send(true) : res.status(500).send(false)))
        .catch(err => {
            console.log('error: ',err)
            res.status(500).send(false)
        }).catch(err => console.log('error: ',err))
        
    }

    CreateNewShop()
}

async function WalletSetup(req,res) {
    let {seller_id,phone} = req.body
    let wallet_id = `CEW-${seller_id}`
    let date = new Date().toLocaleString();

    async function CreateNewSellerWallet() {
        return(
            NeonDB.then((pool) => 
                pool.query(`insert into campus_express_seller_wallet(id,wallet_id,seller_id,wallet_balance,wallet_pin,wallet_number,date) values(DEFAULT,'${wallet_id}','${seller_id}','${0}','','${phone}','${date}')`)
                .then(result => result.rowCount > 0 ? res.status(200).send(true) : res.status(500).send(false))
                .catch(err => {
                    console.log('error: ',err)
                    res.status(500).send(false)
                }) 
            ) 
            .catch(err => {
                console.log('error: ',err)
                res.status(500).send(false)
            })
        )
    }

    CreateNewSellerWallet()
}


module.exports={
    UploadNewItem,
    SendEmail,
    SendSMS,
    ShopSetup,
    WalletSetup
} 
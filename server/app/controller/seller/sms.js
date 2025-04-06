

async function SendSMS(req,res) { 
    let {phone, name, seller_id,type} = req.body;
    let token = shortId.generate()

    let response = await savePhoneToken(phone,token,seller_id)
    if(response){
        let emailMssg = phoneRegMail(name,token,phone) 
        send_sms(phone,emailMssg)
    }

    
}

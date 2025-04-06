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


const { pwd_reset_template, pwd_reset_rxt } = require("../../mails/password_recovery");
const { NeonDB } = require("../../reuseables/db");
const { shortId, bcrypt } = require("../../reuseables/modules");
const { send_mail_via_outlook, send_sms, send_mail_via_brevo } = require("../../reuseables/utils");

// @@UPDATES
async function UpdatePwd(req,res) {
    let {email, pwd} = req.body;
    console.log(email,pwd)
    
    let hPwd = await bcrypt.hash(pwd, 10)

    NeonDB.then((pool) => 
        pool.query(`UPDATE users set password='${hPwd}' WHERE email = '${email}'`)
        .then(result => {
            result.rowCount > 0 ? res.send({bool:true}) : res.send({bool:false, Mssg: 'Error Occured, Please Try Again'})
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

async function ConfirmEmail(req,res) {
    let {email} = req.body;
    let token = shortId.generate();
    console.log('email: ', email)


    async function check_if_email_exist() {
        return(
           await  NeonDB.then((pool) => 
                pool.query(`
                    SELECT fname, lname, phone
                    FROM users
                    WHERE email = '${email}'
                `)
                .then(result => result.rows.length > 0 ? ({bool: true, data: result.rows[0]}) : ({bool: false, data: ''}))
                .catch(err => {
                    console.log(err)
                    res.send({bool:false, Mssg: 'Server error, try again'})
                })
            )
            .catch(err => {
                console.log(err)
                res.send({bool:false, Mssg: 'Server error, try again'})
            })
        ) 
    }

    let response = await check_if_email_exist()
    console.log('response: ', response)

    if(response.bool){
        let smsTemp = pwd_reset_rxt(`${response.data.fname} ${response.data.lname}`,token)
        let emailTemp = pwd_reset_template(`${response.data.fname} ${response.data.lname}`,email,token)
        send_mail_via_brevo(email, 'Password Reset Token', emailTemp) 
        // send_sms(response.data.phone, smsTemp) 
        NeonDB.then((pool) => 
            pool.query(`INSERT INTO password_token(id,email,token,date,user_id) values(DEFAULT,'${email}','${token}','${new Date()}','')`)
            .then(result => result.rowCount > 0 ? res.send({bool:true}) : res.send({bool:false, Mssg: 'Error Occured Please Try Again'}))
            .catch(err => console.log('error: ',err)) 
        )
        .catch(err => console.log('error: ',err))
    }else{
        res.send({bool:false, Mssg: 'Email Does Not Exist'})
    }

}

async function VerifyToken(req,res) {
    let {email,token} = req.body;

    function check_if_token_exist() {
        return(
            NeonDB.then((pool) => 
                pool.query(`
                    SELECT COUNT(*) as count
                    FROM password_token
                    WHERE email = '${email}' AND token = '${token}'
                `)
                .then(result => parseInt(result.rows[0].count, 10) > 0 ? (true) : (false))
                .catch(err => console.log(err)) 
            )
            .catch(err => console.log(err))
        )
    }


    let response = await check_if_token_exist()
    if(response){
        NeonDB.then((pool) => 
            pool.query(`
                DELETE FROM password_token
                WHERE email = '${email}' AND token = '${token}'
            `)
            .then(result => result.rowCount > 0 ? res.send({bool:true}) : res.send({bool:false, Mssg: 'Error Occured, Please Try Again'}))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    }else{
        res.send({bool:false, Mssg: 'Token Is Invalid'})
    }

}
// @@UPDATES

module.exports={
    UpdatePwd,
    ConfirmEmail,
    VerifyToken
}
const { NeonDB } = require("../../reuseables/db");
const { shortId } = require("../../reuseables/modules");
const { send_mail_via_outlook } = require("../../reuseables/utils");

// @@UPDATES
async function UpdatePwd(req,res) {
    let {email, pwd} = req.body;
    console.log(email,pwd)
    
    let hPwd = await bcrypt.hash(pwd, 10)

    NeonDB.then((pool) => 
        pool.query(`UPDATE campus_sellers set password='${hPwd}' WHERE email = '${email}'`)
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

    function check_if_email_exist() {
        return(
            NeonDB.then((pool) => 
                pool.query(`
                    SELECT COUNT(*) as count
                    FROM campus_sellers
                    WHERE email = '${email}'
                `)
                .then(result => parseInt(result.rows[0].count, 10) > 0 ? (true) : (false))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        ) 
    }

    let response = await check_if_email_exist()

    if(response){
        // let emailTemp = mailTemplate(name,token,email)
        send_mail_via_outlook(email, 'Email Verification', emailTemp) 
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


    let response = check_if_token_exist()

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
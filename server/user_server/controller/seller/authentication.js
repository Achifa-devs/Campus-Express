const { NeonDB } = require("../../reuseables/db");
const { shortId } = require("../../reuseables/modules");

// @@UPDATES
async function UpdatePwd(req,res) {
    let {email, pwd} = req.body;
    console.log(email,pwd)
    
    let hPwd = await bcrypt.hash(pwd, 10)

    NeonDB.then((pool) => 
        pool.query(`UPDATE campus_sellers set password='${hPwd}' WHERE email = '${email}'`)
        .then(result => {
            result.rowCount > 0 ? res.send({bool:true}) : res.send({bool:false})
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

async function ConfirmEmail(req,res) {
    let {email,seller_id} = req.body;
    let token = shortId.generate();

    function check_if_email_exist() {
        return(
            NeonDB.then((pool) => 
                pool.query(`
                    SELECT COUNT(*) as count
                    FROM campus_sellers
                    WHERE email = '${email}'
                `)
                .then(result => result.rowCount > 0 ? (true) : (false))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    let response = check_if_email_exist()

    if(response){
        NeonDB.then((pool) => 
            pool.query(`INSER INTO password_token(id,email,token,date,user_id) values(DEFAULT,'${email}','${token}','${new Date()}','${seller_id}')`)
            .then(result => result.rowCount > 0 ? res.send({bool:true}) : res.send({bool:false}))
            .catch(err => console.log('error: ',err)) 
        )
        .catch(err => console.log('error: ',err))
    }else{
        res.send({bool:false})
    }

}

async function VerifyToken(req,res) {
    let {email, seller_id} = req.body;

    NeonDB.then((pool) => 
        pool.query(`
            SELECT COUNT(*) as count
            FROM password_token
            WHERE email = '${email}' AND user_id = '${seller_id}'
        `)
        .then(result => result.rowCount > 0 ? res.send({bool:true}) : res.send({bool:false}))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}
// @@UPDATES

module.exports={
    UpdatePwd,
    ConfirmEmail,
    VerifyToken
}
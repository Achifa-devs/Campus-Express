const { 
    NeonDB 
} = require("../../db");
const { regTxtMailTemplateForBuyers, regTxtMailForBuyers } = require("../../mail/reg");
const { 
    shortId,
    jwt,
    bcrypt
} = require('../../modules');
const { send_email, send_sms, send_mail_via_outlook } = require("../../utils");
const maxAge = 90 * 24 * 60 * 60; 

const createToken = (id) => {
    return jwt.sign({ id }, 'buyer_secret', {
       expiresIn: maxAge
    });
};


async function register_buyer(req,res) { 

    let {fname,lname,email,phone,pwd,state,campus,gender} = req.body;
    console.log(fname,lname,email,phone,pwd,state,campus,gender)
    let date = new Date().toLocaleString();
    let hPwd = await bcrypt.hash(pwd, 10) 
    let buyer_id = `CE-${shortId.generate()}`
    let wallet_id = `CEW-${buyer_id}`


    async function CreateNewBuyer() {
        return(
            NeonDB.then((pool) => 
                pool.query(`insert into campus_buyers(id,fname,lname,buyer_id,email,phone,password,state,campus,isActive,isVerified,isEmailVerified,isPhoneVerified,date,gender ) values(DEFAULT, '${fname}', '${lname}', '${buyer_id}', '${email}', '${phone}', '${hPwd}', '${state}', '${campus}', '${false}','${false}','${false}','${false}', '${date}', '${gender}')`)
                .then(result => result.rowCount > 0 ?(true) : (false))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }
    
    async function CreateNewBuyerWallet() {
        return(
            NeonDB.then((pool) => 
                pool.query(`insert into campus_express_buyer_wallet(id,wallet_id,buyer_id,wallet_balance,wallet_pin,wallet_number,date) values(DEFAULT,'${wallet_id}','${buyer_id}','${0.00}','${pwd}','${phone}','${date}')`)
                .then(result => result.rowCount > 0 ? true : false)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    async function CreateCoverPhoto() {
        return(
            NeonDB.then((pool) => 
                pool.query(`insert into coverphoto(id,file,user_id,date) values(DEFAULT,'${null}','${buyer_id}','${new Date()}')`)
                .then(result => result.rowCount > 0 ?(true) : (false))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

   
    async function SendEmail() {
        let name = `${fname} ${lname}`
        let emailTemp = regTxtMailTemplateForBuyers(name)
        send_mail_via_outlook(email, 'Welcome To Campus Express', emailTemp)
    }
    
    async function SendSMS() {
        let name = `${fname} ${lname}`
        let emailMssg = regTxtMailForBuyers(name)
        send_sms(phone,emailMssg)
    }

    async function checkPhone() {
        return(
            await NeonDB.then((pool) => 
                pool.query(`
                    SELECT COUNT(*) as count
                    FROM campus_buyers
                    WHERE phone = '${phone}'
                `)
                .then(result => parseInt(result.rows[0].count, 10) > 0 ? {err: 'duplicate phone', bool: false} : {bool: true, err: ''})
                .catch(err => (err))
            ) 
        )
    }

    async function checkEmail() {
        return(
            await NeonDB.then((pool) => 
                pool.query(`
                    SELECT COUNT(*) as count
                    FROM campus_buyers
                    WHERE email = '${email}'
                `)
                .then(result => parseInt(result.rows[0].count, 10) > 0 ? {err: 'duplicate email', bool: false} : {bool: true, err: ''})
                .catch(err => (err))
            )
        )
    } 


    try{
        let email = await checkEmail(data => data)
        let phone = await checkPhone(data => data)
        new Promise((resolve, reject) => {

            if(!email.bool){
                reject(email.err)
            }else if(!phone.bool){
                reject(phone.err)
            }else{
                resolve(true)
            }
        })
        .then((result) => {
            let newBuyer = CreateNewBuyer()
            return(newBuyer ? (true) : (false))
        })
        .then((result) => {
            console.log('new buyer created',result)
            let coverphoto = result ? CreateCoverPhoto() : false;
            return(coverphoto ? (true) : (false))
        })
        .then((result) => {
            console.log('coverphoto done ...',result)
            let newBuyerWallet = result ? CreateNewBuyerWallet() : false;
            return(newBuyerWallet ? (true) : (false))
        })
        .then((result) => {
            result ? res.status(200).send({bool: true, data: buyer_id}) : ({bool: false, data: ''})
            SendEmail()
            SendSMS()
        })
       
        .catch((err) => {
            console.log(err)
            res.status(500).send({bool: false, data: err})
        })
    }catch(err){
        console.log(err)

        res.status(500).send({bool: false, data: err})

    }
}

async function log_buyer_in(req, res) {

    
    let {email,pwd} = req.body;
 
    new Promise((resolve, reject) => {
        NeonDB
        .then(async(pool) => {
                
            pool.query(`select "id" from "campus_buyers" where "email" = '${email}'`, (err, result) => {
                
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
                    `select "buyer_id","email","password","fname","lname" from  "campus_buyers" where "id" = '${id}'`
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
            console.log(auth)
            if (auth) {
                const token = createToken(user.buyer_id);
                res.status(200).send({bool: true, id: user.buyer_id, name: `${user.fname[0]}.${user.lname[0]}`});
    
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
        res.status(400).send({
            Mssg: "Email is not registered"
        })

    })
    
}


module.exports ={
    register_buyer,
    log_buyer_in
}
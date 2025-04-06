const { 
    NeonDB 
} = require("../../reuseables/db");
const { 
    shortId,
    jwt,
    bcrypt
} = require('../../reuseables/modules');
const { newItem } = require("../../reuseables/templates");
const { send_mail_via_outlook, send_sms, send_mail_via_brevo } = require("../../reuseables/utils");
const maxAge = 90 * 24 * 60 * 60; 

const createToken = (id) => {
    return jwt.sign({ id }, 'seller_secret', {
       expiresIn: maxAge
    });
};
async function register_seller(req,res) {

    let {fname,lname,email,phone,pwd,state,campus,gender} = req.body.body;
    let date = new Date().toLocaleString();
    let hPwd = await bcrypt.hash(pwd, 10)
    let seller_id = `CE-${shortId.generate()}`
    console.log(fname,lname,email,phone,pwd,state,campus,gender)

    async function CreateNewSeller() {
        return(
            await NeonDB.then((pool) => 
                pool.query(`insert into campus_sellers(id,fname, lname,seller_id,email,phone,password,state,campus,isActive,isVerified,isEmailVerified,isPhoneVerified,date,lastseen,gender) values(DEFAULT, '${fname}', '${lname}', '${seller_id}', '${email}', '${phone}', '${hPwd}', '${state}', '${campus}', '${false}','${false}','${false}','${false}', '${date}', '${date}', '${gender}')`)
                .then(result => result.rowCount > 0 ?(true) : (false))
                .catch(err => console.log('error: ',err))
            )
            .catch(err => console.log('error: ',err))
        )
    }
    
    async function CreateCoverPhoto() {
        return(
            NeonDB.then((pool) => 
                pool.query(`insert into coverphoto(id,file,user_id,date) values(DEFAULT,'${null}','${seller_id}','${new Date()}')`)
                .then(result => result.rowCount > 0 ?(true) : (false))
                .catch(err => console.log('error: ',err)) 
            )
            .catch(err => console.log('error: ',err))
        )
    }

    async function checkEmail() {
        return(
            await NeonDB.then((pool) => 
                pool.query(`
                    SELECT COUNT(*) as count
                    FROM campus_sellers
                    WHERE email = '${email}'
                `)
                .then(result => parseInt(result.rows[0].count, 10) > 0 ? {err: 'duplicate email', bool: false} : {bool: true, err: ''})
                .catch(err => (err))
            )
        )
    } 

    async function checkPhone() {
        return(
            await NeonDB.then((pool) => 
                pool.query(`
                    SELECT COUNT(*) as count
                    FROM campus_sellers
                    WHERE phone = '${phone}'
                `)
                .then(result => parseInt(result.rows[0].count, 10) > 0 ? {err: 'duplicate phone', bool: false} : {bool: true, err: ''})
                .catch(err => (err))
            ) 
        )
    }
 
    async function SendEmail() {
        // let name = `${fname} ${lname}`
        // let emailTemp = regTxtMailTemplate(name)
        // send_mail_via_outlook(email, 'Welcome To Campus Express', emailTemp)

        // let temp = newItem(constantData?.category, constantData?.price, constantData?.title, constantData.thumbnail_id)
        // send_mail_via_brevo(email, `Welcome To Campus Sphere Vendor Center ${fname} ${lname}`, temp)
    }
    
    async function SendSMS() {
        // let name = `${fname} ${lname}`
        // let emailMssg = regTxtMail(name)
        // send_sms(phone,emailMssg)
    }

    try{
        

        new Promise(async(resolve, reject) => {

            let emailResponse = await checkEmail(data => data)
            let phoneResponse = await checkPhone(data => data)

            // console.log(emailResponse,phoneResponse)

            if(!emailResponse.bool){
                reject(emailResponse.err)
            }else if(!phoneResponse.bool){
                reject(phoneResponse.err)
            }else{
                resolve(true)
            }

        })
        .then((result) => {
            let newSeller = CreateNewSeller()
            return(newSeller ? (true) : (false))
        })
        .then((result) => {
            let coverphoto = result ? CreateCoverPhoto() : false;
            return(coverphoto ? (true) : (false));
            
        })
        .then((result) => {
            const token = createToken(seller_id);
            result ? res.status(200).send({bool: true, cookie: token, id: seller_id}) : ({bool: false, data: ''})
            // SendEmail()
            // SendSMS()
        })
        .catch((err) => { 
            console.log('error--: ',err)
            res.status(500).send({bool: false, data: err})
        })
    }catch(err){
        console.log('error---: ',err)
        res.status(500).send({bool: false, data: err})
    }
} 

async function log_seller_in(req, res) {

    
    let {email,pwd} = req.body;
    
 
    new Promise((resolve, reject) => {
        NeonDB
        .then(async(pool) => {
                
            pool.query(`select "id" from "campus_sellers" where "email" = '${email}'`, (err, result) => {
                
                if(!err){
                    if(result.rows.length > 0){
                        const id = result.rows[0].id;
                        resolve(id)
                    }else{
                        
                        reject({
                            Mssg: "Email is not registered",
                            bool: false
                        });
                    }
                }else{
                    console.log('error: ',err)
                }
                 
            })
            
        });
    })
    .then(async(id) => {
        return(
            NeonDB
            .then(async(pool) => {
                let database_return_value = await pool.query(
                    `select "seller_id","email","password","fname","lname" from  "campus_sellers" where "id" = '${id}'`
                )
                .then(result => result.rows[0])
                .catch(err => console.log('error: ',err))

                return database_return_value
            })
        )
        
    })
    .then(async(user) => { 
        if(user){
            console.log(email,pwd)
            const auth = await bcrypt.compare(pwd, user.password);
            if (auth) {
                const token = createToken(user.seller_id);
                res.status(200).send({bool: true, user: user, cookie: token});
    
            }else{
                res.status(400).send({
                    Mssg: "Invalid password",
                    bool: false
                })
            }
        }else{
            res.status(400).send({
                Mssg: "Email is not registered",
                bool: false
            })
        }
    })
    .catch(err => {
        console.log('error: ',err)
        res.status(400).send({
            Mssg: "Email is not registered",
            bool: false
        })

    })
    
}

module.exports ={
    register_seller,
    log_seller_in
}
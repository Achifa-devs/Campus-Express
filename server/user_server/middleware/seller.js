const jwt = require('jsonwebtoken');
const { NeonDB } = require('../db');
const {Pool, Client} = require("pg");


const SellerAuth = async(req, res, next) => {
    const seller_secret = req.headers.authorization;
    
    let {id} = jwt.verify(seller_secret, 'seller_secret');
    res.status(200).send({bool: true, id:id})
   
    
}

function CheckPwdResetToken(req, res, next){
    const {seller_id,token} = req.body; 
    NeonDB.then((pool) => 
        pool.query(`SELECT * FROM password_token WHERE seller_id = '${seller_id}' AND token = '${token}'`)
        .then(result => {
            console.log(result)
            if(result.rows.length < 1){

                res.status(200).send(false)
            }else{
                res.status(200).send(true)
            }
        })

        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}

async function ValidateEmail(req,res) {

    let {token} = req.body
    console.log(token)

    function checkToken(params) {
        return(NeonDB.then((pool) => 
            pool.query(`SELECT * FROM email_token`)
            .then(result => result.rows.filter(item => item.token === token).length > 0 ? true : false)
            .catch(err => {console.log(err); return(false)})
        )
        .catch(err => {
            console.log(err)
        }))
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

    let checker = await checkToken()
    console.log(checker)
    checker ? deleteToken() : res.send(false)
}


module.exports = { SellerAuth, ValidateEmail, CheckPwdResetToken };

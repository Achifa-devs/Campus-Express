const jwt = require('jsonwebtoken');
const {Pool, Client} = require("pg");


const SellerAuth = async(req, res, next) => {
    const seller_secret = req.headers.authorization;
    
    let {id} = jwt.verify(seller_secret, 'seller_secret');
    res.status(200).send({bool: true, id:id})
   
    
}



module.exports = { SellerAuth };

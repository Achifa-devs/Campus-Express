const jwt = require('jsonwebtoken');
const {Pool, Client} = require("pg");


const SellerAuth = async(req, res, next) => {
    const seller_secret = req.headers.authorization;
    if(seller_secret){
        try {

            const { id } = jwt.verify(seller_secret, 'seller_secret');
            // Proceed with the decoded token data
            console.log('Decoded ID:', id);
            res.status(200).send({bool: true, id:id})

          } catch (error) {
            res.status(501).send({bool: false, id:''})

            if (error.name === 'JsonWebTokenError') {
              // Handle the case where the JWT is malformed or invalid
              console.error('JWT is malformed or invalid:', error.message);
              // You can respond with an appropriate error message or status code here

            } else {
              // Handle other potential errors
              console.error('An error occurred during JWT verification:', error.message);
            }
          }
    }else{
        res.status(501).send({bool: false, id:''})

    }
    
    
   
    
}



module.exports = { SellerAuth };

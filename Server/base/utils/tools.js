const maxAge = 90 * 24 * 60 * 60; 
const jwt  =  require('jsonwebtoken');
require('dotenv').config();


module.exports = class tools {
    static generateUserJwtToken = (id) => {
        return jwt.sign({ id }, process.env.USER_SECRET, {
           expiresIn: maxAge
        });
    };
    
    static generateNumericToken() {
      return Math.floor(10000 + Math.random() * 90000).toString();
    }

}

// Example usage:
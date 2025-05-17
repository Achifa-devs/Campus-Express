const { NeonDB } = require("../db")

const authorize_seller = (seller_id) => {
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT * FROM users WHERE seller_id = '${seller_id}' AND isVerified = 'true'`)
            .then(result => result.rows.length < 1 ? {bool: false, data: ''} : {bool: true, data:result.rows[0]})
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

module.exports = {authorize_seller}
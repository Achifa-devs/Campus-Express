// @@GET

const { NeonDB } = require("../../reuseables/db");


async function GetSellerData(req,res) {
    let {seller_id} = req.query;
    NeonDB.then((pool) => 
        pool.query(`SELECT * FROM campus_sellers WHERE seller_id = '${seller_id}'`)
        .then(result => res.status(200).send(result.rows[0]))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

async function GetSellerPhoto(req,res) {
    let {seller_id} = req.query;
    NeonDB.then((pool) => 
        pool.query(`SELECT * FROM coverphoto WHERE user_id = '${seller_id}'`)
        .then(result => res.send(result.rows[0]))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

} 

// @@GET

// @@UPDATES
async function UpdateSellerProfile(req,res) {
    let {
        fname,lname,state,campus,seller_id,photo
    } = req.body;

    console.log(fname,lname,state,campus,seller_id,photo)

    let date = new Date();

    new Promise((resolve, reject) => {
        NeonDB.then((pool) => 
            pool.query(`UPDATE campus_sellers set date='${date}', fname='${fname}', lname='${lname}', state='${state}', campus='${campus}' WHERE seller_id = '${seller_id}'`)
            .then(result => {
                result.rowCount > 0 ? resolve(true) : reject(false)
            })
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))

    })
    .then(() => {
        NeonDB.then((pool) => 
            pool.query(`UPDATE coverphoto set file='${photo}', date='${date}' WHERE user_id = '${seller_id}'`)
            .then(result => {
                result.rowCount > 0 ? res.send(true) : res.send(false)
            })
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}
// @@UPDATES

module.exports={
    GetSellerData,
    GetSellerPhoto,
    UpdateSellerProfile
}
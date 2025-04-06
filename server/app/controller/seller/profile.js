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

async function GetProfileAnalytics(req, res) {
    let {seller_id} = req.query;
    
    let customer_care = await NeonDB.then(async(pool) => 
        pool.query(`select * from customer_care where seller_id = '${seller_id}'`)
        .then(result => result.rows)
        .catch(err => {
            console.log(err)
            return false
        })
    )

    let return_address = await NeonDB.then(async(pool) => 
        pool.query(`select * from return where seller_id = '${seller_id}'`)
        .then(result => result.rows)
        .catch(err => {
            console.log(err)
            return false
        })
    )

    let shipping_info = await NeonDB.then(async(pool) => 
        pool.query(`select * from shipping where seller_id = '${seller_id}'`)
        .then(result => result.rows)
        .catch(err => {
            console.log(err)
            return false
        })
    )

    let payout_info = await NeonDB.then(async(pool) => 
        pool.query(`select * from payment where seller_id = '${seller_id}'`)
        .then(result => result.rows)
        .catch(err => {
            console.log(err)
            return false
        })
    )
    
    NeonDB.then((pool) => 
        pool.query(`select * from campus_shops where seller_id = '${seller_id}'`)
        .then(result => {

            let shop = customer_care[0]
            let ship = shipping_info[0]
            let refund = return_address[0]
            let payment = payout_info[0]


            let shopData;
            let shipData;
            let returnData;
            let paymentData;

            let shopList = []
            let shipList = []
            let returnList = []
            let payoutList = []



            for(x in shop){
                console.log([x][0])
                shopList.push({[x]:shop[x]})
            }
            for(x in ship){
                shipList.push({[x]:ship[x]})
            }
            for(x in refund){
                returnList.push({[x]:refund[x]})
            }
            for(x in payment){
                payoutList.push({[x]:payment[x]})
            }
           

            shopData = !shopList.length > 0 ? false : true
            paymentData = !payoutList.length > 0 ? false : true
            returnData = !returnList.length > 0 ? false : true
            shipData = !shipList.length > 0 ? false : true
           
            
            return({
                shipping_info: shipData,
                return_address: returnData,
                payout_info: paymentData,
                shopping_info: shopData
            })
            // res.status(200).send({paymentInfo: '', shopInfo: '', shippingInfo: ''})

        })
        .then(({payout_info,shopping_info,shipping_info,return_address}) => {

            let shippingBool = shipping_info === true ? true : false;
            let returnBool = return_address === true ? true : false;

            let shipping_return_bool = 
            shippingBool === true 
                ? 
                returnBool === true
                ?
                true
                :
                false
            :
            false
            
            res.status(200).send({
                paymentInfo: payout_info, 
                shopInfo: shopping_info, 
                shippingInfo: shipping_return_bool
            })

        })
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
    GetProfileAnalytics,
    UpdateSellerProfile
}
const { 
    shortId,
} = require('../../reuseables/modules');  
const { errHandler } = require('../../reuseables/ErrHandler');
const { NeonDB } = require('../../reuseables/db');


async function ShopSetup(req,res) {

    let {seller_id} = req.body
    let shop_id = shortId.generate()
    
    new Promise(async(resolve, reject) => {
        let result = await CreateNewShop(seller_id,shop_id)
        result ? resolve(true) : reject(false)
    })
    .then(async() => {
        let result = await BusinessMetrics(shop_id);
        console.log('business_metrics', result)
        result ? res.status(200).send(true) : res.status(501).send(false)
    })
    .catch((err) => {
        errHandler(err)
    })

}
async function CreateNewShop(seller_id,shop_id) {
    NeonDB.then((pool) => 
        pool.query(`insert into campus_shop (
            id,
            shop_id,
            shop_title,
            shop_description,
            seller_id,
            inventory,
            isActive,
            isEmpty,
            date,
            rent,
            subscription,
            coin
            ) 
            values(
            DEFAULT,
            '${shop_id}',
            '',
            '',
            '${seller_id}',
            '',
            ${false},
            ${true},
            '${new Date()}',
            '{
                    "date": "${new Date()}",
                    "price": "0",
                    "listing": "3"
            }',
            '{
                    "date": "${new Date()}",
                    "price": "0",
                    "package": "regular"
            }',
            ${10}
            )` 
        )
        .then(result => result.rowCount > 0 ? (true) : (false)))
        .catch(err => {
            errHandler(err)
        })
    .catch(err => {
        errHandler(err)
    })
    
}
async function BusinessMetrics(shop_id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`insert into business_metrics(
                id,
                shop_id,
                date,
                revenues,
                items_sold,
                items_rejected
            ) 
            values(
                DEFAULT,
                '${shop_id}',
                '${date}',
                '',
                '',
                '')
            `)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => {
                errHandler(err)
            }) 
        ) 
        .catch(err => {
            errHandler(err)
        })
    )
}








// @@UPDATES
// @@UPDATES
async function UpdateShopInfo(req,res) {
    let {data,seller_id} = req.body; 
    const entries = Object.entries(data);
    // Remove the first entry
    entries.shift();
    // Convert back to object
    const updatedObj = Object.fromEntries(entries);

    NeonDB.then((pool) => 
        pool.query(`UPDATE campus_shop set shop_title = '${data.name}', customer_care='${JSON.stringify(updatedObj)}' WHERE seller_id = '${seller_id}'`)
        .then(result => {
            result.rowCount > 0 ? res.send(true) : res.send(false)
        })
        .catch(err => errHandler(err))
    )
    .catch(err => errHandler(err))
    
}

async function UpdateShopName(req,res) {
    let {newShopName,seller_id} = req.body; 
    NeonDB.then((pool) => 
        pool.query(`UPDATE campus_shop set shop_title = '${newShopName}' WHERE seller_id = '${seller_id}'`)
        .then(result => {
            result.rowCount > 0 ? res.send(true) : res.send(false)
        })
        .catch(err => errHandler(err))
    )
    .catch(err => errHandler(err))
}

async function UpdateShippingInfo(req,res) {
    let {data,seller_id} = req.body; 

    NeonDB.then((pool) => 
        pool.query(`UPDATE campus_shop set shipping_info = '${JSON.stringify(data.shippingZone)}', return_address='${JSON.stringify(data.returnAddress)}' WHERE seller_id = '${seller_id}'`)
        .then(result => {
            result.rowCount > 0 ? res.send(true) : res.send(false)
        })
        .catch(err => errHandler(err))
    )
    .catch(err => errHandler(err))
}

async function UpdatePaymentInfo(req,res) {
    let {data,seller_id} = req.body; 

    NeonDB.then((pool) => 
        pool.query(`UPDATE campus_shop set payout_info = '${JSON.stringify(data)}' WHERE seller_id = '${seller_id}'`)
        .then(result => {
            result.rowCount > 0 ? res.send(true) : res.send(false)
        })
        .catch(err => errHandler(err))
    )
    .catch(err => errHandler(err))
}

async function UpdateInventory(req,res) {
    let {inventory, seller_id} = req.body;
    console.log(inventory)
    NeonDB.then((pool) => 
        pool.query(`UPDATE campus_shop set inventory='${JSON.stringify(inventory)}' WHERE seller_id = '${seller_id}'`)
        .then(result => {
            result.rowCount > 0 ? res.send(true) : res.send(false)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

async function PayRent(req,res){

    let {rent,seller_id} = req.body; 
    console.log(rent,seller_id)

    NeonDB.then((pool) => 
        pool.query(`UPDATE campus_shop set rent=jsonb_set(rent, '{price}', '"${rent}"', false), date = '${new Date()}' WHERE seller_id = '${seller_id}'`)
        .then(result => {
            result.rowCount > 0 ? res.send(true) : res.send(false)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}
// @@UPDATES
// @@UPDATES



// @@GET
async function GetShop(req,res)  {
    let {seller_id} = req.query;
    NeonDB.then((pool) => 
        pool.query(`select * from campus_shop where seller_id = '${seller_id}'`)
        .then(result => res.status(200).send(result.rows[0]))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}
//@@GET

module.exports={
    ShopSetup,
    GetShop,
    PayRent,
    UpdateInventory,
    UpdatePaymentInfo,
    UpdateShippingInfo,
    UpdateShopInfo,
    UpdateShopName
}
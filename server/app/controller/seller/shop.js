const { 
    shortId,
} = require('../../reuseables/modules');  
const { errHandler } = require('../../reuseables/ErrHandler');
const { NeonDB } = require('../../reuseables/db');


async function ShopSetup(req,res) {

    let {seller_id,newShopName} = req.body
    let shop_id = shortId.generate()
    
    new Promise(async(resolve, reject) => {
        let result = await CreateNewShop(seller_id,shop_id,newShopName)
        result ? resolve(true) : reject(false)
    })
    .then(async() => {
        res.status(200).send(true)
        // let result = await BusinessMetrics(shop_id);
        // console.log('business_metrics', result)
        // result ? res.status(200).send(true) : res.status(501).send(false)
    })
    .catch((err) => {
        errHandler(err, res)
        // res.status(501).send(false)
        console.log(err)

    })

}
async function CreateNewShop(seller_id,shop_id,newShopName) {
    NeonDB.then((pool) => 
        pool.query(`insert into campus_shops (
            id,
            shop_id,
            seller_id,
            title,
            category,
            status,
            description,
            logo_url,
            open_hrs,
            social_links,
            is_verified,
            created_at,
            updated_at
            ) 
            values(
            DEFAULT,
            '${shop_id}',
            '${seller_id}',
            '${newShopName}',
            '',
            'active',
            '',
            '',
            '',
            '',
            ${false},
            '${new Date()}',
            '${new Date()}'
            
            )` 
        )
        .then(result => result.rowCount > 0 ? (true) : (false)))
        .catch(err => {
            console.log(err)
            errHandler(err, res)
        })
    .catch(err => {
        console.log(err)

        errHandler(err, res)
    })
    
}

// async function BusinessMetrics(shop_id) {
//     return(
//         NeonDB.then((pool) => 
//             pool.query(`insert into business_metrics(
//                 id,
//                 shop_id,
//                 date,
//                 revenues,
//                 items_sold,
//                 items_rejected
//             ) 
//             values(
//                 DEFAULT,
//                 '${shop_id}',
//                 '${new Date()}',
//                 '${0}',
//                 '${0}',
//                 '${0}')
//             `)
//             .then(result => result.rowCount > 0 ? (true) : (false))
//             .catch(err => {
//                 errHandler(`bm1-${err}`)
//             }) 
//         ) 
//         .catch(err => {
//             errHandler(`bm2-${err}`)
//         })
//     )
// }








// @@UPDATES
// @@UPDATES
async function UpdateShopInfo(req,res) {
    let {
        data,
        seller_id
    } = req.body; 
    
    let {
        customerCareName, 
        customerCarePhone, 
        customerCareEmail, 
        customerCareAddress1, 
        customerCareAddress2, 
        customerCareAddress3, 
        customerCareAddress4, 
        City, 
        State, 
        Country,
    } = data


    let customer_service_exist = await NeonDB.then(async(pool) => 
        pool.query(`select * from customer_care where seller_id = '${seller_id}'`)
        .then(result =>(result.rows.length > 0 ? true : false))
        .catch(err => {
            console.log(err)
            return false
        })
    )
        .catch(err => console.log(err))
    
    console.log(customer_service_exist)
    

    if (customer_service_exist) {
        NeonDB.then((pool) => 
            pool.query(`UPDATE customer_care set 
                name = '${customerCareName}', 
                phone = '${customerCarePhone}', 
                email = '${customerCareEmail}', 
                address1 = '${customerCareAddress1}', 
                address2 = '${customerCareAddress2}', 
                address3 = '${customerCareAddress3}', 
                address4 = '${customerCareAddress4}', 
                town = '${City}', 
                state = '${State}', 
                country = '${Country}'
                WHERE seller_id = '${seller_id}'`)
            .then(result => {
                result.rowCount > 0 ? res.send(true) : res.send(false)
            })
            .catch(err => errHandler(err, res))
        )
        .catch(err => errHandler(err, res))
    } else {
        NeonDB.then((pool) => 
            pool.query(`INSERT INTO customer_care(
                    id,
                    name, 
                    phone, 
                    email, 
                    address1, 
                    address2, 
                    address3, 
                    address4, 
                    town, 
                    state, 
                    country,
                    seller_id
                ) 
                values(
                    DEFAULT,
                    '${customerCareName}', 
                    '${customerCarePhone}', 
                    '${customerCareEmail}', 
                    '${customerCareAddress1}', 
                    '${customerCareAddress2}', 
                    '${customerCareAddress3}', 
                    '${customerCareAddress4}', 
                    '${City}', 
                    '${State}', 
                    '${Country}',
                    '${seller_id}'
                )`)
            .then(result => {
                result.rowCount > 0 ? res.send(true) : res.send(false)
            })
            .catch(err => errHandler(err, res))
        )
        .catch(err => errHandler(err, res))
    }

    
    
}

async function UpdateShopName(req,res) {
    let {newShopName,seller_id} = req.body; 
    NeonDB.then((pool) => 
        pool.query(`UPDATE campus_shops set title = '${newShopName}' WHERE seller_id = '${seller_id}'`)
        .then(result => {
            result.rowCount > 0 ? res.send(true) : res.send(false)
        })
        .catch(err => errHandler(err, res))
    )
    .catch(err => errHandler(err, res))
}

async function UpdateShippingInfo(req,res) {
    
    let {
        data,
        seller_id
    } = req.body; 
    
    let {
        shippingZone,
        returnAddress
    } = data

    async function shipping_function() {
        let {
            Address1,
            Address2,
            Address3,
            Address4,
            City,
            State,
            Country
        }= shippingZone;

        let shipping_exist = await NeonDB.then(async(pool) => 
            pool.query(`select * from shipping where seller_id = '${seller_id}'`)
            .then(result =>(result.rows.length > 0 ? true : false))
            .catch(err => {
                console.log(err)
                return false
            })
        )
        .catch(err => console.log(err))
        
        // console.log(shipping_exist)
        
    
        if (shipping_exist) {
            let response = await NeonDB.then((pool) => 
                pool.query(`UPDATE shipping set 
                    address1 = '${Address1}', 
                    address2 = '${Address2}', 
                    address3 = '${Address3}', 
                    address4 = '${Address4}', 
                    town = '${City}', 
                    state = '${State}', 
                    country = '${Country}'
                    WHERE seller_id = '${seller_id}'`)
                .then(result => 
                    result.rowCount > 0 ? (true) : (false)
                )
                .catch(err => {
                    errHandler(err, res)
                    return false
                })
            )
            .catch(err => {
                errHandler(err, res)
                return false
            })

            return response;
        } else {
            let response = await NeonDB.then((pool) => 
                pool.query(`INSERT INTO shipping(
                        id,
                        address1, 
                        address2, 
                        address3, 
                        address4, 
                        town, 
                        state, 
                        country,
                        seller_id
                    ) 
                    values(
                        DEFAULT,
                        '${Address1}', 
                        '${Address2}', 
                        '${Address3}', 
                        '${Address4}', 
                        '${City}', 
                        '${State}', 
                        '${Country}',
                        '${seller_id}'
                    )`)
                .then(result => 
                    result.rowCount > 0 ? (true) : (false)
                )
                .catch(err => {
                    errHandler(err, res);
                    return false
                })
            )
            .catch(err => {
                errHandler(err, res);
                return false
            })

            return response;

        }
    
    
    }


    async function return_function(params) {
        let  {
            Address1,
            Address2,
            Address3,
            Address4,
            City,
            State,
            Country
        } = returnAddress;
        let return_exist = await NeonDB.then(async(pool) => 
            pool.query(`select * from return where seller_id = '${seller_id}'`)
            .then(result =>(result.rows.length > 0 ? true : false))
            .catch(err => {
                console.log(err)
                return false
            })
        )
        .catch(err => {
            console.log(err)
            return false
        })
        
        console.log(return_exist)
        
    
        if (return_exist) {
            let response = await NeonDB.then((pool) => 
                pool.query(`UPDATE return set 
                    address1 = '${Address1}', 
                    address2 = '${Address2}', 
                    address3 = '${Address3}', 
                    address4 = '${Address4}', 
                    town = '${City}', 
                    state = '${State}', 
                    country = '${Country}'
                    WHERE seller_id = '${seller_id}'`)
                .then(result => 
                    result.rowCount > 0 ? (true) : (false)
                )
                .catch(err => {
                    errHandler(err, res);
                    return false
                })
            )
            .catch(err => {
                errHandler(err, res);
                return false
            })
            return response;

        } else {
            let response = await NeonDB.then((pool) => 
                pool.query(`INSERT INTO return(
                    id,
                    address1, 
                    address2, 
                    address3, 
                    address4, 
                    town, 
                    state, 
                    country,
                    seller_id
                ) 
                values(
                    DEFAULT,
                    '${Address1}', 
                    '${Address2}', 
                    '${Address3}', 
                    '${Address4}', 
                    '${City}', 
                    '${State}', 
                    '${Country}',
                    '${seller_id}'
                )`)
                .then(result => 
                    result.rowCount > 0 ? (true) : (false)
                )
                .catch(err => {
                    errHandler(err, res);
                    return false
                })
            )
            .catch(err => {
                errHandler(err, res);
                return false
            })
            return response;
        }
    }



    new Promise(async(resolve, reject) => {
        let shipping_response = await shipping_function();
        if (shipping_response) {
            resolve()
        } else {
            reject()
        }

    })
    .then(async(result) => {
        let return_response = await return_function()
        if (return_response) {
            res.status(200).send({bool: true})
        } else {
            res.status(500).send({bool: false})

        }
    })
    .catch((err) => {
        console.log(err)
        errHandler(err, res)
        res.status(500).send({bool: false})
        
    })


}

async function UpdatePaymentInfo(req,res) {
    
    let {
        data,
        seller_id
    } = req.body; 
    
    let {
        bankName,
        bankAccountNumber,
        accountBeneficiary,
    } = data


    let payment_exist = await NeonDB.then(async(pool) => 
        pool.query(`select * from payment where seller_id = '${seller_id}'`)
        .then(result =>(result.rows.length > 0 ? true : false))
        .catch(err => {
            console.log(err)
            errHandler(err, res)
            return false
        })
    )
    .catch(err => {
        console.log(err)
        errHandler(err, res)
        return false
    })
    
    console.log(payment_exist)
   

    if (payment_exist) {
        NeonDB.then((pool) => 
            pool.query(`UPDATE payment set 
                acct_num = '${bankName}', 
                bank = '${bankAccountNumber}', 
                beneficiary = '${accountBeneficiary}', 
                WHERE seller_id = '${seller_id}'`)
            .then(result => {
                result.rowCount > 0 ? res.send({bool: true}) : res.send({bool: false})
            })
            .catch(err => {
                console.log(err)
                errHandler(err, res)
                return false
            })
        )
        .catch(err => {
            console.log(err)
            errHandler(err, res)
            return false
        })
    } else {
        NeonDB.then((pool) => 
            pool.query(`INSERT INTO payment(
                    id,
                    acct_num,
                    bank,
                    beneficiary,
                    seller_id
                ) 
                values(
                    DEFAULT,
                    '${bankAccountNumber}', 
                    '${bankName}', 
                    '${accountBeneficiary}', 
                    '${seller_id}'
                )`)
            .then(result => {
                result.rowCount > 0 ? res.send({bool: true}) : res.send({bool: false})
            })
            .catch(err => {
                console.log(err)
                errHandler(err, res)
                return false
            })
        )
        .catch(err => {
            console.log(err)
            errHandler(err, res)
            return false
        })
    }
}

async function UpdateInventory(req,res) {
    let {inventory, seller_id} = req.body;
    console.log(inventory)
    NeonDB.then((pool) => 
        pool.query(`UPDATE campus_shops set inventory='${JSON.stringify(inventory)}' WHERE seller_id = '${seller_id}'`)
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
        pool.query(`UPDATE campus_shops set rent=jsonb_set(rent, '{price}', '"${rent}"', false), date = '${new Date()}' WHERE seller_id = '${seller_id}'`)
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
        pool.query(`select * from campus_shops where seller_id = '${seller_id}'`)
        .then(result => res.status(200).send(result.rows))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}


async function GetShopInfo(req,res)  {
    let {seller_id} = req.query;
    NeonDB.then((pool) => 
        pool.query(`select * from customer_care where seller_id = '${seller_id}'`)
        .then(result => res.status(200).send(result.rows))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}

async function GetShopShipping(req,res)  {
    let {seller_id} = req.query;
    let return_response = await NeonDB.then((pool) => 
        pool.query(`select * from return where seller_id = '${seller_id}'`)
        .then(result => (result.rows))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
    
    let shipping_response = await NeonDB.then((pool) => 
        pool.query(`select * from shipping where seller_id = '${seller_id}'`)
        .then(result => (result.rows))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
    
    res.status(200).send({return_response,shipping_response})

}

async function GetShopPayment(req,res)  {
    let {seller_id} = req.query;
    NeonDB.then((pool) => 
        pool.query(`select * from payment where seller_id = '${seller_id}'`)
        .then(result => res.status(200).send(result.rows))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}
//@@GET

module.exports={
    ShopSetup,
    // UpdateReturnInfo,
    GetShop,
    PayRent,
    UpdateInventory,
    UpdatePaymentInfo,
    UpdateShippingInfo,
    UpdateShopInfo,
    GetShopInfo,
    GetShopPayment,
    GetShopShipping,
    UpdateShopName
}
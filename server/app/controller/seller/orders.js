const { 
    shortId,
} = require('../../reuseables/modules');  
const { errHandler } = require('../../reuseables/ErrHandler');
const { NeonDB } = require('../../reuseables/db');



// @@GET
async function GetOrders(req,res)  {
    let {seller_id} = req.query;

    let data = await NeonDB.then((pool) => 
        pool.query(`select * from seller_shop where seller_id = '${seller_id}'`)
        .then(result => (result.rows))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

   

    async function getOrders(item) {
        return(
            await NeonDB.then((pool) => 
                pool.query(`select * from campus_express_buyer_orders where product_id = '${item?.product_id}'`)
                .then(result => 
                    result.rows.length > 0
                    ?
                    ({order: result.rows[0], product: item})
                    : 
                     null
                )
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    // getOrders()

    let response = await data.map((item) => getOrders(item));
    console.log(response)
    let result = await Promise.all(response).then(result => result).catch(err => console.log(err))
    res.status(200).send(result.filter(item => item !== null))
    console.log(result)




}
//@@GET


// @@GET
async function CancelOrder(req,res)  {
    let {order_id} = req.body;

    await NeonDB.then((pool) => 
        pool.query(`
        UPDATE campus_express_buyer_orders 
        SET status = jsonb_set(status::jsonb, '{state}', '"cancelled"') 
        WHERE order_id = '${order_id}'`
        )
        .then(result => result.rowCount === 1 ? res.status(200).send({bool: true}) : res.status(500).send({bool: false}))
        .catch(err => {
            res.status(500).send({bool: false})
            console.log(err)
        })
    )
    .catch(err => {
        res.status(500).send({bool: false})
        console.log(err)
    })

   



}
//@@GET

module.exports={
    GetOrders,
    CancelOrder
}
const { NeonDB } = require("../../db");
const { retrieve_product_with_id, retrieve_seller } = require("../../utils");

function DeleteItem(req,res) {
    let {
        seller_id,
        product_id
    } = req.query;


    let book = []

    console.log(seller_id,product_id)

    new Promise((resolve, reject) => {
        NeonDB.then((pool) => 
            pool.query(`DELETE FROM seller_shop WHERE product_id = '${product_id}' `)
            .then(result => result.rowCount > 0 ? resolve(true) : reject(false))
            .catch(err => console.log('mssg',err))
        )
        .catch(err => console.log('mssg 1',err))

    })
    .then((response) => 

        NeonDB.then((pool) => 
            pool.query(`DELETE FROM product_photo WHERE product_id = '${product_id}' `)
            .then(result => result.rowCount > 0 ? res.send(true) : res.send(false))
            .catch(err => console.log('mssg 2',err))
        )    

    )
    .catch(err => console.log('mssg',err))
}

async function unsave_item(req,res) {
    let {product_id,buyer_id} = req.query;
    let delete_result = await NeonDB.then((pool) => 
        pool.query(`DELETE FROM campus_express_buyer_saveditems WHERE buyer_id = '${buyer_id}' AND product_id = '${product_id}'`)
        .then(result => result.rowCount > 0 ? (true) : (false))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

    function get_saved_item() { 
        return(
            NeonDB.then((pool) => 
                pool.query(`SELECt * FROM campus_express_buyer_saveditems WHERE buyer_id = '${buyer_id}'`)
                .then(result => (result.rows))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }
    

    if(delete_result){
        let savedData = await get_saved_item()

        let products = await Promise.all(savedData.map(async(item) => {
            return {
                saved_item: await retrieve_product_with_id(item.product_id), 
                item: item, 
                seller: await retrieve_seller(await retrieve_product_with_id(item.product_id).then(result => result[0].seller_id))
            }
        }))

        res.send(products)

    }

}


module.exports={
    DeleteItem,
    unsave_item
}
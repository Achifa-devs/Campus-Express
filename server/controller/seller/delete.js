const { NeonDB } = require("../../db");

async function DeleteItem(req,res) {
    let {
        product_ids
    } = req.query;
    console.log(product_ids)
    

    let response = await  Promise.all(product_ids.map(async(item) => {
        let result1= await delete_meta_data(item); 
        let result2= await delete_media(item);
        return({meta: result1, media: result2})
    })) 

    if(response.length === product_ids.length){
        res.send({ids: product_ids, bool: true})
    }


    async function delete_meta_data(product_id) {
        return(await NeonDB.then((pool) => 
            pool.query(`DELETE FROM seller_shop WHERE product_id = '${product_id}' `)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log('mssg',err))
        )
        .catch(err => console.log('mssg 1',err)))
    }

    async function delete_media(product_id) {
        return(await NeonDB.then((pool) => 
            pool.query(`DELETE FROM product_photo WHERE product_id = '${product_id}' `)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log('mssg 2',err))
        )    
        .catch(err => console.log('mssg 1',err)))
    }

  
}

module.exports={
    DeleteItem
}
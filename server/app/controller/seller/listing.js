const multer = require("multer");
const { uploadImages } = require("../../reuseables/cloudinary");
const { NeonDB } = require("../../reuseables/db");
const { shortId } = require("../../reuseables/modules");
const { upload_photos, upload_meta_data, send_mail_via_brevo, retrieve_seller } = require("../../reuseables/utils");
const { newItem } = require("../../reuseables/templates");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
// @@GET
async function GetItems(req,res)  {
    let {id} = req.query;

    console.log(id)

    let products = await NeonDB.then((pool) => 
        pool.query(`select * from seller_shop where seller_id = '${id}'`)
        .then(result => (result.rows))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

    async function get_reviews(product) {
        return(
            await NeonDB.then((pool) => 
                pool.query(`select * from reviews where seller_id = '${product.product_id}'`)
                .then(result => (result.rows))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    async function get_orders(product) {
        return(
            await NeonDB.then((pool) => 
                pool.query(`select * from campus_express_buyer_orders where product_id = '${product.product_id}'`)
                .then(result => (result.rows))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    let doc = products.map(async(item) => {
        let orders = await get_orders(item)
        let reviews = await get_reviews(item)

        let product = item;
        product['orders'] = orders.length
        product['reviews'] = reviews.length

        return product;
    })

    let response = await Promise.all(doc).then(item => item).catch(err => console.log(err))
    res.status(200).send(response)


}

async function GetEditedItem(req,res)  {
    let {product_id} = req.query;
    NeonDB.then((pool) => 
        pool.query(`select * from seller_shop where product_id = '${product_id}'`)
        .then(result => res.status(200).send(result.rows))
        .catch(err => {
            console.log(err)
        })
    )
    .catch(err => {
        console.log(err)
    })
    
}
// @@GET

// @@UPDATES
async function UpdateProduct(req,res) {

    let {constantData, dynamicData, shipping_data}= req.body;

    Object.keys(dynamicData).forEach(key => {
        if (dynamicData[key] === '') {
          delete dynamicData[key];
        }
    });

    let date = new Date();

    let replacedDescription = constantData.description.replace(/'/g, '"');
    let replacedTitle = constantData.title.replace(/'/g, '"');
    let book = []
    let imageId = shortId.generate();

    new Promise((resolve, reject) => {
        NeonDB.then((pool) => 
            pool.query(`UPDATE seller_shop set date='${date}', title='${replacedTitle}', category='${constantData.category}', others='${JSON.stringify(dynamicData)}', price='${constantData.price}', stock='${constantData.stock}', thumbnail_id='${constantData.thumbnail_id}', accept_refund='${shipping_data?.shipping_policy}', shipping_range='${JSON.stringify(shipping_data?.shipping_range)}', shipping_duration='${shipping_data?.shipping_duration}', description='${replacedDescription}' WHERE product_id = '${constantData.product_id}'`)
            .then(result => {
                console.log(result.rowCount,constantData.product_id)
                result.rowCount > 0 ? resolve(true) : reject(false)
            })
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))

    })
    .then((result) => {
        console.log(result)
        res.send(true);
    })
    .catch(err => console.log('error message from updating product: ',err))


}
// @@UPDATES


// @@POST
async function UploadNewItem(req,res) {

    let {constantData, dynamicData, shipping_data}= req.body;

    Object.keys(dynamicData).forEach(key => {
        if (dynamicData[key] === '') {
          delete dynamicData[key];
        }
    });

    let productId = constantData.product_id;
    let replacedDescription = constantData.description.replace(/'/g, '"');
    let replacedTitle = constantData.title.replace(/'/g, '"');

    let response = await upload_meta_data(replacedTitle, replacedDescription, constantData.category, constantData.price, constantData.stock, constantData.seller_id, constantData.thumbnail_id, productId, dynamicData,shipping_data,constantData?.campus,constantData?.state,constantData?.thumbnail_public_id);
    if(response){
        
        // let email = await retrieve_seller(constantData.seller_id)
        // let temp = newItem(constantData?.category, constantData?.price, constantData?.title, constantData.thumbnail_id)
        // send_mail_via_brevo(email, 'New Item Uploaded Successfully', temp)
        res.send(true);
    }else{
        res.send(false);
    }

}
// @@POST

// @@DELETE
async function DeleteItem(req,res) {
    let {
        product_id
    } = req.query;

    new Promise((resolve, reject) => {
        NeonDB.then((pool) => 
            pool.query(`DELETE FROM seller_shop WHERE product_id = '${product_id}' `)
            .then(result => result.rowCount > 0 ? resolve(true) : reject(false))
            .catch(err => console.log(err))
        )
        .catch(err => {
            console.log('seller_shop delete', err)
            res.status(501).send(true)
        })
    })
    .then((result) => {
        if (result) {
            cloudinary.api.delete_resources_by_prefix(`${product_id}/`, function (error, result) {
                console.log(result)
                if (error) {
                    console.error("Error deleting resources:", error);
                    res.status(501).send(false)
                } 
    
                // Step 2: Delete the folder itself
                cloudinary.api.delete_folder(product_id, function(err, result) {
                    if (err) {
                    console.error("Error deleting folder:", err);
                    } else {
                        console.log("Folder deleted successfully:", result);
                        res.status(200).send(true)
                    }
                });
            });
        } else {
            res.status(501).send(false)
        }
    })
    .catch(err => {
        console.log('seller_shop delete', err)
        res.status(501).send(true)
    })

}
// @@DELETE


module.exports={
    DeleteItem,
    GetEditedItem,
    GetItems,
    UploadNewItem,
    UpdateProduct
}
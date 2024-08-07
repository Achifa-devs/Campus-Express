const { uploadImages } = require("../../reuseables/cloudinary");
const { NeonDB } = require("../../reuseables/db");
const { shortId } = require("../../reuseables/modules");
const { upload_photos, upload_meta_data } = require("../../reuseables/utils");

// @@GET
async function GetItems(req,res)  {
    let {id} = req.query;
    console.log(id)
    NeonDB.then((pool) => 
        pool.query(`select * from seller_shop where seller_id = '${id}'`)
        .then(result => res.send(result.rows))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}

async function GetEditedItem(req,res)  {
    let {product_id} = req.query;
    function getMetadata() {
        return(
            NeonDB.then((pool) => 
                pool.query(`select * from seller_shop where product_id = '${product_id}'`)
                .then(result => (result.rows))
                .catch(err => {
                    console.log(err)
                })
            )
            .catch(err => {
                console.log(err)
            })
        )
    }

    function getThumnails(params) {
        return(
            NeonDB.then((pool) => 
                pool.query(`select file from product_photo where product_id = '${product_id}'`)
                .then(result => (result.rows))
                .catch(err => {
                    console.log(err)
                })
            )
            .catch(err => {
                console.log(err)
            })
        )
    }

    let meta_data = await getMetadata()
    let photos = await getThumnails()

    res.status(200).send({meta_data, photos})
}
// @@GET

// @@UPDATES
async function UpdateProduct(req,res) {

    let {constantData, dynamicData}= req.body;

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
            pool.query(`UPDATE seller_shop set date='${date}', title='${replacedTitle}', category='${constantData.category}', others='${JSON.stringify(dynamicData)}', price='${constantData.price}', description='${replacedDescription}' WHERE product_id = '${constantData.product_id}'`)
            .then(result => {
                result.rowCount > 0 ? resolve(true) : reject(false)
            })
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))

    })
    .then((response) => 

        response
        ?
        NeonDB.then((pool) => 
            pool.query(`DELETE FROM product_photo WHERE product_id = '${constantData.product_id}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )  
        : 
        false
    )
    .then(async(response) => {
       
        constantData.photos.map(item => 
            NeonDB.then((pool) => 
                pool.query(`insert into product_photo(id,product_id,seller_id,file,image_id) values(DEFAULT, '${constantData.product_id}', '${constantData.seller_id}', '${item}', '${imageId}')`)
                .then(result => {
                    console.log('jbkjbk',result)

                    result.rowCount > 0 ? book.push(true) : book.push(false)
                    if(book.length === constantData.photos.length){
                        res.send(true)
                    }
                }) 
                .catch(err => console.log(err))
            )    
        )

    })
    
    .catch(err => console.log('error message from updating product: ',err))


}
// @@UPDATES


// @@POST
async function UploadNewItem(req,res) {

    let {constantData, dynamicData}= req.body;

    Object.keys(dynamicData).forEach(key => {
        if (dynamicData[key] === '') {
          delete dynamicData[key];
        }
    });

    let date = new Date();
    let productId = shortId.generate()
    let imageId = shortId.generate();
    let book = []

    let replacedDescription = constantData.description.replace(/'/g, '"');
    let replacedTitle = constantData.title.replace(/'/g, '"');

    if(constantData.category.toLowerCase() === 'lodge/apartments'){
        let videoResponse = await uploadVideo(constantData.videos,productId,replacedTitle)
        if(videoResponse.bool){
            let meta_data_respons = await upload_meta_data(replacedTitle,replacedDescription,constantData.category,constantData.price,constantData.seller_id,productId,dynamicData)
            if(meta_data_respons){
                res.send(true);
            }else{
                res.send(false);

            }
        }else{
            res.send(videoResponse);
        }
    }else{
        
        let photoresponse = uploadImages(constantData.photos, productId, replacedTitle)
        console.log((await photoresponse).bool)
        if((await photoresponse).bool){
            let meta_data_respons = await upload_meta_data(replacedTitle,replacedDescription,constantData.category,constantData.price,constantData.seller_id,productId,dynamicData)
            if(meta_data_respons){
                res.send(true);
            }
        }else{
            res.send(false);

        }
    }


    

    
}
// @@POST

// @@DELETE
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
// @@DELETE


module.exports={
    DeleteItem,
    GetEditedItem,
    GetItems,
    UploadNewItem,
    UpdateProduct
}
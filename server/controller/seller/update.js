const { NeonDB } = require("../../db");
const { pwd_reset } = require("../../templates");
const { bcrypt, shortId } = require("../../modules");

function UpdateSellerProfile(req,res) {
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

function UpdateProduct(req,res) {

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
    
    .catch(err => console.log('error messafe from updating product: ',err))


}

async function UpdatePwd(req,res) {
    let {email, pwd} = req.body;
    console.log(email,pwd)
    
    let hPwd = await bcrypt.hash(pwd, 10)

    NeonDB.then((pool) => 
        pool.query(`UPDATE campus_sellers set password='${hPwd}' WHERE email = '${email}'`)
        .then(result => {
            result.rowCount > 0 ? res.send(true) : res.send(false)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

async function UpdateShopTitle(req,res) {
    let {title, description, seller_id} = req.body;
    
    NeonDB.then((pool) => 
        pool.query(`UPDATE campus_shop set shop_title='${title.replace(/'/g, '"')}' WHERE seller_id = '${seller_id}'`)
        .then(result => {
            result.rowCount > 0 ? res.send(true) : res.send(false)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

async function UpdateShopDesc(req,res) {
    let {title, description, seller_id} = req.body;
    
    NeonDB.then((pool) => 
        pool.query(`UPDATE campus_shop set shop_description='${description.replace(/'/g, '"')}' WHERE seller_id = '${seller_id}'`)
        .then(result => {
            result.rowCount > 0 ? res.send(true) : res.send(false)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

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

module.exports={
    UpdateSellerProfile,
    UpdateProduct,
    UpdatePwd,
    UpdateShopTitle,
    UpdateShopDesc,
    UpdateInventory,
    PayRent
}
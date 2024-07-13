const { NeonDB } = require("../../db");
const { bcrypt, shortId } = require("../../modules");



async function update_view(req,res) {

    let {product_id, buyer_id,} = req.body;
    let date = new Date();
    let view_id = shortId.generate();
    console.log(product_id,buyer_id)

    new Promise((resolve, reject) => {
        NeonDB.then((pool) => 
            pool.query(`select * from "views" where product_id = '${product_id}' AND buyer_id = '${buyer_id}'`)
            .then((result) => result.rows.length > 0 ? reject(false) : resolve(true))
            .catch((err) => console.log(err))
        )
        .catch(err => console.log(err))
    })
    .then(() => 
        NeonDB.then((pool) => 
            pool.query(`INSERT INTO views(id, view_id, product_id, buyer_id, date) values(DEFAULT, '${view_id}', '${product_id}', '${buyer_id}', '${date}')`)
            .then((result) => result.rowCount)
            .catch((err) => {
                console.log(err)
            })
        )
        .catch(err => console.log(err))
    )
    .then(() => 
        NeonDB.then((pool) => 
            pool.query(`UPDATE seller_shop set views = views+1 WHERE product_id = '${product_id}'`)
            .then((result) => result.rowCount === 1 ? true : false)
            .catch((err) => {
                console.log(err)
            })
        )
        .catch(err => console.log(err))
    )
    .then((data) =>{ 
        if(data){
            res.status(200).send(true)
        }else{
            res.status(501).send(false)

        }
    })
    .catch(err => {
        res.status(501).send(false)
        console.log(err)
    })
}

async function update_pwd(req,res) {
    
    let {buyer_id, pwd} = req.body;
    
    let hPwd = await bcrypt.hash(pwd, 10)

    NeonDB.then((pool) => 
        pool.query(`UPDATE campus_buyers set password='${hPwd}' WHERE buyer_id = '${buyer_id}'`)
        .then(result => {
            result.rowCount > 0 ? res.send(true) : res.send(false)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

function update_cart(req,res) {
    let {type,buyer_id,product_id} = req.body;
    function Add() {
        return(
            NeonDB.then((pool) => 
                pool.query(`UPDATE campus_express_buyer_cart set unit = unit + 1 WHERE buyer_id = '${buyer_id}' AND product_id = '${product_id}'`)
                .then(result => result.rowCount)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    function Minus() {
        return(
            NeonDB.then((pool) => 
                pool.query(`UPDATE campus_express_buyer_cart set unit = unit - 1 WHERE buyer_id = '${buyer_id}' AND product_id = '${product_id}'`)
                .then(result => result.rowCount)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    if(type === 'add'){
        let result =  Add()
        res.send(result)
    }else{
        let result = Minus()
        res.send(result)
    }
}


module.exports={
    update_view,
    update_pwd,
    update_cart
}
const { NeonDB } = require("../../reuseables/db");
const { bcrypt, shortId } = require("../../reuseables/modules");



async function update_view(req,res) {

    let {product_id, user_id} = req.body.body;
    let date = new Date();
    let view_id = shortId.generate();
    // console.log(req.body.body)

    new Promise((resolve, reject) => {
        NeonDB.then((pool) => 
            pool.query(`select * from "views" where product_id = '${product_id}' AND user_id = '${user_id}'`)
            .then((result) => result.rows.length > 0 ? reject(false) : resolve(true))
            .catch((err) => console.log(err))
        )
        .catch(err => console.log(err))
    })
    .then(() => 
        NeonDB.then((pool) => 
            pool.query(`INSERT INTO views(id, view_id, product_id, user_id, date) values(DEFAULT, '${view_id}', '${product_id}', '${user_id}', '${date}')`)
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
    
    let {user_id, pwd} = req.body;
    
    let hPwd = await bcrypt.hash(pwd, 10)

    NeonDB.then((pool) => 
        pool.query(`UPDATE users set password='${hPwd}' WHERE user_id = '${user_id}'`)
        .then(result => {
            result.rowCount > 0 ? res.send(true) : res.send(false)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

async function alter_pwd(req,res) {
    
    let {user_id, pwd, oldpwd} = req.body;
    
    let hPwd = await bcrypt.hash(pwd, 10)

    let c_pwd = await NeonDB.then((pool) => 
        pool.query(`SELECT password FROM users WHERE user_id = '${user_id}'`)
        .then(result => result.rows[0].password)
        .catch(err => {
            console.log(err)
            res.status(500).send({bool: false})
        })
    )
    .catch(err => {
        console.log(err)
        res.status(500).send({bool: false})
    })

    let auth = await bcrypt.compare(oldpwd, c_pwd)

    if (pwd !== oldpwd) {
        if (auth) {
            NeonDB.then((pool) => 
                pool.query(`UPDATE users set password='${hPwd}' WHERE user_id = '${user_id}'`)
                .then(result => {
                    result.rowCount > 0 ? res.status(200).send({bool: true}) : res.status(500).send({bool: false})
                })
                 .catch(err => {
                    console.log(err)
                    res.status(500).send({bool: false})
                }) 
            )
             .catch(err => {
                    console.log(err)  
                    res.status(500).send({bool: false})
                })

        } else {
            res.status(500).send({bool: false, err: 'Current password is invalid'})
        }
    }else {
        res.status(500).send({bool: false, err: 'Current password cannot be the same as new password'})
    }

}

async function update_email(req,res) {
    
    let {user_id, email} = req.body;
    

    NeonDB.then((pool) => 
        pool.query(`UPDATE users set email='${email}' WHERE user_id = '${user_id}'`)
        .then(result => {
            result.rowCount > 0 ? res.send(true) : res.send(false)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

async function update_phone(req,res) {
    
    let { user_id, phone } = req.body;
    console.log(phone)

    NeonDB.then((pool) => 
        pool.query(`UPDATE users set phone='${phone}' WHERE user_id = '${user_id}'`)
        .then(result => {
            result.rowCount > 0 ? res.send(true) : res.send(false)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

async function update_profile(req,res) {
    
    let { user_id, fname, lname, gender } = req.body;
    let p_gender = gender.toLowerCase() === 'male' ? 1 : 0

    NeonDB.then((pool) => 
        pool.query(`UPDATE users set fname='${fname}', lname='${lname}', gender='${p_gender}' WHERE user_id = '${user_id}'`)
        .then(result => {
            result.rowCount > 0 ? res.send(true) : res.send(false)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

function update_cart(req,res) {
    let {type,user_id,product_id} = req.body;
    function Add() {
        return(
            NeonDB.then((pool) => 
                pool.query(`UPDATE campus_express_buyer_cart set unit = unit + 1 WHERE user_id = '${user_id}' AND product_id = '${product_id}'`)
                .then(result => result.rowCount)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    function Minus() {
        return(
            NeonDB.then((pool) => 
                pool.query(`UPDATE campus_express_buyer_cart set unit = unit - 1 WHERE user_id = '${user_id}' AND product_id = '${product_id}'`)
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

async function update_order(req,res){
    let {buyer,product_id,stock,price,locale,order_id} = req.body;
    let date = new Date();
    // console.log(locale.map(item => JSON.stringify(item))))


    let doc = NeonDB.then((pool) => 
        pool.query(`DELETE FROM campus_express_buyer_orders WHERE user_id='${buyer}' AND product_id='${product_id}'`)
        .then((result) => result.rowCount > 0 ? (false) : (true))
        .catch((err) => {
            console.log(err) 
        })
    )  
    .catch(err => console.log(err))

    if(!doc){
        res.send(false)
    }else{
        NeonDB.then((pool) => 
            pool.query(`INSERT INTO campus_express_buyer_orders(id, order_id, product_id, status, date, stock, user_id, price, pick_up_channels, havePaid) values(DEFAULT, '${order_id}', '${product_id}', '{"state": "pending"}', '${date}', ${stock}, '${buyer}', '${price}', '${JSON.stringify(locale)}', ${false})`)
            .then((result) => result.rowCount > 0 ? res.send(true) : res.send(false))
            .catch((err) => {
                console.log(err) 
            })
        )  
        .catch(err => console.log(err))
    }
}

module.exports={
    update_view,
    update_pwd,
    update_cart,
    update_order,
    update_email,
    update_phone,
    update_profile,
    alter_pwd
}
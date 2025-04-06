const { get_mssg } = require("../../mails/inbox");
const { 
    NeonDB 
} = require("../../reuseables/db");
const { 
    shortId, 
    bcrypt, 
    jwt 
} = require("../../reuseables/modules");

const { retrieve_product_with_id, retrieve_seller, retrieve_products, create_inbox } = require("../../reuseables/utils");


async function save_item(req,res) {

    let {product_id,buyer_id} = req.body;
    let savedItems_id = shortId.generate();
    let date = new Date();

    let save_result = await NeonDB.then((pool) => 
        pool.query(`insert into campus_express_buyer_saveditems(id,savedItems_id ,product_id ,date ,buyer_id) values(DEFAULT, '${savedItems_id}', '${product_id}', '${date}', '${buyer_id}')`)
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
    

    if(save_result){
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

async function add_item_to_cart(req,res) {

    let {product_id,buyer_id} = req.body;
    let cart_id = shortId.generate();
    let date = new Date();
    async function create_cart(cart_id, product_id, date, buyer_id) {
        // console.log(cart_id, product_id, date, buyer_id)-
        let handle_cart_insert = await NeonDB.then((pool) => 
            pool.query(`insert into campus_express_buyer_cart(id,cart_id,product_id,date,buyer_id,unit) values(DEFAULT, '${cart_id}', '${product_id}', '${date}', '${buyer_id}', ${1})`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    
        if(handle_cart_insert){
            let response = await retrive_cart(buyer_id)
            return {bool: true, doc: response}
        }else{
            return {bool: false, doc: null}

        }
    }

    let response = await create_cart(cart_id, product_id, date, buyer_id)
    
    // console.log(cart_id, product_id, date, buyer_id)

    if(response.bool){
        res.status(200).send((await response).doc)
    }else{
        console.log(response)
        res.status(501).send((await response).doc)
    }

}

async function delete_item_from_cart(req,res) {
    let {product_id,buyer_id} = req.query;
    
    let response = delete_cart(product_id,buyer_id);
    if(response.bool){
        res.status(200).send((await response).doc)
    }else{
        res.status(501).send((await response).doc)
    }
}

async function filter_items(req,res){
    let { category, condition, price, state, campus, subCategory } = req.body.body;

    try {
    let items = await retrieve_products();

    // Filter by category
    let filtered = category ? items.filter(item => item.category === category) : items;

    // Filter by condition
    filtered = condition
        ? filtered.filter(item => (item.others)?.condition === condition)
        : filtered;

    // Filter by subCategory
    filtered = subCategory
        ? filtered.filter(item => (item.others)?.cType?.toLowerCase() === subCategory.toLowerCase())
        : filtered;

    // Filter by price
    if (price && price.length === 2) {
        filtered = filtered.filter(item => item.price > price[0] && item.price < price[1]);
    } else {
        filtered = filtered.filter(item => item.price > 0 && item.price < 1_000_000_000_000);
    }

    // Filter by state
    filtered = state
        ? filtered.filter(item => item.uni_state?.toLowerCase() === state.toLowerCase())
        : filtered;

    // Filter by campus
    filtered = campus
        ? filtered.filter(item => item.campus?.trim() === campus)
        : filtered;

    res.status(200).send(filtered);

    } catch (error) {
    console.error(error);
    res.status(500).send([]);
    }

   
} 

async function reset_pwd(req,res){

    let {email,buyer_id} = req.body;
    let date = new Date()

    async function query_db() {
     
        return(
            await query_tool(
                'SELECT',
                '*',
                'campus_buyers',
                {
                    bool: 1,
                    search_word: ['buyer_id'],
                    identifier: [buyer_id],
                    //for delete and select and update
            
                }, 
                [],
                [],
                []
            )
        )
           
    }

    let result = await query_db()

    async function send_email_to_buyer(params) {
        let token = shortId.generate();
    
        let get_token = await create_token_for_pwd(email,buyer_id,token,date)

        if(get_token){
            let get_email_mssg = pwd_reset(token,email,result.rows[0].fname + " " + result.rows[0].lname)
            let get_email_response = await send_email(email, get_email_mssg, 'Password Reset')

            return get_email_response
        }
        //remember to delete token after every thing
        //
    }

    let response1 = await send_email_to_buyer();

    if(response1 > 0){
        res.send(true)
    }

    
}

async function upload_chat(req,res) {
    let {seller_id, buyer_id} = req.body
    let mssg_id = shortId.generate();
    let date = new Date();

    let genRoom = await create_room_id(seller_id,buyer_id)

    if(genRoom){
        let room = await retrieve_room(seller_id, buyer_id);

        let response = await new Chat().Upload('Hi, I am interestd in the item you are selling.', mssg_id, 'text', buyer_id, room, date)

        res.send(true)
    }else{
        res.send(false)
    }

}

function add_new_referral(req,res) {

    let {src} = req.body;
    let date = new Date();
    let id = shortId.generate()
    NeonDB.then((pool) => 
        pool.query(`INSERT INTO referral_visits(id, source, user_id, created_at) values(DEFAULT, '${src}', '${id}', '${date}')`)
        .then((result) => res.send(true))
        .catch((err) => {
            console.log(err)
        })
    )
    .catch(err => console.log(err))
}

async function create_order(req,res) {
    let {buyer,product_id,stock,price,locale} = req.body;
    let date = new Date();
    console.log(stock)

    let order_id = shortId.generate();

    let duplicate = NeonDB.then((pool) => 
        pool.query(`SELECT * FROM campus_express_buyer_orders WHERE buyer_id='${buyer}' AND product_id='${product_id}'`)
        .then((result) => result.rowCount > 0 ? (false) : (true))
        .catch((err) => {
            console.log(err) 
        })
    )  
    .catch(err => console.log(err))

    if(!duplicate){
        res.send(true)
    }else{
        let new_order = await NeonDB.then((pool) => 
            pool.query(`INSERT INTO campus_express_buyer_orders(id, order_id, product_id, status, date, stock, buyer_id, price, pick_up_channels, havePaid) values(DEFAULT, '${order_id}', '${product_id}', '{"state": "pending"}', '${date}', ${stock}, '${buyer}', ${price}, '${JSON.stringify(locale)}', ${false})`)
            .then((result) => result.rowCount > 0 ? (true) : (false))
            .catch((err) => {
                console.log(err) 
                res.status(500).send(false)
            })
        )  
        .catch(err => {
            res.status(500).send(false)
            console.log(err)
        })


        let mssg_obj = get_mssg('new-order')
        if (new_order) {
            let inbox = create_inbox(buyer, mssg_obj.subject, mssg_obj.mssg,product_id);
            if (inbox) {
                res.status(200).send(true)
                // let email = await retrieve_seller(seller_id)
                // let temp = 
                // send_mail_via_brevo(email, 'New Item Uploaded Successfully', temp)
            } else {
                res.status(200).send(true)
            }
        } else {
            res.status(500).send(false)
            
        }
    }
}

function cancel_order(req,res) {

    let {
        buyer_id,order_id,amount,reason,product_id
    }=req.body

    console.log(buyer_id,order_id,amount,reason)
    function UpdateRefundlist() {
        return(    
            NeonDB.then((pool) => 
                pool.query(`INSERT INTO refund_list(id, buyer_id, order_id, amount, reason, status, created_at) values(DEFAULT, '${buyer_id}', '${order_id}', '${amount}', '${reason}', 'pending', '${new Date()}')`)
                .then((result) => result.rowCount > 0 ? (true) : (false))
                .catch((err) => {
                    console.log(err) 
                })
            )  
            .catch(err => console.log(err))
        )
    }
    

    function UpdateDataBase() {
        return(   
            NeonDB.then((pool) => 
                pool.query(`UPDATE campus_express_buyer_orders set status='{"state": "cancelled"}' WHERE order_id='${order_id}'`)
                .then((result) => result.rowCount > 0 ? (true) : (false))
                .catch((err) => {
                    console.log(err) 
                })
            )  
            .catch(err => console.log(err))
        )
    }

    new Promise((resolve,reject) => {
        let response = UpdateRefundlist()
        if(response){
            resolve(response)
        }else{
            reject(response)
        }
    })
    .then(() => {
        let response = UpdateDataBase()
        return response
    })
    .then((result) => {
        let mssg_obj = get_mssg('order-cancellation')
        if (result) {
            let inbox = create_inbox(buyer_id, mssg_obj.subject, mssg_obj.mssg,product_id);
            if (inbox) {
                res.status(200).send(true)
            } else {
                res.status(200).send(true)
            }
        } else {
            res.status(500).send(false)
            
        }
    })
    .catch((err) => {
        console.log(err) 
    })
}

function remove_order(req,res) {
    let {order_id} = req.body;
    
    NeonDB.then((pool) => 
        pool.query(`DELETE FROM campus_express_buyer_orders WHERE order_id = '${order_id}'`)
        .then((result) => result.rowCount > 0 ? res.send(true) : res.send(false))
        .catch((err) => {
            console.log(err) 
        })
    )  
    .catch(err => console.log(err))
}

function confirm_order(req,res) {
    let {order_id,buyer_id,product_id} = req.body;
    
    
    
    new Promise((resolve, reject) => {
        NeonDB.then((pool) => 
            pool.query(`UPDATE campus_express_buyer_orders set status='{"state": "completed"}' WHERE order_id='${order_id}'`)
            .then((result) => result.rowCount > 0 ? resolve({bool: true, data: ''}) : reject({bool: false, err: ''}))
            .catch((err) => {
                console.log(err) 
            })
        )  
        .catch(err => {
            console.log(err);
            reject({bool: false, err: err});
        })
    })
    .then((result) => {
        let mssg_obj = get_mssg('order-completion')
        if (result) {
            let inbox = create_inbox(buyer_id, mssg_obj.subject, mssg_obj.mssg,product_id);
            if (inbox) {
                res.status(200).send({bool: true, data: ''})
            } else {
                res.status(200).send({bool: true, data: ''})
            }
        } else {
            res.status(500).send({bool: false, data: ''})
            
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({bool: false, data: ''})
    })

    
}

async function create_refund(req,res) {
    let {buyer,product_id,stock,price,locale} = req.body;
    let date = new Date();
    console.log(stock)

    let refund_id = shortId.generate();

    let duplicate = NeonDB.then((pool) => 
        pool.query(`SELECT * FROM campus_express_buyer_refunds WHERE buyer_id='${buyer}' AND product_id='${product_id}'`)
        .then((result) => result.rowCount > 0 ? (false) : (true))
        .catch((err) => {
            console.log(err) 
        })
    )  
    .catch(err => console.log(err))

    if(!duplicate){
        res.send(true)
    }else{
        let new_refund = await NeonDB.then((pool) => 
            pool.query(`INSERT INTO campus_express_buyer_refunds(id, refund_id, product_id, status, date, stock, buyer_id, price, pick_up_channels, haverefunded) values(DEFAULT, '${refund_id}', '${product_id}', '{"state": "pending"}', '${date}', ${stock}, '${buyer}', ${price}, '${JSON.stringify(locale)}', ${false})`)
            .then((result) => result.rowCount > 0 ? (true) : (false))
            .catch((err) => {
                console.log(err) 
                res.status(500).send(false)
            })
        )  
        .catch(err => {
            res.status(500).send(false)
            console.log(err)
        })


        let mssg_obj = get_mssg('new-refund')
        if (new_refund) {
            let inbox = create_inbox(buyer, mssg_obj.subject, mssg_obj.mssg,product_id);
            if (inbox) {
                res.status(200).send(true)
            } else {
                res.status(200).send(true)
            }
        } else {
            res.status(500).send(false)
            
        }
    }
}

function cancel_refund(req,res) {

    let {
        buyer_id,refund_id,product_id
    }=req.body

    
    

    function UpdateDataBase() {
        return(   
            NeonDB.then((pool) => 
                pool.query(`UPDATE campus_express_buyer_refunds set status='{"state": "cancelled"}' WHERE refund_id='${refund_id}'`)
                .then((result) => result.rowCount > 0 ? (true) : (false))
                .catch((err) => {
                    console.log(err) 
                })
            )  
            .catch(err => console.log(err))
        )
    }

    new Promise((resolve,reject) => {
        let response = UpdateDataBase()
        if(response){
            resolve(response)
        }else{
            reject(response)
        }
    })
    .then((result) => {
        let mssg_obj = get_mssg('refund-cancellation')
        if (result) {
            let inbox = create_inbox(buyer_id, mssg_obj.subject, mssg_obj.mssg,product_id);
            if (inbox) {
                res.status(200).send(true)
            } else {
                res.status(200).send(true)
            }
        } else {
            res.status(500).send(false)
            
        }
    })
    .catch((err) => {
        console.log(err) 
    })
}

function remove_refund(req,res) {
    let {refund_id} = req.body;
    
    NeonDB.then((pool) => 
        pool.query(`DELETE FROM campus_express_buyer_refunds WHERE refund_id = '${refund_id}'`)
        .then((result) => result.rowCount > 0 ? res.send(true) : res.send(false))
        .catch((err) => {
            console.log(err) 
        })
    )  
    .catch(err => console.log(err))
}

function confirm_refund(req,res) {
    let {refund_id,buyer_id,product_id} = req.body;
    
    
    
    new Promise((resolve, reject) => {
        NeonDB.then((pool) => 
            pool.query(`UPDATE campus_express_buyer_refunds set haverefunded='${true}', status='{"state": "completed"}' WHERE refund_id='${refund_id}'`)
            .then((result) => result.rowCount > 0 ? resolve({bool: true, data: ''}) : reject({bool: false, err: ''}))
            .catch((err) => {
                console.log(err) 
            })
        )  
        .catch(err => {
            console.log(err);
            reject({bool: false, err: err});
        })
    })
    .then((result) => {
        let mssg_obj = get_mssg('refund-completed')
        if (result) {
            let inbox = create_inbox(buyer_id, mssg_obj.subject, mssg_obj.mssg,product_id);
            if (inbox) {
                res.status(200).send({bool: true, data: ''})
            } else {
                res.status(200).send({bool: true, data: ''})
            }
        } else {
            res.status(500).send({bool: false, data: ''})
            
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({bool: false, data: ''})
    })

    
}

function update_id_for_unknown_buyer(req,res) {
    let {
        unknown_buyer_id,
        registered_id
    } = req.query
    

    NeonDB.then((pool) => 
        pool.query(`UPDATE views set buyer_id = ${registered_id} WHERE buyer_id = '${unknown_buyer_id}'`)
        .then((result) => result.rowCount === 1 ? res.send(true) : res.send(false))
        .catch((err) => {
            console.log(err)
            res.send(false)
        })
    )
    .catch(err => { console.log(err);  res.send(false)})
}

module.exports = {
    update_id_for_unknown_buyer,
    create_refund,
    cancel_refund,
    confirm_refund,
    remove_refund,
    cancel_order,
    confirm_order,
    save_item,
    add_item_to_cart,
    delete_item_from_cart,
    filter_items,
    reset_pwd,
    upload_chat,
    add_new_referral,
    create_order,
    remove_order
} 
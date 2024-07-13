const { 
    NeonDB 
} = require("../../db");
const { 
    shortId, 
    bcrypt, 
    jwt 
} = require("../../modules");

const { retrieve_product_with_id, retrieve_seller } = require("../../utils");


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
    let {category,condition,price,state,campus} = req.body;
 
    console.log(category,condition,price,state,campus)
    // let {seller_id} = req.query;
    
    let items = await retrieve_products()
    // console.log('items: ', category)

    try {
            new Promise((resolve, reject) => { 
                if(category !== ''){
                    // alert(items[0].category, category)

                    let response = items.filter(item => {
                        return(
                            item.category === category
                        )
                    })

                    resolve(response) 
                }else{
                    reject(items)
                }
            })
            .then((result) => {
                console.log('category rz :', result)


                if(condition !==''){
                    let response = result.filter(item => {
                        return(
                            JSON.parse(item.others)?.condition === condition
                        )
                    })
                    return(response)
                }else{
                    return(result)
                }
            })
            .then((result) => {
                // console.log('result :', result)

                if(price !== '' && price?.length !== 0){
                    let response = result.filter(item => {
                        return(
                            item.price > price[0] && item.price < price[1] 
                        )
                    })
                    return(response)
                }else{
                    return(result)
                }
            })
            .then((result) => {
                if(state !== ''){
                    let response = result.filter(item => {
                        return(
                            JSON.parse(item.others)?.locale?.split(',')[0] === state
                        )
                    })
                    return(response)
                }else{
                    return(result)
                }
            })
            .then((result) => {
                
                if(campus !== ''){
                    let response = result.filter(item => {
                        return(
                            JSON.parse(item.others)?.locale?.split(',').splice(1).join(',').trim() === campus
                        )
                    })
                    return(response)
                }else{
                    return(result)
                }
            })
            .then((result) => {
                // console.loglog((result))
                // res.send(result)

            })
            
        } catch (error) {
            console.log(error)
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

function create_order(req,res) {
    let {buyer,product_id,price,locale} = req.body;
    let date = new Date();
    // console.log(locale.map(item => JSON.stringify(item))))

    let order_id = shortId.generate()
    NeonDB.then((pool) => 
        pool.query(`INSERT INTO campus_express_buyer_orders(id, order_id, product_id, status, date, stock, buyer_id, price, pick_up_channels, havePaid) values(DEFAULT, '${order_id}', '${product_id}', '{"state": "pending"}', '${date}', ${1}, '${buyer}', '${price}', '${JSON.stringify(locale)}', ${false})`)
        .then((result) => result.rowCount > 0 ? res.send(true) : res.send(false))
        .catch((err) => {
            console.log(err) 
        })
    )  
    .catch(err => console.log(err))
}

module.exports={
   
    save_item,
    add_item_to_cart,
    delete_item_from_cart,
    filter_items,
    reset_pwd,
    upload_chat,
    add_new_referral,
    create_order
} 
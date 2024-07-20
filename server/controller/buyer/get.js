const { NeonDB } = require("../../db");
const { 
    retrieve_room,
    retrieve_seller,
    retrieve_message_meta_data_with_type,
    retrieve_message,
    retrieve_room_with_buyer,
    create_room_id,
    retrieve_message_meta_data,
    retrieve_product_with_id,
    retrieve_buyer, 
    retrieve_products
} = require("../../utils");
async function get_buyer(req,res) {
    let {buyer_id} = req.query;
     NeonDB
    .then(async(pool) => {
        pool.query(`select * from "campus_buyers" where "buyer_id" = '${buyer_id}'`, (err, result) => {
            if(!err){
                console.log(result)
                if(result.rows.length > 0){
                    res.status(200).send(result.rows[0]);
                }else{
                    res.status(501).send(result.rows[0]);
                }
            }else{
                console.log(err)
            }
        })
    })

}

async function get_shop_items_via_condition(req,res) {

    let {condition,limit} = req.query;

    if(condition === 'used'){
        NeonDB.then((pool) => 
            pool.query(`
            SELECT * 
            FROM seller_shop
            `)
            .then(result =>  {
                let response = result.rows.filter(item =>JSON.parse(item.others).condition !== 'Brand New')
                res.send(response.splice(0,10))
            })
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
 
    }else if(condition === 'new'){
        NeonDB.then((pool) => 
            pool.query(`
            SELECT * 
            FROM seller_shop 
            `)
            .then(result =>  {
                let response = result.rows.filter(item =>JSON.parse(item.others).condition === 'Brand New')
                res.send(response.splice(0,10))
            })
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))

    }
}

async function get_shop_items(req,res) {

    let {category,limit} = req.query;

    if(category === 'trends'){
        NeonDB.then((pool) => 
            pool.query(`select * from seller_shop where state->>'state' = 'active' LIMIT '${limit}'`)
            .then(result =>  res.send(result.rows))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))

    }else{
        NeonDB.then((pool) => 
            pool.query(`select * from seller_shop where category = '${category}' AND state->>'state' = 'active' LIMIT '${limit}'`)
            .then(result =>  res.send(result.rows))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))

    }
}

async function get_lodges(req,res) {
    NeonDB.then((pool) => 
        pool.query(`select * from seller_shop WHERE category = 'Lodge/Apartments'`)
        .then(result =>  res.send(result.rows))
        .catch(err => console.log(err))
    )
}

async function get_item(req,res) {

    let {id} = req.query;
    let book = [];
    
    id.map(data => {
        NeonDB.then((pool) => 
            pool.query(`select * from seller_shop where product_id = '${data}'`)
            .then(result =>  {
                book.push(result.rows[0])
                if(book.length === id.length){
                    res.send(book)
                }                    
            })
            .catch(err => console.log(err))
        )
    })
}

async function get_item_thumbnail(req,res) {

    let {id} = req.query;
    NeonDB.then((pool) => 
        pool.query(`select file from product_photo where product_id = '${id}'`)
        .then(result =>  res.send(result.rows))
        .catch(err => console.log(err))
    )

}

async function get_thumbnail(req,res) {

    let {product_id,folder} = req.query;
    const cloudinary = require('cloudinary').v2;
    require('dotenv').config();    
  
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
        const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: folder, // Ensure this folder name is correct
        resource_type: 'image'
        }, (error, result) => {
        if (error) {
            console.error('Error fetching resources:', error);
        } else {
            res.status(200).send(result.resources)
            // console.log('Resources:', result.resources);
        }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

async function get_saved_item(req,res) {
    let {buyer_id} = req.query;
    
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

async function get_saved_item_data(req,res) {

    let book = [];
    let {buyer_id} = req.query;

    function get_savedItems() { 
        return(
            NeonDB.then((pool) => 
                pool.query(`SELECt * FROM campus_express_buyer_saveditems WHERE buyer_id = '${buyer_id}'`)
                .then(result => result.rows)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    function get_items(product_id) { 
        return(
            NeonDB.then((pool) => 
                pool.query(`SELECt * FROM seller_shop WHERE product_id = '${product_id}'`)
                .then(result => book.push(result.rows))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    async function getSavedItems(cb) {
        let savedData = await get_savedItems()
        console.log(savedData)

        cb(savedData)
    }

    getSavedItems((savedData) => {
        savedData.length > 0 
        ?
        savedData.map(async(item ) => {
            await get_items(item.product_id)
            if(book.length === savedData.length){
                res.send(book)
                console.log(book)
            }
        })
        :
        res.send([])
    })

}

function get_search_word(req,res) {
    let {word} = req.query;
    NeonDB.then((pool) => 
        pool.query(`select * from "seller_shop"`)
        .then((result) => {
            let list = result.rows;
            console.log(word)
            res.json(list.filter(item => item.title.toLowerCase().indexOf(word.toLowerCase()) > -1))
        })
        .catch((err) => {
            console.log(err)
        })
    )
    .catch(err => console.log(err))
}

async function get_order(req,res) {
    let {buyer_id,product_id} = req.query;

    let book = []

    function get_order_id(){
        return(NeonDB.then((pool) => 
            pool.query(`select * from "campus_express_buyer_orders" where buyer_id = '${buyer_id}' and product_id='${product_id}'`)
            .then((result) => {
                return(result.rows)
            })
            .catch((err) => {
                console.log(err)
            })
        )
        .catch(err => console.log(err)))
    }

    let list = await get_order_id();
    // console.log(list)


    function get_item(item) {
        return(
            NeonDB.then((pool) => 
                pool.query(`select * from "seller_shop" where product_id = '${item.product_id}'`)
                .then((result) => {
                    return({order: item, product: result.rows[0]})
                })
                .catch((err) => {
                    console.log(err)
                })
            )
            .catch(err => console.log(err))
        )
    }

    let data = await list.map((item) => get_item(item));

    let response = await Promise.all(data).then(result => result).catch(err => console.log(err))
    res.send(response)



}

async function get_orders(req,res) {
    let {buyer_id} = req.query;

    let book = []

    function get_order_id(){
        return(NeonDB.then((pool) => 
            pool.query(`select * from "campus_express_buyer_orders" where buyer_id = '${buyer_id}'`)
            .then((result) => {
                return(result.rows)
            })
            .catch((err) => {
                console.log(err)
            })
        )
        .catch(err => console.log(err)))
    }

    let list = await get_order_id();
    // console.log(list)


    function get_item(item) {
        return(
            NeonDB.then((pool) => 
                pool.query(`select * from "seller_shop" where product_id = '${item.product_id}'`)
                .then((result) => {
                    return({order: item, product: result.rows[0]})
                })
                .catch((err) => {
                    console.log(err)
                })
            )
            .catch(err => console.log(err))
        )
    }

    let data = await list.map((item) => get_item(item));

    let response = await Promise.all(data).then(result => result).catch(err => console.log(err))
    res.send(response)



}


async function get_chat_rooms(req, res) {
    let {buyer_id}= req.query;
    let book = []
    let room = await retrieve_room_with_buyer(buyer_id);
    console.log(room)

    if(room.length > 0){
        room.map(async(item) => { 
            let seller_data = await retrieve_seller(item.seller_id);
            let mssg_meta_data = await retrieve_message_meta_data_with_type(item.room_id);
            // console.log( mssg_meta_data.splice(-1)[0]) 
    
           async function get_text_mssg(meta) {
    
                if(meta === 'text'){
                    return await retrieve_message(mssg_meta_data.splice(-1)[0]?.mssg_id)
                }else{
                    return {mssg: ''}
                }
            }
    
            let mssg = await get_text_mssg(mssg_meta_data.splice(-1)[0]?.mssg_type);
    
            book.push({seller_data, mssg: mssg, room: item.room_id})   
            if(book.length === room.length){  
              res.send(book)
                // console.log(book)
        
            }
        })  
    }else{
        res.send([])
    }
}

async function get_chat(req,res){
    let {room_id} = req.query;
 
    // let {seller_id} = req.query;
    let book = []
    let room = await retrieve_message_meta_data(room_id);
    let books = await room.map(async(item) => {
 
        // let mssg = item.mssg_type === 'text' ? await retrieve_message(item.mssg_id) : '';
        async function split_chat_type() {
            if(item.mssg_type === 'text'){
                let mssg = await retrieve_message(item.mssg_id)
                // console.log('text chat: ',mssg)
                return mssg
            }else{
                // console.log('file chat: ', '')
                return null 
            }   
        }

        let mssg = await split_chat_type()
        console.log('mssg: ',mssg) 
        console.log('books: ',item) 
        
        return ({type: item.mssg_type, mssg: mssg?.mssg, mssg_id: item.mssg_id, sender: item.sender_id, date: item.date});
    }) 

    let data = await Promise.all(books).then(result => result).catch(err => console.log(err))
    
    res.send(data) 

   


     
} 

async function get_carts(req,res) {
    let {buyer_id} = req?.query;
    let book = []

    function get_items(item) { 
        return(
            NeonDB.then((pool) => 
                pool.query(`SELECt * FROM seller_shop WHERE product_id = '${item.product_id}'`)
                .then(result => book.push({item: result.rows[0], cart:item}))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    async function getCartedItems(cb) {
        let carts = await retrive_cart(buyer_id)
        console.log(carts)
        cb(carts)
    }

    getCartedItems((carts) => {
        carts.map(async(item ) => {
            await get_items(item)
            console.log(book)
            if(book.length === carts.length){
                res.send(book)
            }
        })
    })


}


module.exports = {
    get_buyer,
    get_lodges,
    get_shop_items,
    get_chat, 
    get_chat_rooms, 
    get_item,
    get_item_thumbnail,
    get_thumbnail,
    get_carts,
    get_orders,
    get_saved_item,
    get_saved_item_data,
    get_order,
    get_search_word,
    get_shop_items_via_condition
}
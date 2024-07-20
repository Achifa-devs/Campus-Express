const { NeonDB } = require("../../db");
const { retrieve_room, retrieve_buyer, retrieve_message_meta_data_with_type, retrieve_message, retrieve_room_with_seller, retrieve_seller, retrieve_message_meta_data } = require("../../utils");

async function GetOverview(req,res)  {
    let {id} = req.query;
    

    async function get_total_sale(params) {
        return (
            await NeonDB.then((pool) => 
                pool.query(`select * from seller_shop where seller_id = '${id.trim()}'`)
                .then(result => result.rows.length)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    async function get_sold(params) {
        return (
            await NeonDB.then((pool) => 
                pool.query(`select * from seller_shop where seller_id = '${id.trim()}' AND status = 'sold'`)
                .then(result => result.rows.length)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    async function get_unsold(params) {
        return (
            await NeonDB.then((pool) => 
                pool.query(`select * from seller_shop where seller_id = '${id.trim()}' AND status = 'unsold'`)
                .then(result => result.rows.length)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    async function get_report(params) {
        return (
            await NeonDB.then((pool) => 
                pool.query(`select * from product_report where seller_id = '${id.trim()}'`)
                .then(result => result.rows.length)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    res.send({total_sale: await get_total_sale(), total_sold: await get_sold(),total_unsold: await get_unsold(), total_reported: await get_report()})
}


async function GetItemsSold(req,res)  {
    let {shop_id} = req.query;

    let response = await NeonDB.then((pool) => 
        pool.query(`select * from sold_items where shop_id = '${shop_id}'`)
        .then(result => (result.rows))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))



    response.map(item => {
        NeonDB.then((pool) => 
            pool.query(`select * from seller_shop where product_id = '${item.product_id}'`)
            .then(result => res.send(result.rows))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    })
    
}

async function GetReviews(req,res)  {
    let {id} = req.query;

    NeonDB.then((pool) => 
        pool.query(`select * from reviews where seller_id = '${id}'`)
        .then(result => res.send(result.rows))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}


async function GetItems(req,res)  {
    let {id} = req.query;

    NeonDB.then((pool) => 
        pool.query(`select * from seller_shop where seller_id = '${id}'`)
        .then(result => res.send(result.rows))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}


async function GetShop(req,res)  {
    let {seller_id} = req.query;

    NeonDB.then((pool) => 
        pool.query(`select * from campus_shop where seller_id = '${seller_id}'`)
        .then(result => res.send(result.rows[0]))
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

async function GetSellerData(req,res) {
    let {seller_id} = req.query;
    // console.log('seller_id: ', seller_id)
    NeonDB.then((pool) => 
        pool.query(`SELECT * FROM campus_sellers WHERE seller_id = '${seller_id}'`)
        .then(result => res.send(result.rows[0]))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}


async function GetSellerWallet(req,res) {
    let {seller_id} = req.query;
    // console.log('seller_id: ', seller_id)
    NeonDB.then((pool) => 
        pool.query(`SELECT * FROM campus_express_seller_wallet WHERE seller_id = '${seller_id}'`)
        .then(result => res.send(result.rows[0]))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

async function GetSellerPhoto(req,res) {
    let {seller_id} = req.query;
    NeonDB.then((pool) => 
        pool.query(`SELECT * FROM coverphoto WHERE user_id = '${seller_id}'`)
        .then(result => res.send(result.rows[0]))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

} 

async function GetChatRooms(req,res){
    let {seller_id} = req.query;
    let book = []
 
    let room = await retrieve_room_with_seller(seller_id);
  

    room.map(async(item) => { 

        let buyer_data = await retrieve_seller(seller_id);
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
        // console.log(mssg)

        book.push({buyer_data, mssg: mssg, room: item.room_id})   
        if(book.length === room.length){  
            res.status(200).send(book);  
            // console.log(book)
    
        }
    })    

} 


async function GetChat(req,res){
    let {room_id} = req.query;
    // let {seller_id} = req.query;
    // let book = []
    let room = await retrieve_message_meta_data(room_id);
    console.log('room: ', room,room_id) 
    
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
      
        return ({type: item.mssg_type, mssg: mssg?.mssg, mssg_id: item.mssg_id, sender: item.sender_id, date: item.date});
    }) 

    let data = await Promise.all(books).then(result => result).catch(err => console.log(err))
    
    // res.send(data) 

} 


async function ValidateToken(req,res) {
    let {email,token} = req.query
    console.log(email,token)

    NeonDB.then((pool) => 
        pool.query(`select * from pwd_token where email = '${email}' AND token = '${token}'`)
        .then(result => result.rowCount > 0 ? res.status(200).send(true) : res.status(500).send(false))
        .catch(err => {
            console.log('error: ',err)
            res.status(500).send(false)
        }) 
    ) 
    .catch(err => {
        console.log('error: ',err)
        res.status(500).send(false)
    })
}

module.exports={
    GetItems,
    GetEditedItem,
    ValidateToken,
    GetOverview,
    GetSellerData,
    GetChatRooms,
    GetSellerPhoto,
    GetChat,
    GetShop,
    GetItemsSold,
    GetReviews,
    GetSellerWallet
} 
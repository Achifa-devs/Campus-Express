//19 request on buyer

const { NeonDB } = require("./db");
const { retrieve_seller, update_order, retrieve_seller_info, save_buyer_tansaction } = require("./utils");
const { checkoutEmailToSeller } = require("./mails/coin");


async function process_payment(req,res) {
    let payload = req.body;
    let response = payload.data;
    let amount = response.amount;
    // let charged_amount = response.charged_amount

    let date = new Date()
    let payment_src = response.channel  
    // let status = response.status

    // console.log((response))

    let buyer_info = response.metadata.buyer_info;
    let product_info = response.metadata.product_info;
    let purchase_info = response.metadata.purchase_info;
    console.log(buyer_info,product_info,purchase_info)


    let {user_id}=buyer_info
    let {product_id,title,price}=product_info
    let {amount_paid,unit,payment_type,isBulkPurchase}=purchase_info



    if(payment_type === 'coin_purchase_buyer'){
        // refill_coin('buyer',user,payment_src,payment_type,amount,date,coin,fee)
    }else if(payment_type === 'coin_purchase_seller'){
        // refill_coin('seller',user,payment_src,payment_type,amount,date,coin,fee)
    }
    else if(payment_type === 'checkout'){
        try{
            checkout_handler(payment_src, date)
        }catch(err){
            console.log(err)
        }
    }else{
        return {bool: false, reason: 'payment type is not valid'}
    }

    async function checkout_handler(payment_src,date) {
        const { send_mail_via_outlook } = require('./utils');

        if(!isBulkPurchase){
            
            let seller_id = await retrieve_seller(product_id)
            let seller_info = await retrieve_seller_info(seller_id)
            // let buyer_info = await retrieve_buyer_info(buyer)
            let thumbnail = await NeonDB.then((pool) => pool.query(`select thumbnail_id from seller_shop where product_id = '${product_id}'`).then(result =>  (result.rows[0])).catch(err => console.log(err)))

            new Promise(async(resolve, reject) => { 
                let buyer_tansaction_response = await  save_buyer_tansaction(user_id,payment_src,payment_type,50,parseInt(price),date,'checkout'); 
                buyer_tansaction_response.bool ? resolve(buyer_tansaction_response) : reject(buyer_tansaction_response)
            })
        
            .then(async(result) => {
                // CREATE ORDER
                if(result.bool){
                    console.log(result, 'transaction saved and order is been created...') 
                    let update_order_response = await update_order(product_id,user_id)
                    return update_order_response.bool ? update_order_response : ({bool: false})
                }else{
                    console.log(result,'error occcured while saving transaction and order is cancelled...')
                    return ({bool: false})
                }
            })
        
            // .then(async(result) => {
            //     // CREATE CHAT ROOM
            //     if(result.bool ){
            //         console.log(result, 'order updated and sending message to phone...') 
            //         let message = checkoutMssgToSeller(seller_info, buyer_info, product_info, date)
            //         let room_response = await send_sms('08032639894', message)
            //         console.log(room_response)
            //         return room_response.status === 'success' ? ({bool: true, order_id: result.order_id, stock: result.stock, address: result.address}) : ({bool: false})
            //     }else{
            //         console.log(result,'error occcured while sending message to phone and sending message to  email cancelled... ') 
            //         return ({bool: false})
            
            //     }
        
            // })
        
            .then(async(result) => {
                // SEND MSSG META DATA
                if(result.bool ){
                    console.log(result, 'sent message to  phone and sending message to  email...') 
                    let message = checkoutEmailToSeller(result.address, amount, 1000, result.order_id, result.stock, title, thumbnail.thumbnail_id, `${seller_info.fname} ${seller_info.lname}`)
                    let mssg_sender_response = send_mail_via_outlook('akpulufabian@gmail.com','Confirmation of Successful Item Purchase', message)
                    return mssg_sender_response ? ({bool: true}) : ({bool: false})
                }else{
                    console.log(result,'error occcured while sending message to email...') 
                    return ({bool: false})
                }
        
            })
        
        
            .then((result) => result.bool ? res.send(true) : res.send(false))
        
            .catch(err => console.log(err))

        }else{
    
            // let book = [];

            // let response = await save_tansaction(buyer,payment_src,payment_type,50,amount_paid,date,'checkout'); 
            // // response.bool ? resolve(response) : reject(response)
            // let carts = await retrive_cart(user_id)

            // let processes = async() => { 
            //     await carts.map(async(item, index) => {
            //         // DATA FOR PROCESS
            //         let seller_id = await retrieve_seller(item.product_id)
            //         // DATA FOR PROCESS

            //         // CREATE ORDER
            //         let order = await create_order(item.product_id, item.unit, user_id)

            //         // CREATE ROOM
            //         new Promise(async(resolve, reject) => {
            //             let room_creation = await create_room_id(seller_id,user_id)
            //             if(room_creation){
            //                 console.log('created order successfully and now creating room @', index)
            //                 resolve(room_creation)
            //             }else{
            //                 reject(false)
            //             }
            //         })

            //         .then(async(result) => {
            //             if(result){
            //                 console.log('created room successfully and now retrieving room data for sending messages @', index)
            //                 let room_id = await retrieve_room(user_id,seller_id)
            //                 return {room_id: room_id[0].room_id, bool: true}
            //             }else{
            //                 console.log(result,'error occcured while retrieving room data for sending messages @', index)
            //                 return ({bool: false}) 
                    
            //             }
            //         }) 

            //         // MESSAGE MANAGEMENT
            //         .then(async(result) => {
            //             console.log(order)
            //             if(result.bool){
            //                 console.log('sent messages meta data successfully and now sending messages @', index)
            //                 let mssg = await send_proposal_message('doc',item.product_id,order.order_id,user_id,result.room_id)
            //                 return mssg
            //             }else{
            //                 console.log(result,'error occcured while sending messages @', index)
            //                 return ({bool: false}) 
                    
            //             }
            //         })

            //         // DELETE CART

            //         .then(async(result) => {
            //             console.log(result)
            //             if(result.bool){
            //                 console.log('sent messages successfully and now deleting cart @', index)
            //                 let delete_cart = await delete_cart_with_id(item.cart_id)
            //                 return delete_cart
            //             }else{
            //                 console.log(result,'error occcured while deleting cart @', index)
            //                 return ({bool: false}) 
                    
            //             }
            //         })

            //         .then(result => {
            //             book.push(index + 1)
            //             if(book.length === carts.length){
            //                 res.send(true)
            //             }else{
            //                 // console.log(result,'error occcured while creating room and sending message faild...')
            //                 return ({bool: false}) 
                    
            //             }
            //         })
            //         .catch(err => console.log(err))
                    
            //     })
            // }


            // if(response.bool){
            //     processes()
            // }


        }
    }
}



module.exports = {
    process_payment
}



// {
//     id: 6571103,
//     tx_ref: '1724695825950',
//     flw_ref: '5399343653961724696634731',
//     device_fingerprint: '89862af7df8ffbbc60e161425e041963',
//     amount: 1550,
//     currency: 'NGN',
//     charged_amount: 1550,
//     app_fee: 21.7,
//     merchant_fee: 0,
//     processor_response: 'success',
//     auth_model: 'AUTH',
//     ip: '52.209.154.143',
//     narration: 'Akpulu Fabian 1718554497324',
//     status: 'successful',
//     payment_type: 'bank_transfer',
//     created_at: '2024-08-26T18:24:01.000Z',
//     account_id: 2498259,
//     customer: {
//       id: 2480835,
//       name: 'Akpulu Chinedu',
//       phone_number: '{"buyer_info":{"buyer":"CE-881267","phone":"8032639894"},"product_info":{"product_id":"c8e131","title":"Hello lovelies\\nI deal on all kinds of pocket and oil perfume","price":"1500"},"purchase_info":{"unit":null,"amount_paid":null,"payment_type":"checkout',
//       email: 'akpulufabian@gmail.com',
//       created_at: '2024-08-26T18:23:54.000Z'
//     }
//   }
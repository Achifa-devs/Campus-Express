//19 request on buyer
const { v4 } = require("uuid");

const { NeonDB } = require("./db");
const { shortId, bcrypt, jwt } = require("./modules");
const { process_transaction, save_tansaction, create_order, create_room_id, retrieve_room, send_proposal_meta_data, retrieve_mssg_meta_data, send_proposal_message, retrieve_seller, retrive_cart, delete_cart_with_id, retrive_order, send_proposal_meta_data_from_cart, retrieve_room_with_room_id, update_buyer_wallet, refill_buyer_wallet, refill_coin, update_order, send_sms, retrieve_seller_info, send_email } = require("./utils");
const { checkoutMssgToSeller } = require("./sms");
const { checkoutEmailToSeller } = require("./mails/coin");
const maxAge = 90 * 24 * 60 * 60; 
const createToken = (id) => {
    return jwt.sign({ id }, 'seller_secret', {
       expiresIn: maxAge
    });
};

async function process_payment(req,res) {
    let payload = req.body;

    // CHECK PAYMENT SRC (BUYER, SELLER)
    // CHECK PAYMENT TYPE (CHECKOUT, SELLER WALLET REFILL, BUYER WALLET REFILL)
    // FLW VERIFICATION
    // STORE TRANSACTION

    // UPDATE BALANCE IF PAYMENT TYPE IS WALLET

    //* @CHECKOUT
    // CREATE ORDER
    // CREATE CHAT ROOM
    // SEND MESSAGE META DATA
    // SEND MESSAGE 
    //*

    //* @WALLET REFILL
    // STORE TRANSACTION
    // UPDATE WALLET
    //*

    let response = payload.data;

    let amount = response.amount;
    let charged_amount = response.charged_amount

    let date = new Date()
    let payment_src = response.payment_type

    let buyer_info = JSON.parse(response.phone).buyer_info;
    let product_info = JSON.parse(response.phone).product_info;
    let purchase_info = JSON.parse(response.phone).purchase_info;


    let {buyer,phone}=buyer_info
    let {product_id,price,title}=product_info
    let {unit,amount_paid,payment_type,isBulkPurchase}=purchase_info



    if(payment_type === 'coin_purchase_buyer'){
        refill_coin('buyer',user,payment_src,payment_type,amount,date,coin,fee)
    }else if(payment_type === 'coin_purchase_seller'){
        refill_coin('seller',user,payment_src,payment_type,amount,date,coin,fee)
    }
    else if(payment_type === 'checkout'){
        try{
            checkout_handler({immediate_purchase,unit,product_id}, user, charged_amount, payment_src, date)
        }catch(err){
            console.log(err)
        }
    }else{
        return {bool: false, reason: 'payment type is not valid'}
    }

    async function checkout_handler(immediate_data,user,charged_amount,payment_src,date) {

        if(!isBulkPurchase){
            
            let seller_id = await retrieve_seller(product_id)
            let seller_info = await retrieve_seller_info(seller_id)
            let buyer_info = await retrieve_buyer_info(buyer)

            new Promise(async(resolve, reject) => { 
                let response = await save_tansaction(buyer,payment_src,payment_type,50,amount_paid,date,'checkout'); 
                response.bool ? resolve(response) : reject(response)
            })
        
            .then(async(result) => {
                // CREATE ORDER
                if(result.bool){
                    console.log(result, 'transaction saved and order is been created...') 
                    let response = await update_order(product_id,buyer)
                    return response.bool ? response : ({bool: false})
                }else{
                    console.log(result,'error occcured while saving transaction and order is cancelled...')
                    return ({bool: false})
                }
            })
        
            .then(async(result) => {
                // CREATE CHAT ROOM
                if(result.bool ){
                    console.log(result, 'sending message to phone...') 
                    let message = checkoutMssgToSeller(seller_info, buyer_info, product_info, date)
                    let room_response = send_sms(seller_info.phone, message)
                    return room_response ? ({bool: true, order_id: result.order_id}) : ({bool: false})
                }else{
                    console.log(result,'sending message to phone... ') 
                    return response ({bool: false})
            
                }
        
            })
        
            .then(async(result) => {
                // SEND MSSG META DATA
                if(result.bool ){
                    console.log(result, 'sending message to  email...') 
                    let message = checkoutEmailToSeller(seller_info, buyer_info, product_info, date)
                    let result = send_email(seller_info.email,'Confirmation of Successful Item Purchase', message)
                    return result ? ({bool: true, room_id, order_id: result.order_id}) : ({bool: false,room_id})
                }else{
                    console.log(result,'sending message to  email...') 
                    return response ({bool: false})
                }
        
            })
        
           
            .then((result) => result.bool ? res.send(true) : res.send(false))
        
            .catch(err => console.log(err))

        }else{
    
            let book = [];

            let response = await save_tansaction(buyer,payment_src,payment_type,50,amount_paid,date,'checkout'); 
            // response.bool ? resolve(response) : reject(response)
            let carts = await retrive_cart(user_id)

            let processes = async() => { 
                await carts.map(async(item, index) => {
                    // DATA FOR PROCESS
                    let seller_id = await retrieve_seller(item.product_id)
                    // DATA FOR PROCESS

                    // CREATE ORDER
                    let order = await create_order(item.product_id, item.unit, user_id)

                    // CREATE ROOM
                    new Promise(async(resolve, reject) => {
                        let room_creation = await create_room_id(seller_id,user_id)
                        if(room_creation){
                            console.log('created order successfully and now creating room @', index)
                            resolve(room_creation)
                        }else{
                            reject(false)
                        }
                    })

                    .then(async(result) => {
                        if(result){
                            console.log('created room successfully and now retrieving room data for sending messages @', index)
                            let room_id = await retrieve_room(user_id,seller_id)
                            return {room_id: room_id[0].room_id, bool: true}
                        }else{
                            console.log(result,'error occcured while retrieving room data for sending messages @', index)
                            return ({bool: false}) 
                    
                        }
                    }) 

                    // MESSAGE MANAGEMENT
                    .then(async(result) => {
                        console.log(order)
                        if(result.bool){
                            console.log('sent messages meta data successfully and now sending messages @', index)
                            let mssg = await send_proposal_message('doc',item.product_id,order.order_id,user_id,result.room_id)
                            return mssg
                        }else{
                            console.log(result,'error occcured while sending messages @', index)
                            return ({bool: false}) 
                    
                        }
                    })

                    // DELETE CART

                    .then(async(result) => {
                        console.log(result)
                        if(result.bool){
                            console.log('sent messages successfully and now deleting cart @', index)
                            let delete_cart = await delete_cart_with_id(item.cart_id)
                            return delete_cart
                        }else{
                            console.log(result,'error occcured while deleting cart @', index)
                            return ({bool: false}) 
                    
                        }
                    })

                    .then(result => {
                        book.push(index + 1)
                        if(book.length === carts.length){
                            res.send(true)
                        }else{
                            // console.log(result,'error occcured while creating room and sending message faild...')
                            return ({bool: false}) 
                    
                        }
                    })
                    .catch(err => console.log(err))
                    
                })
            }


            if(response.bool){
                processes()
            }


        }
    }

}



module.exports = {
    process_payment
 
}




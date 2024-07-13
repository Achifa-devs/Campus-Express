//19 request on buyer
const { v4 } = require("uuid");

const { NeonDB } = require("./db");
const { shortId, bcrypt, jwt } = require("./modules");
const { process_transaction, save_tansaction, create_order, create_room_id, retrieve_room, send_proposal_meta_data, retrieve_mssg_meta_data, send_proposal_message, retrieve_seller, retrive_cart, delete_cart_with_id, retrive_order, send_proposal_meta_data_from_cart, retrieve_room_with_room_id, update_buyer_wallet, refill_buyer_wallet, refill_coin } = require("./utils");
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

    let immediate_data = custom_data[1];
    let immediate_purchase = immediate_data.split('*')[0];
    let unit = immediate_data.split('*')[1];
    let product_id = immediate_data.split('*')[2];



    let customer = response.customer;  
    let customer_data = JSON.parse(customer.phone_number);
    let user_id = customer_data.user_id;

    let transactional_data = JSON.parse(customer.email);
    let coin = JSON.parse(transactional_data).coin;
    let fee = JSON.parse(transactional_data).fee;
    let payment_type = '';


    if(payment_type === 'coin_purchase_buyer'){
        refill_coin('buyer',user,payment_src,payment_type,amount,date,coin,fee)
    }else if(payment_type === 'coin_purchase_seller'){
        refill_coin('seller',user,payment_src,payment_type,amount,date,coin,fee)
    }
    else if(payment_type === 'checkout'){
        if(charged_amount === amount){
            try{
                checkout_handler({immediate_purchase,unit,product_id}, user, charged_amount, payment_src, date)
            }catch(err){
                console.log(err)
            }
        }else{
            refill_buyer_wallet(user,0,payment_src,4,charged_amount,date)
        }
    }else{
        return {bool: false, reason: 'payment type is not valid'}
    }

    async function checkout_handler(immediate_data,user,charged_amount,payment_src,date) {

        if(immediate_data.immediate_purchase === 'true'){
            
            let seller_id = await retrieve_seller(immediate_data.product_id)
            console.log('response: ',seller_id)

            new Promise(async(resolve, reject) => { 
                let response = await save_tansaction(user_id,0,payment_src,4,charged_amount,date,'checkout'); 

                response.bool ? resolve(response) : reject(response)
            })
        
            .then(async(result) => {
                // CREATE ORDER
                if(result.bool){
                    console.log(result, 'transaction saved and order is been created...') 
                    let response = await create_order(immediate_data.product_id, parseInt(immediate_data.unit), user_id)

                    return response.bool ? response : ({bool: false})
                }else{
                    console.log(result,'error occcured while saving transaction and order is cancelled...')
                    return ({bool: false})
                }
            })
        
            .then(async(result) => {
                // CREATE CHAT ROOM
                if(result.bool ){
                    console.log(result, 'order created and chat room is been created...') 
                    let room_response = create_room_id(seller_id,user_id)
                    return room_response ? ({bool: true, order_id: result.order_id}) : ({bool: false})
                }else{
                    console.log(result,'error occcured while creating order and room is cancelled... ') 
                    return response ({bool: false})
            
                }
        
            })
        
            .then(async(result) => {
                // SEND MSSG META DATA
                if(result.bool ){
                    console.log(result, 'room created and sending proposal meta data now...') 
                    let room_id = await retrieve_room(user_id,seller_id)
                    let mssg = await send_proposal_meta_data(room_id,user_id,result.order_id)
                    return mssg ? ({bool: true, room_id, order_id: result.order_id}) : ({bool: false,room_id})
                }else{
                    console.log(result,'error occcured while creating room and sending proposal meta data failed...') 
                    return response ({bool: false})
                }
        
            })
        
            .then(async(result) => {
                // SEND MSSG
                // mssg_id,mssg_type,mssg,order_id,sender_id,room_id

                if(result.bool ){
                    console.log(result, 'room created and sending message now....') 
                    // let mssg = generate_mssg(`${payload.data.customer.name}`)
                    let response = await send_proposal_message('doc',product_id,result.order_id,user_id,result.room_id)
                    return response ? ({bool: true}) : ({bool: false})
                }else{
                    console.log(result,'error occcured while creating room and sending message faild...')
                    return ({bool: false}) 
            
                }
            
            })
        
            .then((result) => result.bool ? res.send(true) : res.send(false))
        
            .catch(err => console.log(err))

        }else{
    
            let book = [];

            let response = await save_tansaction(user_id,0,payment_src,4,charged_amount,date,'checkout');
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




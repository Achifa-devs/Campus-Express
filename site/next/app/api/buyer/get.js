import axios from 'axios'
// import {IP} from '@env' 


let uri_1 = 'https://ce-server.vercel.app'
let uri_2 = 'https://ce-server.vercel.app'
let IP = uri_2


const source = axios.CancelToken.source();

export async function _(params) {
    let response = await get_request_generators(`route`, {params})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data 
}

export async function GetBuyer(buyer_id) {
    let response = await get_request_generators(`buyer`, {buyer_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetItems(category,limit) {
    let response = await get_request_generators(``, {category,limit})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetFilteredAds(condition,limit) {
    let response = await get_request_generators(`filtered-ads`, {condition,limit})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetLodges() {
    let response = await get_request_generators(`lodges`, {})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetItem(id) {
    let response = await get_request_generators(`product`, {id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetItemImages(id) {
    let response = await get_request_generators(`product-images`, {id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetProductThumbnail(product_id,folder) {
    let response = await get_request_generators(`thumbnail`, {product_id,folder})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetProductVideo(product_id,folder) {
    let response = await get_request_generators(`video`, {product_id,folder})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetCart(buyer_id) {
    let response = await get_request_generators(`cart`, {buyer_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetCartItems(buyer_id) {
    let response = await get_request_generators(`cart-items`, {buyer_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetOrders(buyer_id) {
    let response = await get_request_generators(`orders`, {buyer_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetOrder(buyer_id,product_id) {
    let response = await get_request_generators(`order`, {buyer_id,product_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetSavedItem(buyer_id) {
    let response = await get_request_generators(`saved-items`, {buyer_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetWallet(id) {
    let response = await get_request_generators(`wallet`, {id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetSearchWord(word) {
    let response = await get_request_generators(`search-word`, {word})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetChatRooms(buyer_id) {
    let response = await get_request_generators(`get-chat-rooms`, {buyer_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetChat(room_id) {
    let response = await get_request_generators(`get-chat`, {room_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}




async function get_request_generators(uri, params) {
    const headers = {
        'Content-Type': 'application/json',  // Specify the content type if needed
        'Gender': window.localStorage.getItem('cs-gender') 
    }
    return(
        axios.get(`${IP}/${uri}`, {
            params: params,
            headers: headers
        })
        .then(async(result)=>{
            let response = result
            // console.log('response: ', response)
            return response;
        })
        .catch(error=>{
            console.log(error)
        })
    
    )

}




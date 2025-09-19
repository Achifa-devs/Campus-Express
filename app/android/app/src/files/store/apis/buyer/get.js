import axios from 'axios'
// import {IP} from '@env'


let uri_1 = 'https://cs-node.vercel.app/'
let uri_2 = 'http://192.168.175.146:2222'
let IP = uri_1


const source = axios.CancelToken.source();
 
export async function _(params) {
    let response = await get_request_generators(`route`, {params})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data 
}

export async function GetBuyer(user_id) {
    let response = await get_request_generators(`buyer`, {user_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetItems(category,limit) {
    let response = await get_request_generators(`products`, {category,limit})
    // setTimeout(() => source.cancel('timeout'), 10000) 
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

export async function GetCart(user_id) {
    let response = await get_request_generators(`cart`, {user_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetCartItems(user_id) {
    let response = await get_request_generators(`cart-items`, {user_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetOrders(user_id) {
    let response = await get_request_generators(`orders`, {user_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetOrder(user_id,product_id) {
    let response = await get_request_generators(`order`, {user_id,product_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetSavedItem(user_id) {
    let response = await get_request_generators(`saved-items`, {user_id})
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

export async function GetChatRooms(user_id) {
    let response = await get_request_generators(`get-chat-rooms`, {user_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetChat(room_id) {
    let response = await get_request_generators(`get-chat`, {room_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}




async function get_request_generators(uri, params) {
     return(
        await axios.get(`${IP}/${uri}`, {
            params,
            // cancelToken: source.token
        })
        .then((result) => result)
        .catch((error) => {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }  else {
                console.log('Error:', error.message);
            }    
        })     
    )

    // const baseUrl = `${IP}/${uri}`;
    // // Use URLSearchParams to create the query string
    // const url = new URL(baseUrl);
    // url.search = new URLSearchParams(params).toString();
    // return(
    //     fetch(`${url}`, {
    //         method: 'get',
    //         headers: {
    //           "Content-Type": "Application/json"
    //         },
    //     })
    //     .then(async(result) => await result.json())
    //     .catch((error) => {
    //         if (axios.isCancel(error)) {
    //             console.log('Request canceled:', error.message);
    //         }  else {
    //             console.log('Error:', error.message);
    //         }    
    //     })  

    // )
}




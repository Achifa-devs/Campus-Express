import axios from 'axios'
// import {IP} from '@env'


let uri_1 = 'ce-server.vercel.app'
let uri_2 = '192.168.151.146:2222'
let IP = uri_2


const source = axios.CancelToken.source();

export async function _(params) {
    let response = await get_request_generators(`route`, {params})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetAdmin(admin_id) {
    let response = await get_request_generators(`admin`, {admin_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetUsers() {
    let response = await get_request_generators(`admin.users`, {})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetItems() {
    let response = await get_request_generators(`admin.shop`, {})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetEditedItem(product_id) {
    let response = await get_request_generators(`admin.edited-item`, {product_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetItem(product_id) {
    let response = await get_request_generators(`product`, {product_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetItemImages(id) {
    let response = await get_request_generators(`product.images`, {id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetProductThumbnail(product_id) {
    let response = await get_request_generators(`thumbnail`, {product_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}



async function get_request_generators(uri, params) {
     return(
        await axios.get(`https://${IP}/${uri}`, {
            params,
            cancelToken: source.token
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
}




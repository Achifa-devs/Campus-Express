import axios from 'axios'
// import {IP} from '@env'


let uri_1 = 'ce-server.vercel.app'
let uri_2 = '192.168.86.146'
let IP = uri_2


const source = axios.CancelToken.source();


export async function updateItem(type,buyer_id,product_id) {
    let response = await update_request_generators('update-cart-unit', {type,buyer_id,product_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return(response)
}



async function update_request_generators(uri, body) {
    return(
        await axios.update(`https://${IP}/${uri}`, body, {
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

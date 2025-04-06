import axios from "axios"



let uri_1 = 'ce-server.vercel.app'
let uri_2 = '192.168.181.146'
let IP = uri_1

const source = axios.CancelToken.source();

export async function ResetPwd(email,seller_id) {
    let response = await api_request_generators('seller.password-reset', {email,seller_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function CheckPwdResetToken(seller_id,token) {
    let response = await api_request_generators('seller.password-token-check', {seller_id,token})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function UpdatePwd(buyer_id, pwd) {
    let response = await api_request_generators('password-update', {buyer_id, pwd})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return(response)
}



async function api_request_generators(uri, body) {
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


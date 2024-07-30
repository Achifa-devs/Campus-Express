import axios from 'axios'
// import {IP} from '@env'


let uri_1 = 'ce-server.vercel.app'
let uri_2 = 'localhost:2222'
let IP = uri_1


const source = axios.CancelToken.source();

export async function RegisteAdmin(fname,lname,email,phone,pwd,state,campus) {
    let response = await post_request_generators('admin.registration', {fname,lname,email,phone,pwd,state,campus})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function LogAdminIn(email,pwd) {
    let response = await post_request_generators('admin.login', {email,pwd})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function ResetPwd(email,buyer_id) {
    let response = await post_request_generators('admin.password-reset', {email,buyer_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function CheckPwdResetToken(buyer_id,token) {
    let response = await post_request_generators('admin.password-token-check', {buyer_id,token})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function ValidateEmail(token) {
    let response = await post_request_generators('admin.email-validation', {token})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function SendEmail(email,buyer_id) {
    let response = await post_request_generators('admin.send-email', {email,buyer_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function CreateOrder(file,buyer_id) {
    let response = await post_request_generators('admin.create-order', {file,buyer_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function UploadChat(buyer_id,seller_id) {
    let response = await post_request_generators('new-chat', {buyer_id,seller_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}






async function post_request_generators(uri, body) {
    return(
        await axios.post(`https://${IP}/${uri}`, body, {
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




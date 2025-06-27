"use client"
import React from 'react'
import { useRef, useState } from "react"
import './styles/xx-large.css'
import './styles/x-large.css'
import './styles/large.css'
import './styles/medium.css'
import './styles/small.css'
import { seller_overlay_setup } from '@/files/reusable.js/overlay-setup'


export default function PasswordRecovery() {

    
    let emailRef = useRef('')
    let tokenRef = useRef('')
    let pwdRef = useRef('')
    let [email, setEmail] = useState('')
    let [token, setToken] = useState('')
    let [cPwd, setCpwd] = useState('')
    let [pwd, setPwd] = useState('')
    let validation = useRef(false);



    let ConfirmEmail = async(e, inputs, check) => {
        
        if(check){
            document.querySelector('.err-cnt').querySelector('.err-mssg').remove()
        }

        Validation(inputs);
        if(validation.current){
           
            e.target.disabled = true;
            seller_overlay_setup(true, 'Confirming Email');
            fetch('/api/automation/whatsapp/password_recovery', {
                method: 'POST',
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({to: '+2348032639894'})
            })
            .then(async(result) => {
                let response = await result.json();
                if(response.bool){
                    // dispatch(setSellerTo(response.cookie))
                    setActiveJsx(<EnterToken VerifyToken={VerifyToken} updateToken={updateToken} />)
                    seller_overlay_setup(false, '')
                }else{
                    seller_overlay_setup(false, '')
                    if(check){
                        document.querySelector('.err-cnt')?.querySelector('.err-mssg')?.remove()
                        let div = document.createElement('div');
                        div.className = 'err-mssg';
                        div.style.display = 'table'
                        div.style.margin = '0 auto'
                        div.innerHTML = response.Mssg
                        document.querySelector('.err-cnt').append(div)
                        
                    }else{
                        let div = document.createElement('div');
                        div.className = 'err-mssg';
                        div.style.display = 'table'
                        div.style.margin = '0 auto'
                        div.innerHTML = response.Mssg
                        document.querySelector('.err-cnt').append(div)
                    }
                    e.target.disabled = false; 
                }
                e.target.disabled = false; 
            })
            .catch((err) => {
                seller_overlay_setup(false, '')
                if(check){
                    document.querySelector('.err-cnt').querySelector('.err-mssg').remove()
                    let div = document.createElement('div');
                    div.className = 'err-mssg';
                    div.style.display = 'table'
                    div.style.margin = '0 auto'
                    div.innerHTML = err.message
                    document.querySelector('.err-cnt').append(div)
                    
                }else{
                    let div = document.createElement('div');
                    div.className = 'err-mssg';
                    div.style.display = 'table'
                    div.style.margin = '0 auto'
                    div.innerHTML = err.message
                    document.querySelector('.err-cnt').append(div)
                }
                e.target.disabled = false; 
            })

        }
    }
    
    let VerifyToken = async(e, inputs, check) => {

        if(check){
            document.querySelector('.err-cnt').querySelector('.err-mssg').remove()
        }

        Validation(inputs);
        if(validation.current){
           
            e.target.disabled = true;
            seller_overlay_setup(true, 'Veryfyng Token')
            fetch('https://cs-server-olive.vercel.app/seller.verify-token', {
                method: 'post',
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    email: emailRef.current,token:tokenRef.current
                })
            })
            .then(async(result) => {
                let response = await result.json();
                console.log(response)
                if(response.bool){
                    // dispatch(setSellerTo(response.cookie))
                    setActiveJsx(<UpdatePwd ResetPassword={ResetPassword} updateCpwd={updateCpwd} updatePwd={updatePwd} />)
                    seller_overlay_setup(false, '')
                }else{
                    seller_overlay_setup(false, '')
                    if(check){
                        document.querySelector('.err-cnt').querySelector('.err-mssg').remove()
                        let div = document.createElement('div');
                        div.className = 'err-mssg';
                        div.style.display = 'table'
                        div.style.margin = '0 auto'
                        div.innerHTML = response.Mssg
                        document.querySelector('.err-cnt').append(div)
                        
                    }else{
                        let div = document.createElement('div');
                        div.className = 'err-mssg';
                        div.style.display = 'table'
                        div.style.margin = '0 auto'
                        div.innerHTML = response.Mssg
                        document.querySelector('.err-cnt').append(div)
                    }
                    e.target.disabled = false; 

                }
                e.target.disabled = false; 
            })
            .catch((err) => {
                console.log(err)
                seller_overlay_setup(false, '')
                let check = document.querySelector('.err-cnt').querySelector('.err-mssg');
                if(check){
                    document.querySelector('.err-cnt').querySelector('.err-mssg').remove()
                    let div = document.createElement('div');
                    div.className = 'err-mssg';
                    div.style.display = 'table'
                    div.style.margin = '0 auto'
                    div.innerHTML = err.message
                    document.querySelector('.err-cnt').append(div)
                    
                }else{
                    let div = document.createElement('div');
                    div.className = 'err-mssg';
                    div.style.display = 'table'
                    div.style.margin = '0 auto'
                    div.innerHTML = err.message
                    document.querySelector('.err-cnt').append(div)
                }
                e.target.disabled = false; 
            })

        }
        

        
    }

    let ResetPassword = async(e, inputs, check) => {
        

        if(check){
            document.querySelector('.err-cnt').querySelector('.err-mssg').remove()
        }

        Validation(inputs);
        if(validation.current){
          
            e.target.disabled = true;
            seller_overlay_setup(true, 'Resetting Password')
            fetch('https://cs-server-olive.vercel.app/seller.password-update', {
                method: 'post',
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({email:emailRef.current,pwd:pwdRef.current})
            })
            .then(async(result) => {
                let response = await result.json();
                console.log(response)
                if(response.bool){
                    window.location.href='/seller/login'
                    seller_overlay_setup(false, '')
                }else{
                    seller_overlay_setup(false, '')
                    if(check){
                        document.querySelector('.err-cnt').querySelector('.err-mssg').remove()
                        let div = document.createElement('div');
                        div.className = 'err-mssg';
                        div.style.display = 'table'
                        div.style.margin = '0 auto'
                        div.innerHTML = response.Mssg
                        document.querySelector('.err-cnt').append(div)
                        
                    }else{
                        let div = document.createElement('div');
                        div.className = 'err-mssg';
                        div.style.display = 'table'
                        div.style.margin = '0 auto'
                        div.innerHTML = response.Mssg
                        document.querySelector('.err-cnt').append(div)
                    }
                    e.target.disabled = false; 
                }
                e.target.disabled = false;
            })
            .catch((err) => {
                console.log(err)
                seller_overlay_setup(false, '')
                let check = document.querySelector('.err-cnt').querySelector('.err-mssg');
                if(check){
                    document.querySelector('.err-cnt').querySelector('.err-mssg').remove()
                    let div = document.createElement('div');
                    div.className = 'err-mssg';
                    div.style.display = 'table'
                    div.style.margin = '0 auto'
                    div.innerHTML = err.message
                    document.querySelector('.err-cnt').append(div)
                    
                }else{
                    let div = document.createElement('div');
                    div.className = 'err-mssg';
                    div.style.display = 'table'
                    div.style.margin = '0 auto'
                    div.innerHTML = err.message
                    document.querySelector('.err-cnt').append(div)
                }
                e.target.disabled = false;
            })

        }
        

        
    }

    function Validation(inputs) {


        let book = []

        function addErrMssg(err,pElem) {
            // if(!err[0].bool){

            let check = pElem.querySelector('.err-mssg');
            if(check){
                pElem.querySelector('.err-mssg').remove()
                let div = document.createElement('div');
                div.className = 'err-mssg';
                console.log(err)
                if(err.length > 0 ){
                    div.innerHTML = err[0].mssg;
                    pElem.append(div)
                    validation.current=(false)

                }else{
                    validation.current=(true)
                    let check = pElem.querySelector('.err-mssg');

                    if(check){
                        pElem.querySelector('.err-mssg').remove()
                    }
                }
                
                
            }else{

                let div = document.createElement('div');
                div.className = 'err-mssg';
                console.log(err)

                if(err.length !== 0 ){
                    div.innerHTML = err[0].mssg;
                    pElem.append(div)
                    validation.current=(false)

                }else{
                    validation.current=(true)
                    let check = pElem.querySelector('.err-mssg');

                    if(check){
                        pElem.querySelector('.err-mssg').remove()
                    }
                }
            }
                

            // }
            
        }

        inputs.map((item,index) => {
            if(item.type === 'text'){

                if(item.name === 'email'){

                    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty.'}
                    let validEmail = emailRegex.test(item.value) ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please enter a valid email address.'}
                    let errs = [empty,validEmail];
                    console.log('empty',errs)
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)

                }
                
            }else{
                if(index === 0){
                    if(item.type === 'password'){
                        let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty.'}
                        let length = item.value.length >= 8 ? {bool: true, mssg: ''} :  {bool: false, mssg: 'Password must contain at least 8 characters.'}
                        let errs = [empty,length];
                        
                        addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
        
                    }
                }else{
                    if(item.type === 'password'){
                        let valid = cPwd===pwd ? {bool: true, mssg: ''} :  {bool: false, mssg: 'Password mismatch'}
                        let errs = [valid];
                        
                        addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
        
                    }
                }

            }
        })

      

    }




    function updateEmail(data) {
        setEmail(data)
        emailRef.current=data
    }

    function updateToken(data) {
        setToken(data)
        tokenRef.current=data
    }

    function updatePwd(data) {
        setPwd(data)
        pwdRef.current=data
    }

    function updateCpwd(data) {
        setCpwd(data)
    }

    let [activeJsx, setActiveJsx] = useState(<EmailConfirmation updateEmail={updateEmail} Validation={Validation} ConfirmEmail={ConfirmEmail}  />)


  return (
    <>
       <div className="seller-login-cnt" >
            <h6 style={{background: 'orangered', color: '#fff', padding: '10px', borderRadius: '5px', marginBottom: '-2px', height: 'auto'}}>Vendor Center</h6>

            
            <section className="shadow">
                
                <div className="err-cnt">

                </div>
                <br />
                
                {
                    activeJsx
                }
                <div style={{textAlign: 'center'}} onClick={e => window.location.href=('/seller/login')}>
                    <small style={{cursor: 'pointer', color: 'orangered', fontWeight: '400'}}>Back To Login</small>
                </div>
            </section>
        </div>
    </>
  )
}



function EmailConfirmation({ConfirmEmail, updateEmail}) {

    return(
        <>
            <form action="" >
                

                <div className="seller-input-cnt">
                    <label htmlFor="">Enter Registered Email</label>
                    <input style={{background: '#efefef'}} name="email" onInput={e => updateEmail(e.target.value)}  placeholder='Email...' type="text" />
                     
                </div>

            
                <div className="seller-input-cnt" style={{justifyContent: 'space-between', flexDirection: 'row'}}>

                    
                    
                    <button style={{background: '#ff4500',color: '#fff', border: 'none', outline: 'none', height: '40px', width: '100%', borderRadius: '5px'}} onClick={e => {e.preventDefault(); ConfirmEmail(e,[...document.querySelectorAll('input')], document.querySelector('.err-cnt').querySelector('.err-mssg'))}}>
                        Confirm Registered Email
                    </button>
                    
                </div>
            </form>
        </>
    )
}

function EnterToken({VerifyToken, updateToken}) {
    
    return(
        <>
            <form action="" >
                    

                <div className="seller-input-cnt">
                    <label htmlFor="">Enter Token</label>
                    <input style={{background: '#efefef'}} name="token" onInput={e => updateToken(e.target.value)}  placeholder='Token...' type="text" />
                    
                </div>

            
                <div className="seller-input-cnt" style={{justifyContent: 'space-between', flexDirection: 'row'}}>

                    
                    
                    <button style={{background: '#ff4500',color: '#fff', border: 'none', outline: 'none', height: '40px', width: '100%', borderRadius: '5px'}} onClick={e => {e.preventDefault(); VerifyToken(e,[...document.querySelectorAll('input')])}}>
                        Verify Token
                    </button>
                    
                </div>
            </form>
        </>
    )
}

function UpdatePwd({ResetPassword,updateCpwd, updatePwd }) {

    return(
        <>
            <form action="" >
                <div className="seller-input-cnt">
                    <label htmlFor="">Password</label>
                    <input style={{background: '#efefef'}} onInput={e => updatePwd(e.target.value)}  placeholder='Password...' type="password" />
                    
                </div>
                <div className="seller-input-cnt">
                    <label htmlFor="">Confirm Password</label>
                    <input style={{background: '#efefef'}} onInput={e => updateCpwd(e.target.value)}  placeholder='Password...' type="password" />
                </div>
                <div className="seller-input-cnt" style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <button style={{background: '#ff4500',color: '#fff', border: 'none', outline: 'none', height: '40px', width: '100%', borderRadius: '5px'}} onClick={e => {e.preventDefault(); ResetPassword(e,[...document.querySelectorAll('input')])}}>
                        Reset Password
                    </button>
                </div>
            </form>
        </>
    )
}

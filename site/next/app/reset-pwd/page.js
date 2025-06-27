"use client"
import React, { useEffect } from 'react'
import { useRef, useState } from "react"
import './styles/xx-large.css'
import './styles/x-large.css'
import './styles/large.css'
import './styles/medium.css'
import './styles/small.css'
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup'


export default function PasswordRecovery() {

    
    const [pwd, setPwd] = useState('')
    const [email, setEmail] = useState('')
    const validation = useRef(false)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)

        const emailParam = params.get('email')
        const tokenParam = params.get('token')

        if (emailParam) {
        setEmail(emailParam)
        }
    }, [])
    let ResetPassword = async(e, inputs, check) => {
        

        if(check){
            document.querySelector('.err-cnt').querySelector('.err-mssg').remove()
        }

        Validation(inputs);
        if(validation.current){
          
            e.target.disabled = true;
            buyer_overlay_setup(true, 'Resetting Password')
            fetch('https://cs-server-olive.vercel.app/reset-password', {
                method: 'post',
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({email:email,password:pwd})
            })
            .then(async(result) => {
                let response = await result.json();
                if(response.success){
                    window.location.href='/login'
                    buyer_overlay_setup(false, '')
                }else{
                    buyer_overlay_setup(false, '')
                    if(check){
                        document.querySelector('.err-cnt').querySelector('.err-mssg').remove()
                        let div = document.createElement('div');
                        div.className = 'err-mssg';
                        div.style.display = 'table'
                        div.style.margin = '0 auto'
                        div.innerHTML = response.message
                        document.querySelector('.err-cnt').append(div)
                        
                    }else{
                        let div = document.createElement('div');
                        div.className = 'err-mssg';
                        div.style.display = 'table'
                        div.style.margin = '0 auto'
                        div.innerHTML = response.message
                        document.querySelector('.err-cnt').append(div)
                    }
                    e.target.disabled = false; 
                }
                e.target.disabled = false;
            })
            .catch((err) => {
                console.log(err)
                buyer_overlay_setup(false, '')
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

        inputs.map((item) => {
           if(item.type === 'password'){
                let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty.'}
                let length = item.value.length >= 8 ? {bool: true, mssg: ''} :  {bool: false, mssg: 'Password must contain at least 8 characters.'}
                let errs = [empty,length];
                
                addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
        
            }
        })

      

    }







  return (
    <>
        <div className="seller-login-cnt" >
            {/* <h6 style={{background: 'orangered', color: '#fff', padding: '10px', borderRadius: '5px', marginBottom: '-2px', height: 'auto'}}>Vendor Center</h6> */}
        
            <section className="shadow">
        
                <div className="err-cnt">
                </div>
                <br />
        
                <form action="" >
                    <div className="seller-input-cnt" style={{flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
                        <div style={{width: '80%'}}>
                            <label htmlFor="">Password</label>
                            <input style={{background: '#efefef'}} name='password' className='pwd' onInput={e => setPwd(e.target.value)}  placeholder='Password...' type="password" />
                        </div>
                        <div style={{width: '30%', margin: '20px 0px 0px 0px'}}>
                            <button onClick={e => {
                                e.target.disabled = true
                                e.preventDefault();
                                let pwd = document.querySelector('.pwd');
                                if(pwd.type !== 'text'){
                                    pwd.type = 'text'
                                    setTimeout(( ) => {pwd.type = 'password'; e.target.disabled = false}, 800)
                                }
                            }} style={{width: '100%'}}>Show</button>
                        </div>
                    </div>
                    <div className="seller-input-cnt" style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                            <button style={{ background: '#ff4500', color: '#fff', border: 'none', outline: 'none', height: '40px', width: '100%', borderRadius: '5px' }} onClick={e => {
                            e.preventDefault();
                            ResetPassword(e, [...document.querySelectorAll('input')])
                            }}>
                            Reset Password
                        </button>
                    </div>
                </form>
                <div style={{textAlign: 'center'}} onClick={e => window.location.href=('/login')}>
                    <small style={{cursor: 'pointer', color: 'orangered', fontWeight: '400'}}>Back To Login</small>
                </div>
            </section>
        </div>
    </>
  )
}

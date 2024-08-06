"use client"
import React from 'react'
import { useRef, useState } from "react"
import './styles/xx-large.css'
import './styles/x-large.css'
import './styles/large.css'
import './styles/medium.css'
import './styles/small.css'
import { useDispatch } from 'react-redux'
import { setSellerTo } from '@/redux/seller_store/seller'
export default function Login() {

    let [btn, setBtn] = useState("Login")
    let dispatch = useDispatch()

    let [email, setEmail] = useState('')
    let [pwd, setPwd] = useState('')
    const validation = useRef(false);


    let Login = async(e) => {
        
        let check = document.querySelector('.err-cnt').querySelector('.err-mssg');

        if(check){
            document.querySelector('.err-cnt').querySelector('.err-mssg').remove()
        }

        Validation();
        if(validation.current){
            setBtn(
                <div className="Authloader" style={{background: '#fff'}}></div>
            )
            e.target.disabled = true;

            fetch('http://localhost:2222/seller.login', {
                method: 'post',
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    email,pwd
                })
            })
            .then(async(result) => {
                let response = await result.json();
                console.log(response)
                if(response.bool){
                    dispatch(setSellerTo(response.cookie))
                    
                }else{
                    let check = document.querySelector('.err-cnt').querySelector('.err-mssg');
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
                    setBtn("Login")
                }
                e.target.disabled = false; 
                setBtn("Login")
            })
            .catch((err) => {
                console.log(err)

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
                setBtn("Login")
            })

        }
        

        
    }

    function Validation() {

        let inputs = [...document.querySelectorAll('input')]

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

        inputs.map(item => {
            if(item.type === 'text'){

                if(item.name === 'email'){

                    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty.'}
                    let validEmail = emailRegex.test(item.value) ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please enter a valid email address.'}
                    let errs = [empty,validEmail];
                    console.log('empty',errs)
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)

                }
                
            }else if(item.type === 'password'){
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
            <h6 style={{background: 'orangered', color: '#fff', padding: '10px', borderRadius: '5px', marginBottom: '-2px', height: 'auto'}}>Vendor Center</h6>

            
            <section className="shadow">
                
                <div className="err-cnt">

                </div>
                <br />
                <form action="" >
                

                    <div className="seller-input-cnt">
                        <label htmlFor="">Email</label>
                        <input style={{background: '#efefef'}} name="email" onInput={e => setEmail(e.target.value)}  placeholder='Email...' type="text" />
                         
                    </div>

                    <div className="seller-input-cnt">
                        <label htmlFor="">Password</label>
                        <input style={{background: '#efefef'}} onInput={e => setPwd(e.target.value)}  placeholder='Password...' type="password" />
                        
                    </div>
                    
                
                    <div className="seller-input-cnt" style={{justifyContent: 'space-between', flexDirection: 'row'}}>

                        
                        
                        <button style={{background: '#ff4500',color: '#fff', border: 'none', outline: 'none', height: '40px', width: '100%', borderRadius: '5px'}} onClick={e => {e.preventDefault(); Login(e)}}>
                            {
                                btn
                            }
                        </button>
                        
                    </div>
                </form>
                <div style={{textAlign: 'center'}} onClick={e => window.location.href=('/seller/password-recovery')}>
                    <small style={{cursor: 'pointer', color: 'orangered', fontWeight: '400'}}>Recover Forgotten Password Here</small>
                </div>
                <div style={{textAlign: 'center'}} onClick={e => window.location.href=('/seller/signup')}>
                    <small style={{cursor: 'pointer', color: 'orangered', fontWeight: '400'}}>Don t Have An Account, Signup Here</small>
                </div>
            </section>
        </div>
    </>
  )
}
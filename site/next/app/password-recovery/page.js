"use client"
import React, { useEffect } from 'react'
import { useRef, useState } from "react"
import './styles/xx-large.css'
import './styles/x-large.css'
import './styles/large.css'
import './styles/medium.css'
import './styles/small.css'
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup'
import { useSearchParams } from 'next/navigation';


export default function PasswordRecovery() {

    
    
    let [email, setEmail] = useState('')
    let validation = useRef(false);


    const [isApp, setIsApp] = useState(true);
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const app = searchParams.get('app');

        console.log('app param:', app);
        if (app === 'true') { 
            setIsApp(true)
        // Do something special for app=true
        }else{
            setIsApp(false)
        }
    }, [app]);

    let ConfirmEmail = async(e, inputs, check) => {
        
        if(check){
            document.querySelector('.err-cnt').querySelector('.err-mssg').remove()
        }

        Validation(inputs);
        if(validation.current){
           
            e.target.disabled = true;
            buyer_overlay_setup(true, 'Confirming Email')
            fetch('https://cs-server-olive.vercel.app/comfirm-email', {
                method: 'POST',
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({email: email})
            })
                .then(async (result) => {
                    let response = await result.json();
                    console.log(response)
                    
                if(response.success){
                    // dispatch(setSellerTo(response.cookie))
                    isApp ? window.location.href=`/confirm-token?email=${email}&app=true` : window.location.href=`/confirm-token?email=${email}`
                    // buyer_overlay_setup(false, '')
                }else{
                    buyer_overlay_setup(false, '')
                    alert('Please try again')

                    if(check){
                        document.querySelector('.err-cnt')?.querySelector('.err-mssg')?.remove()
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
                buyer_overlay_setup(false, '')
                alert('Please try again')

                if(check){
                    // document.querySelector('.err-cnt').querySelector('.err-mssg').remove()
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
                

                    <div className="seller-input-cnt">
                        <label htmlFor="">Enter Registered Email</label>
                        <input style={{background: '#efefef'}} name="email" onInput={e => setEmail(e.target.value)}  placeholder='Email...' type="text" />
                        
                    </div>

                
                    <div className="seller-input-cnt" style={{justifyContent: 'space-between', flexDirection: 'row'}}>

                        
                        
                        <button style={{background: '#ff4500',color: '#fff', border: 'none', outline: 'none', height: '40px', width: '100%', borderRadius: '5px'}} onClick={e => {
                            e.preventDefault();
                            ConfirmEmail(
                                e,
                                [...document.querySelectorAll('input')],
                                document.querySelector('.err-cnt').querySelector('.err-mssg')
                            )
                        }}>
                            Confirm Registered Email
                        </button>
                        
                    </div>
                </form>
                {isApp === true ? '' : <div style={{textAlign: 'center'}} onClick={e => window.location.href=('/login')}>
                    <small style={{cursor: 'pointer', color: 'orangered', fontWeight: '400'}}>Back To Login</small>
                </div>}
            </section>
        </div>
    </>
  )
}



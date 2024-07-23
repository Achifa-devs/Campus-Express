import { useEffect, useRef, useState } from 'react';
import '../styles/settings.css';
import Countdown from 'react-countdown';
import SellerLayout from '../layout/Seller';
import { ResetPwd } from '../api/reuseable';
import { SendEmail } from '../api/seller/post';
const ForgotPwd = () => {

    let [email, setemail] = useState('');
    let [time, settime] = useState(60)
    let timer = useRef(60)
    let [text, settext] = useState('A password recovery email have been sent to the email');
    let book = useRef({email: false})

    function addErrMssg(err,pElem) {
            
        let check = pElem.querySelector('.err-mssg');
        if(check){
            pElem.querySelector('.err-mssg').remove()
            let div = document.createElement('div');
            div.className = 'err-mssg';
            // console.log(err)
            if(err.length > 0 ){
                div.innerHTML = err[0].mssg;
                pElem.append(div)
                

            }else{
                
                let check = pElem.querySelector('.err-mssg');

                if(check){
                    pElem.querySelector('.err-mssg').remove()
                }
            }
            
            
        }else{

            let div = document.createElement('div');
            div.className = 'err-mssg';
            // console.log(err)

            if(err.length !== 0 ){
                div.innerHTML = err[0].mssg;
                pElem.append(div)
                

            }else{
                
                let check = pElem.querySelector('.err-mssg');

                if(check){
                    pElem.querySelector('.err-mssg').remove()
                }
            }
        }
     
    }

    function Validate(item){

    
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty.'}
        let validEmail = emailRegex.test(item.value) ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please enter a valid email address.'}
        // let emailDuplicate =  emailvailidity ? {bool: true, mssg: ''} : {bool: false, mssg: 'Email already exist, please try something else'} 
        let errs = [empty,validEmail];
        addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
        let list = errs.filter(item => item.mssg !== '')
        let response = list.length > 0 ? false : true;
        return response;

    }

    function countDown() {
        let timeout = 60;
        let timeFunc = setInterval(() => {
            let newTime = timeout - 1;
            settime(newTime);
            timeout=newTime;
            if(timeout === 0){
                clearInterval(timeFunc)
            }
            
        }, 1000);
    }

    function sendPasswordResetToken(e) {

        let response = Validate(document.querySelector('.email'))
        if(response){
            countDown()
            e.target.disabled = true;
            SendEmail(email, 'password token','')
        }else{
            e.target.disabled = false;

        }
        
    }


    return ( 
        <>
            {/* <SellerLayout> */}
                <div className="password-reset shadow-sm" style={{background: 'orangered', bottom: '0', position: 'absolute', height: 'calc(100vh - 60px)', width: '100%'}}>
                    
                    
                    <form className='shadow-sm' action="" style={{width: '350px', padding: '20px', height: 'auto'}}>
                        <br />
                        <h6><b style={{background: 'orangered', color: '#fff', padding: '10px', borderRadius: '5px', marginBottom: '20px', height: '150px'}}>Password Recovery Form</b></h6>
                    
                        <br />

                        <div style={{padding: '10px'}}>
                            <br />
                            <div className="input-cnt">
                                <label htmlFor="" style={{fontWeight: '400', color: '#000', fontSize: 'medium'}}>Enter registered email</label>
                                <input onInput={e => setemail(e.target.value)} type="text" className='email' style={{background: '#efefef'}} placeholder="Enter Registered Email Here..."/>
                            </div>
 
                            <button style={{marginBottom: '10px'}} onClick={e =>{e.preventDefault(); sendPasswordResetToken(e);}}>Submit Email</button>
                            <br />
                            <small style={{color: 'orange', fontWeight: '800', display: 'block', fontSize: 'x-small', textAlign: 'center', width: '100%'}}>{text}</small>
                            <small style={{color: 'orange', display: 'block', fontWeight: '800', textAlign: 'center', width: '100%', fontSize: 'x-small'}}>Resend Email In {time}s </small> 

                        </div>
 
                    </form>
                    
                </div>
            {/* </SellerLayout> */}
        </>
     );
}
 
export default ForgotPwd;
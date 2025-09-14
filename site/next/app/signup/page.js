"use client"
import { useEffect, useRef, useState } from 'react';
import { data, school_choices } from './location';
import 'react-phone-input-2/lib/style.css'
import './styles/xx-large.css'
import './styles/x-large.css'
import './styles/large.css'
import './styles/medium.css'
import './styles/small.css'
import logoSvg from '@/files/assets/default.svg'
import { useDispatch } from 'react-redux';
import { setSellerTo } from '@/redux/seller_store/seller';
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup';
import axios from 'axios';
import { setBuyerTo } from '@/redux/buyer_store/BuyerData';


const Signup = () => {
    let [screenWidth, setScreenWidth] = useState(0) 
    let dispatch = useDispatch();
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    },[])


    let [fname, setFname] = useState('')
    let [lname, setLname] = useState('')
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState('')
    let [gender, setGender] = useState('')
    let [pwd, setPwd] = useState('')
    let [cPwd, setCPwd] = useState('')

    let [state, setState] = useState('')
    let [campus, setCampus] = useState('')

    const [value, setValue] = useState('Select State');
    const validation = useRef(false);
    // const [validation, setvalidation] = useState(false);
    const [campusLocale, setCampusLocale] = useState('Select Campus');
    const [campusLocaleList, setCampusLocaleList] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [CampusisFocus, setCampusIsFocus] = useState(false);
    let [btn, setBtn] = useState("Signup")
    let [emailResponse,setEmailResponse] = useState('')
    let book = useRef({
        fname: false,
        lname: false,
        email: false,
        pwd: false,
        phn: false,
        gender: false,
        campus: false,
        state: false
    })

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

    let Registration = (e) => {
        // e.target.disabled = true;
        let overlay = document.querySelector('.overlay')

        Validation();
        Object.values(book.current).filter(item => item !== true).length > 0 ? validation.current = false : validation.current = true;

        if (validation.current) {
            overlay.setAttribute('id', 'overlay');
            
            setBtn(
                <div className="Authloader" style={{background: '#fff',border: '1px solid orangered'}}></div>
            )
            // e.target.disabled = true;
            buyer_overlay_setup(true, 'Signing You Up')

            axios.post('/api/signup', {fname,lname,gender,email,phone,pwd,state,campus})
            .then(({data})=>{
                console.log(data)
                if(data.bool){
                    // dispatch(setBuyerTo(data.cookie))
                    // buyer_overlay_setup(false, '')
                    window.location.href = '/store'
                }else{
                    
                    buyer_overlay_setup(false, '')
                    overlay.removeAttribute('id');
                    if(data.data === 'duplicate email'){
                        addErrMssg([{mssg:'Email already exist, please try something else'}], document.querySelector('.email').parentElement)
                    }else if(data.data === 'duplicate phone'){
                        addErrMssg([{mssg:'Phone Number already exist, please try something else'}], document.querySelector('.phone').parentElement.parentElement.parentElement)
                    }
                    setBtn("Signup")
                    e.target.disabled = false;
                }
            })
                .catch((err) => {
                console.log(err)
                setBtn("Signup")
                overlay.removeAttribute('id');
                
                buyer_overlay_setup(false, '')
                e.target.disabled = false;
            })
           
            
        }else{
            
        }
    }

    function Validation() {
        let inputs = [...document.querySelectorAll('input')]
        let select = [...document.querySelectorAll('select')]
        

        inputs.map(async(item) => {
            if(item.type === 'text'){

                if(item.name === 'fname'){

                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty'}
                    let length = item.value.length > 3 ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please name must be at least 3 letters.'}
                    let specialCharFree = /^[a-zA-Z]+$/.test(item.value.trim()) ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please enter only alphabets.'}
                    let errs = [empty,length,specialCharFree];
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement);
                    let list =errs.filter(item => item.mssg !== '')

                    list.length > 0 ? book.current.fname = false : book.current.fname = true
                    
                }else if(item.name === 'lname'){

                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty'}
                    let length = item.value.length > 3 ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please name must be at least 3 letters.'}
                    let specialCharFree = /^[a-zA-Z]+$/.test(item.value.trim()) ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please enter only alphabets.'}

                    let errs = [empty,length,specialCharFree];
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
                    let list =errs.filter(item => item.mssg !== '')

                    list.length > 0 ? book.current.lname = false : book.current.lname = true

                }else if(item.name === 'email'){

                    // let emailvailidity = await checkEmailDuplicate();
                    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty.'}
                    let validEmail = emailRegex.test(item.value) ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please enter a valid email address.'}
                    // let emailDuplicate =  emailvailidity ? {bool: true, mssg: ''} : {bool: false, mssg: 'Email already exist, please try something else'} 
                    let errs = [empty,validEmail];
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
                    let list = errs.filter(item => item.mssg !== '')
                    list.length > 0 ? book.current.email = false : book.current.email = true

                }
                
            }else if(item.type === 'password'){
                if(item.name === 'password'){
                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty.'}
                    let length = item.value.length >= 8 ? {bool: true, mssg: ''} :  {bool: false, mssg: 'Password must contain at least 8 characters.'}
                    let errs = [empty,length];
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)

                    let list =errs.filter(item => item.mssg !== '')

                    list.length > 0 ? book.current.pwd = false : book.current.pwd = true
                }
            }else if(item.type === 'tel'){
                if(item.name === 'phone'){
                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty.'}
                    let length = item.value.length >= 11 ? {bool: true, mssg: ''} :  {bool: false, mssg: 'Invalid Phone Number'}
                    let errs = [empty,length];
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement.parentElement.parentElement)

                    let list =errs.filter(item => item.mssg !== '')

                    list.length > 0 ? book.current.phn = false : book.current.phn = true
                }
            }
        })

        select.map(item => {
            if(item.name === 'state'){
                let empty = state !== '' ?  {bool: true, mssg: ''} :  {bool: false, mssg: 'Please select a state'}
                let errs = [empty];
                    
                addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
                let list =errs.filter(item => item.mssg !== '')

                list.length > 0 ? book.current.state = false : book.current.state = true
            }else if(item.name === 'campus'){
                let empty = campus !== '' ?  {bool: true, mssg: ''} :  {bool: false, mssg: 'Please select a campus'}
                let errs = [empty];
                    
                addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
                let list =errs.filter(item => item.mssg !== '')

                list.length > 0 ? book.current.campus = false : book.current.campus = true
            }else if(item.name === 'gender'){
                let empty = gender !== '' ?  {bool: true, mssg: ''} :  {bool: false, mssg: 'Please select your gender'}
                let errs = [empty];
                    
                addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
                let list =errs.filter(item => item.mssg !== '')

                list.length > 0 ? book.current.gender = false : book.current.gender = true
            }
        })
    }


    useEffect(() => {
        setCampusLocaleList([])
        let stateIndex = data.filter(item =>  item.label.toLocaleLowerCase() === state.toLocaleLowerCase())
        let index = data.indexOf(stateIndex[0]); 
        let campuses = Object.values(school_choices).reverse();
        console.log(campuses[index])
        index < 0 ? setCampusLocaleList([]) : setCampusLocaleList(campuses[index])

    }, [state])


    return ( 
        <>
            <div className="overlay" >
                <div className="loader">
                </div>
            </div>
           
            <div className="seller-signup">

                <section className='seller-signup-cnt'>
                    
                    <div className="left">

                        <img src={logoSvg.src} style={{height: '100%', width: '100%'}} alt="" />



                    </div>
                    <div className="right">
                        <div  className="head-cnt">
                            Signup form
                        </div>
                        <form action="">
                            <div className="seller-input-cnt" style={{flexDirection: 'row'}}>
                                <section>
                                    <label htmlFor="">FirstName</label>
                                    <input style={{background: '#efefef'}} name='fname' onInput={e => setFname(e.target.value)} placeholder='FirstName...' type="text" />
                                </section>
                                <section>
                                    <label htmlFor="">LastName</label>
                                    <input style={{background: '#efefef'}} name='lname' onInput={e => setLname(e.target.value)}  placeholder='LastName' type="text" />
                                </section>
                            </div>

                            <div className="seller-input-cnt" style={{display: 'flex', flexDirection: 'column'}}>
                                <label htmlFor="">Gender</label>
                                <select onInput={e => setGender(e.target.value)} name='gender'>
                                    <option value=''>Select your gender</option>
                                    <option value={0}>Male</option>
                                    <option value={1}>Female</option>
                                </select>
                            </div>



                            <div className="seller-input-cnt">
                                <section style={{width: '100%'}}>
                                    <label htmlFor="">Email</label>
                                    <input style={{background: '#efefef'}} name='email' onInput={e => {setEmail(e.target.value)}} className='email'  placeholder='Email...' type="text" />
                                </section> 
                            </div>

                            <div className="seller-input-cnt" style={{flexDirection: 'column', height: 'fit-content'}}>
                                <section style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                                    <section style={{width: '25%'}}>
                                        <label htmlFor="">Phone</label>
                                        <input style={{background: '#efefef'}} name='code' value={+234} className='phone' type="tel" />
                                    </section>
                                    <section style={{width: '75%', margin: '20px 0px 0px 0px'}}>
                                        <input style={{background: '#efefef'}} name='phone'
                                        className='phone' onInput={e => setPhone(e.target.value)}  placeholder='Phone Number...' type="tel" />
                                    </section>
                                </section>
                                
                            </div>

                            
                            <div className="seller-input-cnt">
                                <section style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                                    <section style={{width: '70%'}}>
                                        <label htmlFor="">Password</label>
                                        <input style={{background: '#efefef'}} name='password' className='pwd' onInput={e => setPwd(e.target.value)}  placeholder='Password...' type="password" />
                                    </section>
                                    <section style={{width: '30%', margin: '20px 0px 0px 0px'}}>
                                        <button onClick={e => {
                                            e.target.disabled = true
                                            e.preventDefault();
                                            let pwd = document.querySelector('.pwd');
                                            if(pwd.type !== 'text'){
                                                pwd.type = 'text'
                                                setTimeout(( ) => {pwd.type = 'password'; e.target.disabled = false}, 800)
                                            }
                                        }}>Show</button>
                                    </section>
                                </section>
                                
                            </div>

                            {/* <div className="seller-input-cnt">
                                <section style={{width: '100%'}}>
                                    <label htmlFor="">Confirm Password</label>
                                    <input name='confirm-password' onInput={e => setCPwd(e.target.value)}  placeholder='Confirm Password...' type="password" />
                                </section>
                                
                            </div> */}

                            <div className="seller-input-cnt">
                                <section style={{width: '100%'}}>
                                    <label htmlFor="">State </label>
                                    <select onInput={e => setState(e.target.value)}  name="state" id="">
                                        <option value="">Select State</option>
                                        {
                                            data.map((item,index) => {
                                                return(
                                                    <option key={index} value={item.label}>{item.label}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </section>
                                
                            </div>

                            <div className="seller-input-cnt">
                                <section style={{width: '100%'}}>
                                    <label htmlFor="">Campus </label>
                                    <select onInput={e => setCampus(e.target.value)}  name="campus" id="">
                                        <option value="">Select Campus</option>
                                        {
                                            campusLocaleList.map((item,index) => {
                                                return(
                                                    <option key={index} value={item.text}>{item.text}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </section>
                                
                            </div>



                            

                            
                            
                        </form>
                    
                        <div className='btn-cnt'>
                            <button style={{background: '#ff4500', color: '#fff'}} onClick={e => {e.preventDefault(); Registration(e)}}>Register</button>
                            <br />
                            <small onClick={e => window.location.href='/login'} style={{cursor: 'pointer', color: '#ff4500'}}>Already Have An Account, Signin Here</small>
                        </div>

                    </div>

                </section>

            </div>
        </>
     );
}
 
export default Signup;
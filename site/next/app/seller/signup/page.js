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


const Signup = () => {
    let [screenWidth, setScreenWidth] = useState(0) 
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    },[])


    let [fname, setFname] = useState('')
    let [lname, setLname] = useState('')
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState('')
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
        overlay.setAttribute('id', 'overlay');

        Validation();
        Object.values(book.current).filter(item => item !== true).length > 0 ? validation.current = false : validation.current = true;

        if(validation.current){
            setBtn(
                <div className="Authloader" style={{background: '#fff',border: '1px solid orangered'}}></div>
            )
            e.target.disabled = true;
            fetch('http://localhost:2222/seller.registration', {
                method: 'post',
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({fname,lname,email,phone,pwd,state,campus})
            })
            .then(async(result) => {
                let response = await result.json();
                if(response.bool){
                    console.log(response)

                    dispatch(setSellerTo(response.cookie))
                    window.location.href=('/seller/shop')
                }else{
                    console.log(response)
                    overlay.removeAttribute('id');
                    if(response.data === 'duplicate email'){
                        addErrMssg([{mssg:'Email already exist, please try something else'}], document.querySelector('.email').parentElement)
                    }else if(response.data === 'duplicate phone'){
                        addErrMssg([{mssg:'Phone Number already exist, please try something else'}], document.querySelector('.phone').parentElement)
                    }
                    setBtn("Signup")
                    e.target.disabled = false;
                }
            })
            .catch((err) => {
                setBtn("Signup")
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
            }else if(item.type === 'number'){
                if(item.name === 'phone'){
                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty.'}
                    let length = item.value.length >= 11 ? {bool: true, mssg: ''} :  {bool: false, mssg: 'Invalid Phone Number'}
                    let errs = [empty,length];
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)

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
                <h6 style={{background: 'orangered', color: '#fff', padding: '10px', marginBottom: '-2px', marginTop: '0', height: 'auto', width: screenWidth > 480 ? 'auto' : '100%', textAlign: 'center'}}>Vendor Center</h6>

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


                            <div className="seller-input-cnt">
                                <section style={{width: '100%'}}>
                                    <label htmlFor="">Email</label>
                                    <input style={{background: '#efefef'}} name='email' onInput={e => {setEmail(e.target.value)}} className='email'  placeholder='Email...' type="text" />
                                </section> 
                            </div>

                            <div className="seller-input-cnt">
                                <section style={{width: '100%', float: 'left'}}>
                                    <label htmlFor="">Phone</label>
                                    <input style={{background: '#efefef'}} name='phone'
                                    className='phone' onInput={e => setPhone(e.target.value)}  placeholder='Phone Number...' type="number" />

                                    
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
                            <small style={{cursor: 'pointer', color: '#ff4500'}}>Already Have An Account, Signin Here</small>
                        </div>

                    </div>

                </section>

            </div>
        </>
     );
}
 
export default Signup;
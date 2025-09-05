import { useEffect, useRef, useState } from 'react';
import '../../styles/Buyer/signup.css'
import { 
    useLocation, 
    useNavigate 
} from 'next/link';
import { 
    data, 
    school_choices 
} from '../../location';
import { RegisterBuyer } from '../../api/buyer/post';

const BuyerSignup = () => {
    let navigate = useNavigate();
    let location = useLocation()

    let [fname, setFname] = useState('')
    let [lname, setLname] = useState('')
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState('')
    let [pwd, setPwd] = useState('')
    let [gender, setGender] = useState(null)

    let [state, setState] = useState('')
    let [campus, setCampus] = useState('')

    let [query, setquery] = useState('')
    const validation = useRef(false);

    const [value, setValue] = useState('Select State');
    const [campusLocale, setCampusLocale] = useState('Select Campus');
    const [campusLocaleList, setCampusLocaleList] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [CampusisFocus, setCampusIsFocus] = useState(false);
    let [btn, setBtn] = useState("Signup")

    // Use URLSearchParams to get the query parameters
    const params = new URLSearchParams(location.search);
    // Extract the 'page' and 'data' parameters
    const page = params.get('page');
    const data_ = params.get('data');

    

    let book = useRef({
        fname: false,
        lname: false,
        email: false,
        pwd: false,
        phn: false,
        campus: false,
        state: false,
        gender: false
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

    let Registration = async(e) => {
        
        // e.currentTarget.disabled = true;
        let overlay = document.querySelector('.overlay')
        
        Validation();
        Object.values(book.current).filter(item => item !== true).length > 0 ? validation.current = false : validation.current = true;
        
        if(validation.current){
            overlay.setAttribute('id', 'overlay');
            setBtn( 
                <div className="Authloader" style={{background: '#fff',border: '1px solid orangered'}}></div>
            )
            // e.currentTarget.disabled = true;
            try {
                let result = await RegisterBuyer(fname.trim(),lname.trim(),email,phone,pwd,state,campus,gender)
                // window.localStorage.setItem("CE_buyer_name_initial", result.name)
                if(result){
                    console.log(result)
                    window.localStorage.setItem("CE_user_id", result.id)
                    if(location.search){
                        navigate(`/${page}?product_id=${data_}`)
                    }else{
                        navigate('/')
                    }
                }

            } catch (err) {
                let overlay = document.querySelector('.overlay')
                overlay.removeAttribute('id');
                if(err.response.data === 'duplicate email'){
                    addErrMssg([{mssg:'Email already exist, please try something else'}], document.querySelector('.email').parentElement)
                }else if(err.response.data === 'duplicate phone'){
                    addErrMssg([{mssg:'Phone Number already exist, please try something else'}], document.querySelector('.phone').parentElement)
                }
                setBtn("Signup")
                // console.log(err)
                e.currentTarget.disabled = false;
            }
           
        }else{

            console.log(validation.current)

            setBtn("Signup")
            e.currentTarget.disabled = false;
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
            }else if(item.type === 'radio'){
                if(gender === null){
                    let errs = [{bool: false, mssg: 'Please Select Your Gender.'}];
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement.parentElement.parentElement)
                    let list =errs.filter(item => item.mssg !== '')
                    list.length > 0 ? book.current.gender = false : book.current.gender = true
                }else{
                    let errs = [{bool: true, mssg: ''}];
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement.parentElement.parentElement)
                    let list =errs.filter(item => item.mssg !== '')
                    list.length > 0 ? book.current.gender = false : book.current.gender = true
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

    useEffect(() => {
        if(location.search){
            let query = location.search.split('=')[1];
            setquery(query);
        }


    },[])
    return (  
        <>
            <div className="overlay">
                <div className="loader">
                </div>
            </div>
            <div className="seller-signup">
                
                <div id="left">

                </div>
                <div id="right">
                    <h6><b style={{color: 'orangered'}}><u>Signup Form For Buyer</u></b></h6>
                
                    <form action="">
                        <div className="seller-input-cnt">
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
                            <br />
                            <div>
                                <section style={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-end', cursor: 'pointer', width: '50%'}}>
                                    <label htmlFor="male">Male</label>&nbsp;&nbsp;
                                    <input id='male' style={{background: '#efefef', height: '25px', width: '25px'}} onInput={e => setGender(1)} placeholder='Male...' type="radio" name="gender"  />
                                </section>
                                <section style={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-end', cursor: 'pointer', width: '50%'}}>
                                    <label htmlFor="female">Female</label>&nbsp;&nbsp;
                                    <input id='female' style={{background: '#efefef', height: '25px', width: '25px'}} onInput={e => setGender(0)}  placeholder='Female' type="radio" name="gender"  />
                                </section>
                            </div>
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
                            <section style={{width: '100%'}}>
                                <label htmlFor="">Password</label>
                                <input style={{background: '#efefef'}} name='password' className='pwd' onInput={e => setPwd(e.target.value)}  placeholder='Password...' type="password" />
                            </section>
                            <section>
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
                                        data?.map((item,index) => {
                                            return(
                                                <option value={item.label}>{item.label}</option>
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
                                                <option value={item.text}>{item.text}</option>
                                            )
                                        })
                                    }
                                </select>
                            </section>
                            
                        </div>


                    
                        <div className="seller-input-cnt" style={{background: '#FF4500', color: '#fff'}} >
                            
                            <button  onClick={e => {e.preventDefault(); Registration(e)}}>{btn}</button>
                            
                        </div>

                        
                        
                    </form>

                    {/* <div>
                        <small style={{color: 'orangered'}}>Forgot Password? Recover Password Here</small>
                    </div> */}
                    <div style={{width: '100%', textAlign: 'center', color: 'orangered'}} onClick={e => {
                        location.search !== ''
                        ?
                        navigate(`/login?page=${page}&data=${data_}`)
                        :
                        navigate('/login')
                    }}>
                        <small style={{cursor: 'pointer'}}>Already Have An Account, Signin Here</small>
                    </div>

                    <br />
                </div>

            </div>
        
        </>
     );
}
 
export default BuyerSignup;
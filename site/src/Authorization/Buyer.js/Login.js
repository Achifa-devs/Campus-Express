import { 
    useRef,
    useState 
} from "react"
import { 
    useLocation,
    useNavigate, useRoutes 
} from "react-router-dom";
import '../../styles/Buyer/login.css'
import { 
    LogBuyerIn 
} from "../../api/buyer/post";



const BuyerLogin = ({query}) => {
    let navigate = useNavigate();
    let location = useLocation()
    let [btn, setBtn] = useState("Login")

    
    // Use URLSearchParams to get the query parameters
    const params = new URLSearchParams(location.search);
    // Extract the 'page' and 'data' parameters
    const page = params.get('page');
    const data = params.get('data');



    let [email, setEmail] = useState('')
    let [pwd, setPwd] = useState('')
    const validation = useRef(false);


    let Login = async(e) => {
        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
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

            let response = await LogBuyerIn(email,pwd)
            if(response.bool){
                window.localStorage.setItem("CE_buyer_id", response.id)
                // window.localStorage.setItem("CE_buyer_name_initial", result.name)
                location.search !== ''
                ?
                navigate(`/${page}?product_id=${data}`)
                :
                navigate('/')
            }else{
                let overlay = document.querySelector('.overlay')
                overlay.removeAttribute('id');

                let check = document.querySelector('.err-cnt').querySelector('.err-mssg');
                if(check){
                    document.querySelector('.err-cnt').querySelector('.err-mssg').remove()
                    let div = document.createElement('div');
                    div.className = 'err-mssg';
                    div.style.display = 'table'
                    div.style.margin = '0 auto'
                    div.innerHTML = 'Invalid Credentials'
                    document.querySelector('.err-cnt').append(div)
                    
                }else{
                    let div = document.createElement('div');
                    div.className = 'err-mssg';
                    div.style.display = 'table'
                    div.style.margin = '0 auto'
                    div.innerHTML = 'Invalid Credentials'
                    document.querySelector('.err-cnt').append(div)
                }
                e.target.disabled = false;
                setBtn("Login")
            }
            
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
            <div className="overlay">
                <div className="loader">
                </div>
            </div>
            <div className="seller-login-cnt" style={{background: 'orangered', bottom: '0', position: 'absolute', height: 'calc(100vh - 0px)'}}>

                <section className="shadow-sm" style={{background: '#fff', height: 'fit-content'}}>
                    
                    <div className="err-cnt">

                    </div>
                    <br />
                    <h6><b style={{background: 'orangered', color: '#fff', padding: '10px', borderRadius: '5px', marginBottom: '20px', height: '150px'}}>Login Form For Buyers</b></h6>

                    <br />
                    <form action="" >
                        


                    

                        <div style={{flexDirection: 'column', alignItems: 'flex-start'}} className="seller-input-cnt">
                            <label htmlFor="">Email</label>
                            <input style={{background: '#efefef'}} name="email" onInput={e => setEmail(e.target.value)}  placeholder='Email...' type="text" />
                            
                        </div>

                        <div style={{flexDirection: 'column', alignItems: 'flex-start'}} className="seller-input-cnt">
                            <label htmlFor="">Password</label>
                            <input style={{background: '#efefef'}} onInput={e => setPwd(e.target.value)}  placeholder='Password...' type="password" />
                            
                        </div>

                        

                        
                    
                        <div className="seller-input-cnt">
                            
                            <button style={{background: '#ff4500',color: '#fff'}} onClick={e => {Login(e)}}>
                                {
                                    btn
                                }
                            </button>
                            
                        </div>
                    </form>

                    <div style={{textAlign: 'center'}} onClick={e => navigate('/password-reset')}>
                        <small style={{cursor: 'pointer', color: 'orangered', fontWeight: '500'}}>Recover Forgotten Password Here</small>
                    </div>
                    <div style={{textAlign: 'center'}} onClick={e => {
                        location.search !== ''
                        ?
                        navigate(`/signup?page=${page}&data=${data}`)
                        :
                        navigate('/signup')
                    }}>
                        <small style={{cursor: 'pointer', color: 'orangered', fontWeight: '500'}}>Don't Have An Account, Signup Here</small>
                    </div>
                </section>

            </div>
        </>
     );
}
 
export default BuyerLogin;
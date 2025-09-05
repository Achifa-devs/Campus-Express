import { useEffect, useState } from 'react';
import '../styles/settings.css';
import { Link, useLocation, useNavigate } from 'next/link';
import { ValidateToken } from '../api/seller/get';
import brokenLinkSvg from '../assets/link-broken-svgrepo-com.svg'
import { UpdatePwd } from '../api/seller/update';

const PasswordReset = () => {
    let [pwd, setPwd] = useState('')
    let [CPwd, setCPwd] = useState('')
    let [isTokenVerified, setIsTokenVerified] = useState(false)
    let navigate = useNavigate();
    let location = useLocation()

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search.split('?')[1]);

        const token = urlParams.get('token').replace(/'/g, '');
        const email = urlParams.get('email').replace(/'/g, '');
        ValidateToken(token,email)
        .then((response) => {
            if(response){ 
                setIsTokenVerified(true)
            }else{
                setIsTokenVerified(false)
            }
        })
        .catch((err) => console.log(err))
        
    }, [location]) 

    function validate(params) {
        let inputs = [...document.querySelectorAll('input')];
        [...document.querySelectorAll('.err-mssg')].map(item => item.remove())
        let result = inputs.map((item,index) => 
            (item.value.length < 8 && index === 0)
            ?
                ({err: 'Password Must Contain At Least 8 Characters', bool: false, src:'pwd'})
            :
            (item.value !== pwd && index === 1)
            ?
                ({err: 'Password Mismatch!', bool: false, src:'cPwd'})
            :
            (item.value.length === 0 && index === 1)
            ?
                ({err: 'Password Must Contain At Least 8 Characters', bool: false, src:'cPwd'})

            :
            (item.value.length >= 8 && index === 0)
            ?
                ({err: '', bool: true, src:'pwd'})
            :
            (item.value === pwd && index === 1)
            ?
                ({err: '', bool: true, src:'cPwd'})
            :
            ''

        )
        inputs.map((item,index) => {
            if(index === 0){
                let err_comp = document.createElement('div')
                err_comp.className='err-mssg'
                err_comp.innerHTML=result.filter(item => item?.src === 'pwd')[0]?.err;
                item.parentElement.append(err_comp)
                
            }else{
                let err_comp = document.createElement('div')
                err_comp.className='err-mssg'
                err_comp.innerHTML=result.filter(item => item?.src === 'cPwd')[0]?.err;
                item.parentElement.append(err_comp)
            }
        })
        let response = result.filter(item => item.bool === true)
        if(response.length > 1 ){
            ResetPwd(pwd)
        }
    }

    
    function ResetPwd() {
        const urlParams = new URLSearchParams(location.search.split('?')[1]);
        const email = urlParams.get('email').replace(/'/g, '');
        UpdatePwd(email,pwd)
        .then((result) => {
            navigate('/seller.login')
        })
        .catch((err) => console.log(err))
    }

    return ( 
        <>

            <div className="password-reset shadow-sm" style={{background: 'orangered', bottom: '0', display: 'flex', flexDirection: 'column', position: 'absolute', height: 'calc(100vh - 60px)', width: '100%'}}>
                {
                    isTokenVerified
                    ?
                    <>
                        <form className='shadow-sm' action="" style={{width: '350px', padding: '20px', height: 'auto'}}>
                            <br />
                            <h6><b style={{background: 'orangered', color: '#fff', padding: '10px', borderRadius: '5px', marginBottom: '20px', height: '150px'}}>Password Recovery Form</b></h6>
                        
                            <br />

                            <div style={{padding: '10px'}}>
                                <br />
                                <div className="input-cnt">
                                    <label htmlFor="" style={{fontWeight: '400', color: '#000', fontSize: 'medium'}}>Enter New Password</label>
                                    <input onInput={e => setPwd(e.target.value)} type="password" className='password' style={{background: '#efefef'}} placeholder="Enter New Password Here..."/>
                                </div>

                                <div className="input-cnt">
                                    <label htmlFor="" style={{fontWeight: '400', color: '#000', fontSize: 'medium'}}>Confirm New Password</label>
                                    <input onInput={e => setCPwd(e.target.value)} type="password" className='password' style={{background: '#efefef'}} placeholder="Confirm New Password Here..."/>
                                </div>

                                <button style={{marginBottom: '10px'}} onClick={e =>{e.preventDefault(); validate()}}>Reset Password</button>
                                <br />

                            </div>
    
                        </form>
                    </>

                    :

                    <>
                        <img src={brokenLinkSvg}  style={{height: '120px', width: '120px', borderRadius: '50%'}} alt="" />
                        <br />
                        <h1 style={{color: '#fff', fontSize: '3vh'}}>This Link Is Either Incorrect Or Expired</h1>
                        <br />
                        <Link to='/seller.password-recovery' style={{color: 'orange'}}>Click here to resend link</Link>

                    </>
                
                     
                }
                
            </div>
        </>
     );
}
 
export default PasswordReset;
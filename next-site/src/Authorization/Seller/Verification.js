import { useEffect, useState } from 'react';
import vSvg from '../../assets/verification-svgrepo-com.svg'
import sSvg from '../../assets/status-notfound-svgrepo-com.svg'
import { SendEmail, ValidateEmail } from '../../api/seller';
import { useLocation } from 'react-router-dom';


const Verification = () => {

    let [linkState, setLinkstate] = useState(false)
    let [text, settext] = useState(false)

    let location = useLocation()
    function sendEmail() {
        SendEmail(location.search.split("=")[1],window.localStorage.getItem('CE_seller_id'))
        .then((result) => {

            document.querySelector('.section').innerHTML = 'A Verification Link Has Been Sent To Your Email'
        })
        .catch((err) => {
            console.log(err)
        }) 
    }

    useEffect(() => {

        let overlay = document.querySelector('.overlay')
        //overlay.setAttribute('id', 'overlay');

        ValidateEmail(location.pathname.split('/').splice(-1)[0]) 
        .then((result) => {
            if(result.data){
                setLinkstate(true)
                settext(true)
                overlay.removeAttribute('id')
            }else{
                setLinkstate(false)
                settext(true)
                overlay.removeAttribute('id')
            }
        })
        .catch((err) => {
            console.log(err)
        })

    },[])

    return ( 
        <>

            <div className="overlay">
                <div className="loader">
                </div>
            </div>

            <div style={{
                height: '100vh',
                width: '100vw',
                background: '#f9f9f9',
                display: text ? 'flex': 'none',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: 'orangered'
            }}>

                {
                    linkState
                    ?


                    <>
                        <div style={{
                            width: '100%',
                            background: '#f9f9f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'orangered'
                        }}>
                            <img src={vSvg} style={{height: '120px', width: '120px', marginBottom: '5px'}} alt="" />
                        </div>

                        <br />
                        <h5>Your Email Have Been Verified!</h5>
                    </>

                    :

                    <>

                            <div style={{
                                width: '100%',
                                background: '#f9f9f9',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'orangered'
                            }}>
                                <img src={sSvg} style={{height: '120px', width: '120px', marginBottom: '5px'}} alt="" />
                            </div>

                            <br />
                            <h5 className='section'>The link you followed is invalid <div style={{cursor: 'pointer'}} onClick={e => sendEmail(e)}>Click here to get a new link</div></h5>


                    </>
                }

            </div>
        </>
     );
}
 
export default Verification;
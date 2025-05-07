import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import vendorCy from '@/files/assets/vendor-center-typo.svg'
import vendorSymbol from '@/files/assets/vendor-center-symbol.svg'
import { useSelector } from "react-redux";
import { open_notice } from "@/files/reusable.js/notice";
 
const Header = () => {
    let [screenWidth, setScreenWidth] = useState(0) 
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    },[])
    let {
        user_id
    }=useSelector(s=>s.user_id);
    let [profile, setProfile] = useState('')

    useEffect(() => {
        if(user_id !== 'null' && user_id !== null && user_id !== ''){

            fetch(`/api/profile/seller`, {
                method: 'post',
                body: JSON.stringify({user_id})
            })
            .then(async(result) => {
                let response = await result.json(); 
                if (response?.bool) {
                    setProfile(response?.user)
                } else {
                    window.location.reload()
                    open_notice(true, 'Error occured please refresh now.')
                }
            })
            .catch((error) => {
                console.log(error)
                window.location.reload()

                open_notice(true, 'Error occured please refresh now.')

            }) 

        }
    }, [user_id])

    let pathname = usePathname()
    return ( 
        <>
            <div className="seller-header shadow-sm" style={{
                width: pathname.split('/').splice(-1)[0] === 'signup' || pathname.split('/').splice(-1)[0] === 'login' || pathname.split('/').splice(-1)[0] === 'reset-password' ? '100vw' : '',
                color: '#fff',
                height: '50px',
                textAlign: 'center',
                alignItems: 'center',
                display: 'flex',
                padding: '0',
                position: 'relative',
                backgroundColor: '#fff',
                fontWeight: '500',
                background: '#fff',
                zIndex: '1000',
                backgroundImage: 'url(../../../images/download (5).jpeg)',
                backgroundClip: 'content-box',
                backgroundSize: 'contain'
            }}>

                <div className='seller-aside-logo' style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <img src={vendorSymbol.src} style={{height: '50px', width: '50px', color: '#fff', fontSize: 'medium', display: 'flex'}} alt="" />
                    &nbsp;
                    &nbsp;
                    <img src={vendorCy.src} style={{height: '120px', width: '120px', color: '#fff', fontSize: 'medium', display: 'flex'}} alt="" />
                </div> 


                {
                    pathname.split('/').splice(-1)[0] !== 'profile'
                    ?
                        screenWidth <= 760 
                        ?
                        <div onClick={e => window.location.href=('/vendor/profile')} style={{width: '50px', fontSize: 'x-small', color: '#000', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0px', flexDirection: 'column'}}>
                            <span style={{height: '30px', width: '30px', color: '#fff', fontSize: 'medium', display: 'flex', borderRadius: '50%', background: '#FF4500', padding: '8px', alignItems: 'center', justifyContent: 'center', fontSize: 'x-small', fontWeight: '500'}}>
                            {
                                profile?.fname?.split('')[0]
                            }.
                            {
                                profile?.lname?.split('')[0]
                            }
                            </span>
                        </div>
                        :
                        ''
                    :
                    ''
                }
            </div>

            
        </> 
     );
}
export default Header;                                                                                                       
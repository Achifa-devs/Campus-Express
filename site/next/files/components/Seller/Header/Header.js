import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import vendorCy from '@/files/assets/vendor-center-typo.svg'
import vendorSymbol from '@/files/assets/vendor-center-symbol.svg'
 
const Header = () => {
    let [screenWidth, setScreenWidth] = useState(0) 
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    },[])

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
                        <div onClick={e => window.location.href=('/seller/profile')} style={{width: '50px', fontSize: 'x-small', color: '#000', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0px', flexDirection: 'column'}}>
                            <span style={{height: '30px', width: '30px', color: '#fff', fontSize: 'medium', display: 'flex', borderRadius: '50%', background: '#FF4500', padding: '8px', alignItems: 'center', justifyContent: 'center', fontSize: 'x-small', fontWeight: '500'}}>
                            A.C
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
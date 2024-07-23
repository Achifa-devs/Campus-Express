import { useState } from 'react';
import '../../../styles/floating.css'
import { useNavigate } from 'react-router-dom';
import orderSvg from '../../../assets/order-svgrepo-com (1).svg'
import cartSvg from '../../../assets/cart-shopping-fast-svgrepo-com (1).svg'
import settingsSvg from '../../../assets/settings-svgrepo-com (3).svg'
import adsSvg from '../../../assets/ad-svgrepo-com.svg'
import savedSvg from '../../../assets/bookmark-outlined-saved-svgrepo-com.svg'
import subSvg from '../../../assets/subscriptions-svgrepo-com.svg'
import walletSvg from '../../../assets/wallet-2-svgrepo-com.svg'
import sellSvg from '../../../assets/sell-svgrepo-com (1).svg'
import logoutSvg from '../../../assets/logout-2-svgrepo-com.svg'

const FloatingMenu = ({list,right,top,visible,getSelectedOption,setDisplay}) => {
    let navigate = useNavigate()

    return ( 
        <>
            <div className="floating-cnt shadow-sm" style={{left: `${right - 140}px`, top: `${top + 50}px`, display: visible}}>
                <ul>
                    {
                        list.map((item) =>  
                        
                        <li onClick={e => {getSelectedOption(item?.toLowerCase()); setDisplay('none')}}>
                                <span>

                                </span>
                                <span>
                                    {item}
                                </span>
                            </li>
                        )
                    }
                </ul>
            </div>
        </>
     );
}
 
export default FloatingMenu;
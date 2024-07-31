import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const OrderSummary = ({}) => {

    let pathname = usePathname()

    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)},[]);
    
    let list = [
        {name: 'Orders', svg: ''},
        {name: 'Inbox', svg: ''},
        {name: 'Saved Items', svg: ''},
        {name: 'Followed Sellers', svg: ''},
        {name: 'Recently Viewed', svg: ''},
        {name: 'Voucher', svg: ''}
    ]

    let acct = [
        {name: 'Account Management', svg: ''},
        {name: 'Address Book', svg: ''},
        {name: 'NewsLetter Preference', svg: ''}
    ]
    return ( 

        <>
            <div className="order-confirmation">
                <div className="order-confirmation-cnt">
                    <ul>
                        {
                            list.map(item => 
                                <li style={{ 
                                    height: '50px', 
                                    width: '100%', 
                                    fontWeight: '400', 
                                    display: 'flex', 
                                    alignItems: 'center'}}>
                                    <span></span>
                                    <span>{item.name}</span>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="order-confirmation-cnt">
                    <ul>
                        {
                            acct.map(item => 
                                <li style={{ 
                                    height: '50px', 
                                    width: '100%', 
                                    fontWeight: '400', 
                                    display: 'flex', 
                                    alignItems: 'center'}}>
                                    <span></span>
                                    <span>{item.name}</span>
                                </li>
                            )
                        }
                    </ul>
                    
                </div>
                <div className="order-confirmation-cnt">
                    <button>
                        Logout
                    </button>
                </div>
                
            </div>

        </>
     );
}
 
export default OrderSummary;
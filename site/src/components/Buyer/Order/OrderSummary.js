import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const OrderSummary = ({Total, Method, type, price, buyer}) => {

    // let meta = {
    //     immediate_purchase: window.location.pathname.split('/').length > 4 ? true : false,
    //     ce_id: buyer.buyer_id,
    //     cart: {unit: parseInt(window.location.pathname.split('/')[4].split('-')[1]), product_id: atob(window.location.pathname.split('/')[2])},
    // }
    let location = useLocation();

    let [immediate_check, set_immediate_check] = useState('')

    useEffect(() => {set_immediate_check(location.pathname)}, [location])

    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)},[]);
    function handleDeposit() {let overlay = document.querySelector('.overlay');overlay.setAttribute('id', 'overlay')};
    
    
    return ( 

        <>
            <div className="overlay" style={{padding: '20px'}} onClick={e => e.target === document.querySelector('.overlay') ? e.currentTarget.removeAttribute('id'): ''}>
                {
                    Method
                }
            </div>

            <div className="buyer-checkout-cnt" style={{display: screenWidth > 759 ? 'flex' :'none', width: '400px', margin: '20px'}}>

                <div style={{borderBottom: "none"}}>
                    <span>Order Summary</span>
                </div>

                <div>
                    <small style={{float: "left"}}>Sub total</small>
                    <small style={{float: "right"}}>
                        <small>₦</small>{Total}</small>
                </div> 

                <div style={{fontSize: "small"}}>
                    <small style={{float: "left"}}>Charges</small>
                    <small style={{float: "right"}}>
                        <small>Free</small>
                    </small>
                </div>

                <div style={{height: "80px"}}>
                    <button className="shadow-sm" >
                        <span>Order SubTotal&nbsp; </span>
                        <span><small>(₦</small>{Total})</span>
                    </button>
                </div>
                
            </div>

                {
                    screenWidth > 759
                ?

                    ''
                :
                    <button className="shadow-sm" >
                        <span>Order SubTotal&nbsp; </span>
                        <span><small>(&#8358; </small>{new Intl.NumberFormat('en-us').format(Total)})</span>
                    </button>
                

                }
        </>
     );
}
 
export default OrderSummary;
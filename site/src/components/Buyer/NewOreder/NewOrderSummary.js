import React from 'react'
import { useEffect, useState } from "react";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateOrder } from '../../../api/buyer/post';
import { useSelector } from 'react-redux';
import { openNotice } from '../../../Functions/notice';
export default function NewOrderSummary({item,buyer}) {
    let location = useLocation();
    let navigate = useNavigate();
    let {pickup_channel} = useSelector(s=>s.pickup_channel)
    let {buyerData}=useSelector(s=>s.buyerData)

    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)},[]);

    async function handleNewOrder(params) {
       


        let check_1 = pickup_channel.filter(item => item.channel === 'Door Step Delivery')
        let check_2 = pickup_channel.filter(item => item.channel === 'Custom Location Pickup')

        if(check_1.length > 0 && check_2.length > 0){
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            let response = await CreateOrder(buyerData?.buyer_id,item.product_id,item.price,pickup_channel)
            if(response){
                overlay.removeAttribute('id')
                navigate(`/checkout/${item.product_id}`, {replace: true})
            }else{
                overlay.removeAttribute('id')
                openNotice('Error Occured, Please Try Again')
            }
        }else{ 
            
            openNotice(
                check_1.length < 1 
                ?
                'Door Step Delivery Is Not Set!' 
                : 
                check_2.length < 1
                ? 
                'Custom Location Pickup Is Not Set!'
                :
                ''
            )
        }
    }
    
    return ( 

        <>  
            <div className="notice-cnt">
                <div className="notice-cnt-btn">
                    x
                </div>
            </div>
            <div className="overlay" style={{padding: '20px'}}>
                <div className="loader"></div>
            </div>

            <div className="buyer-checkout-cnt" style={{display: screenWidth > 759 ? 'flex' :'none'}}>

                <div style={{borderBottom: "none"}}>
                    <span>Order Summary</span>
                </div>

                <div>
                    <small style={{float: "left"}}>Sub total</small>
                    <small style={{float: "right"}}>
                        <small>₦</small>{
                    new Intl.NumberFormat('en-us').format(item?.price)}</small>
                </div> 

                <div style={{fontSize: "small"}}>
                    <small style={{float: "left"}}>Charges</small>
                    <small style={{float: "right"}}>
                        <small>Free</small>
                    </small>
                </div>

                <div style={{height: "80px"}}>
                    <button className="shadow-sm" onClick={handleNewOrder}>
                        <span>Create New Order&nbsp; </span>
                        {/* <span><small>(₦</small>{price})</span> */}
                    </button>
                </div>
                
            </div>

                {
                    screenWidth > 759
                ?

                    ''
                :
                    <div style={{
                        height: 'auto',
                        width: '100%',
                        padding: '10px',
                        position: 'absolute',
                        bottom: '0', 
                        background: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <button style={{position: 'relative', background: '#FF4500'}}  className="shadow-sm" onClick={handleNewOrder}>
                            <span>Create New Order&nbsp; </span>
                            {/* <span><small>(&#8358; </small>{new Intl.NumberFormat('en-us').format(price)})</span> */}
                        </button>
                    </div>

                }
        </>
     );
}
 

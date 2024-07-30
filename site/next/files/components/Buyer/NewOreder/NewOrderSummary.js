import React from 'react'
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { openNotice } from '@/files/reusable.js/notice';

export default function NewOrderSummary({item,buyer}) {
    let {pickup_channel} = useSelector(s=>s.pickup_channel)
    let {buyerData}=useSelector(s=>s.buyerData)

    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)},[]);

    async function handleNewOrder() {

        let check_1 = pickup_channel.filter(item => item.channel === 'Door Step Delivery')
        let check_2 = pickup_channel.filter(item => item.channel === 'Custom Location Pickup')

        if(check_1.length > 0 && check_2.length > 0){
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            let response = await CreateOrder(buyerData?.buyer_id,item.product_id,item.price,pickup_channel)
            if(response){
                overlay.removeAttribute('id')
                window.location.href=(`/checkout/${item.product_id}`, {replace: true})
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

            <div className="new-order-confirmation" style={{display: screenWidth > 759 ? 'flex' :'none'}}>

                <div className="new-order-confirmation-cnt">
                    <div style={{borderBottom: "none", fontWeight: '500'}}>
                        <span>Order Summary</span>
                    </div>
                    <hr style={{background: '#efefef'}} />
                    <div>
                        <small style={{float: "left", fontWeight: '500'}}>Sub total</small>
                        <small style={{float: "right", fontSize: '3.5vh', fontWeight: '500'}}>
                            <small>₦</small>{
                        new Intl.NumberFormat('en-us').format(item?.price)}</small>
                    </div> 

                    <div style={{fontSize: "small"}}>
                        <small style={{float: "left"}}>Charges</small>
                        <small style={{float: "right"}}>
                            <small>Free</small>
                        </small>
                    </div>

                    <br />

                    <div onClick={e => window.location.href=`/checkout/${item.product_id}`} style={{height: "80px", width: '100%'}}>
                        <button style={{width: '100%', height: '50px'}} className="shadow-sm" onClick={handleNewOrder}>
                            <span>Create New Order&nbsp; </span>
                            {/* <span><small>(₦</small>{price})</span> */}
                        </button>
                    </div>
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
                        <button style={{position: 'relative', background: '#FF4500', color: '#fff'}}  className="shadow-sm" onClick={handleNewOrder}>
                            <span>Create New Order&nbsp; </span>
                            {/* <span><small>(&#8358; </small>{new Intl.NumberFormat('en-us').format(price)})</span> */}
                        </button>
                    </div>

                }
        </>
     );
}
 

"use client"
import React from 'react'
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { open_notice } from '@/files/reusable.js/notice';
import { useParams } from 'next/navigation';
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup';
export default function NewOrderSummary({item,stock,deliveryOpt,refund_id}) {

    let {pickup_channel} = useSelector(s=>s.pickup_channel)
    let {user_id}=useSelector(s=>s.user_id);
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)},[]);

    let [screenWidth, setScreenWidth] = useState(0);
    
    async function handleNewRefund() {
        // alert(stock)

        let check_1 = pickup_channel.filter(item => item.channel === 'Door Step Return')
        let check_2 = pickup_channel.filter(item => item.channel === 'Custom Location Pickup')

        if(deliveryOpt !== -1){
            if (deliveryOpt === 0 && check_2.length > 0 || deliveryOpt === 1 && check_1.length > 0) {
                buyer_overlay_setup(true, 'Creating new refund...')
                fetch('https://cs-server-olive.vercel.app/create-refund', {
                    method: 'post',
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify({
                        buyer: user_id, product_id: item.product_id, price: parseInt(item.price)*parseInt(stock), stock: stock, locale: pickup_channel
                    })
                })
                .then(async(result)=> {
                    let response = await result.json()
                    if (response) {
                        window.location.replace(`/refunds`)
                        // window.location.href=(`/checkout/${item?.product_id}`, {replace: true})
                    }else{
                        open_notice(true, 'Error Occured, Please Try Again')
                    }
                })
                .catch((err) => {
                    open_notice(true, 'Error Occured, Please Try Again')
                })
                
            }else{ 
                if(deliveryOpt === 1){
                    open_notice(true, 'Door Step Delivery Is Not Set!...')

                }else if(deliveryOpt ===0){
                    open_notice(true, 'Custom Location Pickup Is Not Set!...')

                }
                
            }
        }else{
            open_notice(true, 'No delivery option have been selected...')
        }
    }

    async function handleRefundUpdate() {

        let check_1 = pickup_channel.filter(item => item.channel === 'Door Step Return')
        let check_2 = pickup_channel.filter(item => item.channel === 'Custom Location Pickup')

        if(deliveryOpt !== -1){
            if(deliveryOpt === 0 && check_2.length>0 || deliveryOpt === 1 && check_1.length>0){
                fetch('https://cs-server-olive.vercel.app/update-refund', {
                    method: 'post',
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify({
                        buyer: user_id, product_id: item.product_id, price: parseInt(item.price)*parseInt(stock), stock: stock, locale: pickup_channel, refund_id: refund_id
                    })
                })
                .then(async(result)=> {
                    let response = await result.json()
                    if(response){
                        window.location.href=(`/checkout/${item?.product_id}`)
                    }else{
                        open_notice(true, 'Error Occured, Please Try Again...')
                    }
                })
                .catch((err) => {
                    open_notice(true, `Error Occured, Please Try Again`)
                })
                
            }else{ 
                if(deliveryOpt === 1){
                    open_notice(true, 'Door Step Delivery Is Not Set!...')

                }else if(deliveryOpt ===0){
                    open_notice(true, 'Custom Location Pickup Is Not Set!...')

                }
                
            }
        }else{
            open_notice(true, 'No delivery option have been selected...')
        }
    }

    
    
    return ( 

        <>  

            <div className="new-order-confirmation" style={{display: screenWidth > 759 ? 'flex' :'none'}}>

                <div className="new-order-confirmation-cnt">
                    <div style={{borderBottom: "none", fontWeight: '500'}}>
                        <span>Refund Summary</span>
                    </div>
                    <hr style={{background: '#efefef'}} />
                    <div>
                        <small style={{float: "left", fontWeight: '500'}}>Sub total</small>
                        <small style={{float: "right", fontSize: '3.5vh', fontWeight: '500'}}>
                            <small>₦</small>{
                        new Intl.NumberFormat('en-us').format(parseInt(item?.price)*parseInt(stock))}</small>
                    </div> 

                    <div style={{fontSize: "small"}}>
                        <small style={{float: "left"}}>Charges</small>
                        <small style={{float: "right"}}>
                            <small>Free</small>
                        </small>
                    </div>

                    <br />

                    <div style={{height: "80px", width: '100%'}}>
                        <button style={{width: '100%', height: '50px'}} className="shadow-sm" onClick={refund_id !== '' && refund_id !== undefined && refund_id !== 'null' && refund_id !== 'undefined' && refund_id !== null ? handleRefundUpdate:handleNewRefund}>
                            <span>
                                {
                                    refund_id !== '' && refund_id !== undefined && refund_id !== 'null' && refund_id !== 'undefined' && refund_id !== null ? 'Update Refund' : 'Create New Refund'
                                }
                            &nbsp; </span>
                            {/* <span><small>(₦</small>{price})</span> */}
                        </button>
                    </div>
                </div> 
                
            </div>

                {
                    screenWidth > 760
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
                        <button style={{position: 'relative', background: '#FF4500', color: '#fff'}}  className="shadow-sm button" onClick={refund_id !== '' && refund_id !== undefined && refund_id !== 'null' && refund_id !== 'undefined' && refund_id !== null ? handleRefundUpdate:handleNewRefund}>
                            <span>
                                {
                                    refund_id !== '' && refund_id !== undefined && refund_id !== 'null' && refund_id !== 'undefined' && refund_id !== null ? 'Update Refund' : 'Create New Refund'
                                }
                            &nbsp; </span>
                            {/* <span><small>(&#8358; </small>{new Intl.NumberFormat('en-us').format(price)})</span> */}
                        </button>
                    </div>

                }
        </>
     );
}
 

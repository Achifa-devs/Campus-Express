"use client"
import React from 'react'
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { open_notice } from '@/files/reusable.js/notice';
import { useParams } from 'next/navigation';
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup';
export default function NewOrderSummary({item,stock,deliveryOpt,order_id}) {

    let {pickup_channel} = useSelector(s=>s.pickup_channel)
    let {buyer_id}=useSelector(s=>s.buyer_id);
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)},[]);

    let [screenWidth, setScreenWidth] = useState(0);
    
    async function handleNewOrder() {
        // alert(stock)

        let check_1 = pickup_channel.filter(item => item.channel === 'Door Step Delivery')
        let check_2 = pickup_channel.filter(item => item.channel === 'Custom Pickup Location')

        if (deliveryOpt !== -1) {
            if (deliveryOpt === 0 && check_2.length > 0 || deliveryOpt === 1 && check_1.length > 0) {
                buyer_overlay_setup(true, 'Creating new order...')
                fetch('https://ce-server.vercel.app/create-order', {
                    method: 'post',
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify({
                        buyer: buyer_id, product_id: item.product_id, price: parseInt(item.price)*parseInt(stock), stock: stock, locale: pickup_channel
                    })
                })
                .then(async(result)=> {
                    let response = await result.json()
                    if (response) {
                        window.location.replace(`/checkout/${item?.product_id}`)
                        // window.location.href=(`/checkout/${item?.product_id}`, {replace: true})
                    }else{
                        open_notice(true, 'Error Occured, Please Try Again')
                        buyer_overlay_setup(false, '')

                    }
                })
                .catch((err) => {
                    open_notice(true, 'Error Occured, Please Try Again')
                    buyer_overlay_setup(false, '')

                })
                
            }else{ 
                if(deliveryOpt === 1){
                    open_notice(true, 'Door Step Delivery Is Not Set!...')

                }else if(deliveryOpt ===0){
                    open_notice(true, 'Custom Pickup Location Is Not Set!...')

                }
                
            }
        }else{
            open_notice(true, 'No delivery option have been selected...')
        }
    }

    async function handleOrderUpdate() {

        let check_1 = pickup_channel.filter(item => item.channel === 'Door Step Delivery')
        let check_2 = pickup_channel.filter(item => item.channel === 'Custom Location Pickup')

        if(deliveryOpt !== -1){
            if(deliveryOpt === 0 && check_2.length>0 || deliveryOpt === 1 && check_1.length>0){
                fetch('https://ce-server.vercel.app/update-order', {
                    method: 'post',
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify({
                        buyer: buyer_id, product_id: item.product_id, price: parseInt(item.price)*parseInt(stock), stock: stock, locale: pickup_channel, order_id: order_id
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
                        <span>Order Summary</span>
                    </div>
                    <hr style={{background: '#efefef', margin: '15px 0px'}} />
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
                        <button style={{width: '100%', height: '50px', borderRadius: '5px'}} className="shadow-sm" onClick={order_id !== '' && order_id !== undefined && order_id !== 'null' && order_id !== 'undefined' && order_id !== null ? handleOrderUpdate:handleNewOrder}>
                            <span>
                                {
                                    order_id !== '' && order_id !== undefined && order_id !== 'null' && order_id !== 'undefined' && order_id !== null ? 'Update Order' : 'Create New Order'
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
                        <button style={{position: 'relative', background: '#FF4500', color: '#fff', borderRadius: '5px'}}  className="shadow-sm button" onClick={order_id !== '' && order_id !== undefined && order_id !== 'null' && order_id !== 'undefined' && order_id !== null ? handleOrderUpdate:handleNewOrder}>
                            <span>
                                {
                                    order_id !== '' && order_id !== undefined && order_id !== 'null' && order_id !== 'undefined' && order_id !== null ? 'Update Order' : 'Create New Order'
                                }
                            &nbsp; </span>
                            {/* <span><small>(&#8358; </small>{new Intl.NumberFormat('en-us').format(price)})</span> */}
                        </button>
                    </div>

                }
        </>
     );
}
 

"use client"
import React, { use } from 'react'
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { open_notice } from '@/files/reusable.js/notice';
import { useParams } from 'next/navigation';
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup';
import axios from 'axios';
export default function NewOrderSummary({item,stock,deliveryOpt,order_id}) {

    let {pickup_channel} = useSelector(s=>s.pickup_channel)
    let {user_id}=useSelector(s=>s.user_id);
    let {buyer_info}=useSelector(s=>s.buyer_info);
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)},[]);

    let [screenWidth, setScreenWidth] = useState(0);
    let [shipping_fee, set_shipping_fee] = useState(0);


    useEffect(() => {
        console.log("deliveryOpt changed: ", deliveryOpt);
        // if (!order_list) return;
        // console.log("order_list: ", order_list);
        // console.log(order_list?.product?.shipping_range);

        // const shippingRange = order_list?.product?.shipping_range
        //     ? JSON.parse(order_list.product.shipping_range)
        //     : null;
        
        // const orderRange = order_list?.order?.pick_up_channels?.map(item =>
        //     item?.locale?.split(",").slice(0, item.channel === "Custom Pickup Location" ? -2 : -4)
        // ) ?? [];

        // if (orderRange.length > 0) {
        //     let state = orderRange[0]?.shift()?.trim();
        //     let camp = orderRange[0]?.join(",")?.trim();
            
        //     if (order_list.product.campus === camp) {
        //         set_price(shippingRange?.in_campus?.price || 0);
        //     } else if (order_list.product.uni_state === state) {
        //         set_price(shippingRange?.in_state?.price || 0);
        //     } else {
        //         set_price(shippingRange?.out_state?.price || 0);
        //     }
        // }

        // {
        //     "in_campus": {
        //         "selected": true,
        //         "price": "500"
        //     },
        //     "in_state": {
        //         "selected": true,
        //         "price": "1500"
        //     },
        //     "out_state": {
        //         "selected": true,
        //         "price": "4000"
        //     }
        // }
        let shipping_range = item?.shipping_range ? JSON.parse(item.shipping_range) : null;
        console.log("shipping_range: ", shipping_range);
        let accepted_range_price = []
        if (shipping_range) {
            Object.entries(shipping_range).forEach(([key, value]) => {
                if (value !== null && value.selected) {
                    accepted_range_price.push({ range: key, price: parseInt(value.price) });
                }
            });
        }

        accepted_range_price.map(range_obj => {
            if (range_obj.range === 'in_campus') {
                if(item?.campus === buyer_info?.campus) {
                    set_shipping_fee(range_obj.price);
                }
            } else if (range_obj.range === 'in_state') {
                    if(item?.uni_state === buyer_info?.state) {
                    set_shipping_fee(range_obj.price);
                }
            } else if (range_obj.range === 'out_state') {
                if(item?.uni_state !== buyer_info?.state) {
                    set_shipping_fee(range_obj.price);
                }
            }
        });
        
    }, [item]);

  
    async function handleNewOrder() {
        // alert(stock)

        let check_1 = pickup_channel.filter(item => item.channel === 'Door Step Delivery')
        let check_2 = pickup_channel.filter(item => item.channel === 'Custom Pickup Location')

        if (deliveryOpt !== -1) {
            if (deliveryOpt === 0 && check_2.length > 0 || deliveryOpt === 1 && check_1.length > 0) {
                buyer_overlay_setup(true, 'Creating new order...')

                axios.post("/api/store/new-order", {
                    user_id: user_id,
                    product_id: item.product_id,
                    price: parseInt(item.price) * parseInt(stock),
                    stock: stock,
                    locale: pickup_channel,
                    vendor_id: item.user_id,
                    shipping_fee: shipping_fee
                })
                .then((result) => {
                    const response = result.data; // axios auto-parses JSON
                    console.log(response)

                    if (response.success) {
                        // buyer_overlay_setup(false, '');

                        // window.location.replace(`/store/checkout/${item?.product_id}`)
                        window.location.href = `/store/checkout/${item?.product_id}`;
                    } else {
                        open_notice(true, 'Error Occured, Please Try Again');
                        buyer_overlay_setup(false, '');
                    }
                })
                .catch((err) => {
                    open_notice(true, 'Error Occured, Please Try Again');
                    buyer_overlay_setup(false, '');
                    console.error(err);
                });

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
                fetch('/api/store/update-order', {
                    method: 'post',
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify({
                        buyer: user_id, product_id: item.product_id, price: parseInt(item.price)*parseInt(stock), stock: stock, locale: pickup_channel, order_id: order_id
                    })
                })
                .then(async(result)=> {
                    let response = await result.json()
                    if(response.success){
                        window.location.href=(`/store/checkout/${item?.product_id}`)
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
 

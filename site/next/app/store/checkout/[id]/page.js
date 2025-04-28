"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";

import CustomerAddress from '@/files/components/Buyer/Checkout/CustomerAddress';
import DeliveryData from '@/files/components/Buyer/Checkout/DeliveryData';
import PaymentMethod from '@/files/components/Buyer/Checkout/PaymentMethod';
import CheckoutSummary from '@/files/components/Buyer/Checkout/CheckoutSummary';
import { usePathname } from 'next/navigation';
import Flw from '@/files/components/Payments/Flw';
import '@/app/store/checkout/styles/xx-large.css'
import '@/app/store/checkout/styles/x-large.css'
import '@/app/store/checkout/styles/large.css'
import '@/app/store/checkout/styles/medium.css'
import '@/app/store/checkout/styles/small.css'
import OrderedItem from '@/files/components/Buyer/Checkout/OrderedItem';
import axios from 'axios';
import {
    buyer_overlay_setup
} from '@/files/reusable.js/overlay-setup';

const CheckOut = () => {
    let {
        buyer_id
    }=useSelector(s=>s.buyer_id);
    let pathname = usePathname()
    let [screenWidth, setScreenWidth] = useState(0);
    let [order_list, set_order_list] = useState('');
    let [payment, setPayMent] = useState(<Flw buyer={buyer_id} price={order_list?.product?.price} product_id={location.pathname.split('/').splice(-1)[0]}  />)

    useEffect(() => {setScreenWidth(window.innerWidth)},[]);

    useEffect(() => {
        if (buyer_id !== null && buyer_id !== 'null' && buyer_id !== undefined) {
            buyer_overlay_setup(true, 'Loading...')
            
            axios.get('/api/store/order', {params: {buyer_id: buyer_id, product_id: pathname.split('/').splice(-1)[0]}})
            .then(({data})=>{
                set_order_list(data?.data)
                buyer_overlay_setup(false, '')
                
            })
            .catch(error=>{
                console.log(error)
                buyer_overlay_setup(false, '')

            })
        }
      
    }, [buyer_id]) 

   
    // function set_up_payment_source(data) {if(data === 'wallet'){setPayMent(<CEStack price={Total} product_id={product_id}  />); set_type(data)}else{setPayMent(<PayStack buyer={buyer} price={Total} product_id={product_id} />); set_type(data)}}

   
    return ( 
        <> 
            <div className='checkout-card'>
                <div className="checkout-card-cnt" style={{background: '#f9f9f9', margin: '0', justifyContent: 'flex-start', height: 'auto'}}>
                    <OrderedItem item={order_list?.product} order={order_list?.order} />
                    {/* <br /> */}
                    <DeliveryData order_list={order_list}  />
                    {/* <br /> */}
                    <PaymentMethod />
                </div>


                <div className="checkout-card-aside" >
                    <CheckoutSummary order_list={order_list} Method={payment} type={'purchase'}/>
                </div>
                
            </div>

        </>
     );
}
 
export default CheckOut;


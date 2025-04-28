"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";

import CustomerAddress from '@/files/components/Buyer/OrderConfirmation/CustomerAddress';
import DeliveryData from '@/files/components/Buyer/OrderConfirmation/DeliveryData';
import PaymentMethod from '@/files/components/Buyer/OrderConfirmation/PaymentMethod';
import CheckoutSummary from '@/files/components/Buyer/OrderConfirmation/CheckoutSummary';
import { usePathname } from 'next/navigation';
import Flw from '@/files/components/Payments/Flw';
import '@/app/order-confirmation/styles/xx-large.css'
import '@/app/order-confirmation/styles/x-large.css'
import '@/app/order-confirmation/styles/large.css'
import '@/app/order-confirmation/styles/medium.css'
import '@/app/order-confirmation/styles/small.css'
import OrderedItem from '@/files/components/Buyer/OrderConfirmation/OrderedItem';
import axios from 'axios';

const OrderConfirmation = () => {
    let {
        buyer_id
    }=useSelector(s=>s.buyer_id);
    let pathname = usePathname()
    let [screenWidth, setScreenWidth] = useState(0);
    let [order_list, set_order_list] = useState('');
    let [payment, setPayMent] = useState(<Flw buyer={buyer_id} price={order_list?.product?.price} product_id={location.pathname.split('/').splice(-1)[0]}  />)

    useEffect(() => {setScreenWidth(window.innerWidth)},[]);

    useEffect(() => {
        if(buyer_id !== null && buyer_id !== 'null' && buyer_id !== undefined){
            axios.get('http://192.168.24.146:9090/order', {params: {buyer_id: buyer_id, product_id: pathname.split('/').splice(-1)[0]}})
            .then(({data})=>{
                set_order_list(data[0])
                // console.log(data)
            })
            .catch(error=>{
                console.log(error)
            })
        }
      
    }, [buyer_id]) 

   
    // function set_up_payment_source(data) {if(data === 'wallet'){setPayMent(<CEStack price={Total} product_id={product_id}  />); set_type(data)}else{setPayMent(<PayStack buyer={buyer} price={Total} product_id={product_id} />); set_type(data)}}

   
    return ( 
        <> 
            <div className='checkout-card'>
                <div className="checkout-card-cnt" style={{background: '#f9f9f9', justifyContent: 'flex-start', height: 'auto', margin: '0'}}>
                    <OrderedItem item={order_list?.product}/>
                    
                </div>


                <div className="checkout-card-aside" >
                    <CheckoutSummary order_list={order_list} Method={payment} type={'purchase'}/>
                </div>
                
            </div>

        </>
     );
}
 
export default OrderConfirmation;


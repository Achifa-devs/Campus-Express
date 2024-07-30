"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";

import CustomerAddress from '@/files/components/Buyer/Checkout/CustomerAddress';
import DeliveryData from '@/files/components/Buyer/Checkout/DeliveryData';
import PaymentMethod from '@/files/components/Buyer/Checkout/PaymentMethod';
import CheckoutSummary from '@/files/components/Buyer/Checkout/CheckoutSummary';
import { usePathname } from 'next/navigation';
import Flw from '@/files/components/Payments/Flw';
import '@/app/checkout/styles/xx-large.css'
import OrderedItem from '@/files/components/Buyer/Checkout/OrderedItem';

const CheckOut = ({item}) => {
    
    let {buyerData}=useSelector(s=>s.buyerData)
    let [screenWidth, setScreenWidth] = useState(0);
    let [order_list, set_order_list] = useState('');
    let [payment, setPayMent] = useState(<Flw buyer={buyerData} price={order_list?.product?.price} product_id={location.pathname.split('/').splice(-1)[0]}  />)

    useEffect(() => {setScreenWidth(window.innerWidth)},[]);
    // useEffect(() => {
    //     let overlay = document.querySelector('.overlay'); 
    //     overlay.setAttribute('id', 'overlay');

    //     GetOrder(buyerData?.buyer_id,pathname.split('/').splice(-1)[0])
    //     .then((result) => {
    //         // console.log(result)
    //         if(result){
    //             set_order_list(result[0]);
    //             overlay.removeAttribute('id');
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         overlay.removeAttribute('id');
    //     })
    // }, [buyerData]) 

   
    // function set_up_payment_source(data) {if(data === 'wallet'){setPayMent(<CEStack price={Total} product_id={product_id}  />); set_type(data)}else{setPayMent(<PayStack buyer={buyer} price={Total} product_id={product_id} />); set_type(data)}}

   
    return ( 
        <> 
            <div className='checkout-card'>
                <div className="checkout-card-cnt">
                    <OrderedItem item={item}/>
                    <br />
                    <DeliveryData order_list={order_list}  />
                    <PaymentMethod />
                </div>
                <div className="checkout-card-aside">
                    <CheckoutSummary order_list={order_list} Method={payment} type={'purchase'} price={order_list?.product?.price} buyerData={buyerData} />
                </div>
                
            </div>

        </>
     );
}
 
export default CheckOut;


"use client"

import React, 
{ 
    useEffect, 
    useState 
} from 'react'
import { 
    useSelector 
} from 'react-redux';
import OrderedItem from '@/files/components/Buyer/NewOreder/OrderedItem';
import BuyerAddress from '@/files/components/Buyer/NewOreder/BuyerAddress';
import DeliveryAddress from '@/files/components/Buyer/NewOreder/DeliveryAddress';
import NewOrderSummary from '@/files/components/Buyer/NewOreder/NewOrderSummary';

import { 
    usePathname 
} from 'next/navigation';
import Carousel from '@/files/components/Buyer/dashboard/Carousel';
import '@/app/store/new-order/styles/xx-large.css'
import '@/app/store/new-order/styles/x-large.css'
import '@/app/store/new-order/styles/large.css'
import '@/app/store/new-order/styles/medium.css'
import '@/app/store/new-order/styles/small.css'
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup';

export default function NewOrder() {
    let pathname = usePathname()
    let {
        user_id
    }=useSelector(s=>s.user_id);
    let [deliveryOpt, setdeliveryOpt] = useState(-1);
    let [stock, setstock] = useState(1);
    let [screenWidth, setScreenWidth] = useState(0);
    let [item, setItem] = useState('');
    let [order_id, set_order_id] = useState('');
    let [order, set_order] = useState('');

    useEffect(() => {
        let searchParams = new URLSearchParams(window.location.search);
        let order_id = searchParams.get('order_id');
        set_order_id(order_id);
    }, []);

    

    function updateDeliveryOpt(data) {
        setdeliveryOpt(data)
    }
    function updateStock(data) {
        setstock(data)
    }
    useEffect(() => {setScreenWidth(window.innerWidth)},[]);

    useEffect(() => {
        
        try {
            let overlay = document.querySelector('.overlay');
            overlay.setAttribute('id', 'overlay');

            fetch(`/api/store/products/details?slug=${pathname.split('/').splice(-1)[0]}`, {
                headers: {
                    'Gender': window.localStorage.getItem('cs-gender') 
                }
            })
            .then(async(res) => {
                overlay.removeAttribute('id')
                
                let response = await res.json();

                if (response.bool) {
                    console.log(response.data)
                    setItem(response?.data)
            } else {
                    // updateReq ? updateReq(false): ''
                }
            })
            .catch(err =>{
                
                console.log(err)
                // updateReq ? updateReq(false): ''

            });
            
        } catch (error) {
            console.log(error)
            
        }

    }, [])

    useEffect(() => {
        // let overlay = document.querySelector('.overlay');
        // overlay.setAttribute('id', 'overlay');

        if (user_id !== '' && user_id !== null && order_id !== null) {
            
            
            fetch(`/api/store/order?user_id=${user_id}&product_id=${pathname.split('/').splice(-1)[0]}`, {
                headers: {
                    'Gender': window.localStorage.getItem('cs-gender') 
                }
            })
            .then(async(res) => {
                let response = await res.json();
                // overlay.removeAttribute('id')
                if (response.bool) {
                    
                    set_order(response?.data?.data)
                    setstock(parseInt(response?.data[0]?.order?.stock))
            } else {
                    // updateReq ? updateReq(false): ''
                }
            })
            .catch(err =>{
                
                console.log(err)
                // updateReq ? updateReq(false): ''

            });
        }

    }, [user_id])

  return (
    <>
        <div className='new-order-card'>
            <div className="new-order-card-cnt">
                <OrderedItem item={item} updateStock={updateStock} />
                <BuyerAddress />
                {/* <br /> */}
                <DeliveryAddress item={item} order={order} updateDeliveryOpt={updateDeliveryOpt} />
                {/* <PaymentMethod /> */}
                <section style={{marginBottom: 10}}> 
                    <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#fff', borderBottom: '1px solid #f9f9f9'}}>
                        <div style={{float: 'left', color: '#5f5f5f', fontFamily: 'sans-serif',}}><b>You May Also Like This </b></div>
                    </div>
                    <div style={{display: 'flex'}}>
                        {
                            item
                            ?
                            <Carousel category={btoa(item?.category)} product_id={item?.product_id} />
                            :
                            ''
                        }
                    </div>
                </section>
            </div>

            <div className="new-order-card-aside">
                <NewOrderSummary order_id={order_id} deliveryOpt={deliveryOpt} stock={stock} item={item} />
            </div>

            
        </div>
       
    </>
  )
} 

"use client"

import React, 
{ 
    useEffect, 
    useState 
} from 'react'
import { 
    useSelector 
} from 'react-redux';
import OrderedItem from '@/files/components/Buyer/NewReturn/OrderedItem';
import BuyerAddress from '@/files/components/Buyer/NewReturn/BuyerAddress';
import DeliveryAddress from '@/files/components/Buyer/NewReturn/DeliveryAddress';
import NewOrderSummary from '@/files/components/Buyer/NewReturn/NewOrderSummary';
import { 
    GetItem 
} from '@/app/api/buyer/get';
import { 
    openNotice
} from '@/files/reusable.js/notice';
import { 
    usePathname 
} from 'next/navigation';
import Carousel from '@/files/components/Buyer/dashboard/Carousel';
import '@/app/new-order/styles/xx-large.css'
import '@/app/new-order/styles/x-large.css'
import '@/app/new-order/styles/large.css'
import '@/app/new-order/styles/medium.css'
import '@/app/new-order/styles/small.css'
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup';

export default function NewOrder() {
    let pathname = usePathname()
    let {
        buyer_id
    }=useSelector(s=>s.buyer_id);
    let [deliveryOpt, setdeliveryOpt] = useState(-1);
    let [stock, setstock] = useState(1);
    let [screenWidth, setScreenWidth] = useState(0);
    let [item, setItem] = useState('');
    let [order_id, set_order_id] = useState('');
    let [order, set_order] = useState('');

    let [refund_id, set_refund_id] = useState('');
    let [refund, set_refund] = useState('');

    // useEffect(() => {
    //     let searchParams = new URLSearchParams(window.location.search);
    //     let order_id = searchParams.get('order_id');
    //     // alert(order_id)
    //     set_order_id(order_id);
    // }, []);

    

    function updateDeliveryOpt(data) {
        setdeliveryOpt(data)
    }
    function updateStock(data) {
        setstock(data)
    }
    useEffect(() => {setScreenWidth(window.innerWidth)},[]);

    useEffect(() => {
        buyer_overlay_setup(true, 'Loading...')
        
        try {
            axios.get('https://ce-server.vercel.app/product', {params: {id: pathname.split('/').splice(-1)}})
            .then(({data})=>{
                setItem(data[0])
                buyer_overlay_setup(false, '')
                buyer_overlay_setup(false, '')
                
            })
            .catch(error=>{
                console.log(error)
                buyer_overlay_setup(false, '')
                buyer_overlay_setup(false, '')
                
            })
        } catch (error) {
            console.log(error)
            
        }

    }, [])

    useEffect(() => {

        if (buyer_id !== '' && buyer_id !== null && buyer_id !== 'null') {

            
            axios.get('https://ce-server.vercel.app/order', {params: {buyer_id: buyer_id, product_id: pathname.split('/').splice(-1)[0]}})
            .then(({data})=>{
                set_order(data)
                set_order_id(data[0]?.order?.order_id)
                setstock(parseInt(data[0]?.order?.stock))
                buyer_overlay_setup(false, '')

            })
            .catch(error=>{
                console.log(error)
                buyer_overlay_setup(false, '')

            })
        }
    }, [buyer_id])

    useEffect(() => {

        if (buyer_id !== '' && buyer_id !== null && buyer_id !== 'null') {

            
            axios.get('https://ce-server.vercel.app/refund', {params: {buyer_id: buyer_id, product_id: pathname.split('/').splice(-1)[0]}})
            .then(({data})=>{
                if (data.length > 0) {
                    set_refund(data)
                    set_refund_id(data[0]?.refund?.refund_id)
                    setstock(parseInt(data[0]?.refund?.stock))
                    buyer_overlay_setup(false, '')
                }

            })
            .catch(error=>{
                console.log(error)
                buyer_overlay_setup(false, '')
            })
        }
    }, [buyer_id])

  return (
    <>
        <div className='new-order-card'>
            <div className="new-order-card-cnt">
                <OrderedItem item={order[0]} updateStock={updateStock} />
                {/* <BuyerAddress /> */}
                <br />
                <DeliveryAddress item={item} refund={refund} updateDeliveryOpt={updateDeliveryOpt} />
                {/* <PaymentMethod /> */}
                <section style={{marginBottom: 10}}> 
                    <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#fff', borderBottom: '1px solid #f9f9f9'}}>
                        <div style={{float: 'left', color: '#5f5f5f', fontFamily: 'sans-serif',}}><b>You May Also Like This </b></div>
                    </div>
                    <div style={{display: 'flex'}}>
                        <Carousel category={'trends'}/>
                    </div>
                </section>
            </div>

            <div className="new-order-card-aside">
                <NewOrderSummary refund_id={refund_id} deliveryOpt={deliveryOpt} stock={stock} item={item} />
            </div>

            
        </div>
       
    </>
  )
} 

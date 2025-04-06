"use client"
import OrderItem from "@/files/components/Buyer/Order/OrderItem";
import { useEffect, useState } from "react";
import database from '@/database/seller_shop.json'
import '@/app/orders/styles/xx-large.css'
import '@/app/orders/styles/x-large.css'
import '@/app/orders/styles/large.css'
import '@/app/orders/styles/medium.css'
import '@/app/orders/styles/small.css'

import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { setAccessoryTo } from "@/redux/buyer_store/Aceessories";

const Order = () => {
    let [screenWidth, setScreenWidth] = useState(0);
    let dispatch = useDispatch()

    useEffect(() => {setScreenWidth(window.innerWidth)},[]);
    let [items, setItems] = useState([])
    let {
        buyer_id 
    } = useSelector(s => s.buyer_id);
   
    useEffect(() => {
        if(buyer_id !== '' && buyer_id !== null){
            axios.get('https://ce-server.vercel.app/orders', {params: {buyer_id: buyer_id.trim()}})
            .then(({data})=>{
                console.log(data)
                setItems(data)
            })
            .catch(error=>{
                console.log(error)
            })

        }

    },[buyer_id])


    return ( 
        <>
            <div className='order-card' style={{width: screenWidth > 1000 ? 'calc(100vw - 350px)' : screenWidth > 760 && screenWidth < 1000 ? 'calc(100vw - 280px)' : '100%', float: 'right'}}>
      
                <div className="order-card-cnt" style={{justifyContent: 'flex-start', overflow: 'none', width: '100%', alignItems: 'flex-start', height: '100%'}}>
                {/* <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span>Order List</span>
                    <button style={{display: screenWidth > 760 ? 'none' : 'flex'}} onClick={e=> dispatch(setAccessoryTo(0))}>Back</button>
                </h6> */}

                    <div style={{justifyContent: 'flex-start', width: '100%', overflow: 'auto', alignItems: 'flex-start', height: '100%'}}>
                        {
                            items.map((item,index) => <OrderItem key={index} order={item?.order} item={item?.product}/> )
                        }
                    </div>
                </div>

                
            </div>
        </>
     );
}
 
export default Order;
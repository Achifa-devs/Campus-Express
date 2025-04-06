"use client"
import React from 'react'
import '@/app/inbox/styles/xx-large.css'
import '@/app/inbox/styles/x-large.css'
import '@/app/inbox/styles/large.css'
import '@/app/inbox/styles/medium.css'
import '@/app/inbox/styles/small.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import InboxItem from "@/files/components/Buyer/Inbox/InboxItem";
import { setAccessoryTo } from "@/redux/buyer_store/Aceessories";

export default function Inbox() {
    let dispatch = useDispatch()

    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {setScreenWidth(window.innerWidth)},[]);
    let [items, setItems] = useState([])
    let {
        buyer_id 
    } = useSelector(s => s.buyer_id);
   
    useEffect(() => {
        if (buyer_id !== '' && buyer_id !== null && buyer_id !== 'undefined' && buyer_id !== undefined && buyer_id !== 'null') {
            axios.get('https://ce-server.vercel.app/inbox', {params: {id: buyer_id}})
                .then(({data}) => {
                console.log(data)
                setItems(data.data)
            })
            .catch(error=>{
                console.log(error)
            })
        }

    },[buyer_id])
  return (
    <>
        <div className='inbox-card' style={{width: screenWidth > 760 ? 'calc(100vw - 350px)' : '100%', float: 'right', padding: screenWidth > 480 ? '10px 40px' : '5px 5px'}}>
    
            <div className="inbox-card-cnt" style={{justifyContent: 'flex-start', overflow: 'none', width: '100%', alignItems: 'flex-start', height: '100%'}}>
            {/* <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <span>Inbox Messages</span>
                <button style={{display: screenWidth > 760 ? 'none' : 'flex'}} onClick={e=> dispatch(setAccessoryTo(0))}>Back</button>
            </h6> */}
                <div style={{justifyContent: 'flex-start', width: '100%', overflow: 'auto', alignItems: 'flex-start', height: '100%'}}>
                    {
                        items.map((data, index) => 
                            <div key={index}>
                                <InboxItem data={data} />
                            </div>
                        )
                    }
                </div>
            </div>

            
        </div>
    </>
  )
}

// items.map((item,index) => <InboxItem key={index} order={item?.order} item={item?.product}/> )
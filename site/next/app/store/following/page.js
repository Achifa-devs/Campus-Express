"use client"
import React from 'react'
import '@/app/store/following/styles/xx-large.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import FollowedItem from "@/files/components/Buyer/Following/FollowedItem";

export default function Following() {
    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {setScreenWidth(window.innerWidth)},[]);
    let [items, setItems] = useState([1,2,3])
    let {
        user_id 
    } = useSelector(s => s.user_id);
   
    useEffect(() => {
        axios.get('http://192.168.24.146:9090/following', {params: {id: user_id}})
        .then(({data})=>{
            setItems(data)
        })
        .catch(error=>{
            console.log(error)
        })

    },[])
  return (
    <>
        <div className='following-card' style={{width: screenWidth > 760 ? 'calc(100vw - 350px)' : '100%', float: 'right', padding: '10px 40px'}}>
    
            <div className="following-card-cnt" style={{justifyContent: 'flex-start', overflow: 'none', width: '100%', alignItems: 'flex-start', height: '100%'}}>
            <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center'}}>Followed Sellers</h6>
                <div style={{justifyContent: 'flex-start', width: '100%', overflow: 'auto', alignItems: 'flex-start', height: '100%'}}>
                    {
                        items.map((item,index) => <FollowedItem key={index} order={item?.order} item={item?.product}/> )
                    }
                </div>
            </div>

            
        </div>
    </>
  )
}

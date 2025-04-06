"use client"
import React, { useEffect, useState } from 'react'
import '@/app/address-book/styles/xx-large.css'
import AddressItem from '@/files/components/Buyer/AddressBook/AddressItem'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setAccessoryTo } from "@/redux/buyer_store/Aceessories";
import PickupChannel from '@/files/components/Buyer/Product/PickupChannel';
import { setPickupChannelTo } from '@/redux/buyer_store/pickup_channel';
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup';
import { buyerBtnAuthChecker } from '@/files/reusable.js/btnAuthChecker';

export default function AddressBook() {
    let [screenWidth, setScreenWidth] = useState(0);
    let dispatch = useDispatch()

    useEffect(() => {setScreenWidth(window.innerWidth)},[]);
    let [items, setItems] = useState([])
    let {
        buyer_id 
    } = useSelector(s => s.buyer_id);
    useEffect(() => {
        if (buyer_id !== '' && buyer_id !== 'null' && buyer_id !== undefined && buyer_id !== 'undefined' && buyer_id !== null) {
            axios.get('https://ce-server.vercel.app/addresses', {params: {id: buyer_id}})
            .then(({data})=>{
                setItems(data)
            })
            .catch(error=>{
                console.log(error)
            })
        }

    },[buyer_id]);



  return (
      <>
        <div className="pickup-overlay">
           
        </div>
        <div className='address-card' style={{width: screenWidth > 760 ? 'calc(100vw - 350px)' : '100%', float: 'right', padding: '10px 40px'}}>
        
            <div className="address-card-cnt" style={{justifyContent: 'flex-start', overflow: 'none', width: '100%', alignItems: 'flex-start', height: '100%'}}>
            <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <span style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span>Addresses ({items?.length})</span>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <span>
                        <button onClick={e=> {
                            addLocation('Custom Location Pickup')
                        }} style={{borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>New</button>
                    </span>
                </span>
                <button style={{display: screenWidth > 760 ? 'none' : 'flex'}} onClick={e=> dispatch(setAccessoryTo(0))}>Back</button>

            </h6>

                <div style={{justifyContent: 'flex-start', width: '100%', overflow: 'auto', alignItems: 'flex-start', height: '100%'}}>
                {
                    items.map((item,index) => <AddressItem key={index} index={index} item={item}/> )
                }
                </div>
            </div>

        
        </div>
    </>
  )
}

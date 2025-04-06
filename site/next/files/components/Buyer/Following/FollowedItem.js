import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';

export default function FollowedItem(item) {
    
    useEffect(() => {
        axios.get('https://ce-server.vercel.app/seller.listing', {params: {id: item?.seller_id}})
        .then(({data})=>{
            setItems(data)
        })
        .catch(error=>{
            console.log(error)
        })

    },[])

  return (
    <>
        <div className='following-card-data'>
            <div className='following-card-data-top'>
                <div id='left'>
                    <div>
                        <span></span>
                        <span>SHIVAM TRADING & COMMERCIAL SERVICES LTD - AC</span>
                    </div>
                    <div>
                        94%Seller Score 15Followers
                    </div>
                </div>
                <div id='right'>
                    View Profile
                </div>
            </div>
            <div className='following-card-data-btm'>
                <ul>
                    {

                    }
                </ul>
            </div>
        </div>
    </>
  )
}

"use client"
import React, { useEffect, useState } from 'react'
import '@/app/favourites/styles/xx-large.css'
import '@/app/favourites/styles/x-large.css'
import '@/app/favourites/styles/large.css'
import '@/app/favourites/styles/medium.css'
import '@/app/favourites/styles/small.css'
import FavouriteItem from '@/files/components/Buyer/Saved/FavouriteItem'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setAccessoryTo } from "@/redux/buyer_store/Aceessories";

export default function Favourite() {
  let [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {setScreenWidth(window.innerWidth)},[]);
  let [items, setItems] = useState([])
  let dispatch = useDispatch()

  let {
    buyer_id 
  } = useSelector(s => s.buyer_id);
  useEffect(() => {
    if (buyer_id !== '' && buyer_id !== null && buyer_id !== 'undefined' && buyer_id !== undefined && buyer_id !== 'null') {
      axios.get('https://ce-server.vercel.app/saved-items', {params: {buyer_id: buyer_id}})
      .then(({data})=>{
          setItems(data)
          console.log(data)
      })
      .catch(error=>{
          console.log(error)
      })
    }

  },[buyer_id])
  return (
    <>
      <div className='favourite-card' style={{width: screenWidth > 760 ? 'calc(100vw - 350px)' : '100%', float: 'right', padding: screenWidth > 760 ? '10px 40px': '10px'}}>
      
        <div className="favourite-card-cnt" style={{justifyContent: 'flex-start', overflow: 'none', width: '100%', alignItems: 'flex-start', height: '100%'}}>
        {/* <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <span>Favourite List</span>
          <button style={{display: screenWidth > 760 ? 'none' : 'flex'}} onClick={e=> dispatch(setAccessoryTo(0))}>Back</button>

        </h6> */}

          <div style={{justifyContent: 'flex-start', width: '100%', overflow: 'auto', alignItems: 'flex-start', height: '100%'}}>
            {
              items.map((item,index) => <FavouriteItem key={index} index={index} item={item}/> )
            }
          </div>
        </div>

        
      </div>
    </> 
  )
}

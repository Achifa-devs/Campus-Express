"use client"
import React, { useEffect, useState } from 'react'
import '@/app/favourites/styles/xx-large.css'
import FavouriteItem from '@/files/components/Buyer/Saved/FavouriteItem'
import database from '@/database/seller_shop.json'
import FavouriteSummary from '@/files/components/Buyer/Saved/FavouriteSummary'

export default function Favourite() {

  let [items, setItems] = useState([])

  function GetData(){

    let data = database.filter(item => item).splice(0,10);
    setItems(data)
  }
  // .catch(error=>{
  //     console.log(error)
  // })
  useEffect(() => {
    GetData()

  },[])
  return (
    <>
      <div className='favourite-card'>
      
        <div className="favourite-card-aside">
          <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', fontSize: 'medium', width: '100%', background: '#fff', fontWeight: '500', display: 'flex', alignItems: 'center', fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue'"}}>My Campus Express Account</h6>

          <FavouriteSummary />
        </div>
        <div className="favourite-card-cnt">
        <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center'}}>Favourite List</h6>

          {
            items.map((item,index) => <FavouriteItem key={index} index={index} item={item}/> )
          }
        </div>

        
      </div>
    </> 
  )
}

"use client"
import '@/app/seller/orders/styles/xx-large.css'
import React, { useEffect, useState } from "react";

import database1 from "@/database/campus_express_buyer_orders.json";
import database2 from '@/database/seller_shop.json'
import js_ago from 'js-ago';

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};


export default function App() {
  let [cards, setCards] = useState([])
  
  function GetData(){
    let book = []

    let data = database1.map(order => {
      database2.map(item => {
        item.product_id === order.product_id
        ?
        book.push({order: order, item: item})
        :
        ''
      })
    });
    setCards(book)
    console.log(book)
  }
  useEffect(() => {
    GetData()
  }, [])
  
  return (
    <div className='seller-order'>
      <div>
        <b>Manage your products</b> here
      </div>
      <hr />
      <div className='seller-order-cnt'>
        <header>
          <ul>
          
            <li className='th-buyer'>Buyer</li>
            <li className='th-item'>Item</li>
            <li className='th-price'>Price</li>
            <li className='th-paid'>Paid</li>
            <li className='th-stat'>Status</li>
            <li className='th-date'>Date</li>
            <li className='th-action'>Action</li>
          </ul>
        </header>
        <section>
          {
            cards.map(item => 
            
              <ul style={{height: '90px', fontWeight: '300'}}>
            
                <li className='tb-buyer'>
                  <span>
                    <img src="" style={{height: '30px', width: '30px', borderRadius: '50%'}} alt="" />
                  </span>
                  <span style={{marginLeft: '8px'}}>Akpulu Chinedu</span>
                </li>
                <li className='tb-item'>
                  <span ><img src="" style={{height: '50px', width: '50px', borderRadius: '10px'}} alt="" /></span>
                  <span style={{width: '60%', marginLeft: '15px'}}>
                  {item.item.title}
                  </span>
                </li>
                <li className='tb-price'>
                  <span style={{width: '30%'}}>
                  &#8358;{new Intl.NumberFormat('en-us').format(item.item.price)}
                  </span>
                </li>
                <li className='tb-paid'>
                  {item.order.havepaid ? 'Yes' :'No'}
                </li>
                <li className='tb-stat'>
                  {item.order.status.state}
                </li>
                <li className='tb-date'>
                  {js_ago(item.order.date)}
                </li>
                <li className='tb-action'>
                  
                </li>
              </ul>
            )
          }
        </section>
      </div>
    </div>
  );
}

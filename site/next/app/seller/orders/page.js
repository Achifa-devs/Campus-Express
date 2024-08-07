"use client"
import '@/app/seller/orders/styles/xx-large.css'
import '@/app/seller/orders/styles/x-large.css'
import '@/app/seller/orders/styles/large.css'
import '@/app/seller/orders/styles/medium.css'
import '@/app/seller/orders/styles/small.css'
import React, { useEffect, useState } from "react";

import database1 from "@/database/campus_express_buyer_orders.json";
import database2 from '@/database/seller_shop.json'
import js_ago from 'js-ago';
import backSvg from '@/files/assets/back-svgrepo-com (3).svg';
import Thumbnail from '@/files/components/Buyer/Thumbnail';


export default function App() {
  let [cards, setCards] = useState([])
  let [item, setItem] = useState('')
  
  function GetData(){
    let book = []

    setCards(book)
    console.log(book)
  }
  useEffect(() => {
    GetData()
  }, [])

  function updateSelectedOrder(data) {
    setItem(data)
  }
  
  return (
    <div className='seller-order'>
      {
        item === ''
        ?
        <OrdersList cards={cards} updateSelectedOrder={updateSelectedOrder} />
        :
        <OrderData item={item} updateSelectedOrder={updateSelectedOrder} />
      }
    </div>
  );
}


function OrderData({item, updateSelectedOrder}){

  
  return(
    <>
      <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
        <div onClick={e=>updateSelectedOrder('')} style={{cursor: 'pointer'}}>
          <img src={backSvg.src} style={{height: '20px', width: '20px'}} alt="..." />
        </div>
        &nbsp;
        &nbsp;
        &nbsp;
        <b>Manage Order 439r30</b> &nbsp; here
      </div>

      <hr />

      <OrderCard item={item} />

      <OrderInfo item={item} />
    </>
  )
}

function OrdersList({updateSelectedOrder, cards}) {

  let [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [])
  return(
    <>
      <div >
        <b>Manage your products</b> here
      </div>
      <hr />
      <div className='seller-order-cnt'>
        <header>
          <ul style={{padding: '10px 0px', background: '#fff'}}>
          
            <li className='th-buyer'>Buyer</li>
            <li className='th-item'>Item</li>
            <li className='th-price'>Price</li>
            <li className='th-paid'>Paid</li>
            <li className='th-stat'>Status</li>
            <li className='th-date' style={{display: screenWidth > 480 ? 'block' : 'none'}}>Date</li>
            <li className='th-action'>Action</li>
          </ul>
        </header>
        <section>
          {
            cards.map((item,index) => 
            
              <ul key={index} onClick={e =>updateSelectedOrder(item)} style={{height: '90px', padding: '0', fontWeight: '300', background: '#fff'}}>
            
                <li className='tb-buyer'>
                  <span>
                    <img src="" style={{height: '30px', width: '30px', borderRadius: '50%'}} alt="" />
                  </span>
                  <span style={{marginLeft: '8px'}}>Akpulu Chinedu</span>
                </li>
                <li className='tb-item'>
                  <span style={{height: '50px', width: '50px', borderRadius: '10px', display: screenWidth > 480 ? 'block' : 'none'}}><Thumbnail product_id={item.item.product_id} title={item.item.title} height={'100%'} /></span>
                  <span style={{width: screenWidth > 480 ? '60%' : '100%', marginLeft: screenWidth > 480 ? '15px' : '0'}}>
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
                <li className='tb-date' style={{display: screenWidth > 480 ? 'block' : 'none'}}>
                  {js_ago(item.order.date)}
                </li>
                <li className='tb-action'>
                  
                </li>
              </ul>
            )
          }
        </section>
      </div>
    </>
  )
}


function OrderCard({item}) {
  return(
    <>
      <div className="new-order-card-data">
        <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center'}}>New Order</h6>
        <div className="new-order-card-data-cnt">
          <div className='thumbnail-cnt'>
            <Thumbnail product_id={item?.product_id} height={'100%'} />
          </div> 

            
            
            <div className="body-cnt">
                <div className="body-cnt-top">
                  <div className="title">
                    <p style={{
                      whiteSpace: 'nowrap', /* Prevent text from wrapping */
                      overflow: 'hidden',    /* Hide any overflow text */
                      textOverflow: 'ellipsis'
                    }}>{item?.item?.title}</p>
                  </div>

                  <div className="price">
                    &#8358;&nbsp;{
                    new Intl.NumberFormat('en-us').format(item?.item?.price)}
                  </div>
                </div>
                
                <div className="body-cnt-mid">
                    <div className="buyer">
                        <span style={{
                            whiteSpace: 'nowrap', /* Prevent text from wrapping */
                            overflow: 'hidden',    /* Hide any overflow text */
                            textOverflow: 'ellipsis'
                        }}>Buyer: Maya s Store</span>
                    </div>

                    <div className="stock">
                      2 units bought
                    </div>
                </div>
                
              
            </div>
        </div>
        
        </div>
    </>
  )
}


function OrderInfo({item}) {
  
  return(
    <>
      <div className="new-order-info">
        <div className="new-order-info-cnt">
          <div className="left">
            <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center'}}>Payment information</h6>

            <div>
              <ul style={{padding: '0', margin: '0'}}>
                <li>
                  <span>Item Price</span>
                  <span>45,000</span>
                </li>
                <li>
                  <span>Amount Paid For 2 units</span>
                  <span>90,000</span>
                </li>
                <li>
                  <span>Fee </span>
                  <span>{0.1*90000}</span>
                </li>
                <li>
                  <span>Amount to receive</span>
                  <span>{0.9*90000}</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="right">
            <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center'}}>Delivery information</h6>

             
            <div>
              <ul style={{padding: '0', margin: '0'}}>
                <li>
                  <span>Delivery Type</span>
                  <span>Door Step Delivery</span>
                </li>
                <li>
                  <span>Pick-Up Station</span>
                  <span>
                    <div>
                    Wintess Lodge
                    </div>
                    <div>
                    No 195 Ifite-Road
                    </div>
                    <div>
                    Ifite Awka
                    </div>
                    <div>
                    Awka
                    </div>
                    <div>
                    UNIZIK,Awka
                    </div>
                    <div>
                    Anambra State
                    </div>
                  </span>
                </li>
                <li>
                  <span>Shipping Date </span>
                  <span></span>
                </li>
              </ul>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}
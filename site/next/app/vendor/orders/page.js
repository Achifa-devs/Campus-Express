"use client"
import '@/app/vendor/orders/styles/xx-large.css'
import '@/app/vendor/orders/styles/x-large.css'
import '@/app/vendor/orders/styles/large.css'
import '@/app/vendor/orders/styles/medium.css'
import '@/app/vendor/orders/styles/small.css'
import React, { useEffect, useRef, useState } from "react";

import js_ago from 'js-ago';
import backSvg from '@/files/assets/back-svgrepo-com (3).svg';
import Thumbnail from '@/files/components/Buyer/Thumbnail';
import { useSelector } from 'react-redux'
import axios from 'axios'
import { open_notice } from '@/files/reusable.js/notice'
import { seller_overlay_setup } from '@/files/reusable.js/overlay-setup'


export default function App() {
  let [cards, setCards] = useState([])
  let [item, setItem] = useState('')
  // const isClient = useIsClient();

  
  let {
    user_id
  }=useSelector(s=>s.user_id);

  
  useEffect(() => {

    if(user_id !== '' && user_id !== null){
      axios.get('/api/vendor/orders', {params: {user_id: user_id.trim()}})
      .then(({data})=>{
        console.log(data)
        setCards(data?.data)
      })
      .catch(error=>{
          console.log(error)
      })
    }

  },[user_id])

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
        <b>Manage Order #{item?.order?.order_id}</b> &nbsp; here
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
          
            <li className='th-buyer' >S/N</li>
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
            
              <ul key={index} style={{height: '90px', padding: '0', fontWeight: '300', background: '#fff', opacity: item.order.status.state === 'cancelled' ? '.5': '1', pointerEvents: item.order.status.state === 'cancelled' ? 'none': 'all' }}>
            
                <li key={index} className='tb-buyer'>
                  <span style={{marginLeft: '8px'}}> {index + 1}</span>
                </li>
                <li key={index} className='tb-item'>
                  <span style={{height: '50px', width: '50px', borderRadius: '10px', display: screenWidth > 480 ? 'block' : 'none'}}><Thumbnail thumbnail_id={item.product.thumbnail_id} height={'100%'} /></span>
                  <span style={{width: screenWidth > 480 ? '60%' : '100%', marginLeft: screenWidth > 480 ? '15px' : '0'}}>
                  {item.product.title}
                  </span>
                </li>
                <li key={index} className='tb-price'>
                  <span style={{width: '30%'}}>
                  &#8358;{new Intl.NumberFormat('en-us').format(item.product.price)}
                  </span>
                </li>
                <li key={index} className='tb-paid'>
                  {item?.order?.havepaid ? 'Yes' :'No'}
                </li>
                <li key={index} className='tb-stat'>
                  {item?.order?.status?.state}
                </li>
                <li key={index} className='tb-date' style={{display: screenWidth > 480 ? 'block' : 'none'}}>
                  {item?.order?.date ? js_ago(new Date(item?.order?.date)) : item?.order?.date}
                </li>
                <li key={index}  className='tb-action'>
                  <button onClick={e =>updateSelectedOrder(item)}  style={{height: 'fit-content', width: 'fit-content', padding: '5px 5px', borderRadius: '4px'}}><><b>View</b></></button>
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
  let [screenWidth, setScreenWidth] = useState(0) 
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    },[])
  return(
    <>
      <div className="new-order-card-data" key={item?.order?.order_id}>
        <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <span>Order {item?.order?.status?.state === 'pending' ? 'In Progress' : item?.order?.status?.state === 'cancelled' ? 'Cancelled' : 'Completed'}</span>
            <button style={{display: screenWidth > 760 ? 'flex' : 'flex', width: 'auto', alignItems: 'center', borderRadius: '5px', background: 'red', visibility: item?.order?.status?.state === 'cancelled' ? 'hidden' : 'visible'}} onClick={e=> {
              seller_overlay_setup(true, 'Cancelling order.')
              axios.post('http://192.168.0.4:9090/vendor/cancel-order', {order_id: item?.order?.order_id})
              .then(({data})=>{
                if(data){
                  seller_overlay_setup(false, '')
                  open_notice(true, 'Order cancelled successfully')
                  window.location.reload()
                }else{
                  seller_overlay_setup(false, '')
                  open_notice(true, 'Order was not cancelled successfully')
                  
                }
              })
              .catch(error=>{
                console.log(error)
                seller_overlay_setup(false, '')
                
              })
            }}>{item?.order?.status?.state === 'pending' ? 'Cancel order' : item?.order?.status?.state === 'cancelled' ? 'Cancelled' : ''}</button>
        </h6>
        <div className="new-order-card-data-cnt">
          <div className='thumbnail-cnt'>
            <Thumbnail thumbnail_id={item?.product?.thumbnail_id} height={'100%'} />
          </div> 

            
            
            <div className="body-cnt" >
              <div className="body-cnt-top">
                <div className="title">
                  <p style={{
                    whiteSpace: 'nowrap', /* Prevent text from wrapping */
                    overflow: 'hidden',    /* Hide any overflow text */
                    textOverflow: 'ellipsis'
                  }}>{item?.product?.title}</p>
                </div>

                <div className="price">
                  &#8358;&nbsp;{
                  new Intl.NumberFormat('en-us').format(item?.product?.price)}
                </div>
              </div>
              
              <div className="body-cnt-mid" style={{position: 'relative'}}>
                  <div className="buyer">
                      <span style={{
                          whiteSpace: 'nowrap', /* Prevent text from wrapping */
                          overflow: 'hidden',    /* Hide any overflow text */
                          textOverflow: 'ellipsis'
                      }}>Buyer: {item?.order?.user_id}</span>
                  </div>

                  <div className="stock">
                    {item?.order?.stock} units bought
                  </div>

                  
              </div>

              <button onClick={e => {
                if(item?.order?.havepaid)
                {
                  const encodedMessage = encodeURIComponent(`Item Ordered:${item.title} Seller-id:\n\n\n${item.user_id} \n\n\nPrice: ₦${new Intl.NumberFormat('en-us').format(item.price)} \n\n\n 'https://www.campusexpressng.com/product/${item.product_id}'`);

                  const whatsappUrl = `https://wa.me/${item?.order?.user_id}?text=${encodedMessage}`;

                  // Open WhatsApp with the share URL
                  window.open(whatsappUrl, '_blank');
                } else {
                  
                  open_notice(true, 'Buyer must make payment first!')
                }
              }}  style={{height: 'auto', fontWeight: 'normal', width: 'auto',bottom: '5px', left: '5px', padding: '8px 10px', float: 'right', background: '#25D366', fontSize: 'small', cursor: 'pointer'}} className='button'>Chat Buyer On WhatsApp Now</button>
              
            
            </div>
        </div>
        
        </div>
    </>
  )
}

function OrderInfo({item}) {
  let list = useRef(
    [
        {month: 'january'},
        {month: 'february'},
        {month: 'march'},
        {month: 'april'},
        {month: 'may'},
        {month: 'june'},
        {month: 'july'},
        {month: 'august'},
        {month: 'september'},
        {month: 'october'},
        {month: 'november'},
        {month: 'december'}
    ]
    )
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
                  <span>&#8358;&nbsp;{
                    new Intl.NumberFormat('en-us').format(item?.product?.price)}</span>
                </li>
                <li>
                  <span>Amount Paid For {item?.order?.stock} units</span>
                  <span>&#8358;&nbsp;{
                    new Intl.NumberFormat('en-us').format(item?.product?.price*item?.order?.stock)}</span>
                </li>
                <li>
                  <span>Fee </span>
                  <span>{0.1*(item?.product?.price*item?.order?.stock)}</span>
                </li>
                <li>
                  <span>Amount to receive</span>
                  <span>{0.9*(item?.product?.price*item?.order?.stock)}</span>
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
                  <span>{item?.order?.pick_up_channels[0].channel}</span>
                </li>
                <li>
                  <span>Pick-Up Station</span>
                  <span>

                    {
                      item?.order?.pick_up_channels[0].locale.split(',').map((item,index) => <div key={index}>{item}</div>)
                    }
                  </span>
                </li>
                <li>
                  <span>Shipping Date </span>
                  <span>
                    {
                      item?.order?.pick_up_channels[0].date.dy
                    }
                    &nbsp;
                    <span style={{textTransform: 'capitalize'}}>{
                      list.current[item?.order?.pick_up_channels[0].date.mth]?.month
                    }</span>
                    &nbsp;
                    {
                      item?.order?.pick_up_channels[0].date.yr
                    }
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


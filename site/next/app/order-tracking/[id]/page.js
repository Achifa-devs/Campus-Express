"use client"
import React, { useEffect, useState } from 'react'
import BuyerLayout from '@/files/layout/Buyer'
import '@/files/styles/Buyer/orderTrackerList.css'
import OrderPlaced from '@/files/components/Buyer/OrderTracker/OrderPlaced'
import OrderConfirmed from '@/files/components/Buyer/OrderTracker/OrderConfirmed'
import Shipped from '@/files/components/Buyer/OrderTracker/Shipped'
import ReadyForPickUp from '@/files/components/Buyer/OrderTracker/ReadyForPickup'
import PickedUp from '@/files/components/Buyer/OrderTracker/PickedUp'
import Statement from '@/files/components/Buyer/OrderTracker/Statement'
import Seal from '@/files/components/Buyer/OrderTracker/Seal'
import OrderTrackerSummary from '@/files/components/Buyer/OrderTracker/OrderTrackerSummary'
import ellipsisSvg from '@/files/assets/ellipsis-svgrepo-com.svg'
import Thumbnail from '@/files/components/Buyer/Thumbnail'
import '@/app/order-tracking/styles/xx-large.css'
import '@/app/order-tracking/styles/x-large.css'
import '@/app/order-tracking/styles/large.css'
import '@/app/order-tracking/styles/medium.css'
import '@/app/order-tracking/styles/small.css'
import OrderedItem from '@/files/components/Buyer/OrderTracker/OrderedItem'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup'

export default function OrderTracker() {
    let {
        buyer_id
    }=useSelector(s=>s.buyer_id);
    let pathname = usePathname()
    let [screenWidth, setScreenWidth] = useState(0);
    let [order_list, set_order_list] = useState('');
    useEffect(() => {setScreenWidth(window.innerWidth)},[]);

    useEffect(() => {
        if (buyer_id !== null && buyer_id !== 'null' && buyer_id !== undefined) {
            buyer_overlay_setup(true, 'Loading...')
            
            axios.get('https://ce-server.vercel.app/order', {params: {buyer_id: buyer_id, product_id: pathname.split('/').splice(-1)[0]}})
            .then(({data})=>{
                set_order_list(data[0])
                // console.log(data)
                buyer_overlay_setup(false, '')
                buyer_overlay_setup(false, '')

            })
            .catch(error=>{
                console.log(error)
                buyer_overlay_setup(false, '')

            })
        }
      
    }, [buyer_id]) 

  function updateJsx(data) {
    setActiveJsx(data)
  }

  let [activeJsx, setActiveJsx] = useState(!false);
  
    let [price, set_price] = useState(0)
  
    const getFilteredItems = (items, channel) => {
        const removeCount = channel === 'Custom Pickup Location' ? 2 : 4;
        return items.slice(0, -removeCount);
    };

  
    
    // const inStateSelected = shippingRange?.in_state?.selected;
    // const outStateSelected = shippingRange?.out_state?.selected;
    // const inCampusSelected = shippingRange?.in_campus?.selected;
    // const selectedCampus = item?.campus;

    useEffect(() => {
        const shippingRange = order_list?.product ? JSON.parse(order_list?.product?.shipping_range) : null;
        const orderRange = order_list?.order ? order_list?.order?.pick_up_channels.map(item => getFilteredItems(item?.locale?.split(','), item?.channel)) : null;


    if (order_list) {
        

        let state = orderRange[0].shift().trim();
        let camp = orderRange[0].slice(0).join(',').trim();
        if (order_list?.product?.campus === camp) {
            set_price(JSON.parse(order_list?.product?.shipping_range)?.in_campus?.price)
        } else if (order_list?.product?.uni_state === state) {
            set_price(JSON.parse(order_list?.product?.shipping_range)?.in_state?.price)
        } else {
            set_price(JSON.parse(order_list?.product?.shipping_range)?.out_state?.price)
        }
    }
}, [order_list])

    function isLeapYear(year) {return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);}
    
    let [monthsList, setMonthsList] = useState([
          {month: 'January', days: 31},
          {month: 'February', days: isLeapYear(new Date().getFullYear()) ? 29 : 28},
          {month: 'March', days: 31},
          {month: 'April', days: 30},
          {month: 'May', days: 31},
          {month: 'June', days: 30},
          {month: 'July', days: 31},
          {month: 'August', days: 31},
          {month: 'September', days: 30},
          {month: 'October', days: 31},
          {month: 'November', days: 30},
          {month: 'December', days: 31}
        ]);
      

  return ( 
    <>
        <div style={{display: 'flex', padding: screenWidth > 760 ? '10px' : '0px', height: '100hv',  alignItems: 'flex-start', flexDirection: screenWidth > 760 ? 'row' : 'column', justifyContent: 'space-around', width: '100%', backgroundColor: '#f9f9f9'}}>
            
            {
                screenWidth > 760
                ?
                ''
                :
                <h6 className="" style={{padding:'5px 10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: '70px', zIndex: '10000'}}>
                    <button onClick={e => updateJsx(true)} style={{width: 'auto', padding: '10px', height: '100%', border: '1px solid #FF4500', background: activeJsx ? '#FF4500' : '#fff', color: !activeJsx ? '#FF4500' : '#fff'}}>View Order Details</button>
                    <button onClick={e => updateJsx(false)} style={{width: 'auto', padding: '10px', height: '100%', border: '1px solid #FF4500', background: !activeJsx ? '#FF4500' : '#fff', color: activeJsx ? '#FF4500' : '#fff'}}>Track order</button>
                </h6>
            }
            <div className="order-tracker-cnt" style={{padding: screenWidth > 760 ?  '0 0 0 0' : '5px 5px 5px 5px', background: '#f9f9f9', display: 'flex', flexDirection: 'column', margin: screenWidth > 760 ? '5px 10px 5px 10px' : '0px 5px 60px 5px', justifyContent: 'space-between', width: '100%'}}>
                
                <div style={{background: '#f9f9f9', display: 'flex', flexDirection: 'row', margin: screenWidth > 760 ? '5px 10px 5px 10px' : '0px 5px 60px 5px', justifyContent: 'space-between', width: '100%'}}>
    
                    {
                        !activeJsx
                        ?
                        <div className="container" style={{width: screenWidth > 760 ? 'calc(100% - 50px)' : '100%', background: '#f9f9f9', padding: screenWidth > 760 ? '3px' : '-100px 20px 40px 0px',}}>
                            <div className="row" >
                                <div className="col-12 col-md-10 hh-grayBox pt45 pb20" style={{background: '#fff', padding: '20px 10px', height: '100%', margin: '0px'}}>
    
                                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', textAlign: 'left', padding: '0 0 0 20px'}} className="row justify-content-between">
    
                                        <div style={{padding: '0 0 0 10px', margin: '0 0 0 0px'}} className="order-tracking completed">
                                        <span className="is-complete"></span>
                                            <div style={{margin: '5px 0 0 22px'}}>
                                            <OrderPlaced order={order_list?.product} />
                                            </div>
    
                                        </div>
                                        <div style={{padding: '0 0 0 10px', margin: '0 0 0 0px'}} className="order-tracking">
                                        <span className="is-complete"></span>
                                            <div style={{margin: '-25px 0 0 22px'}}>
                                            <OrderConfirmed order={order_list} />
                                            </div>
    
                                        </div>
                                        <div style={{padding: '0 0 0 10px', margin: '0 0 0 0px'}} className="order-tracking ">
                                        <span className="is-complete"></span>
                                            <div style={{margin: '-25px 0 0 22px'}}>
                                            <Shipped order={order_list} />
                                            </div>
    
                                        </div>
                                        <div style={{padding: '0 0 0 10px', margin: '0 0 0 0px'}} className="order-tracking ">
                                        <span className="is-complete"></span>
                                            <div style={{margin: '-25px 0 0 22px'}}>
                                            <ReadyForPickUp order={order_list} />
                                            </div>
    
                                        </div>
                                        <div style={{padding: '0 0 0 10px', margin: '0 0 0 0px'}} className="order-tracking ">
                                        <span className="is-complete"></span>
                                            <div style={{margin: '-25px 0 0 22px'}}>
                                            <PickedUp order={order_list?.product} />
                                            </div>
    
                                        </div>
                                        <div style={{padding: '0 0 0 10px', margin: '0 0 0 0px'}} className="order-tracking ">
                                        <span className="is-complete"></span>
                                            <div style={{margin: '-25px 0 0 22px'}}>
                                            <Statement order={order_list?.product} />
                                            </div>
    
                                        </div>
                                        <div style={{padding: '0 0 0 10px', margin: '0 0 0 0px'}} className="order-tracking ">
                                        <span className="is-complete"></span>
                                            <div style={{margin: '-25px 0 0 22px'}}>
                                            <Seal order={order_list?.product} />
                                        </div></
                                        div>
                                    </div>
    
                                </div>
                            </div>
                        </div>
                        :
                        <div style={{width: screenWidth > 760 ? 'calc(100% - 50px)' : '100%', padding: screenWidth > 760 ? '3px' : '5px 5px 40px 0px', background: '#f9f9f9'}}>
                            <div className="order-details-top">
                                <OrderedItem order={order_list?.order} item={order_list?.product} />
                            </div>
    
                        {/* <br /> */}
    
                        <div className="order-details-btm" style={{display: 'flex', padding: '8px', alignItems: 'flex-start', flexDirection: screenWidth > 760 ? 'row' : 'column', justifyContent: 'space-between', height: 'auto',width: '100%', backgroundColor: '#fff'}}>
    
                            <div style={{width: screenWidth > 760 ? '49%' : '100%', background: '#fff', padding: '0', borderRadius: '8px', height: 'auto', border: '1px solid #f9f9f9'}}>
                            <div style={{border: '1px solid #efefef', padding: '10px'}}>Payment information</div>
                            <div style={{border: '1px solid #efefef', padding: '10px'}}>
                                <div>
                                    <h6>Payment Method</h6>
                                    <ul style={{padding: '6px'}}>
                                        <li style={{fontSize: 'small'}}>Tap & Relax, Pay with Bank Transfer on Delivery</li>
                                    </ul>
                                    </div>
                                    <div>
                                    <h6>Payment Details</h6>
                                    <ul style={{padding: '6px'}}>
                                        <li style={{fontSize: 'small'}}>Product total: {new Intl.NumberFormat('en-us').format(order_list?.order?.stock)}</li>
                                        <li style={{fontSize: 'small'}}>Total Amount Paid: ₦ {new Intl.NumberFormat('en-us').format(order_list?.product?.price * order_list?.order?.stock)}</li>
                                        <li style={{fontSize: 'small'}}>Delivery Fees: ₦ {new Intl.NumberFormat('en-us').format(parseInt(price))}</li>
                                        <li style={{fontSize: 'small'}}>Total: ₦ {new Intl.NumberFormat('en-us').format((order_list?.product?.price * order_list?.order?.stock) + parseInt(price))}</li>
                                    </ul>
                                </div>
                            </div>
                            </div>
    
                            <br />
                            <div style={{width: screenWidth > 760 ? '49%' : '100%', background: '#fff', padding: '0', borderRadius: '8px', height: 'auto', border: '1px solid #f9f9f9'}}>
                            <div style={{border: '1px solid #efefef', padding: '10px'}}>Delivery Details</div>
                                <div style={{border: '1px solid #efefef', padding: '10px'}}>
    
                                <div>
                                    <h6>Payment Method</h6>
                                    <ul style={{padding: '6px'}}>
                                    <li style={{fontSize: 'small'}}>Campus Sphere Payment <b>(Powered By Paystack Titan)</b></li>
                                    </ul>
                                </div>
    
                                <div>
                                    <h6>Pick-Up Station Address</h6>
                                    <ul style={{padding: '6px'}}>
                                        {
                                            <li style={{fontSize: 'small'}}>{order_list?.order?.pick_up_channels[0].locale}</li>
                                        }
                                    </ul>
                                </div>
    
                                <div>
                                    <h6>Shipping Details</h6>
                                    <ul style={{padding: '6px'}}>
                                    <li style={{fontSize: 'small'}}>Delivery starts {monthsList[order_list?.order?.pick_up_channels[0]?.date?.mth]?.month} {order_list?.order?.pick_up_channels[0]?.date?.dy} {order_list?.order?.pick_up_channels[0]?.date?.yr} .</li>
                                    </ul>
                                </div>
    
                                </div>
                            </div>
    
                        </div>
                        </div>
    
                    }
    
    
    
    
                    <OrderTrackerSummary order={order_list?.order} updateJsx={updateJsx} activeJsx={activeJsx} />
                </div>
            </div>
        </div>
    </>
  )
}


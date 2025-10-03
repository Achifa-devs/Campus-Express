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
import '@/app/store/orders/[id]/tracker/styles/xx-large.css'
import '@/app/store/orders/[id]/tracker/styles/x-large.css'
import '@/app/store/orders/[id]/tracker/styles/large.css'
import '@/app/store/orders/[id]/tracker/styles/medium.css'
import '@/app/store/orders/[id]/tracker/styles/small.css'
import '@/app/store/orders/[id]/tracker/styles/order_tracker.css'
import OrderedItem from '@/files/components/Buyer/OrderTracker/OrderedItem'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Tracker from '@/files/components/Buyer/OrderTracker/Tracker'
import Carousel from '@/files/components/Buyer/dashboard/Carousel'
import Payment from '@/files/components/Buyer/OrderTracker/Payment'
import Delivery from '@/files/components/Buyer/OrderTracker/Delivery'
import { wp } from '@/files/utils.js/whatsapp'
import ConfirmationModal from '@/files/components/Buyer/OrderConfirmation/ConfirmationModal'

export default function OrderTrackerPage() {
    let {
        user_id
    }=useSelector(s=>s.user_id);
    let {
        buyer_info
    }=useSelector(s=>s.buyer_info);
    let pathname = usePathname()
    let [screenWidth, setScreenWidth] = useState(0);
    let [order_list, set_order_list] = useState('');
    useEffect(() => {setScreenWidth(window.innerWidth)},[]);

    useEffect(() => {
        if (user_id !== null && user_id !== 'null' && user_id !== undefined) {
            const overlay = document.querySelector('.overlay');
            overlay.setAttribute('id', 'overlay')
            axios.get('/api/store/order', {params: {user_id: user_id, product_id: pathname.split('/').splice(-2)[0]}})
            .then(({ data }) => {
                console.log(data)
                overlay.removeAttribute('id')
                if (data.success) {
                    
                    set_order_list(data?.data)
                }

            })
            .catch(error => {
                overlay.removeAttribute('id')
                
                console.log(error)
            })
            
        }
      
    }, [user_id]) 

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
      
        // Order in progress

  return ( 
    <>

        <ConfirmationModal 
            show={true}
            onClose={() => console.log('Closed')}
            onConfirm={() => console.log('Confirmed')}
            onReject={() => console.log('Rejected')}
            prod={order_list?.product}
        />
        <div 
            style={{
                display: 'flex', 
                padding: screenWidth > 760 ? '10px' : '0px', 
                height: '100hv', 
                alignItems: 'flex-start', 
                flexDirection: screenWidth > 760 ? 'row' : 'column', 
                justifyContent: 'space-around', 
                width: '100%', 
                backgroundColor: '#f9f9f9'
            }}>
            
            {
                screenWidth > 760
                ?
                ''
                :
                <h6 className="" 
                    style={{
                        padding:'5px 10px', 
                        margin: '0', 
                        borderBottom: '1px solid #efefef', 
                        height: '50px', 
                        width: '100%', 
                        background: '#fff', 
                        fontWeight: '600', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        position: 'sticky', 
                        top: '70px', 
                        zIndex: '10000'
                    }}>
                        <button onClick={e => updateJsx(true)} style={{width: 'auto', padding: '10px', height: '100%', border: '1px solid #FF4500', background: activeJsx ? '#FF4500' : '#fff', color: !activeJsx ? '#FF4500' : '#fff'}}>View Order Details</button>
                        <button onClick={e => updateJsx(false)} style={{width: 'auto', padding: '10px', height: '100%', border: '1px solid #FF4500', background: !activeJsx ? '#FF4500' : '#fff', color: activeJsx ? '#FF4500' : '#fff'}}>Track order</button>
                </h6>
            }

            <div className="order-tracker-cnt" 
                style={{
                    padding: screenWidth > 760 ?  '0 0 0 0' : '5px 5px 5px 5px', 
                    background: '#f9f9f9', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    // margin: screenWidth > 760 ? '5px 40px 5px 10px' : '0px 5px 60px 5px', 
                    justifyContent: 'space-between', width: '100%'
                }}>
                
                <div 
                    style={{
                        background: '#f9f9f9', 
                        display: 'flex', 
                        flexDirection: 'row', 
                        margin: screenWidth > 760 ? '5px 0px' : '0px 5px 60px 5px', 
                        justifyContent: 'space-between', width: '100%'
                    }}>
    
                    {
                        !activeJsx
                        ?
                        ''
                        :
                        <div 
                            style={{
                                width: screenWidth > 760 ? 'calc(100% - 400px)' : '100%',
                                padding: screenWidth > 760 ? "3px" : "5px 5px 40px 0px",
                                backgroundColor: "#f9f9f9",
                                marginLeft: '10px'
                            }}>
                            <div className="order-details-top">
                                <OrderedItem order={order_list?.order} item={order_list?.product} />
                            </div>
    
                            {/* <br /> */}
    
                            <div className="order-details-btm" 
                                style={{
                                    display: 'flex', 
                                    padding: '8px', 
                                    alignItems: 'flex-start', 
                                    flexDirection: screenWidth > 760 ? 'row' : 'column', 
                                    justifyContent: 'space-between', 
                                    height: 'auto',
                                    width: '100%', 
                                    backgroundColor: '#fff'
                                }}>
        
                                <div style={{width: screenWidth > 760 ? '49%' : '100%', background: '#fff', padding: '0', borderRadius: '8px', height: 'auto', border: '1px solid #f9f9f9'}}>
                                    <Payment order_list={order_list} price={price} />
                                </div>
        
                                <br />
                                <div style={{width: screenWidth > 760 ? '49%' : '100%', background: '#fff', padding: '0', borderRadius: '8px', height: 'auto', border: '1px solid #f9f9f9'}}>
                                    <Delivery order_list={order_list} monthsList={monthsList} />
                                </div>
        
                            </div>

                           {/* <Carousel /> */}
                            <section style={{marginBottom: '0'}}> 
                                <div className="header shadow-sm" 
                                    style={{
                                        height: '50px', 
                                        padding: '10px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'left', 
                                        position: 'relative', 
                                        width: '100%', 
                                        background: '#fff'
                                    }}>
                                    <div 
                                        style={{
                                            float: 'left', 
                                            color: '#000', 
                                            fontFamily: 'sans-serif'
                                        }}>
                                        <b>Similar Items You May like</b>
                                    </div>
                                </div>
                                <div style={{display: 'flex'}}>
                                    {
                                        order_list?.product
                                        ?
                                        <Carousel category={btoa(order_list?.product?.category)} product_id={order_list?.product?.product_id} />
                                        :
                                        ''
                                    }
                                </div>
                            </section>
                        </div>
    
                    }
    
    
    
    
                    <div style={{width: '350px', marginRight: '10px'}}>
                        <Tracker order={order_list?.order} product={order_list?.product} updateJsx={updateJsx} activeJsx={activeJsx} />
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}

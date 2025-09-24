import React, { useEffect, useState } from 'react'
import BuyerLayout from '../../layout/Buyer'
import '../../styles/Buyer/orderTrackerList.css'
import OrderPlaced from '../../components/Buyer/OrderTracker/OrderPlaced'
import OrderConfirmed from '../../components/Buyer/OrderTracker/OrderConfirmed'
import Shipped from '../../components/Buyer/OrderTracker/Shipped'
import ReadyForPickUp from '../../components/Buyer/OrderTracker/ReadyForPickup'
import PickedUp from '../../components/Buyer/OrderTracker/PickedUp'
import Statement from '../../components/Buyer/OrderTracker/Statement'
import Seal from '../../components/Buyer/OrderTracker/Seal'
import OrderTrackerSummary from '../../components/Buyer/OrderTracker/OrderTrackerSummary'
import ellipsisSvg from '../../assets/ellipsis-svgrepo-com.svg'
import Thumbnail from '../../components/Buyer/Thumbnail'
import js_ago from 'js-ago'

export default function OrderTracker({item}) {
  let [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {setScreenWidth(window.innerWidth)},[]);

  function updateJsx(data) {
    setActiveJsx(data)
  }

  let [activeJsx, setActiveJsx] = useState(!false);

  return ( 
    <>
        <BuyerLayout>
          <div style={{display: 'flex', padding: screenWidth > 760 ? '10px' : '0px', height: '100hv',  alignItems: 'flex-start', flexDirection: screenWidth > 760 ? 'row' : 'column', justifyContent: 'space-around', width: '100%', backgroundColor: '#f9f9f9'}}>
            <div className="order-tracker-cnt" style={{padding: screenWidth > 760 ?  '0 0 0 0' : '5px 5px 5px 5px', background: '#f9f9f9', display: 'flex', flexDirection: 'row', margin: screenWidth > 760 ? '25px 10px 20px 10px' : '10px 5px 60px 5px', justifyContent: 'space-between', width: '100%'}}>
                {
                  !activeJsx 
                  ? 
                  <div className="container" style={{width: screenWidth > 760 ? 'calc(100% - 0)' : '100%', background: '#fff'}}>
                    <div className="row">
                      <div className="col-12 col-md-10 hh-grayBox pt45 pb20" style={{background: '#fff', padding: '10px'}}>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', textAlign: 'left'}} className="row justify-content-between">

                          <div style={{padding: '0 0 0 10px', margin: '0 0 0 0px'}} class="order-tracking completed">
                            <span class="is-complete"></span>
                              <div style={{margin: '5px 0 0 22px'}}>
                                <OrderPlaced /> 
                              </div> 
                            
                          </div>
                          <div style={{padding: '0 0 0 10px', margin: '0 0 0 0px'}} class="order-tracking ">
                            <span class="is-complete"></span>
                              <div style={{margin: '-25px 0 0 22px'}}>
                                <OrderConfirmed />
                              </div>
                            
                          </div>
                          <div style={{padding: '0 0 0 10px', margin: '0 0 0 0px'}} class="order-tracking ">
                            <span class="is-complete"></span>
                              <div style={{margin: '-25px 0 0 22px'}}>
                                <Shipped />
                              </div>
                            
                          </div>
                          <div style={{padding: '0 0 0 10px', margin: '0 0 0 0px'}} class="order-tracking ">
                            <span class="is-complete"></span>
                              <div style={{margin: '-25px 0 0 22px'}}>
                                <ReadyForPickUp />
                              </div>
                            
                          </div>
                          <div style={{padding: '0 0 0 10px', margin: '0 0 0 0px'}} class="order-tracking ">
                            <span class="is-complete"></span>
                              <div style={{margin: '-25px 0 0 22px'}}>
                                <PickedUp />
                              </div>
                            
                          </div>
                          <div style={{padding: '0 0 0 10px', margin: '0 0 0 0px'}} class="order-tracking ">
                            <span class="is-complete"></span>
                              <div style={{margin: '-25px 0 0 22px'}}>
                                <Statement />
                              </div>
                            
                          </div>
                          <div style={{padding: '0 0 0 10px', margin: '0 0 0 0px'}} class="order-tracking ">
                            <span class="is-complete"></span>
                              <div style={{margin: '-25px 0 0 22px'}}>
                                <Seal />
                            </div></
                          div>
                        </div>
                      </div>
                    </div>
                  </div>
                  :
                  <div style={{width: screenWidth > 760 ? 'calc(100% - 0)' : '100%', padding: screenWidth > 760 ? '25px' : '10px 5px 60px 5px', background: '#fff'}}>
                    <div className="order-details-top">
                      <div className="seller-order-card" style={{position: 'relative', display: 'flex', background: '#fff', margin: '5px 0 15px 0', border: '2px solid #f9f9f9'}}>
                        <div style={{height: '100%', width: screenWidth > 760 ? '20%' : '20%', borderRadius: '5px', display: 'table', margin: '0 auto'}}>
                            <Thumbnail product_id={item?.product_id} />
                        </div>

                        <div style={{position: 'absolute', top: '5px', right: '5px', padding: '4px'}}>
                            <img src={ellipsisSvg} style={{height: '10px', width: '10px'}} alt="..." />
                        </div>
                        
                        <div className="seller-order-body" style={{width: 'calc(80%)'}}>
                            {/* <img src={deleteSvg}alt="" /> */}

                            <div className="seller-order-title" style={{display: 'flex', alignItems: 'center', fontWeight: '500'}}>
                                <p>{item?.title}</p>
                            </div>
                            <div className="seller-order-id" style={{display: 'flex', alignItems: 'flex-start'}}>
                                <p style={{fontWeight: '500', fontSize: 'x-small'}}>Order-code: {''}</p>
                            </div>
        {/* <hr /> */}
                            <div className="seller-order-status">
                                {item?.status}
                            </div>


                            <div className="seller-order-date" style={{bottom: '5px'}}>
                                {/* {js_ago(new Date(item?.date))} */}
                            </div>

                        </div>
                      </div>
                    </div>
                    <br />

                    <div className="order-details-btm" style={{display: 'flex', padding: '0px', alignItems: 'flex-start', flexDirection: screenWidth > 760 ? 'row' : 'column', justifyContent: 'space-between', height: 'auto',width: '100%', backgroundColor: '#fff'}}>

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
                              <li style={{fontSize: 'small'}}>Items total: ₦ 11,820</li>
                              <li style={{fontSize: 'small'}}>Delivery Fees: ₦ 640</li>
                              <li style={{fontSize: 'small'}}>Total: ₦ 12,460</li>
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
                                <li style={{fontSize: 'small'}}>Tap & Relax, Pay with Bank Transfer on Delivery</li>
                              </ul>
                            </div>

                            <div>
                              <h6>Pick-Up Station Address</h6>
                              <ul style={{padding: '6px'}}>
                                <li style={{fontSize: 'small'}}>Wintess Lodge</li>
                                <li style={{fontSize: 'small'}}>No 195 Ifite-Road</li>
                                <li style={{fontSize: 'small'}}>Ifite Awka</li>
                                <li style={{fontSize: 'small'}}>Awka</li>
                                <li style={{fontSize: 'small'}}>UNIZIK,Awka</li>
                                <li style={{fontSize: 'small'}}>Anambra State</li>
                              </ul>
                            </div>

                            <div>
                              <h6>Shipping Details</h6>
                              <ul style={{padding: '6px'}}>
                                <li style={{fontSize: 'small'}}>Pickup Station.Fulfilled by CRUX DISTRIBUTION LIMITED

  Delivery between 05 July and 09 July.</li>
                              </ul>
                            </div>

                          </div>
                      </div>

                    </div>
                  </div>
                  
                }
                  

              

              <OrderTrackerSummary updateJsx={updateJsx} activeJsx={activeJsx} />
            </div>
          </div>
        </BuyerLayout>
    </>
  )
}


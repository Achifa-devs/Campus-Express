import React, { useEffect, useRef, useState } from 'react'   
import { useSelector } from 'react-redux'
import { GetOrder } from '../../../api/buyer/get'
import deleteSvg from '../../../assets/delete-svgrepo-com (2).svg';
import { useLocation } from 'react-router-dom';
import Thumbnail from '../Thumbnail';
import ellipsisSvg from '../../../assets/ellipsis-svgrepo-com.svg'
import js_ago from 'js-ago';

export default function DeliveryData({order_list}) {
    let [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {setScreenWidth(window.innerWidth)},[]);
    

   
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
  return (
    <>
        <div className="buyer-checkout-delivery-info">

            <div className="delivery-info-head">
                <span>Delivery Details</span>
            </div>
            <hr />

            <div className="seller-order-card shadow-sm" style={{position: 'relative', display: 'flex', background: '#fff', margin: '5px 0 5px 0', height: 'auto'}}>
                <div style={{height: '100%', width: screenWidth > 760 ? '20%' : '20%', borderRadius: '5px', display: 'table', margin: '0 auto'}}>
                    <Thumbnail product_id={order_list?.product?.product_id} />
                </div>

                <div style={{position: 'absolute', top: '5px', right: '5px', padding: '4px'}}>
                    <img src={ellipsisSvg} style={{height: '10px', width: '10px'}} alt="..." />
                </div>
                
                <div className="seller-order-body" style={{width: 'calc(80%)', position: 'relative'}}>
                    {/* <img src={deleteSvg}alt="" /> */}

                    <div className="seller-order-title" style={{display: 'flex', width: '80%', fontSize: 'medium', height: '40%', alignItems: 'center', fontWeight: '500'}}>
                        <p style={{
                            whiteSpace: 'nowrap', /* Prevent text from wrapping */
                            overflow: 'hidden',    /* Hide any overflow text */
                            textOverflow: 'ellipsis'
                        }}>{order_list?.product?.title}</p>
                    </div>
                    <div className="seller-order-id" style={{display: 'flex', height: '40px', alignItems: 'flex-start'}}>
                        <h3 style={{fontWeight: '500', fontSize: 'small'}}>&#8358;{
                                new Intl.NumberFormat('en-us').format(order_list?.product?.price)}</h3>
                    </div>
                    <div className="seller-order-id" style={{display: 'flex', height: '40px', alignItems: 'flex-start'}}>
                        <p style={{fontWeight: '500', fontSize: 'small'}}>Order-code: {order_list?.order?.order_id}</p>
                    </div>
{/* <hr /> */}
                    <div className="seller-order-status" style={{background: '#fff', color: '#FF4500'}}>
                        {order_list?.order?.status.state}
                    </div>
                    

                    <div className="seller-order-date" style={{bottom: '5px'}}>
                        {order_list
                        ?
                        js_ago(new Date(order_list.order.date))
                        :
                        ''}
                    </div>

                </div>
            
            </div>

            <div className="delivery-pick-up-station">
                <div className='delivery-info-head'>
                    <span>Delivery Address</span>
                    <span>Change</span>
                </div>

                <hr />
                {
                    order_list !== ''
                    ?
                    order_list?.order?.pick_up_channels.map(item=> 
                        <div className='shadow-sm' style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'space-between', border: '1px solid #FF4500', flexDirection: 'row', padding: '5px 5px 5px 10px', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px', marginBottom: '10px'}}>
                            
                            <section style={{width: '80%', fontSize: 'small', fontWeight: '400'}}>
                                <b>{item.channel}</b>
                                <br />
                                <div>
                                {item.locale}
                                </div>
                                <div>
                                {
                                    item.date.dy
                                }
                                &nbsp;
                                <span style={{textTransform: 'capitalize'}}>{
                                    list.current[item.date.mth].month
                                }</span>
                                &nbsp;
                                {
                                    item.date.yr
                                }
                                </div>
                            </section>
                            <button onClick={e => window.location.href=(`/checkout/${item.product.product_id}`)} className='shadow-sm' style={{position: 'absolute', top: '5px', right: '5px', height: 'auto', width: 'auto', display: 'flex', alignItems: 'center', justifyContents: 'center', padding: '5px', textAlign: 'center', background: '#fff', color: '#FF4500', fontSize: 'small', float: 'right', color: '#fff', background: '#FF4500'}}>{
                                'Edit'
                            }</button>
                        </div>
                    )
                    :
                    ''
                }

                
            </div>

            {/* <br /> */}

            

        </div>
    </>
  )
}

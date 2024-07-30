import React, { useEffect, useRef, useState } from 'react'   
import Thumbnail from '../Thumbnail';
import ellipsisSvg from '../../../assets/ellipsis-svgrepo-com.svg'
import js_ago from 'js-ago';
import PickupChannel from '../Product/PickupChannel';

export default function DeliveryData({order_list}) {
    let [screenWidth, setScreenWidth] = useState(0);
    let [locale, setLocale] = useState([]);
    let [pickUpChannel, setpickUpChannel] = useState('');

    useEffect(() => {setScreenWidth(window.innerWidth)},[]);
   
   
  return ( 
    <>
      
        <div className="buyer-checkout-delivery-info">

            <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center'}}>Delivery Details</h6>
            
            <div className="delivery-pick-up-station">

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
                            <button  onClick={e => {
                                let overlay = document.querySelector('.location-overlay')
                                overlay.setAttribute('id', 'location-overlay');
                                setpickUpChannel(order_list?.order?.pick_up_channels?.filter((data) => data?.channel?.toLowerCase() === item?.channel?.toLowerCase())[0]?.channel)
                            }} className='shadow-sm' style={{position: 'absolute', top: '5px', right: '5px', height: 'auto', width: 'auto', display: 'flex', alignItems: 'center', justifyContents: 'center', padding: '5px', textAlign: 'center', background: '#fff', color: '#FF4500', fontSize: 'small', float: 'right', color: '#fff', background: '#FF4500'}}>{
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

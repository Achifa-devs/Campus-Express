import React, { useEffect, useRef, useState } from 'react'   
import Thumbnail from '../Thumbnail';
import ellipsisSvg from '../../../assets/ellipsis-svgrepo-com.svg'
import js_ago from 'js-ago';
import PickupChannel from '../Product/PickupChannel';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function DeliveryData({order_list}) {
    let [screenWidth, setScreenWidth] = useState(0);

    let pathname = usePathname()
    
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
      
        <div className="buyer-checkout-delivery-info" style={{margin: '0 0 5px 0'}}>

            <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center'}}>Delivery Details</h6>
            
            <div className="delivery-pick-up-station" style={{padding: '10px', background: '#fff'}}>

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
                            <button className='shadow-sm' style={{position: 'absolute', top: '5px', right: '5px', height: 'auto', width: 'auto', display: 'flex', alignItems: 'center', justifyContents: 'center', padding: '5px', textAlign: 'center', background: '#fff', color: '#FF4500', fontSize: 'small', float: 'right', color: '#fff', background: '#FF4500'}}>
                                <Link href={{ pathname: `/new-order/${pathname.split('/').splice(-1)[0]}`, query: { order_id: order_list?.order?.order_id } }}>
                                {
                                'Edit'
                                }
                                </Link>
                            </button>
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

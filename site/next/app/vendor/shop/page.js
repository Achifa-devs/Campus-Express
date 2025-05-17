"use client"
import React, { useEffect, useRef, useState } from 'react'
import './styles/xx-large.css'
import './styles/x-large.css'
import './styles/large.css'
import './styles/medium.css'
import './styles/small.css'
import { useSelector } from 'react-redux'
import { seller_overlay_setup } from '@/files/reusable.js/overlay-setup'
import { open_notice } from '@/files/reusable.js/notice'

export default function Shop() {
    let {
        user_id
    }=useSelector(s=>s.user_id);

    let [shop, setShop] = useState('')

    useEffect(() => {
        seller_overlay_setup(true, 'Loading Page...')    
    }, [])



    useEffect(() => {
        if(user_id !== 'null' && user_id !== null && user_id !== ''){
            seller_overlay_setup(false, '')    
        }
    }, [user_id])

    useEffect(() => {
        if(user_id !== 'null' && user_id !== null && user_id !== '' && user_id !== undefined){
            seller_overlay_setup(true, 'Getting Your Shop Ready');

            fetch(`/api/vendor/shop`, {
                method: 'post',
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    user_id
                })
            })
            .then(async(result) => {
                seller_overlay_setup(false, '')
                let response = await result.json(); 
                if (response?.bool) {
                    setShop(response?.shop)
                    
                    document.querySelector('.shop-overlay').removeAttribute('id');

                }else{
                    // seller_overlay_setup(false, '')
                    // open_notice(true, 'Error occured, refresh. please check your network')
                    // window.location.reload()
                    document.querySelector('.shop-overlay').setAttribute('id', 'shop-overlay')
                }

            })
            .catch((error) => {
                // seller_overlay_setup(false, '')
                // window.location.reload()
                open_notice(true, 'Error occured, refresh. please check your network')
                
                console.log(error)
            }) 
        }else{
            // seller_overlay_setup(false, '')
        }
    }, [user_id])

    

    


    

  return (
    <>
        
        <div className="seller-shop">
            <div>
                <b>Hey dear,</b> here is a resume of where <b>{shop?.title ? shop?.title : 'Your shop'}</b> is at
            </div>
            <hr />

            <div className="seller-shop-cnt">
                <div className="seller-shop-learner">
                    <div className='learner-cnt' style={{padding: '0px 15px'}}>
                        <div>
                            <h6>Publish New Item Now</h6>
                        </div>

                    </div>

                    <ul className='learner-data-cnt'>
                        <li style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', flexDirection: 'row', color: '#FF4500', border: '1px solid #FF4500'}}  className='learner-data' onClick={e => window.location.href=('/vendor/new-listing/')}>Add New Product To Your Listing </li>
                    </ul>
                </div> 
                <div className="seller-shop-metrics">
                    <div className='metrics-cnt'>
                        <div>
                            <h5>Business Metrics</h5>
                        </div>

                        <ul>
                            <li>9 days</li>
                            <li>30 days</li>
                            <li>90 days</li>
                        </ul>
                    </div>

                    <ul className='metrics-data-cnt'>
                        <li style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', flexDirection: 'column'}} className='metrics-data'>
                            <div>Revenue</div>
                            <div>&#8358; {new Intl.NumberFormat('en-us').format(0.00)}</div>
                        </li>
                        <li style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', flexDirection: 'column'}} className='metrics-data'>
                            <div>Items Sold</div>
                            <div>0</div>
                        </li>
                        <li style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', flexDirection: 'column'}} className='metrics-data'>
                            <div>Items Rejected</div>
                            <div>0</div>
                        </li>
                    </ul>
                </div>

                {/* <div className="seller-shop-learner">
                    <div className='learner-cnt' style={{padding: '0px 15px'}}>
                        <div>
                            <h6>Learn how to do</h6>
                        </div>

                    </div>

                    <ul className='learner-data-cnt'>
                        <li className='learner-data'></li>
                        <li className='learner-data'></li>
                        <li className='learner-data'></li>
                    </ul>
                </div> */}
            
            </div>
        </div>
    </>
  )
}

"use client"
import React, { useEffect, useRef, useState } from 'react'
import './styles/xx-large.css'
import './styles/x-large.css'
import './styles/large.css'
import './styles/medium.css'
import './styles/small.css'
import ProductSvg from '@/files/assets/product-service-campaign-svgrepo-com.svg'
import ServiceSvg from '@/files/assets/services-svgrepo-com.svg'
import RentalSvg from '@/files/assets/rental-income-svgrepo-com.svg' 
import { useSelector } from 'react-redux'
import { seller_overlay_setup } from '@/files/reusable.js/overlay-setup'
import { open_notice } from '@/files/reusable.js/notice'
import axios from 'axios'
import Image from 'next/image'

export default function Shop() {
    let {
        user_id
    }=useSelector(s=>s.user_id);

    let [shop, setShop] = useState('')
    // let [shopExist, setShopExist] = useState(false)

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

            axios.get("/api/vendor/shop", { params: { user_id } })
            .then((result) => {
                seller_overlay_setup(false, '');
                const response = result.data; // axios auto-parses JSON

                if (response?.success) {
                    setShop(response?.shop);

                    document.querySelector('.shop-overlay').removeAttribute('id');
                } else {
                    // seller_overlay_setup(false, '')
                    // open_notice(true, 'Error occurred, refresh. Please check your network')
                    window.location.href = '/vendor/signup';
                    document.querySelector('.shop-overlay').setAttribute('id', 'shop-overlay');
                }
            })
            .catch((error) => {
                // seller_overlay_setup(false, '')
                // window.location.reload()
                open_notice(true, 'Error occurred, please check your network and refresh.');
                console.error(error);
            });

        }else{
            // seller_overlay_setup(false, '')
        }
    }, [user_id])

    

   

    function newLisiting(){
        if(document.querySelector('.purpose-overlay').hasAttribute('id')){
            document.querySelector('.purpose-overlay').removeAttribute('id');
        }else{
            document.querySelector('.purpose-overlay').setAttribute('id', 'purpose-overlay');
        }
        // set_purpose('')
    }

    

  return (
    <>
        
        <div className="purpose-overlay">
            <OfferPurpose />
        </div>
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
                        <li style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', flexDirection: 'row', color: '#FF4500', border: '1px solid #FF4500'}}  className='learner-data' onClick={e => newLisiting()}>Add New Offer To Your Listing </li>
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





function OfferPurpose(){


    return(
        <>
            <div className="offer-purpose">
                <div style={{padding: '10px'}}>
                    <h6 style={{marginBottom: '8px'}}>What is the purpose of this offer?</h6>
                    <p style={{fontSize: '12px', color: '#666'}}>This helps us categorize your offer correctly</p>
                </div>

                <ul style={{margin: '0px', padding: '0px'}}>
                    <li style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'}} onClick={e=>window.location.href =('/vendor/new-listing?purpose=product')}>
                        <div>
                            <Image style={{height: '18px', width: '18px'}} src={ProductSvg} alt="Product" />
                        </div>
                        <div style={{width: '80%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'column'}}>
                            <b>Product</b>
                            <p style={{fontSize: '12px', color: '#666'}}>I am selling a physical item</p>
                        </div>
                    </li>
                    <li style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'}} onClick={e=>window.location.href =('/vendor/new-listing?purpose=service')}>
                        <div>
                            <Image style={{height: '18px', width: '18px'}} src={ServiceSvg} alt="Service" />
                        </div>
                        <div style={{width: '80%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'column'}}>
                            <b>Service</b>
                            <p style={{fontSize: '12px', color: '#666'}}>I am offering a service</p>
                        </div>
                    </li>
                    <li style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'}} onClick={e=>window.location.href =('/vendor/new-listing?purpose=accomodation')} >
                        <div>
                            <Image style={{height: '18px', width: '18px'}} src={RentalSvg} alt="Rental" />
                        </div>
                        <div style={{width: '80%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'column'}}>
                            <b>Accommodation</b>
                            <p style={{fontSize: '12px', color: '#666'}}>I am renting out an accommodation</p>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}
import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import deleteSvg from '../../../assets/delete-svgrepo-com (2).svg';
import { useDispatch, useSelector } from 'react-redux';
import { setPickupChannelTo } from '../../../redux/buyer_store/pickup_channel';
import { GetOrders } from '../../../api/buyer/get';
import PickupChannel from './PickupChannel';

export default function Aside({item,order_list}) {
  let [locale, setLocale] = useState([]);
  let [pickUpChannel, setpickUpChannel] = useState('');

  let {buyerData} = useSelector(s => s.buyerData)


  let dispatch = useDispatch()

  function addLocation(channel) {
    let buyer = window.localStorage.getItem('CE_buyer_id');
    if(buyer === null || buyer === '' || buyer === 'null'){
      window.location.href=(`/login?page=product&data=${item.product_id}`)
    }else{
      setpickUpChannel(channel)
      let overlay = document.querySelector('.location-overlay')
      overlay.setAttribute('id', 'location-overlay');
    }
  }

  function deleteLocation(data) {
    let newLocaleList = locale.filter(item => item.index !== data)
    setLocale(newLocaleList)
  }
  function updateLocation(data) {
    setLocale(item => [...item,{channel: pickUpChannel, locale: data.locale, date: data.date, index: locale.length}])
  }

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

 useEffect(() => {
  // setPickupChannel(locale)
  dispatch(setPickupChannelTo(locale))
 },[locale])

  return (
    <>
        <div className="location-overlay" style={{height: '100vh', width: '100vw'}}>
            <PickupChannel updateLocation={updateLocation} title={pickUpChannel} />
        </div>
        <div className="buyer-product-aside" style={{padding: '0px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start', height: 'fit-content', width: '100%'}}>
          <div style={{padding: '0px'}}>
            <h2 style={{padding: '10px', color: '#FF4500', fontWeight: '500'}}>Delivery and Returns</h2>

            <div style={{margin: '0px 0 0 0'}}>
              <section>

              <div style={{border: '1px solid #f9f9f9', padding: '10px', margin: '0 0 0 0'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{fontWeight: '500', fontSize: 'small'}}>Return Policy</span>
                    <span style={{fontWeight: '500', fontSize: 'small'}}>View</span>   
                  </div> 
                  <hr />
                  <div style={{padding: '6px'}}>
                    <small>Free return within 7 days for ALL eligible items Details</small>
                  </div>
               </div>

               

               <div style={{border: '1px solid #f9f9f9', padding: '5px', margin: '0 0 0 0', pointerEvents: order_list.filter((data) => data?.product?.product_id === item?.product_id && data?.order?.buyer_id === buyerData.buyer_id).length > 0 ? 'none':'all', opacity: order_list.filter((data) => data?.product?.product_id === item?.product_id && data?.order?.buyer_id === buyerData?.buyer_id).length > 0?'.5':'1'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{fontWeight: '500', fontSize: 'small'}}>Pickup Station</span>
                    {/* <span style={{fontWeight: '500', fontSize: 'small'}}>Change</span>     */}
                  </div>
                  <hr />
                  {/* <br /> */}
                  
               </div>

               
              </section>
            </div>

            
          </div>

          {/* <div style={{padding: '10px'}}>
            <h3>Seller Information</h3>
            <hr />
            <br />

            <small style={{lineHeight: '12px', marginBottom: '10px'}}>Campus Express</small>

          </div> */}
        </div>
    </>
  )
}







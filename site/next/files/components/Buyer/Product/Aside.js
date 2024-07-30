import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPickupChannelTo } from '@/redux/buyer_store/pickup_channel';
import returnSvg from '@/files/assets/return-svgrepo-com.svg';
import deliverySvg from '@/files/assets/delivery-svgrepo-com (1).svg'
import nextSvg from '@/files/assets/back-svgrepo-com (3).svg'
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
        <div className="buyer-product-aside" style={{padding: '0px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start', height: 'auto', width: '100%', background: '#f9f9f9'}}>
          <div style={{padding: '0px', width: '100%', background: '#fff'}}>
            <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center'}}>Delivery & Returns</h6>
            <div style={{margin: '0px', width: '100%'}}>
              <section style={{width: '100%'}}>
                <h6 className="" style={{padding:'10px', margin: '0', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center'}}>Chooose Your Location</h6>

                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%', padding: '10px'}}>
                  <div className="input-cnt" style={{marginBottom: '10px', width: '100%'}}>
                    <select name="" id="" style={{width: '100%', height: '50px'}}>
                      <option value="">Select State</option>
                    </select>
                  </div>

                  <div className="input-cnt" style={{marginBottom: '10px', width: '100%'}}>
                    <select name="" id="" style={{width: '100%', height: '50px'}}>
                      <option value="">Select Town</option>
                    </select>
                  </div>
                </div>

                <div className="input-cnt" style={{marginBottom: '10px', width: '100%', padding: '10px'}}>
                  <section style={{display: 'flex', justifyContent: 'space-between', padding: '8px', border: '1px solid #efefef'}}>
                    <div>
                      <img loading='lazy' src={deliverySvg.src} style={{height: '30px', width: '30px'}} alt="" />
                    </div>
                    <div style={{padding: '0px 8px'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                        <small style={{fontWeight: '500'}}>Pickup Station</small>
                        <small style={{fontSize: 'small'}}>Details</small>
                      </div>
                      <div style={{fontSize: '12px', lineHeight: '15px', marginBottom: '5px'}}>Delivery Fees ₦ 600</div>
                      <div style={{fontSize: '12px', lineHeight: '15px'}}>Arriving at pickup station between 07 August & 09 August when you order within next 9hrs 22mins</div>
                    </div>
                  </section>

                  <section style={{display: 'flex', justifyContent: 'space-between', padding: '8px', border: '1px solid #efefef'}}>
                    <div>
                      <img loading='lazy' src={returnSvg.src} style={{height: '30px', width: '30px'}} alt="" />
                    </div>
                    <div style={{padding: '0px 8px'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                        <small style={{fontWeight: '500'}}>Return Policy</small>
                        <small style={{fontSize: 'small'}}>Details</small>
                      </div>
                      <div style={{fontSize: '12px', lineHeight: '15px'}}>Free return within 7 days for ALL eligible items</div>
                    </div>
                  </section>
                </div>
              </section>

              <section>

              </section>
            </div>
          </div>

          <br />

          <div style={{padding: '0px',  width: '100%', background: '#f9f9f9'}}>
            <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center'}}>Seller Information</h6>
            <div style={{margin: '0px'}}>
              <section>
                <div style={{display: 'flex', justifyContent: 'flex-start', marginBottom: '1px', flexDirection: 'column', background: '#fff', border: '1px solid #f9f9f9', padding: '10px'}}>
                    <div style={{fontSize: '12px', lineHeight: '15px', fontWeight: '500', marginBottom: '12px', display: 'flex', justifyContent: 'space-between'}}>
                      <span>Miya's Mall</span>
                      <span>
                        <img loading='lazy' src={nextSvg.src} style={{height: '16px', width: '16px', rotate: '180deg', cursor: 'pointer'}} alt="" />
                      </span>
                    </div>
                    <div style={{fontSize: '12px', lineHeight: '15px', marginBottom: '3px'}}>54% Seller score</div>
                    <div style={{fontSize: '12px', lineHeight: '15px', marginBottom: '3px', display: 'flex', justifyContent: 'space-between'}}>
                      <span>30 Followers</span>
                      <span>
                        <button className='shadow' style={{height: '30px', width: '60', borderRadius: '2.5px'}}>
                          Follow
                        </button>
                      </span>
                    </div>
                </div>
              </section>
            </div>
            
            <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #fff', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center'}}>Seller Performance</h6>
            <div style={{margin: '0px'}}>
              <section>
                <div style={{display: 'flex', justifyContent: 'flex-start', marginBottom: '0px', flexDirection: 'column', background: '#fff', border: '1px solid #fff', padding: '10px'}}>
                    <div style={{fontSize: '12px', lineHeight: '15px', marginBottom: '12px'}}>Order Fulfillment Rate: Poor</div>
                    <div style={{fontSize: '12px', lineHeight: '15px', marginBottom: '12px'}}>Quality Score: Excellent</div>
                    <div style={{fontSize: '12px', lineHeight: '15px', marginBottom: '12px'}}>Customer Rating: Average</div>
                </div>
              </section>
            </div>
            
          </div>
        </div>
    </>
  )
}







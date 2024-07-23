import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPickupChannelTo } from '../../../redux/buyer_store/pickup_channel';
import deleteSvg from '../../../assets/delete-svgrepo-com (2).svg';
import PickupChannel from '../Product/PickupChannel';
import { openNotice } from '../../../Functions/notice';

export default function DeliveryAddress({item}) {
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
        if(data.locale.split(',')[0]!=='' && data.locale.split(',')[1]!=='' && data.locale.split(',')[2]!=='' && data.locale.split(',')[3]!=='' && data.date.mth !== '' && data.date.day !== null){
            setLocale(item => [...item,{channel: pickUpChannel, locale: data.locale, date: data.date, index: locale.length}])
        }else{
            openNotice(
              'Please Ensure No Field Is Empty'
            )
        }
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
        <div className="notice-cnt">
            <div className="notice-cnt-btn">
                x
            </div>
        </div>
            
        <div className="location-overlay" style={{height: '100vh', width: '100vw'}}>
            <PickupChannel updateLocation={updateLocation} title={pickUpChannel} />
        </div>
        <div className="buyer-checkout-delivery-info">
            <div className="delivery-pick-up-station" >
                <div className='delivery-info-head'>
                    <span>Delivery Address</span>
                    {/* <span>Change</span> */}
                </div>

                <hr />
                <br />
                <div className='' style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'space-between', border: '1px solid #FF4500', flexDirection: 'row', padding: '0', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px', marginBottom: '10px', border: 'none'}}>
                            
                <div style={{padding: '0', width: '100%'}}>

                    <div className='shadow-sm' style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', position: 'relative', border: 'none', padding: '10px'}}>
                    <section style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'row-reverse', width: '80%'}}>
                        <label style={{height: '20px', padding: '0', width: '100%', display: 'flex', alignItems: 'flex-end', fontSize: 'small'}} htmlFor="">Custom Location Pickup</label>
                        &nbsp;&nbsp;<input style={{height: '20px', width: '20px'}} type="checkbox" checked name="" id="" />
                            
                    </section>
                    <section style={{padding: '10px', fontSize: '12', fontWeight: '400'}}>
                        <small style={{fontSize: 'small'}}>
                        You Will Pickup The Item At The Designated Shop Provided By The You (Charges Applies)
                        </small>
                    </section>
                    
                    <button onClick={e => addLocation('Custom Location Pickup')} className='shadow-sm' style={{position: 'relative', height: 'auto', width: 'auto', display: 'flex', alignItems: 'center', justifyContents: 'center', padding: '10px', textAlign: 'center', background: '#fff', color: '#FF4500', fontSize: 'small', float: 'right', color: '#fff', background: '#FF4500'}}>Add location</button>
                    <section  style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', padding: '10px', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px'}}>
                        {
                        locale.map((item) => 
                            item.channel === 'Custom Location Pickup'
                            ?
                            <div className='shadow-sm' style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'space-between', border: '1px solid #FF4500', flexDirection: 'row', padding: '5px 5px 5px 10px', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px', marginBottom: '10px'}}>
                                <section style={{width: '80%', fontSize: 'small', fontWeight: '400'}}>
                                <div>
                                {item.locale}
                                </div>
                                <div>
                                {
                                    item.date.dy
                                }
                                &nbsp;
                                <span style={{textTransform: 'capitalize'}}>{
                                    list.current[item?.date?.mth]?.month
                                }</span>
                                &nbsp;
                                {
                                    item.date.yr
                                }
                                </div>
                                </section>
                                <button  onClick={e=>deleteLocation(item.index)} style={{width: '35px', height: '35px', padding: '5px', textAlign: 'center', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <img src={deleteSvg} style={{height: '100%', margin: '0', left: 'unset', float: 'unset', width: '100%', position: 'relative'}} alt="" />
                                </button>
                            </div>
                            :
                            ''
                        )
                        }
                    </section>
                    </div>
                    <br />
                    <div className='shadow-sm' style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', position: 'relative', border: 'none', padding: '10px'}}>
                    <section style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'row-reverse', width: '80%'}}>
                        <label style={{height: '20px', padding: '0', width: '100%', display: 'flex', alignItems: 'flex-end', fontSize: 'small'}} htmlFor="">Door Step Delivery</label>
                        &nbsp;&nbsp;<input style={{height: '20px', width: '20px'}} type="checkbox" checked name="" id="" />
                        
                    </section>
                    <section style={{padding: '10px', fontSize: '12', fontWeight: '400'}}>
                        <small style={{fontSize: 'small'}}>
                            The Item Will Be Delivered At Your Door Step (Charges Applies)
                        </small>
                    </section>
                    
                    <button onClick={e => addLocation('Door Step Delivery')} className='shadow-sm' style={{position: 'relative', height: 'auto', width: 'auto', display: 'flex', alignItems: 'center', justifyContents: 'center', padding: '10px', textAlign: 'center', background: '#fff', color: '#FF4500', fontSize: 'small', float: 'right', color: '#fff', background: '#FF4500'}}>Add location</button>
                    <section style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', padding: '10px', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px'}}>
                        {
                            locale.map((item) => 
                                item.channel === 'Door Step Delivery'
                                ?
                                <div className='shadow-sm' style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'space-between', border: '1px solid #FF4500', flexDirection: 'row', padding: '5px 5px 5px 10px', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px', marginBottom: '10px'}}>
                                    <section style={{width: '80%', fontSize: 'small', fontWeight: '400'}}>
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
                                    <button  onClick={e=>deleteLocation(item.index)} style={{width: '35px', height: '35px', padding: '5px', textAlign: 'center', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <img src={deleteSvg} style={{height: '100%', margin: '0', left: 'unset', float: 'unset', width: '100%', position: 'relative'}} alt="" />
                                    </button>
                                </div>
                                :
                                ''
                            )
                        }
                    </section>
                    </div>
                    </div>
                </div>

                
            </div>
        </div>

    </>
  )
}

import React, { useEffect, useState } from 'react';
import '../../../styles/location-overlay.css';
import deleteSvg from '../../../assets/delete-svgrepo-com (2).svg';

export default function Pickup() {

    let [locale, setLocale] = useState([]);
    let [pickUpChannel, setpickUpChannel] = useState('');

    function addLocation(channel) {
        setpickUpChannel(channel)
        let overlay = document.querySelector('.location-overlay')
        overlay.setAttribute('id', 'location-overlay');
    }

    function deleteLocation(data) {
        let newLocaleList = locale.filter(item => item.index !== data)
        setLocale(newLocaleList)
    }
    function updateLocation(data) {
        setLocale(item => [...item,{channel: pickUpChannel, locale: data, index: locale.length}])
    }

  return (
    <>
        <div className="location-overlay" >
            <LocationSetup updateLocation={updateLocation} />
        </div>

        <div className="pickup-channel-cnt" style={{background: '#fff', padding: '20px'}}>
            <h5 style={{color: '#FF4500', fontWeight: '500'}}>PickUp Channel</h5>
            <br />
            <div className="input-cnt">
                <div style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', position: 'relative', border: '1px solid #FF4500', padding: '10px'}}>
                    <section style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'row-reverse'}}>
                        <label style={{height: '20px', padding: '0', width: 'auto', display: 'flex', alignItems: 'flex-end'}} htmlFor="">Shop Pickup</label>
                        &nbsp;&nbsp;<input style={{height: '20px', width: '20px'}} type="checkbox" name="" id="" />
                        <button onClick={e => addLocation('Shop Pickup')} className='shadow-sm' style={{position: 'absolute', top: '2.5px', right: '5px', height: '40px', width: 'auto', padding: '10px', background: '#fff', color: '#FF4500', fontSize: 'small'}}>Add Location</button>
                    </section>
                    <section style={{padding: '10px', fontSize: '12', fontWeight: '400'}}>
                        <small>
                            Drop off your item at a designated shop for the buyer to pick up at their convenience. Ideal for sellers with physical store locations.
                        </small>
                    </section>
                    <section style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', padding: '10px', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px'}}>
                        {
                            locale.map((item) => 
                                item.channel === 'Shop Pickup'
                                ?
                                <div className='shadow-sm' style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'space-between', border: '1px solid #FF4500', flexDirection: 'row', padding: '5px 5px 5px 10px', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px', marginBottom: '10px'}}>
                                    <section style={{width: '80%', fontSize: 'small', fontWeight: '400'}}>{item.locale}</section>
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
                <div style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', position: 'relative', border: '1px solid #FF4500', padding: '10px'}}>
                    <section style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'row-reverse'}}>
                        <label style={{height: '20px', padding: '0', width: 'auto', display: 'flex', alignItems: 'flex-end'}} htmlFor="">Cutom Location Pickup</label>
                        &nbsp;&nbsp;<input style={{height: '20px', width: '20px'}} type="checkbox" name="" id="" />
                        <button onClick={e => addLocation('Cutom Location Pickup')} className='shadow-sm' style={{position: 'absolute', top: '2.5px', right: '5px', height: '40px', width: 'auto', padding: '10px', background: '#fff', color: '#FF4500', fontSize: 'small'}}>Add Location</button>
                    </section>
                    <section style={{padding: '10px', fontSize: '12', fontWeight: '400'}}>
                        <small>
                            Arrange a specific location for the buyer to pick up the item. Perfect for sellers who prefer a flexible and agreed-upon meeting point.
                        </small>
                    </section>
                    <section  style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', padding: '10px', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px'}}>
                        {
                            locale.map((item) => 
                                item.channel === 'Cutom Location Pickup'
                                ?
                                <div className='shadow-sm' style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'space-between', border: '1px solid #FF4500', flexDirection: 'row', padding: '5px 5px 5px 10px', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px', marginBottom: '10px'}}>
                                    <section style={{width: '80%', fontSize: 'small', fontWeight: '400'}}>{item.locale}</section>
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
               
                <div style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', position: 'relative', border: '1px solid #FF4500', padding: '10px'}}>
                    <section style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'row-reverse'}}>
                        <label style={{height: '20px', padding: '0', width: 'auto', display: 'flex', alignItems: 'flex-end'}} htmlFor="">Door Step Pickup</label>
                        &nbsp;&nbsp;<input style={{height: '20px', width: '20px'}} type="checkbox" name="" id="" />
                        <button onClick={e => addLocation('Door Step Pickup')} className='shadow-sm' style={{position: 'absolute', top: '2.5px', right: '5px', height: '40px', width: 'auto', padding: '10px', background: '#fff', color: '#FF4500', fontSize: 'small'}}>Add Location</button>
                    </section>
                    <section style={{padding: '10px', fontSize: '12', fontWeight: '400'}}>
                        <small>
                            Have the item picked up directly from your doorstep by the buyer or a courier service. Convenient for sellers who prefer not to leave their home or office.
                        </small>
                    </section>
                    <section  style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', padding: '10px', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px'}}>
                        {
                            locale.map((item) => 
                                item.channel === 'Door Step Pickup'
                                ?
                                <div className='shadow-sm' style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'space-between', border: '1px solid #FF4500', flexDirection: 'row', padding: '5px 5px 5px 10px', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px', marginBottom: '10px'}}>
                                    <section style={{width: '80%', fontSize: 'small', fontWeight: '400'}}>{item.locale}</section>
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
                <div style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', position: 'relative', border: '1px solid #FF4500', padding: '10px'}}>
                    <section style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'row-reverse'}}>
                        <label style={{height: '20px', padding: '0', width: 'auto', display: 'flex', alignItems: 'flex-end'}} htmlFor="">Seller Delivery to Buyer Door Step</label>
                        &nbsp;&nbsp;<input style={{height: '20px', width: '20px'}} type="checkbox" name="" id="" />
                        <button onClick={e => addLocation('Seller Delivery to Buyer Door Step')} className='shadow-sm' style={{position: 'absolute', top: '2.5px', right: '5px', height: '40px', width: 'auto', padding: '10px', background: '#fff', color: '#FF4500', fontSize: 'small'}}>Add Location</button>
                    </section>
                    <section style={{padding: '10px', fontSize: '12', fontWeight: '400'}}>
                        <small>
                            Deliver the item directly to the buyer's doorstep yourself. Provides a personal touch and ensures the item reaches the buyer quickly and securely. Sellers can add shipping fees here.
                        </small>
                    </section>
                    <section className='shadow-sm' style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', padding: '5px 5px 5px 10px', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px'}}>
                        {
                            locale.map((item) => 
                                item.channel === 'Seller Delivery to Buyer Door Step'
                                ?
                                <div className='shadow-sm' style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'space-between', border: '1px solid #FF4500', flexDirection: 'row', padding: '5px 5px 5px 10px', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px', marginBottom: '10px'}}>
                                    <section style={{width: '80%', fontSize: 'small', fontWeight: '400'}}>{item.locale}</section>
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
                <div style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', position: 'relative', border: '1px solid #FF4500', padding: '10px'}}>
                    <section style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'row-reverse'}}>
                        <label style={{height: '20px', padding: '0', width: 'auto', display: 'flex', alignItems: 'flex-end'}} htmlFor="">Custom Location Pickup Selected By Buyer</label>
                        &nbsp;&nbsp;<input style={{height: '20px', width: '20px'}} type="checkbox" name="" id="" />
                        <button onClick={e => addLocation('Cutom Location Pickup')} className='shadow-sm' style={{position: 'absolute', top: '2.5px', right: '5px', height: '40px', width: 'auto', padding: '10px', background: '#fff', color: '#FF4500', fontSize: 'small'}}>Add Location</button>
                    </section>
                    <section style={{padding: '10px', fontSize: '12', fontWeight: '400'}}>
                        <small>
                            Buyer will arrange a specific location to pick up the item. Sellers can add shipping fees here.
                        </small>
                    </section>
                    <section  style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', padding: '10px', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px'}}>
                        {
                            locale.map((item) => 
                                item.channel === 'Cutom Location Pickup'
                                ?
                                <div className='shadow-sm' style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'space-between', border: '1px solid #FF4500', flexDirection: 'row', padding: '5px 5px 5px 10px', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px', marginBottom: '10px'}}>
                                    <section style={{width: '80%', fontSize: 'small', fontWeight: '400'}}>{item.locale}</section>
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
    </>
  )
}


function LocationSetup({updateLocation}) {

    let [state, setState] = useState('')
    let [city, setCity] = useState('')
    let [address1, setAddress1] = useState('')
    let [address2, setAddress2] = useState('')
    let [address3, setAddress3] = useState('')

    function addLocation() {
        let res = ([state,city,address1,address2,address3].map(item=>item).join(', '))
        updateLocation(res)
        rmLocation()
    }

    function rmLocation() {
        let overlay = document.querySelector('.location-overlay')
        overlay.removeAttribute('id');
    }

    return(
        <>
            <div style={{background: '#fff', width: '400px', padding: '20px', borderRadius: '10px'}}>
                <section>
                    <div className="input-cnt">
                        <label htmlFor="">State</label>
                        <input onInput={e => setState(e.target.value)} type="text" name="" id="" />
                    </div>

                    <div className="input-cnt">
                        <label htmlFor="">City/Town</label>
                        <input onInput={e => setCity(e.target.value)} type="text" name="" id="" />
                    </div>

                    <div className="input-cnt">
                        <label htmlFor="">Address 1(Street Name)</label>
                        <input onInput={e => setAddress1(e.target.value)} type="text" name="" id="" />
                    </div>

                    <div className="input-cnt">
                        <label htmlFor="">Address 2(Bus Stop/)</label>
                        <input onInput={e => setAddress2(e.target.value)} type="text" name="" id="" />
                    </div>

                    <div className="input-cnt">
                        <label htmlFor="">Address 3(Building Name)</label>
                        <input onInput={e => setAddress3(e.target.value)} type="text" name="" id="" />
                    </div>
                </section>

                <div style={{display: 'flex', alignItems: 'center', fontWeight: '500', padding: '10px', fontSize: '20', justifyContent: 'space-between', flexDirection: 'row', position: 'relative'}}>
                    <button onClick={e => addLocation()} style={{width: '48%'}}>Add</button>
                    <button onClick={e => rmLocation()} style={{width: '48%'}}>Cancel</button>
                </div>
            </div>
        </> 
    )
}
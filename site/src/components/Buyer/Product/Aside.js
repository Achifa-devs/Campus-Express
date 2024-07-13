import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import deleteSvg from '../../../assets/delete-svgrepo-com (2).svg';
import { useDispatch, useSelector } from 'react-redux';
import { setPickupChannelTo } from '../../../redux/buyer_store/pickup_channel';

export default function Aside({item}) {
  let [locale, setLocale] = useState([]);
  let [pickUpChannel, setpickUpChannel] = useState('');


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
            <LocationSetup updateLocation={updateLocation} title={pickUpChannel} />
        </div>
        <div className="buyer-product-aside" style={{padding: '0px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start', height: 'fit-content'}}>
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

               

               <div style={{border: '1px solid #f9f9f9', padding: '5px', margin: '0 0 0 0'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{fontWeight: '500', fontSize: 'small'}}>Pickup Station</span>
                    {/* <span style={{fontWeight: '500', fontSize: 'small'}}>Change</span>     */}
                  </div>
                  <hr />
                  {/* <br /> */}
                  <div style={{padding: '5px'}}>
                    <div className='shadow-sm' style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', position: 'relative', border: 'none', padding: '10px'}}>
                    <section style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'row-reverse', width: '80%'}}>
                          <label style={{height: '20px', padding: '0', width: '100%', display: 'flex', alignItems: 'flex-end', fontSize: 'small'}} htmlFor="">Custom Location Pickup</label>
                            &nbsp;&nbsp;<input style={{height: '20px', width: '20px'}} type="checkbox" name="" id="" />
                            
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
                    <br />
                    <div className='shadow-sm' style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', position: 'relative', border: 'none', padding: '10px'}}>
                    <section style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'row-reverse', width: '80%'}}>
                          <label style={{height: '20px', padding: '0', width: '100%', display: 'flex', alignItems: 'flex-end', fontSize: 'small'}} htmlFor="">Door Step Delivery</label>
                          &nbsp;&nbsp;<input style={{height: '20px', width: '20px'}} type="checkbox" name="" id="" />
                         
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




function LocationSetup({updateLocation,title}) {

  let [state, setState] = useState('')
  let [city, setCity] = useState('')
  let [address1, setAddress1] = useState('')
  let [address2, setAddress2] = useState('')
  let [address3, setAddress3] = useState('')

  let [days, setDays] = useState([]);
  let [day, setDay] = useState(null);
  let [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  let [monthsList, setMonthsList] = useState([
    {month: 'January', days: 31},
    {month: 'February', days: isLeapYear(new Date().getFullYear()) ? 29 : 28},
    {month: 'March', days: 31},
    {month: 'April', days: 30},
    {month: 'May', days: 31},
    {month: 'June', days: 30},
    {month: 'July', days: 31},
    {month: 'August', days: 31},
    {month: 'September', days: 30},
    {month: 'October', days: 31},
    {month: 'November', days: 30},
    {month: 'December', days: 31}
  ]);

  function isLeapYear(year) {return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);}


  useEffect(() => {
    let num = monthsList[selectedMonth]?.days

   
    if(new Date().getMonth() === parseInt(selectedMonth)){
      setDays([])
      let d = new Date().getDate();
      for(let i=d;i<(num+1);i++){
        setDays(day=> [...day,<option value={i}>
          {
            i 
          } 
        </option>])
      }
    }else{
      setDays([])
      for(let i=1;i<(num+1);i++){
        setDays(day=> [...day,<option value={i}>
          {
            i 
          } 
        </option>])
      }
    }
       
  }, [selectedMonth]) 


  function addLocation() {
      let res = ({locale: [state,city,address1,address2,address3].map(item=>item).join(', '), date: {yr: new Date().getFullYear(), mth: selectedMonth, dy: day}})
      updateLocation(res)
      rmLocation()
  }

  function rmLocation() {
      let overlay = document.querySelector('.location-overlay')
      overlay.removeAttribute('id');
  }

  
  return(
      <>
          <div style={{background: '#fff', width: 'fit-content', padding: '10px', position: 'relative', height: '80%', borderRadius: '10px'}}>
            <h2 style={{padding: '10px', color: '#FF4500', fontWeight: '500'}}><u>Input Your {title} Location </u></h2>
              <section style={{padding: '10px', overflow: 'auto', height: 'calc(100% - 100px)'}}>
                  <div className="input-cnt">
                      <label htmlFor="">State</label>
                      <input onInput={e => setState(e.target.value)} type="text" name="" id="" />
                  </div>

                  <div className="input-cnt">
                      <label htmlFor="">City</label>
                      <input onInput={e => setCity(e.target.value)} type="text" name="" id="" />
                  </div>

                  <div className="input-cnt">
                      <label htmlFor="">Town</label>
                      <input onInput={e => setAddress1(e.target.value)} type="text" name="" id="" />
                  </div>

                  <div className="input-cnt">
                      <label htmlFor="">Address 1(Street Name)</label>
                      <input onInput={e => setAddress1(e.target.value)} type="text" name="" id="" />
                  </div>

                  <div className="input-cnt">
                      <label htmlFor="">Address 2(Bus Stop/Junction)</label>
                      <input onInput={e => setAddress2(e.target.value)} type="text" name="" id="" />
                  </div>

                  <div className="input-cnt">
                      <label htmlFor="">Address 3(Extra details like building land mark)</label>
                      <input onInput={e => setAddress3(e.target.value)} type="text" name="" id="" />
                  </div>

                  <section style={{padding: '10px', fontSize: '12', width: '100%', fontWeight: '400', display: 'flex', alignItems: 'center', justifyContent: 'space-between',}}>
                    <div className="input-cnt" style={{width: '30%', }}>
                      <label htmlFor="">Year</label>
                      <select style={{width: '100%', fontSize: 'small', padding: '5px'}} name="" id="">
                        <option value="">Year</option>
                        {
                          new Date().getMonth() === 11
                          ?
                            <>
                              <option selected value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                              <option value={parseInt(new Date().getFullYear()) + 1}>{parseInt(new Date().getFullYear()) + 1}</option>
                            </>
                          :
                          <option selected value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                        }
                      </select>
                      {/* <input style={{width: '100%', fontSize: 'small'}} value={new Date().getFullYear()} type="text" /> */}
                    </div>
                    <div className="input-cnt" style={{width: '40%', }}>
                      <label htmlFor="">Month</label>
                      <select style={{width: '100%', fontSize: 'small'}} onInput={e=>setSelectedMonth(e.target.value)} name="" id="">
                        <option value="">Month</option>
                        {
                          monthsList.map((item,index) => 
                            index >= new Date().getMonth()
                            ?
                            selectedMonth === index
                            ?
                            <option style={{textTransform: 'capitalize'}} selected value={index}>
                              {
                                item.month
                              }
                            </option>
                            
                            :
                            <option style={{textTransform: 'capitalize'}} value={index}>
                              {
                                item.month
                              }
                            </option>
                            :
                            ''
                          )
                        }
                      </select>
                    </div>
                    <div className="input-cnt" style={{width: '30%', }}>
                      <label htmlFor="">Day</label>
                      <select style={{width: '100%', fontSize: 'small'}} onInput={e=>setDay(e.target.value)} name="" id="">
                        <option value="">Day</option>
                        {
                          days
                        }
                      </select>
                    </div>
                  </section>
              </section>

              <div style={{display: 'flex', alignItems: 'center', fontWeight: '500', padding: '10px', fontSize: '20', justifyContent: 'space-between', flexDirection: 'row', background: '#fff', position: 'absolute', bottom: '0', left: '0', width: '100%'}}>
                  <button onClick={e => addLocation()} style={{width: '48%'}}>Add</button>
                  <button onClick={e => rmLocation()} style={{width: '48%'}}>Cancel</button>
              </div>
          </div>
      </> 
  )
}


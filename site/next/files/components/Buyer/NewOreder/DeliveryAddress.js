import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import deleteSvg from '../../../assets/delete-svgrepo-com (1).svg';
import { open_notice } from '../../../reusable.js/notice';
import { setPickupChannelTo } from '@/redux/buyer_store/pickup_channel';
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup';
// import { UpdatePickupChannel } from '@/app/api/buyer/update';
import { data, school_choices } from './location';
import { usePathname } from 'next/navigation';

export default function DeliveryAddress({ item, order_id, order, updateDeliveryOpt }) {
  let {
          user_id
      }=useSelector(s=>s.user_id);
    let [locale, setLocale] = useState([]);
    let [deliveryOpt, setdeliveryOpt] = useState(-1);
    let [pickUpChannel, setpickUpChannel] = useState('');
    
    let pathname = usePathname()

    let dispatch = useDispatch() 

    async function addLocation(channel) {

      
      buyer_overlay_setup(true, 'Loading...')

      
      if(!user_id){
          buyer_overlay_setup(false, '')

          window.location.href=(`/login?page=product&data=${item.product_id}`)
          // alert('Please Login')
          
      }else{ 
          // document.querySelector('.shop-overlay').removeAttribute('id')
          setpickUpChannel(channel)

          document.querySelector('.pickup-overlay').setAttribute('id', 'shop-overlay')
          buyer_overlay_setup(false, '')


      }
    }
    function deleteLocation(data) {
        let newLocaleList = locale.filter(item => item.index !== data)
        setLocale(newLocaleList)
    }
    function updateLocation(data) {
      if(data.locale.split(',')[0]!=='' && data.locale.split(',')[1]!=='' && data.locale.split(',')[2]!=='' && data.locale.split(',')[3]!=='' && data.date.mth !== '' && data.date.day !== null){
        // alert('...')
          setLocale([{channel: pickUpChannel, locale: data.locale, date: data.date, index: locale.length}])
      }else{

          open_notice(true, 'Error occured')
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

    useEffect(() => {
      updateDeliveryOpt(deliveryOpt)
    },[deliveryOpt])

    // let [order_list, set_order_list] = useState('');


    useEffect(() => {
      if(order !== ''){
        if(order[0]?.order?.pick_up_channels[0]?.channel === 'Custom Pickup Location'){
          document.querySelector('.delivery-0').checked = true;
        }else{
          document.querySelector('.delivery-1').checked = true;
        }
        setLocale([{channel: order[0]?.order?.pick_up_channels[0]?.channel, locale: order[0]?.order?.pick_up_channels[0]?.locale, date: order[0]?.order?.pick_up_channels[0]?.date, index: locale.length}])
        setpickUpChannel(order[0]?.order?.pick_up_channels[0]?.channel)
        setdeliveryOpt(order[0]?.order?.pick_up_channels[0]?.channel === 'Custom Pickup Location' ? 0 : 1)
      }
    }, [order])
  
  // Custom Location Pickup

  return (
    <>
      <div className="pickup-overlay">
        <PickupChannel updateLocation={updateLocation} title={pickUpChannel} item={item} edit={false} order_data={''} />
      </div>

      <div className="buyer-checkout-delivery-info">

        <div className="delivery-pick-up-station" >

          <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center'}}>Delivery Address</h6>
          
          <div className='' style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'space-between', border: '1px solid #FF4500', flexDirection: 'row', padding: '0', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px', marginBottom: '10px', border: 'none'}}>
                      
            <div style={{padding: '0', width: '100%'}}>

              <div className='shadow-sm' style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', position: 'relative', border: 'none', padding: '10px'}}>

                <section style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'row-reverse', width: '80%'}}>
                  <label style={{height: '20px', padding: '0', width: '100%', display: 'flex', alignItems: 'flex-end', fontSize: 'small'}} htmlFor="">Custom Pickup Location</label>
                  &nbsp;&nbsp;
                  <input style={{height: '20px', width: '20px'}} className='delivery-0' onInput={e=>setdeliveryOpt(0)} type="radio" name="delivery-address" id="" />  
                </section>

                <div style={{
                  opacity: deliveryOpt === 0  ? '1' : '.5',
                  pointerEvent: deliveryOpt === 0  ? 'all' : 'none',
                  display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', position: 'relative', border: 'none', padding: '10px'
                }}>
                  <section style={{padding: '10px', fontSize: '12', fontWeight: '400'}}>
                    <small style={{fontSize: 'small'}}>
                    You Will Pickup The Item At The Designated Shop Provided By The You (Charges Applies)
                    </small>
                  </section>
                
                
                  <section  style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', padding: '10px', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px'}}>
                    {
                      locale.map((item) => 
                        item.channel === 'Custom Pickup Location'
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

                          <button  onClick={e=>deleteLocation(item.index)} style={{width: 'auto', height: '35px', padding: '5px', textAlign: 'center', position: 'relative', display: 'flex', borderRadius: '5px', alignItems: 'center', justifyContent: 'center'}}>
                            <small>Remove</small>
                          </button>
                        </div>
                        :
                        ''
                      )
                    }
                  </section>

                  <button disabled={item?.channel === 'Custom Pickup Location' && locale.length > 0 ? true : false} onClick={e => addLocation('Custom Pickup Location')} className='shadow-sm' style={{position: 'relative', height: 'auto', width: 'auto', display: 'flex', alignItems: 'center', justifyContents: 'center', borderRadius: '5px', padding: '10px', textAlign: 'center', background: '#fff', color: '#FF4500', fontSize: 'small', float: 'right', color: '#fff', background: '#FF4500'}}>{
                    pickUpChannel === 'Custom Pickup Location' && locale.length > 0 
                    ?
                    'Edit Location'
                    :
                    'Set Location'
                  }</button>
                </div>
              </div>

              <br />
              
              <div className='shadow-sm' style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', position: 'relative', border: 'none', padding: '10px'}}>
               
                <section style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'row-reverse', width: '80%'}}>
                  <label style={{height: '20px', padding: '0', width: '100%', display: 'flex', alignItems: 'flex-end', fontSize: 'small'}} htmlFor="">Door Step Delivery</label>
                  &nbsp;&nbsp;
                  <input style={{height: '20px', width: '20px'}} className='delivery-1' onInput={e=>setdeliveryOpt(1)}  type="radio" name="delivery-address" id="" />     
                </section>

                <div style={{
                  opacity: deliveryOpt === 1 ? '1' : '.5',
                  pointerEvent: deliveryOpt === 1 ? 'all' : 'none',
                  display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', position: 'relative', border: 'none', padding: '10px'
                }}>
                  <section style={{padding: '10px', fontSize: '12', fontWeight: '400'}}>
                      <small style={{fontSize: 'small'}}>
                        The Item Will Be Delivered At Your Door Step (Charges Applies)
                      </small>
                  </section>
                      
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
                          <button  onClick={e=>deleteLocation(item.index)} style={{width: 'auto', height: '35px', padding: '5px', textAlign: 'center', position: 'relative', display: 'flex', borderRadius: '5px', alignItems: 'center', justifyContent: 'center'}}>
                            <small>Remove</small>
                          </button>
                        </div>
                        :
                        ''
                      )
                    }
                  </section>

                  <button onClick={e => addLocation('Door Step Delivery')} className='shadow-sm' style={{position: 'relative', height: 'auto', width: 'auto', display: 'flex', alignItems: 'center', justifyContents: 'center', padding: '10px', textAlign: 'center', background: '#fff', color: '#FF4500', fontSize: 'small', float: 'right', borderRadius: '5px', color: '#fff', background: '#FF4500'}}>{
                    pickUpChannel === 'Door Step Delivery' && locale.length > 0 
                    ?
                    'Edit Location'
                    :
                    'Set Location'
                  }</button>
                </div>
              </div>

            </div>

          </div>
            
        </div>

      </div>

    </>
  )
}


function PickupChannel({updateLocation,title,edit,order_data,item}) {
    // let [state, setState] = useState('')
  let [campus, setCampus] = useState('')
  // alert(title)
    let [state, setState] = useState('')

   
    const [campusLocaleList, setCampusLocaleList] = useState([]);
    let {buyerData} = useSelector(s=>s.buyerData)
    useEffect(() => {
        setSelectedMonth(parseInt(edit?.date?.mth));
        setDay(edit?.date?.dy);
        setState(edit?.locale?.split(',')[0])
        setCity(edit?.locale?.split(',')[1])
        setTown(edit?.locale?.split(',')[2])
        setAddress1(edit?.locale?.split(',')[3])
        setAddress2(edit?.locale?.split(',')[4])
        setAddress3(edit?.locale?.split(',')[5])
    }, [edit])
  
    useEffect(() => {
      setCampusLocaleList([])
      let stateIndex = data?.filter(item =>  item?.label?.toLowerCase() === state?.toLowerCase())
      let index = data?.indexOf(stateIndex[0]); 
      let campuses = Object?.values(school_choices).reverse();
      console.log(campuses[index])
      index < 0 ? setCampusLocaleList([]) : setCampusLocaleList(campuses[index])

    }, [state])
  
    let [town, setTown] = useState('')
    let [city, setCity] = useState('')
    let [address1, setAddress1] = useState('')
    let [address2, setAddress2] = useState('')
    let [address3, setAddress3] = useState('')
    let [address4, setAddress4] = useState('')
  
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
            if(parseInt(day) === i){
                setDays(day=> [...day,<option selected value={i} >
                    {
                        i 
                    } 
                </option>])
          }else{
                setDays(day=> [...day,<option value={i} >
                    {
                        i 
                    } 
                </option>])
        }
        }
      }else{
        setDays([])
        for(let i=1;i<(num+1);i++){
            if(parseInt(day) === i){
                setDays(day=> [...day,<option selected value={i} >
                    {
                      i 
                    } 
                </option>])
              }else{
                setDays(day=> [...day,<option value={i} >
                    {
                      i 
                    } 
                </option>])
              }
        }
      }
         
    }, [selectedMonth]) 
  
  
  function addLocation() {
      console.log(day , state , city , address1 , address2)
      
      if (day && state && city && address1 && address2) {
        let res = title !== 'Custom Pickup Location'
          ?
          ({ locale: [state, city, address1, address2, address3, address4].map(item => item).join(', '), date: { yr: new Date().getFullYear(), mth: selectedMonth, dy: day } })
          :
          ({ locale: [state, city, address1, address2].map(item => item).join(', '), date: { yr: new Date().getFullYear(), mth: selectedMonth, dy: day } })
        updateLocation(res)
        rmLocation()
      } else {
        open_notice(true, 'Please Ensure Dates, States and Univerity is set together with 1st and 2nd Address.')
      }
       
  }
  

    async function editPickupChannel() {
      // let response = await UpdatePickupChannel({
      //     user_id: buyerData?.user_id, 
      //     product_id: order_data?.product_id, 
      //     pickup_channel:  {
      //         channel: edit?.channel, 
      //         locale: [state,city,town,address1,address2,address3].map(item=>item).join(', '), 
      //         date: {yr: new Date().getFullYear(), mth: selectedMonth, dy: day},
      //         index: edit?.index
      //     }
      // })
      // if(response.bool){
      //   updateLocation(response.locale)
      // }
    }
  
    function rmLocation() {
      let overlay = document.querySelector('.pickup-overlay')
      overlay.removeAttribute('id');
  }
  useEffect(() => {
    const shippingRange = item ? JSON.parse(item.shipping_range) : null;

    const inStateSelected = shippingRange?.in_state?.selected;
    const outStateSelected = shippingRange?.out_state?.selected;
    const inCampusSelected = shippingRange?.in_campus?.selected;
    const selectedCampus = item?.campus;

    if (item) {
      setState(item?.uni_state)
      inCampusSelected && !inStateSelected && !outStateSelected ? setCity(selectedCampus) : setCity('')

    }
  }, [item])
  

  const shippingRange = item ? JSON.parse(item.shipping_range) : null;

  const inStateSelected = shippingRange?.in_state?.selected;
  const outStateSelected = shippingRange?.out_state?.selected;
  const inCampusSelected = shippingRange?.in_campus?.selected;
  const selectedCampus = item?.campus;
  
  
    return( 
        <>
           
            <div style={{background: '#fff', width: 'fit-content', padding: '10px', position: 'relative', height: '80%', borderRadius: '0'}}>
              <h6 style={{padding: '10px', color: '#FF4500', fontWeight: '500'}}><u>Input Your {title} Location </u></h6>
                <section style={{padding: '10px', overflow: 'auto', height: 'calc(100% - 100px)'}}>
  
                  <div className="input-cnt" style={{width: '100%'}}>
                    <label style={{fontSize: 'small'}} htmlFor="">State</label>
                    <select style={{width: '100%'}} name='state' onInput={e => {setState(e.target.value)}} placeholder="" id="" >
                      <option value="">Select State</option>
                      {
                        item
                        ?
                          JSON.parse(item?.shipping_range)?.out_state?.selected 
                          ?
                          
                          data.map((state,index) => {
                            return(
                              
                              <option key={index} value={state.label}>{item.label}</option>
                            )
                          })
                          :
                          
                          data.filter(filt => filt?.label?.toLowerCase() === item?.uni_state?.toLowerCase()).map((filtered_state,index) => {
                           
                            return(
                             <option selected key={index} value={filtered_state?.label}>{filtered_state?.label}</option>
                            )
                          })
                          
                        :
                        ''
                        
                      }
                    </select>
                  </div>

                  <div className="input-cnt" style={{width: '100%'}}>
                    <label style={{fontSize: 'small'}} htmlFor="">University</label>
                    <select style={{width: '100%'}} name='town' placeholder="" id="" onInput={e => {setCity(e.target.value)}}>
                      <option value="">Select University</option>
                      {
                        item
                        ?
                          inCampusSelected && !inStateSelected && !outStateSelected ? (
                            
                            <option selected value={selectedCampus}>{selectedCampus}</option>
                          ) : (
                            campusLocaleList.map((uni, index) => (
                              <option key={index} value={uni.text}>{uni.text}</option>
                            ))
                          )
                                                  
                        :
                        ''
                        
                      }
                    </select>
                  </div>

                  <div className="input-cnt" style={{width: '100%'}}>
                      <label style={{fontSize: 'small'}} htmlFor="">Address 1{title !== 'Custom Pickup Location' ? 'Town' : ' (Junction)'}</label>
                      <input style={{width: '100%'}} onInput={e => setAddress1(e.target.value)} defaultValue={edit?.locale?.split(',')[3]} type="text" name="" id="" />
                  </div>

                  <div className="input-cnt" style={{width: '100%'}}>
                      <label style={{fontSize: 'small'}} htmlFor="">Address 2{title !== 'Custom Pickup Location' ? 'Street Name' : ' (Extra details)'}</label>
                      <input style={{width: '100%'}} onInput={e => setAddress2(e.target.value)} defaultValue={edit?.locale?.split(',')[3]} type="text" name="" id="" />
                  </div>

                 {
                    title !== 'Custom Pickup Location'
                    ?
                    (
                      <>
                        <div className="input-cnt" style={{width: '100%'}}>
                            <label style={{fontSize: 'small'}} htmlFor="">Address 3(Bus Stop/Junction)</label>
                            <input style={{width: '100%'}} onInput={e => setAddress3(e.target.value)} defaultValue={edit?.locale?.split(',')[4]} type="text" name="" id="" />
                        </div>

                        <div className="input-cnt" style={{width: '100%'}}>
                            <label style={{fontSize: 'small'}} htmlFor="">Address 4(Extra details like Lodge Name/Floor No)</label>
                            <input style={{width: '100%'}} onInput={e => setAddress4(e.target.value)} defaultValue={edit?.locale?.split(',')[5]} type="text" name="" id="" />
                        </div>
                      </>
                    )
                    :
                    ''
                 }
  
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
                            parseInt(selectedMonth) === parseInt(index)
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
  
                <div style={{display: 'flex', alignItems: 'center', fontWeight: '500', padding: '10px 10px', fontSize: '20', justifyContent: 'space-between', flexDirection: 'row', background: '#fff', position: 'absolute', bottom: '0', left: '0', width: '100%'}}>
                    <button onClick={e => {
                        edit
                        ?
                        editPickupChannel()
                        :
                        addLocation()
                    }} style={{width: '48%', height: '40px', borderRadius: '5px'}}>{
                        edit
                        ?
                        'Update'
                        :
                        'Add'
                    }</button>
                    <button onClick={e => rmLocation()} style={{width: '48%', height: '40px', borderRadius: '5px'}}>Cancel</button>
                </div>
            </div>
        </> 
    )
}
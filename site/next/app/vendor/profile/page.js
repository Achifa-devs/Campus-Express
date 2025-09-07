"use client"
import React, { useEffect, useRef, useState } from 'react'
import '@/app/vendor/profile/styles/xx-large.css'
import '@/app/vendor/profile/styles/x-large.css'
import '@/app/vendor/profile/styles/large.css'
import '@/app/vendor/profile/styles/medium.css'
import '@/app/vendor/profile/styles/small.css'
import { useDispatch, useSelector } from 'react-redux'
import { data, school_choices } from './location';
import country from '@/states-and-cities.json';
import bank from '@/bank.json';
import { setSellerTo } from '@/redux/seller_store/seller'
import { setBankTo } from '@/redux/bank'
import { loader } from '@/files/reusable.js/overlay-setup'
import { Editor, EditorState } from 'draft-js';
import ReactFroala from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import {
    products_overlay_setup,
    MyEditor
} from './editor'
export default function Profile() {
    
    let dispatch = useDispatch();
    let {
        user_id
    }=useSelector(s=>s.user_id);
    let [profileAnalytics, setProfileAnalytics] = useState('')

  
    let paymentInfo = useRef({
        bankName: '',
        bankAccountNumber: '',
        accountBeneficiary: '',
    })
    let shippingInfo = useRef({
        shippingZone: {
            Address1: '',
            Address2: '',
            Address3: '',
            Address4: '',
            City: '',
            State: '',
            Country: 'Nigeria'
        },
        returnAddress: {
            Address1: '',
            Address2: '',
            Address3: '',
            Address4: '',
            City: '',
            State: '',
            Country: 'Nigeria'
        }
    })

    let [profile, setProfile] = useState('')
    let [shop, setShop] = useState('')
    let [campusLocaleList, setCampusLocaleList] = useState([]);
    let [state, setState] = useState('')

    useEffect(() => {
        setState(profile?.state)
    },[profile])
    
    useEffect(() => {
        if(user_id !== 'null' && user_id !== null && user_id !== ''){

            fetch(`/api/vendor/profile`, {method: 'post', body: JSON.stringify({user_id})})
            .then(async(result) => {
                let response = await result.json(); 
                if (response.bool) {
                    setProfile(response?.user)
                }
            })
            .catch((error) => {
                console.log(error)
            }) 

            fetch(`/api/vendor/shop`,{method: 'post', body: JSON.stringify({user_id})})
            .then(async(result) => {
                let response = await result.json(); 
                console.log(response)
                setShop(response?.shop)
            })
            .catch((error) => {
                console.log(error)
            }) 
        }
    }, [user_id])

    useEffect(() => {
        setCampusLocaleList([])
        let stateIndex = data.filter(item =>  item.label.toLowerCase() === state?.toLowerCase())
        let index = data.indexOf(stateIndex[0]); 
        let campuses = Object.values(school_choices).reverse();
        index < 0 ? setCampusLocaleList([]) : setCampusLocaleList(campuses[index])
    }, [state])
    
    useEffect(() => {
        if(user_id !== 'null' && user_id !== null && user_id !== ''){

            fetch(`/api/vendor/analytics?user_id=${user_id}`)
            .then(async(result) => {
                let response = await result.json(); 
                console.log(response)
                setProfileAnalytics(response);
            })
            .catch((error) => {
                console.log(error)
            }) 

        }
    }, [user_id])

    let [activeCnt, setActiveCnt] = useState(<ShopInfo shop={shop} campusLocaleList={campusLocaleList} profile={profile}  />)
    let [activeCntTxt, setActiveCntTxt] = useState('shopInfo')

    function updateShippingInfo(parent, name, value) {
        shippingInfo.current[parent][name] = value;
    }
    function updatePaymentInfo(name, value) {
        paymentInfo.current[name] = value;
    }

    function saveUserData(url,data) {
        
        fetch(`${url}`, {
            method: 'post',
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({data,user_id})
        })   
        .then(async(result) => {
            let response = await result.json();
            if(response.bool){
                dispatch(setSellerTo(response.cookie))
                loader(false)
                
            }else{
                loader(false)
                
                
            }
        })
        .catch((err) => {
            console.log(err)
            loader(false)

        })
    }
    
    function save() {
        let responseFromCValidation = validation()
        let validationState = [...responseFromCValidation.inputRes, ...responseFromCValidation.selectRes].filter(item => item !== '')
        if(!validationState.length > 0){
            let data = (activeCntTxt === 'paymentInfo' ? paymentInfo.current : shippingInfo.current);
            let url = activeCntTxt === 'paymentInfo' ? '/api/vendor/payment/update' : '/api/vendor/update-shipping'
            
            if(activeCntTxt !== 'paymentInfo'){
                saveUserData(url,data)
                loader(true)

            }else{
                loader(true)

                fetch(`/api/vendor/payment/verification`, {
                    method: 'post',
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify({acct: paymentInfo.current.bankAccountNumber, code: paymentInfo.current.bankName})
                })   
                .then(async(result) => {
                    let response = await result.json();
                    if(response.bool){
                        dispatch(setBankTo(response.name))
                        saveUserData(url,data)
                        loader(false)

                    }
                })
                .catch((err) => {
                    console.log(err)
                    alert(JSON.stringify('Account Number Is Invalid'))
                    loader(false)
                })
            }
        }
    }

    function validation() {
        let input_src = activeCntTxt === 'shopInfo' ? '.shop-info-input' : activeCntTxt === 'paymentInfo' ? 'payment-info-input' : '.shipping-info-input'

        let select_src = activeCntTxt === 'shopInfo' ? '.shop-info-select' : activeCntTxt === 'paymentInfo' ? 'payment-info-select' : '.shipping-info-select'
        let inputs = [...document.querySelectorAll(input_src)];
        let selects = [...document.querySelectorAll(select_src)];
        
        let inputRes = inputs.map(item => {
            let input = item.querySelector('input');
            let err = genErr(input.name, input.value)
            handleErr(item, err, input.name)
            return err
        })
        let selectRes = selects.map(item => {
            let select = item.querySelector('select');
            let err = genErr(select.name, select.value)
            handleErr(item, err, select.name)
            return err
        })

        return {inputRes, selectRes}
    }

    function genErr(name, value) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(value === ''){
            return `${name} is empty`
        }else if(name !== 'return-address-4' && name !== 'shipping-address-4' && value.length < 3){
            return `${name} must be more than 3 letters`
        }else if(name.split('-').splice(-1)[0] === 'phone' && value.length < 11){
            return `${name} must be 11 numbers`
        }else if(name.split('-').splice(-1)[0] === 'email' && !emailRegex.test(value)){
            return `${name} must be valid`
        }else{
            return ''
        }
    }

    function handleErr(element, err, name) {

        let pElem = element;

        if(pElem.lastChild.className === 'err-mssg'){
            pElem.lastChild.remove();

            let newElem = document.createElement('div')
            newElem.className = 'err-mssg';
            newElem.style.width = '100%';
            newElem.style.textAlign = 'left';
            newElem.style.padding = '0';
            newElem.style.fontFamily = 'small';
            newElem.style.justifyContent = 'left';
            newElem.innerHTML = err;
            pElem.append(newElem)
        }else{
            let newElem = document.createElement('div')
            newElem.className = 'err-mssg';
            newElem.style.textAlign = 'left';
            newElem.style.justifyContent = 'left';
            newElem.style.width = '100%';
            newElem.style.padding = '0';
            newElem.style.fontFamily = 'small';
            newElem.innerHTML = err;
            pElem.append(newElem)
        }
    }

    
  return ( 
    <>
      <div className="seller-profile">
        <div className="seller-profile-cnt">

            <div className="top">
                <section>
                    <h3>
                    Welcome to Campus Sphere! Let’s take your shop live!
                    </h3>
                    <h6>Complete all the sections below to take your shop live.</h6>
                </section>
            </div>

            <div className="summary" style={{height: 'fit-content'}}>
                <div onClick={e=>{setActiveCnt(<ShopInfo campusLocaleList={campusLocaleList} profile={profile} />); setActiveCntTxt('shopInfo')}}>
                    <div>
                        Shop Information
                    </div>
                    <hr />
                    <div>
                        {
                            profileAnalytics.shopInfo
                            ? 
                            'Completed'
                            : 
                            'Pending'
                        }
                    </div>
                </div>

                <div onClick={e=>{setActiveCnt(<ShippingInfo updateShippingInfo={updateShippingInfo} profile={profile} />); setActiveCntTxt('shippingInfo')}}>
                    <div>
                        Shipping Information
                    </div>
                    <hr />
                    <div>
                        {
                            profileAnalytics.shippingInfo
                            ? 
                            'Completed'
                            : 
                            'Pending'
                        }
                    </div>
                </div>
                
                <div onClick={e=>{setActiveCnt(<PaymentInfo updatePaymentInfo={updatePaymentInfo} />); setActiveCntTxt('paymentInfo')}}>
                    <div>
                        Payment Information
                    </div>
                    <hr />
                    <div>
                        {
                            profileAnalytics.paymentInfo
                            ? 
                            'Completed'
                            : 
                            'Pending'
                        }
                    </div>
                </div>
            </div>

            {
                activeCnt
            } 
        </div>

        
      </div>
      <section className="seller-profile-btn-cnt">
        <button onClick={save}>
            Save
        </button>
    </section>
    </>
  )
}



function PaymentInfo({ updatePaymentInfo }) {
    let dispatch = useDispatch()
    let {
        bankBeneficiary
    }=useSelector(s=>s.bankBeneficiary)
    let {
        user_id
    }=useSelector(s=>s.user_id);
    let [payment_info, set_payment_info] = useState('')

    useEffect(() => {
        updatePaymentInfo('bankAccountNumber', payment_info?.acct_num)
        updatePaymentInfo('accountBeneficiary', payment_info?.beneficiary)
        updatePaymentInfo('bankName', payment_info?.bank)
    }, [payment_info])
    useEffect(() => {
        updatePaymentInfo('accountBeneficiary', bankBeneficiary)
    }, [bankBeneficiary])
    useEffect(() => {
        if(user_id !== 'null' && user_id !== null && user_id !== ''){
            loader(true)

            fetch(`/api/vendor/payment?user_id=${user_id}`)
            .then(async(result) => {
                let response = await result.json(); 
                console.log(response)
                if (response?.bool) {
                    dispatch(setBankTo(response.data?.beneficiary))
                    set_payment_info(response.data);
                    loader(false)
                }
                loader(false)


            })
            .catch((error) => {
                console.log(error)
                loader(false)
            }) 
        }
    }, [user_id])
    return(
        <>
            <div className="mid">

                <section>
                    <h3>
                        Preferred payment option
                    </h3>
                    <h6>Select the payment method, if applicable, of your choice, and ensure to provide all required details. We ll review the validity of your documents upon submission.</h6>
                </section>

                <section style={{display: 'flex', alignItems: 'center', padding: '0 0 0 20px', margin: '20px 0px'}}>
                
                    <input style={{height: '20px', width: '20px'}} type="radio" checked id="" />
                    &nbsp;
                    &nbsp;
                    <label htmlFor="">Bank Account</label>

                </section>

                
                <div className="input-cnt payment-info-input">
                    <label htmlFor="">Bank Account Number</label>
                    <input name='Bank Account Number' defaultValue={payment_info?.acct_num} onInput={e => updatePaymentInfo('bankAccountNumber', e.target.value)} type="text" placeholder="Bank Account Number" id="" />
                </div>

                <div className="input-cnt payment-info-select">
                    <label htmlFor="">Bank Name</label>

                    <select name='Bank Name' onInput={e => updatePaymentInfo('bankName', e.target.value)} placeholder="" id="">
                        <option value="">Select Bank</option>
                        {
                            bank.map((item, index) => 
                                item.code === payment_info?.bank
                                ?
                                <option key={index} selected value={item.code}>{item.name}</option>
                                :
                                <option key={index} value={item.code}>{item.name}</option>
                            )
                        }
                    </select>
                </div>

                <div className="input-cnt payment-info-input">
                    <label htmlFor="">Beneficiary</label>
                    <input name='Beneficiary' value={bankBeneficiary} onInput={e => updatePaymentInfo('accountBeneficiary', e.target.value)} type="text" placeholder="Beneficiary" id="" />
                </div>
            </div>
        </>
    )
}

function ShippingInfo({updateShippingInfo}) {
    let [state1, setState1] = useState('')
    let [state2, setState2] = useState('')

    let {
        user_id
    }=useSelector(s=>s.user_id);
    let [shipping_info, set_shipping_info] = useState('')
    let [profile, setProfile] = useState('')

    useEffect(() => {
        if (user_id !== 'null' && user_id !== null && user_id !== '') {
            loader(true)

           
            fetch(`/api/vendor/shipping?user_id=${user_id}`)
            .then(async(result) => {
                let response = await result.json(); 
                console.log(response)
                set_shipping_info(response?.data)
                setState1(response?.data?.shipping_response[0]?.state)
                // setState2(response?.data?.return_response[0]?.state)
                loader(false)

            })
            .catch((error) => {
                console.log(error)
                loader(false)
            }) 
        }
    }, [user_id])

    useEffect(() => {
        if(user_id !== 'null' && user_id !== null && user_id !== ''){

            fetch(`/api/vendor/profile`, {method: 'post', body: JSON.stringify({user_id})})
            .then(async(result) => {
                let response = await result.json(); 
                if (response.bool) {
                    setProfile(response?.user)
                }
            })
            .catch((error) => {
                console.log(error)
            }) 

        }
    }, [user_id])

    useEffect(() => {
        // console.log(shipping_info)
        if (shipping_info !== '') {
            updateShippingInfo('shippingZone', 'Address1', shipping_info?.shipping_response[0]?.address1)
            updateShippingInfo('shippingZone', 'Address2', shipping_info?.shipping_response[0]?.address2)
            updateShippingInfo('shippingZone', 'Address3', shipping_info?.shipping_response[0]?.address3)
            updateShippingInfo('shippingZone', 'Address4', shipping_info?.shipping_response[0]?.address4)
            updateShippingInfo('shippingZone', 'State', shipping_info?.shipping_response[0]?.state)
            updateShippingInfo('shippingZone', 'City', shipping_info?.shipping_response[0]?.town)
    
            // updateShippingInfo('returnAddress', 'Address1', shipping_info?.return_response[0]?.address1)
            // updateShippingInfo('returnAddress', 'Address2', shipping_info?.return_response[0]?.address2)
            // updateShippingInfo('returnAddress', 'Address3', shipping_info?.return_response[0]?.address3)
            // updateShippingInfo('returnAddress', 'Address4', shipping_info?.return_response[0]?.address4)
            // updateShippingInfo('returnAddress', 'State', shipping_info?.return_response[0]?.state)
            // updateShippingInfo('returnAddress', 'City', shipping_info?.return_response[0]?.town)
        }
    }, [shipping_info])

    return(
        <>
            <div className="mid">

                <section>
                    <h3>
                        Shipping Information
                    </h3>
                    <h6>Please choose your preferred method of communucation and your shipping address</h6>
                </section>

                <div className="input-cnt">
                    <label htmlFor="">Shipping Zone</label>
                    <input value={`${profile?.state, profile?.campus}`} type="text" placeholder="Shipping Zone" id="" />
                </div>
            </div>

            <div className="btm">
                <section>
                    <h3>
                        Shipping Information
                    </h3>
                    <h6>Please provide the address from where you prefer to ship your products
                    </h6>
                </section>

                <div className="input-cnt shipping-info-input">
                    <label htmlFor="">Address 1 (District)</label>
                    <input name='shipping-address-1' defaultValue={
                        shipping_info
                        ?
                        shipping_info?.shipping_response[0]?.address1
                        :
                        ''
                    } onInput={e => updateShippingInfo('shippingZone', 'Address1', e.target.value)} type="text" placeholder="Address 1" id="" />
                </div>

                <div className="input-cnt shipping-info-input">
                    <label htmlFor="">Address 2 (Street/Junction)</label>
                    <input name='shipping-address-2' defaultValue={
                        shipping_info
                        ?
                        shipping_info?.shipping_response[0]?.address2
                        :
                        ''
                    } onInput={e => updateShippingInfo('shippingZone', 'Address2', e.target.value)} type="text" placeholder="Address 2" id="" />
                </div>

                <div className="input-cnt shipping-info-input">
                    <label htmlFor="">Address 3 (Lodge/Buliding Name)</label>
                    <input name='shipping-address-3' defaultValue={
                        shipping_info
                        ?
                        shipping_info?.shipping_response[0]?.address3
                        :
                        ''
                    } onInput={e => updateShippingInfo('shippingZone', 'Address3', e.target.value)} type="text" placeholder="Address 3" id="" />
                </div>

                <div className="input-cnt shipping-info-input">
                    <label htmlFor="">Address 4 (Flat No)</label>
                    <input name='shipping-address-4' defaultValue={
                        shipping_info
                        ?
                        shipping_info?.shipping_response[0]?.address4
                        :
                        ''
                    } onInput={e => updateShippingInfo('shippingZone', 'Address4', e.target.value)} type="number" placeholder="Address 4" id="" />
                </div>

                <section>
                    <div className="input-cnt shipping-info-select">
                        <label htmlFor="">Country</label>

                        <select name='country' placeholder="" id="">
                            <option value="">Select Country</option>
                            <option selected value="Nigeria">Nigeria</option>
                        </select>
                    </div>
                    <div className="input-cnt shipping-info-select">
                        <label htmlFor="">State</label>

                        <select name='state' onInput={e => {updateShippingInfo('shippingZone', 'State', e.target.value); setState1(e.target.value)}} placeholder="" id="" >
                            <option value="">Select State</option>
                            {
                                country.map((item,index) => 
                                    shipping_info
                                    ?
                                    shipping_info?.shipping_response[0]?.state  === item.name
                                    
                                        ?
                                        <option selected key={index} value={item.name}>{item.name}</option>
                                        :
                                        <option key={index} value={item.name}>{item.name}</option>
                                    :
                                    ''
                                )
                            }
                        </select>
                    </div>
                    <div className="input-cnt shipping-info-select">
                        <label htmlFor="">City/Region</label>

                        <select name='town' placeholder="" id="" onInput={e => {updateShippingInfo('shippingZone', 'City', e.target.value)}}>
                            <option value="">Select Town</option>
                            {
                                country.filter(item => item.name === state1)[0]?.cities.map((city,index) => 
                                    shipping_info
                                    ?
                                        shipping_info?.shipping_response[0]?.town === city
                                        ?
                                        <option selected key={index} value={city}>{city}</option>
                                        :
                                        <option key={index} value={city}>{city}</option>
                                    :
                                    ''
                                )

                            }
                        </select>
                    </div>
                </section>

                {/* <section>
                    <h3>
                        Return Address
                    </h3>
                    <h6>Please provide details of your customer support. These details will be used to adrress product issues by customers</h6>
                </section>

                <div className="input-cnt shipping-info-input">
                    <label htmlFor="">Address 1 (District)</label>
                    <input name='return-address-1' defaultValue={
                        shipping_info
                        ?
                        shipping_info?.return_response[0]?.address1
                        :
                        ''
                    } onInput={e => updateShippingInfo('returnAddress', 'Address1', e.target.value)} type="text" placeholder="Address 1" id="" />
                </div>

                <div className="input-cnt shipping-info-input">
                    <label htmlFor="">Address 2 (Street/Junction)</label>
                    <input name='return-address-2' defaultValue={
                        shipping_info
                        ?
                        shipping_info?.return_response[0]?.address2
                        :
                        ''
                    } onInput={e => updateShippingInfo('returnAddress', 'Address2', e.target.value)} type="text" placeholder="Address 2" id="" />
                </div>

                <div className="input-cnt shipping-info-input">
                    <label htmlFor="">Address 3 (Lodge/Buliding Name)</label>
                    <input name='return-address-3' defaultValue={
                        shipping_info
                        ?
                        shipping_info?.return_response[0]?.address3
                        :
                        ''
                    } onInput={e => updateShippingInfo('returnAddress', 'Address3', e.target.value)} type="text" placeholder="Address 3" id="" />
                </div>

                <div className="input-cnt shipping-info-input">
                    <label htmlFor="">Address 4 (Flat No)</label>
                    <input name='return-address-4' defaultValue={
                        shipping_info
                        ?
                        shipping_info?.return_response[0]?.address4
                        :
                        ''
                    } onInput={e => updateShippingInfo('returnAddress', 'Address4', e.target.value)} type="number" placeholder="Address 4" id="" />
                </div>

                <section>
                    <div className="input-cnt shipping-info-select">
                        <label htmlFor="">Country</label>

                        <select name='country' placeholder="" id="">
                            <option value="">Select Country</option>
                            <option selected value="NIgeria">Nigeria</option>
                        </select>
                    </div>
                    <div className="input-cnt shipping-info-select">
                        <label htmlFor="">State</label>

                        <select name='state' onInput={e => {updateShippingInfo('returnAddress', 'State', e.target.value); setState2(e.target.value)}} placeholder="" id="" >
                            <option value="">Select State</option>
                            {
                                country.map((item, index) => 
                                    shipping_info
                                    ?
                                        shipping_info?.return_response[0]?.state === item.name
                                        ?
                                        <option selected key={index} value={item.name}>{item.name}</option>
                                        :
                                        <option key={index} value={item.name}>{item.name}</option>
                                    :
                                    ''
                                )
                            }
                        </select>
                    </div>
                    <div className="input-cnt shipping-info-select">
                        <label htmlFor="">City/Region</label>

                        <select name='town' placeholder="" id="" onInput={e => {updateShippingInfo('returnAddress', 'City', e.target.value)}}>
                            <option value="">Select Town</option>
                            {
                                country.filter(item => item.name === state2)[0]?.cities.map((city,index) => 
                                    shipping_info
                                    ?
                                        shipping_info?.return_response[0]?.town === city
                                        ?
                                        <option selected key={index} value={city}>{city}</option>
                                        :
                                        <option key={index} value={city}>{city}</option>
                                    :
                                    ''
                                )

                            }
                        </select>
                    </div>
                </section> */}

            </div>
        </>
    )
}

function ShopInfo({campusLocaleList}) {
    let {
        user_id
    }=useSelector(s=>s.user_id);
    let [state, setState] = useState('')
    let [shop_details, set_shop_details] = useState('')
    let [profile, setProfile] = useState('')


    useEffect(() => {
        if (user_id !== 'null' && user_id !== null && user_id !== '') {
            fetch(`/api/vendor/shop`,{method: 'post', body: JSON.stringify({user_id})})
            .then(async(result) => {
                let response = await result.json(); 
                console.log(response)
                set_shop_details(response?.shop)
            })
            .catch((error) => {
                console.log(error)
            }) 
        }
    }, [user_id])

    useEffect(() => {
        if(user_id !== 'null' && user_id !== null && user_id !== ''){
            loader(true)
            fetch(`/api/vendor/profile`, {method: 'post', body: JSON.stringify({user_id})})
            .then(async(result) => {
                let response = await result.json(); 
                if (response.bool) {
                    setProfile(response?.user)
                    
                    loader(false)

                }
            })
            .catch((error) => {
                console.log(error)
                loader(false)

            }) 

        }
    }, [user_id])
    
// let [shop, setShop] = useState('')
    let [newShopName, setNewShopName] = useState('');
    function set_shop_name() {
        fetch(`http://192.168.0.4:9090/seller.shop-name-update`, {
            method: 'post',
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({user_id,newShopName})
        })
        .then(async(result) => {
            // let response = await result.json(); 
            document.querySelector('.shop-overlay').removeAttribute('id');
            window.location.reload()
            loader(false)
        })
        .catch((error) => {
            console.log(error)
            loader(false)
        })
    }


    return(


        
        <>

            <div className="shop-overlay">
                <section style={{width: 'auto', height: 'fit-content', borderRadius: '5px', padding: '10px', background: '#fff'}}>
                    <div className="seller-input-cnt" style={{height: 'auto'}}>
                        <label htmlFor="">Shop Name</label>
                        <input type="text" onInput={e=>setNewShopName(e.target.value)} name=""  placeholder='Shop Name' id="" />
                    </div>
                    <div className="seller-input-cnt">
                        <button onClick={e=> {
                            loader(true, 'Setting Up Your Shop Name')
                            set_shop_name()                         
                        }} style={{
                            background: '#FF4500',
                            color: '#FFF', 
                            border: 'none', 
                            outline: 'none',
                            padding: '10px',
                            borderRadius: '5px'
                        }}>
                            <b><small>Set Shop Name</small></b>
                        </button>
                    </div>
                </section> 
            </div>

            <div className="mid">

                <section>
                    <h3>
                        Account Details
                    </h3>
                    <h6>Your Seller Account Information</h6>
                </section>

                <div className="input-cnt">
                    <label htmlFor="">Firstname</label>
                    <input value={profile?.fname} type="text" placeholder="Firstname" id="" />
                </div>

                <div className="input-cnt">
                    <label htmlFor="">Lastname</label>
                    <input value={profile?.lname} type="text" placeholder="Lastname" id="" />
                </div>

                <div className="input-cnt">
                    <label htmlFor="">Email</label>
                    <input value={profile?.email} type="text" placeholder="Email" id="" />
                </div>  

                <div className="input-cnt">
                    <label htmlFor="">Phone</label>
                    <input value={profile?.phone} type="text" placeholder="Phone" id="" />
                </div>

                {/* <div className="input-cnt">
                    <label htmlFor="">Gender</label>
                    <select placeholder="" id="">
                        <option value=""></option>
                    </select>
                </div> */}

                <section>
                    <div className="input-cnt">
                        <label htmlFor="">State</label>
                        <select placeholder="State" id="">
                            <option value="">Select State</option>
                            {
                                data.map((item,index) => {
                                    return(
                                        item.label === profile?.state
                                        ?
                                        <option selected key={index} value={item.label}>{item.label}</option>
                                        :
                                        <option key={index} value={item.label}>{item.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="input-cnt">
                        <label htmlFor="">Campus</label>
                        <select placeholder="Campus" id="">
                            <option value="">Select Campus</option>
                            {
                                campusLocaleList?.map((item,index) => {
                                    return(
                                        item?.text?.toLowerCase()?.trim() === profile?.campus?.toLowerCase()?.trim()
                                        ?
                                        <option selected key={index} value={item.text}>{item.text}</option>
                                        :
                                        <option key={index} value={item.text}>{item.text}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </section>

            </div>

            <div className="btm">
                <section>
                    <h3>
                        Shop Details
                    </h3>
                    <h6>Manage your shop on Campus Sphere from below</h6>
                </section>

                <div className="input-cnt shop-info-input">
                    <label htmlFor="">Shop Name</label>
                    <input value={shop_details?.title} type="text" onInput={e => updateShopInfo('name', e.target.value)} placeholder="Shop Name" name='shop-name' id="" />
                    <br/>
                    <button style={{padding: '7px 12px', borderRadius: '5px'}} onClick={e=> {

                        if(!document.querySelector('.shop-overlay').hasAttribute('id')){
                            document.querySelector('.shop-overlay').setAttribute('id', 'shop-overlay')
                        }else{

                            document.querySelector('.shop-overlay').removeAttribute('id')
                        }
                    }}>Edit</button>
                </div>

                <section>
                    <h3>
                        Communication Details
                    </h3>
                    <h6>Choose the contact preference for communications from Campus Sphere. We ll send communications and contact you on the details below</h6>
                </section>

                <div className="input-cnt">
                    <label htmlFor="">Contact Name</label>
                    <input type="text" name='contact-name' value={`${profile?.fname} ${profile?.lname}`} placeholder="Contact Name" id="" />
                </div>

                <div className="input-cnt">
                    <label htmlFor="">Contact Phone</label>
                    <input type="text" name='contact-phone' value={profile?.phone} placeholder="Contact Phone" id="" />
                </div>

                <div className="input-cnt">
                    <label htmlFor="">Contact Email</label>
                    <input type="text" name='contact-email' value={profile?.email} placeholder="Contact Email" id="" />
                </div>


               


                {/* <div className="input-cnt shop-info-input">
                    <label htmlFor="" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                        <span>Shipping policy</span>
                        <span>
                            <button onClick={e => {
                                // products_overlay_setup(true, <MyEditor />)
                            }} style={{height: 'auto', padding: '2px 8px', marginBottom: '6px', borderRadius: '4.5px'}}>Edit</button>
                        </span>
                    </label>
                    <textarea name="" placeholder='Shipping policy' id=""></textarea>
                   
                </div>

                <div className="input-cnt shop-info-input">
                    <label htmlFor="" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                        <span>Refund/return policy</span>
                        <span>
                            <button onClick={e => {
                                // products_overlay_setup(true, <MyEditor />)
                            }} style={{height: 'auto', padding: '2px 8px', marginBottom: '6px', borderRadius: '4.5px'}}>Edit</button>
                        </span>
                    </label>
                    <textarea name="" placeholder='Refund / return policy' id=""></textarea>
                </div> */}

            </div>
        </>
    )
}
"use client"
import React, { useEffect, useRef, useState } from 'react'
import '@/app/seller/profile/styles/xx-large.css'
import '@/app/seller/profile/styles/x-large.css'
import '@/app/seller/profile/styles/large.css'
import '@/app/seller/profile/styles/medium.css'
import '@/app/seller/profile/styles/small.css'
import { useSelector } from 'react-redux'
import { data, school_choices } from './location';
import country from '@/states-and-cities.json';
import bank from '@/bank.json';

export default function Profile() {
 
    let {
        seller_id
    }=useSelector(s=>s.seller_id);


    let shopInfo = useRef({
        name: '',
        customerCareName: '',
        customerCarePhone: '',
        customerCareEmail: '',
        customerCareAddress1: '',
        customerCareAddress2: '',
        customerCareAddress3: '',
        customerCareAddress4: '',
        City: '',
        State: '',
        Country: 'Nigeria'
    })
    let paymentInfo = useRef({
        bankName: '',
        bankAccountNumber: '',
        accountBeneficiary: '',
    })
    let shippingInfo = useRef({
        shippingZone: {
            name: '',
            Address1: '',
            Address2: '',
            Address3: '',
            Address4: '',
            City: '',
            State: '',
            Country: 'Nigeria'
        },
        returnAddress: {
            name: '',
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
    const [campusLocaleList, setCampusLocaleList] = useState([]);
    let [state, setState] = useState('')

    useEffect(() => {
        setState(profile?.state)
    },[profile])
    
    useEffect(() => {
        if(seller_id !== 'null' && seller_id !== null && seller_id !== ''){

            fetch(`http://localhost:2222/seller.profile?seller_id=${seller_id}`)
            .then(async(result) => {
                let response = await result.json(); 
                setProfile(response)
            })
            .catch((error) => {
                console.log(error)
            }) 

            fetch(`http://localhost:2222/seller.shop?seller_id=${seller_id}`)
            .then(async(result) => {
                let response = await result.json(); 
                setShop(response)
            })
            .catch((error) => {
                console.log(error)
            }) 
        }
    }, [seller_id])

    useEffect(() => {
        setCampusLocaleList([])
        let stateIndex = data.filter(item =>  item.label.toLowerCase() === state?.toLowerCase())
        let index = data.indexOf(stateIndex[0]); 
        let campuses = Object.values(school_choices).reverse();
        console.log(campuses[index])
        index < 0 ? setCampusLocaleList([]) : setCampusLocaleList(campuses[index])

    }, [state])
    
    let [activeCnt, setActiveCnt] = useState(<ShopInfo shop={shop} updateShopInfo={updateShopInfo} campusLocaleList={campusLocaleList} profile={profile}  />)

    function updateShopInfo(name, value) {
        shopInfo.current[name] = value;
    }
    function updateShippingInfo(parent, name, value) {
        shippingInfo.current[parent][name] = value;
    }
    function updatePaymentInfo(name, value) {
        paymentInfo.current[name] = value;
    }

    function save() {
        console.log(shippingInfo)
        fetch('', {
            method: 'post',
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({
                
            })
        })
        .then(async(result) => {
            let response = await result.json();
            console.log(response)
            if(response.bool){
                dispatch(setSellerTo(response.cookie))
                
            }else{
                
                setBtn("Login")
            }
            e.target.disabled = false; 
            setBtn("Login")
        })
        .catch((err) => {
            console.log(err)

        })
    }
    
  return ( 
    <>
      <div className="seller-profile">
        <div className="seller-profile-cnt">

            <div className="top">
                <section>
                    <h3>
                    Welcome to Campus Express! Let’s take your shop live!
                    </h3>
                    <h6>Complete all the sections below to take your shop live.</h6>
                </section>
            </div>

            <div className="summary">
                <div onClick={e=>setActiveCnt(<ShopInfo updateShopInfo={updateShopInfo} shop={shop} campusLocaleList={campusLocaleList} profile={profile} />)}>
                    <div>
                        Shop Information
                    </div>
                    <hr />
                    <div>
                        pending
                    </div>
                </div>

                <div onClick={e=>setActiveCnt(<ShippingInfo shop={shop} updateShippingInfo={updateShippingInfo} profile={profile} />)}>
                    <div>
                        Shipping Information
                    </div>
                    <hr />
                    <div>
                        pending
                    </div>
                </div>

                <div onClick={e=>setActiveCnt(<PaymentInfo updatePaymentInfo={updatePaymentInfo} />)}>
                    <div>
                        Payment Information
                    </div>
                    <hr />
                    <div>
                        pending
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



function PaymentInfo({updatePaymentInfo}) {
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

                
                <div className="input-cnt">
                    <label htmlFor="">Bank Account Number</label>
                    <input onInput={e => updatePaymentInfo('bankAccountNumber', e.target.value)} type="text" placeholder="Bank Account Number" id="" />
                </div>


                <div className="input-cnt">
                    <label htmlFor="">Bank Name</label>

                    <select onInput={e => updatePaymentInfo('bankName', e.target.value)} placeholder="" id="">
                        <option value="">Select Bank</option>
                        {
                            bank.map((item, index) => 
                                <option value={item.code}>{item.name}</option>
                            )
                        }
                    </select>
                </div>

                <div className="input-cnt">
                    <label htmlFor="">Beneficiary</label>
                    <input onInput={e => updatePaymentInfo('accountBeneficiary', e.target.value)} type="text" placeholder="Beneficiary" id="" />
                </div>
            </div>
        </>
    )
}

function ShippingInfo({profile, updateShippingInfo, shop}) {
    let [state1, setState1] = useState('')
    let [state2, setState2] = useState('')

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

                <div className="input-cnt">
                    <label htmlFor="">Address 1</label>
                    <input onInput={e => updateShippingInfo('shippingZone', 'Address1', e.target.value)} type="text" placeholder="Address 1" id="" />
                </div>

                <div className="input-cnt">
                    <label htmlFor="">Address 2</label>
                    <input onInput={e => updateShippingInfo('shippingZone', 'Address2', e.target.value)} type="text" placeholder="Address 2" id="" />
                </div>


                <div className="input-cnt">
                    <label htmlFor="">Address 3</label>
                    <input onInput={e => updateShippingInfo('shippingZone', 'Address3', e.target.value)} type="text" placeholder="Address 3" id="" />
                </div>

                <div className="input-cnt">
                    <label htmlFor="">Address 4</label>
                    <input onInput={e => updateShippingInfo('shippingZone', 'Address4', e.target.value)} type="text" placeholder="Address 4" id="" />
                </div>

                <section>
                    <div className="input-cnt">
                        <label htmlFor="">Country</label>

                        <select placeholder="" id="">
                            <option value="">Select Country</option>
                            <option selected value="NIgeria">Nigeria</option>
                        </select>
                    </div>
                    <div className="input-cnt">
                        <label htmlFor="">State</label>

                        <select onInput={e => {updateShippingInfo('shippingZone', 'State', e.target.value); setState1(e.target.value)}} placeholder="" id="" >
                            <option value="">Select State</option>
                            {
                                country.map((item,index) => 
                                    <option key={index} value={item.name}>{item.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="input-cnt">
                        <label htmlFor="">City/Region</label>

                        <select placeholder="" id="" onInput={e => {updateShippingInfo('shippingZone', 'City', e.target.value)}}>
                            <option value="">Select Town</option>
                            {
                                country.filter(item => item.name === state1)[0]?.cities.map((city,index) => 
                                    <option key={index} value={city}>{city}</option>
                                )

                            }
                        </select>
                    </div>
                </section>


                <section>
                    <h3>
                        Return Address
                    </h3>
                    <h6>Please provide details of your customer support. These details will be used to adrress product issues by customers</h6>
                </section>

            

                <div className="input-cnt">
                    <label htmlFor="">Address 1</label>
                    <input onInput={e => updateShippingInfo('returnAddress', 'Address1', e.target.value)} type="text" placeholder="Address 1" id="" />
                </div>

                <div className="input-cnt">
                    <label htmlFor="">Address 2</label>
                    <input onInput={e => updateShippingInfo('returnAddress', 'Address2', e.target.value)} type="text" placeholder="Address 2" id="" />
                </div>


                <div className="input-cnt">
                    <label htmlFor="">Address 3</label>
                    <input onInput={e => updateShippingInfo('returnAddress', 'Address3', e.target.value)} type="text" placeholder="Address 3" id="" />
                </div>

                <div className="input-cnt">
                    <label htmlFor="">Address 4</label>
                    <input onInput={e => updateShippingInfo('returnAddress', 'Address4', e.target.value)} type="text" placeholder="Address 4" id="" />
                </div>

                <section>
                    <div className="input-cnt">
                        <label htmlFor="">Country</label>

                        <select placeholder="" id="">
                            <option value="">Select Country</option>
                            <option selected value="NIgeria">Nigeria</option>
                        </select>
                    </div>
                    <div className="input-cnt">
                        <label htmlFor="">State</label>

                        <select onInput={e => {updateShippingInfo('returnAddress', 'State', e.target.value); setState2(e.target.value)}} placeholder="" id="" >
                            <option value="">Select State</option>
                            {
                                country.map((item,index) => 
                                    <option key={index} value={item.name}>{item.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="input-cnt">
                        <label htmlFor="">City/Region</label>

                        <select placeholder="" id="" onInput={e => {updateShippingInfo('returnAddress', 'City', e.target.value)}}>
                            <option value="">Select Town</option>
                            {
                                country.filter(item => item.name === state2)[0]?.cities.map((city,index) => 
                                    <option key={index} value={city}>{city}</option>
                                )

                            }
                        </select>
                    </div>
                </section>

            </div>
        </>
    )
}

function ShopInfo({profile, campusLocaleList, updateShopInfo, shop}) {
    
    let [state, setState] = useState('')


    
    return(
        <>
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
                                        item.text.toLowerCase().trim() === profile?.campus.toLowerCase().trim()
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
                <h6>Manage your shop on Campus Express from below</h6>
            </section>

            <div className="input-cnt">
                <label htmlFor="">Shop Name</label>
                <input type="text" value={shop?.title} placeholder="Shop Name" id="" />
            </div>

            <section>
                <h3>
                    Communication Details
                </h3>
                <h6>Choose the contact preference for communications from Jumia. We ll send communications and contact you on the details below</h6>
            </section>

            <div className="input-cnt">
                <label htmlFor="">Contact Name</label>
                <input type="text" value={`${profile?.fname} ${profile?.lname}`} placeholder="Contact Name" id="" />
            </div>

            <div className="input-cnt">
                <label htmlFor="">Contact Phone</label>
                <input type="text" value={profile?.phone} placeholder="Contact Phone" id="" />
            </div>

            <div className="input-cnt">
                <label htmlFor="">Contact Email</label>
                <input type="text" value={profile?.email} placeholder="Contact Email" id="" />
            </div>


            <section>
                <h3>
                    Customer Care Details
                </h3>
                <h6>Please provide details of your customer support. These details will be used to adrress product issues by customers</h6>
            </section>
            

            <div className="input-cnt">
                <label htmlFor="">Customer Care Name</label>
                <input onInput={e => updateShopInfo('customerCareName', e.target.value)} type="text" placeholder="Customer Care Name" id="" />
            </div>

            <div className="input-cnt">
                <label htmlFor="">Customer Care Phone</label>
                <input onInput={e => updateShopInfo('customerCarePhone', e.target.value)} type="text" placeholder="Customer Care Phone" id="" />
            </div>

            <div className="input-cnt">
                <label htmlFor="">Customer Care Email</label>
                <input onInput={e => updateShopInfo('customerCareEmail', e.target.value)} type="text" placeholder="Customer Care Email" id="" />
            </div>

            <div className="input-cnt">
                <label htmlFor="">Address 1</label>
                <input onInput={e => updateShopInfo('customerCareAddress1', e.target.value)} type="text" placeholder="Address 1" id="" />
            </div>

            <div className="input-cnt">
                <label htmlFor="">Address 2</label>
                <input onInput={e => updateShopInfo('customerCareAddress2', e.target.value)} type="text" placeholder="Address 2" id="" />
            </div>


            <div className="input-cnt">
                <label htmlFor="">Address 3</label>
                <input onInput={e => updateShopInfo('customerCareAddress3', e.target.value)} type="text" placeholder="Address 3" id="" />
            </div>

            <div className="input-cnt">
                <label htmlFor="">Address 4</label>
                <input onInput={e => updateShopInfo('customerCareAddress4', e.target.value)} type="text" placeholder="Address 4" id="" />
            </div>

            <section>
                <div className="input-cnt">
                    <label htmlFor="">Country</label>

                    <select placeholder="" id="">
                        <option value="">Select Country</option>
                        <option selected value="NIgeria">Nigeria</option>
                    </select>
                </div>
                <div className="input-cnt">
                    <label htmlFor="">State</label>

                    <select onInput={e => {updateShopInfo('State', e.target.value); setState(e.target.value)}} placeholder="" id="" >
                        <option value="">Select State</option>
                        {
                            country.map((item,index) => 
                                <option key={index} value={item.name}>{item.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="input-cnt">
                    <label htmlFor="">City/Region</label>

                    <select placeholder="" id="" onInput={e => {updateShopInfo('City', e.target.value)}}>
                        <option value="">Select Town</option>
                        {
                            country.filter(item => item.name === state)[0]?.cities.map((city,index) => 
                                <option key={index} value={city}>{city}</option>
                            )

                        }
                    </select>
                </div>

                
            </section>

            </div>
        </>
    )
}
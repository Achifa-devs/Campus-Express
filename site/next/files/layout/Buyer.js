"use client"
import React, { useEffect, useState } from 'react'
import Header from '../components/Buyer/Header/Header'
import AsideMenu from '../components/Buyer/Header/AsideMenu'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/Buyer/overlays.css'
import '../styles/Buyer/gender.css'
import axios from 'axios'
import { v4 } from 'uuid'
import Footer from '../components/Buyer/Footer';
import { usePathname } from 'next/navigation';
import { setBuyerIdTo } from '@/redux/buyer_store/buyer_data';
import { setBuyerInfoTo } from '@/redux/buyer_store/buyerInfo';
import FilterAside from '../components/Buyer/dashboard/FilterAside'
import { buyer_overlay_setup } from '../reusable.js/overlay-setup'

const BuyerLayout = ({children}) => {

    let dispatch = useDispatch()
    let [screenWidth, setScreenWidth] = useState(0) 
      
    let {
        user_id
    } = useSelector(s => s.user_id)

    useEffect(() => {
        const currentPath = pathname.split('/').splice(-1)[0];
        const excludedPaths = ['login', 'signup', 'password-recovery', ''];

        if (!excludedPaths.includes(currentPath)) {
            fetch('https://www.campussphere.net/api/store/auth', {
            method: 'GET'
            })
            .then(async (res) => {
                const data = await res.json();

                if (data.bool) {
                    dispatch(setBuyerIdTo(data.id));
                } else {
                // Optionally redirect to login
                    // window.location.href = '/login';
                }
            })
            .catch((err) => {
                
                console.error('Auth Error:', err);
                // window.location.href = '/login';
            });
        }
        
    }, [])


    let [load_start, set_load_start] = useState(0);

    useEffect(() => {
        // Ensure this code only runs on the client side
        if (typeof window !== 'undefined') {
            set_load_start(load_start + 1);

            if (load_start === 2) {
                // Check if localStorage item exists
                if (window.localStorage.getItem('cs-gender') === null) {
                    document.querySelector('.buyer-overlay').setAttribute('id', 'buyer-overlay');
                } else {
                    document.querySelector('.buyer-overlay').removeAttribute('id');
                }
            }
        }
    }, [load_start]); // Add load_start to the dependency array to trigger the effect when it changes
    

    // useEffect(() => {
    //     setCookie(buyerData, 0) 
    // }, [buyerData])   
    
    useEffect(() => {

        if(user_id !== null){
            fetch(`https://www.campussphere.net/api/store/customer?user_id=${user_id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            
            })
            .then(async(result) => {
                let response = await result.json(); 
                console.log(response?.data)
                if (response?.bool) {
                    dispatch(setBuyerInfoTo(response?.data));
                    // window.localStorage.removeItem('id_for_unknown_buyer')
                    window.localStorage.setItem('CE_user_id', response?.data?.user_id)
                    update_db_id_for_unknown_buyer_to_registered_id()
                }
            })
            .catch((error) => {
                console.log(error)


            })
        } else {
            let id_for_unknown_buyer = v4();
            window.localStorage.setItem('id_for_unknown_buyer', id_for_unknown_buyer);

        }
        
    }, [user_id])

    function update_db_id_for_unknown_buyer_to_registered_id() {
        fetch(`http://192.168.0.4:9090/product-view-unknown-buyer-update`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                unknown_user_id: window.localStorage.getItem('id_for_unknown_buyer'),
                registered_id: user_id
            })
        })
        .then(async (result) => {
            window.localStorage.removeItem('id_for_unknown_buyer')
            let response = await result.json(); 
            // dispatch(setBuyerInfoTo(response));
            // window.localStorage.removeItem('id_for_unknown_buyer')
        
        })
        .catch((error) => {
            console.log(error)

        })
    }

    

    useEffect(() => {
        // Add a request interceptor to modify headers
        axios.interceptors.request.use(config => {
            // Add your custom header logic here
            config.headers['cs-gender'] = window.localStorage.getItem('cs-gender');
            
            return config;
        }, error => {
            return Promise.reject(error);
        });
    }, [])
    


    let pathname = usePathname()
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    },[])

    let {
        accessory
    } = useSelector(s => s.accessory)
   
    return (
        <>
            <div className="overlay" >
                <div className="loader">
                </div>
            </div>

            <div className='buyer-overlay'>
                <div class="gender-card">
                <div class="large-svg-container">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 50 90"
                    class="largemalesvg"
                    height="90"
                    width="50"
                    >
                    <circle stroke-width="6" stroke="#76E3FE" r="22" cy="25" cx="25"></circle>
                    <path
                        stroke-linecap="round"
                        stroke-width="6"
                        stroke="#76E3FE"
                        d="M25 47L25 87"
                    ></path>
                    <path
                        stroke-linecap="round"
                        stroke-width="6"
                        stroke="#76E3FE"
                        d="M25 86.6958L38.6958 73"
                    ></path>
                    <path
                        stroke-linecap="round"
                        stroke-width="6"
                        stroke="#76E3FE"
                        d="M11 73L24.6958 86.6958"
                    ></path>
                    </svg>

                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 50 90"
                    class="largefemalesvg"
                    height="90"
                    width="50"
                    >
                    <circle stroke-width="6" stroke="#F57CB3" r="22" cy="25" cx="25"></circle>
                    <path
                        stroke-linecap="round"
                        stroke-width="6"
                        stroke="#F57CB3"
                        d="M25 47L25 87"
                    ></path>
                    <path
                        stroke-linecap="round"
                        stroke-width="6"
                        stroke="#F57CB3"
                        d="M12 73H38"
                    ></path>
                    </svg>
                </div>
                <form action="#">
                    <h3 class="heading">What's your gender?</h3>
                    <div class="radio-wrapper">
                    <input onInput={e=> {
                        window.localStorage.setItem('cs-gender', 'male')
                        window.location.reload()
                        document.querySelector('.buyer-overlay').removeAttribute('id')
                    }}
                        class="gender-radio-buttons"
                        id="male"
                        value="male"
                        name="gender"
                        type="radio"
                    />
                    <label class="genderlabel malebutton" for="male">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 50 90"
                        class="smallsvg malesmallsvg"
                        >
                        <circle
                            stroke-width="6"
                            stroke="#76E3FE"
                            r="22"
                            cy="25"
                            cx="25"
                        ></circle>
                        <path
                            stroke-linecap="round"
                            stroke-width="6"
                            stroke="#76E3FE"
                            d="M25 47L25 87"
                        ></path>
                        <path
                            stroke-linecap="round"
                            stroke-width="6"
                            stroke="#76E3FE"
                            d="M25 86.6958L38.6958 73"
                        ></path>
                        <path
                            stroke-linecap="round"
                            stroke-width="6"
                            stroke="#76E3FE"
                            d="M11 73L24.6958 86.6958"
                        ></path></svg
                        >Male
                    </label>

                    <input
                        class="gender-radio-buttons"
                        id="female"
                        value="female"
                        name="gender"
                        type="radio"

                        onInput={e=> {
                            window.localStorage.setItem('cs-gender', 'female')
                            window.location.reload()
                            document.querySelector('.buyer-overlay').removeAttribute('id')
                        }}
                    />
                    <label class="genderlabel femalebutton" for="female">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 50 90"
                        class="smallsvg"
                        >
                        <circle
                            stroke-width="6"
                            stroke="#F57CB3"
                            r="22"
                            cy="25"
                            cx="25"
                        ></circle>
                        <path
                            stroke-linecap="round"
                            stroke-width="6"
                            stroke="#F57CB3"
                            d="M25 47L25 87"
                        ></path>
                        <path
                            stroke-linecap="round"
                            stroke-width="6"
                            stroke="#F57CB3"
                            d="M12 73H38"
                        ></path></svg
                        >Female
                    </label>

                    <input
                        class="gender-radio-buttons"
                        id="other"
                        value="other"
                        name="gender"
                        type="radio"
                    />
                   
                    </div>
                </form>
                </div>

            </div>
            {
               
                    pathname.split('/').splice(-1)[0] === 'login'
                    ?
                    ''
                    :
                    pathname.split('/').splice(-1)[0] === 'signup'
                    ?
                    ''
                    : 
                    pathname.split('/').splice(-1)[0] === 'password-recovery'
                    ?
                    ''
                    :
                    pathname.split('/').splice(-1)[0] === 'reset-pwd'
                    ?
                    ''
                    :pathname.split('/').splice(-1)[0] === 'confirm-token'
                    ?
                    ''
                    :
                    pathname.split('/').splice(-1)[0] === 'delete-account'
                    ?
                    ''
                    :
                    pathname.split('/').splice(-1)[0] === 'about-us'
                    ?
                    ''
                    :
                    pathname.split('/').splice(-1)[0] === 'help-center'
                    ?
                    ''
                    :
                    pathname.split('/').splice(-1)[0] === 'privacy-policy'
                    ?
                    ''
                    :
                    pathname.split('/').splice(-1)[0] === 'terms-of-use'
                    ?
                    ''
                    :
                    <Header />
            }

            
            {
                screenWidth <= 760
                &&
                pathname.split('/').splice(-1)[0] === 'orders'
                ||
                pathname.split('/').splice(-1)[0] === 'favourites'
                || 
                pathname.split('/').splice(-1)[0] === 'inbox'
                ||
                pathname.split('/').splice(-1)[0] === 'following'
                ||
                pathname.split('/').splice(-1)[0] === 'history'
                ||
                pathname.split('/').splice(-1)[0] === 'refund'
                ||
                pathname.split('/').splice(-1)[0] === 'account-management'
                ||
                pathname.split('/').splice(-1)[0] === 'address-book'
                ||
                pathname.split('/').splice(-1)[0] === 'news-letter-preference'
                ?
                    screenWidth <= 760
                    ?
                        accessory === 1 
                        ?
                            children
                        :
                            children
                    :
                    children
                :
                
                children
            }

            {
                screenWidth > 760
                ?
                    pathname.split('/').splice(-1)[0] === 'orders'
                    ?
                    <AsideMenu />
                    :
                    pathname.split('/').splice(-1)[0] === 'favourites'
                    ?
                    <AsideMenu />
                    : 
                    pathname.split('/').splice(-1)[0] === 'inbox'
                    ?
                    <AsideMenu />
                    :
                    pathname.split('/').splice(-1)[0] === 'following'
                    ?
                    <AsideMenu />
                    :
                    pathname.split('/').splice(-1)[0] === 'history'
                    ?
                    <AsideMenu />
                    :
                    pathname.split('/').splice(-1)[0] === 'refund'
                    ?
                    <AsideMenu />
                    :
                    pathname.split('/').splice(-1)[0] === 'account-management'
                    ?
                    <AsideMenu />
                    :
                    pathname.split('/').splice(-1)[0] === 'address-book'
                    ?
                    <AsideMenu />
                    :
                    pathname.split('/').splice(-1)[0] === 'news-letter-preference'
                    ?
                    <AsideMenu />
                    :
                    
                    ''
                :
                ''
            }




            {
                pathname.split('/').splice(-1)[0] === ''
                ?
                <Footer />
                :
                ''
            }


            {/* {
                <>
                    <div style={{height: '100vh', width: '100vw', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
                        <img src={png.src} style={{height: '120px', width: '120px'}} alt="" />
                        <img src={png.src} style={{height: '120px', width: '120px'}} alt="" />
                        <img src={png.src} style={{height: '120px', width: '120px'}} alt="" />
                        <img src={png.src} style={{height: '120px', width: '120px'}} alt="" />
                        <img src={png.src} style={{height: '120px', width: '120px'}} alt="" />
                        <img src={png.src} style={{height: '120px', width: '120px'}} alt="" />
                    </div>
                </>
            } */}
        </>

    )
}

export default BuyerLayout

"use client"

import React, { useEffect, useState } from 'react'
import Aside from '../components/Seller/Aside/Aside'
import Nav from '../components/Seller/Header/Nav'
import {
    useDispatch
} from 'react-redux'
import {
    usePathname
} from 'next/navigation'
import Header from '../components/Seller/Header/Header'
import { setSellerIdTo } from '@/redux/seller_store/seller_data'
import {
    setBuyerIdTo
} from '@/redux/buyer_store/buyer_data';
import { setBuyerInfoTo } from '@/redux/buyer_store/buyerInfo';

const SellerLayout = ({children,setCookie}) => {
    let dispatch = useDispatch()
    let [screenWidth, setScreenWidth] = useState(0) 
   
    useEffect(() => {
        const currentPath = pathname.split('/').splice(-1)[0];
        const excludedPaths = ['login', 'signup', 'password-recovery'];

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
                    // window.location.href = '/buyer/login';
                }
            })
            .catch((err) => {
                
                console.error('Auth Error:', err);
                // window.location.href = '/login';
            });
        }
        
    }, [])


    let pathname = usePathname()
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    },[])

    return (
        <>
           
            
            {
                screenWidth <= 760
                ?
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
                    <Header />
                :
                ''
            }
            
            {children}
            

            {
                pathname.split('/').splice(-1)[0] === 'login'
                ?
                ''
                :
                    pathname.split('/').splice(-1)[0] === 'signup'
                    ?
                    ''
                :
                    screenWidth > 760
                    ?
                    <Aside />
                    :
                    pathname.split('/').splice(-1)[0] === 'new-listing'
                    ?
                    ''
                    :
                    pathname.split('/').splice(-1)[0] === 'profile'
                    ?
                    ''
                    :
                    pathname.split('/').splice(-1)[0] === 'password-recovery'
                    ?
                    ''
                    :
                    <Nav />
                    
            }

            {/* {
                <button onClick={e => window.location.href=('/vendor/new-listing/')} style={{
                    position: 'fixed',
                    right: '15px',
                    bottom: '45px',
                    display: pathname.split('/').splice(-1)[0] === 'profile' ? 'none' : pathname.split('/').splice(-1)[0] === 'new-listing' ? 'none' : pathname.split('/').splice(-1)[0] === 'login' ? 'none' :pathname.split('/').splice(-1)[0] === 'signup' ? 'none'  : 'flex',
                    height: 'fit-content', width: 'fit-content', padding: '8px 8px', borderRadius: '2.5px'
                }}>
                    Upload Product
                </button>
            } */}
        </>  

    )  
}

export default SellerLayout

"use client"

import React, { useEffect, useState } from 'react'
import Aside from '../components/Seller/Aside/Aside'
import Nav from '../components/Seller/Header/Nav'
import { useDispatch, useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import Header from '../components/Seller/Header/Header'
import { setSellerIdTo } from '@/redux/seller_store/seller_data'

const SellerLayout = ({children,setCookie}) => {
    let dispatch = useDispatch()
    let [screenWidth, setScreenWidth] = useState(0) 
    let {
        sellerData
    }=useSelector(s=> s.sellerData)
      

    useEffect(() => {
        setCookie(sellerData) 
    }, [sellerData])    
    useEffect(() => {
        if(pathname.split('/').splice(-1)[0] !== 'login' && pathname.split('/').splice(-1)[0] !== 'signup'){
            function getCookie(name) {
            const cookieName = `${name}=`;
            const cookies = document.cookie.split(';');
            
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
                }
            }
            return null; // Cookie not found
            }
            
            // Example usage:
            const myCookie = getCookie('seller_secret');
            fetch('https://ce-server.vercel.app/seller.authentication',
            {
                method: 'GET',
                // credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': myCookie
                }
            
            })
            .then(async(result) => {

                let response = await result.json(); 
                if(response.bool){
                    dispatch(setSellerIdTo(response.id))
                }else{
                    window.location.href=('/seller/login')
                }
                
            })
            .catch((error) => {
                console.log(error)
                window.location.href=('/seller/login')

            })
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
                    <Nav />
                    
            }
        </>  

    )  
}

export default SellerLayout

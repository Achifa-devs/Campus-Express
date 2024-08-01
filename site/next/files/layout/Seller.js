"use client"

import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Seller/Header/Header'
import Aside from '../components/Seller/Aside/Aside'
import Nav from '../components/Seller/Header/Nav'
// import { GetSeller } from '../api/seller/get'
import { useDispatch } from 'react-redux'
import { usePathname } from 'next/navigation'
// import { setSellerTo } from '../redux/seller_store/seller'

const SellerLayout = ({children}) => {
    let [screenWidth, setScreenWidth] = useState(0) 
    let dispatch = useDispatch() 

    
    let pathname = usePathname()
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    },[])

    // useEffect(() => {
    //     if(window.localStorage.getItem('CE_seller_id') === '' || window.localStorage.getItem('CE_seller_id') === null){
    //     }
    //     async function getData(){
    //         let result = await GetSeller(window.localStorage.getItem('CE_seller_id'))
    //         dispatch(setSellerTo(result))

    //     } 
        
    //     getData()
    //     setScreenWidth(window.innerWidth) 
    // }, [pathname])

 
    return (
        <>
           
            

            
            {children}

            {
                screenWidth > 760
                ?
                <Aside />
                :
                pathname.split('/').splice(-1)[0] === 'seller.editor' 
                ?
                ''
                :
                new URLSearchParams(window.location.search).get('product_id')
                ?
                ''
                : 
                <Nav />
            }
        </>  

    )
}

export default SellerLayout

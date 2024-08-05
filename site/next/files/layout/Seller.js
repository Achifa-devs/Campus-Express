"use client"

import React, { useEffect, useState } from 'react'
import Aside from '../components/Seller/Aside/Aside'
import Nav from '../components/Seller/Header/Nav'
import { useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import Header from '../components/Seller/Header/Header'

const SellerLayout = ({children,setCookie}) => {
    let [screenWidth, setScreenWidth] = useState(0) 
    let {
        sellerData
      }=useSelector(s=> s.sellerData)
      

    useEffect(() => {
        setCookie(sellerData) 
    }, [sellerData])    

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
                    <Nav />
            }
        </>  

    )  
}

export default SellerLayout

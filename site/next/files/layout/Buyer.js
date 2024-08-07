"use client"
import React, { useEffect, useState } from 'react'
import Header from '../components/Buyer/Header/Header'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from "uuid";
// import { GetBuyer, GetSavedItem } from '../api/buyer/get';
import Footer from '../components/Buyer/Footer';
import { setBuyerTo } from '@/redux/buyer_store/BuyerData';
import { usePathname } from 'next/navigation';
import png from '@/app/pngs/download.png'

const BuyerLayout = ({children}) => {

    let dispatch = useDispatch()

    let pathname = usePathname()

    console.log(pathname)
    useEffect(() => {
        let buyer = window.localStorage.getItem('CE_buyer_id');
        if(buyer === null || buyer === '' || buyer === 'null'){
            window.localStorage.setItem('unknownBuyer',`CE-unknown-buyer-${uuid()}`);
            dispatch(setBuyerTo(null))
        }else{
            // async function getData(){
            //     window.localStorage.removeItem('unknownBuyer')
            //     let result = await GetBuyer(window.localStorage.getItem('CE_buyer_id'))
            //     console.log(result)
            //     dispatch(setBuyerTo(result))

                
            // }
            // async function fetchData() {
            //     let result = await GetSavedItem(window.localStorage.getItem('CE_buyer_id'))
            //     dispatch(setSaveTo(result))
            // }
            // fetchData() 
            // getData()
 
        }
    }, [pathname])

    
    return (
        <>
            {/* {
                pathname.split('/').splice(-1)[0] === 'profile'
                ?
                ''
                :
                <Header />
            } */}
            {/* {children} */}
            {/* <Footer /> */}

            {
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
            }
        </>

    )
}

export default BuyerLayout

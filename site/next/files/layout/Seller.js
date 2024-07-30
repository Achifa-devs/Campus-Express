import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Seller/Header/Header'
import Aside from '../components/Seller/Aside/Aside'
import Nav from '../components/Seller/Header/Nav'
import { GetSeller } from '../api/seller/get'
import { useDispatch, useSelector } from 'react-redux'
import { setSellerTo } from '../redux/seller_store/seller'
import { GetSavedItem } from '../api/buyer/get'
import { setSaveTo } from '../redux/buyer_store/Save'

const SellerLayout = (props) => {
    let location = useLocation()
    let [screenWidth, setScreenWidth] = useState(0) 
    let dispatch = useDispatch() 

    

    useEffect(() => {
        if(window.localStorage.getItem('CE_seller_id') === '' || window.localStorage.getItem('CE_seller_id') === null){
        }
        async function getData(){
            let result = await GetSeller(window.localStorage.getItem('CE_seller_id'))
            dispatch(setSellerTo(result))

        } 
        
        getData()
        setScreenWidth(window.innerWidth) 
    }, [location])

 
    return (
        <>
            {
                location.pathname.split('/').splice(-1)[0] === 'seller.profile'
                ?
                ''
                :
                <Header />
            }
            <Aside />

            
            {props.children}

            {
                screenWidth > 760
                ?
                ''
                :
                location.pathname.split('/').splice(-1)[0] === 'seller.editor' 
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

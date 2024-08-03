"use client"
import BuyerLayout from '@/files/layout/Buyer'
import SellerLayout from '@/files/layout/Seller'
import store from '@/redux/store'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import {NextUIProvider} from '@nextui-org/react'

export default function App({children}) {
  let pathname = usePathname();
  let [user, setUser] = useState();
  let [role, setRole] = useState();
  // useEffect(() => {
  //     let user = window.localStorage.getItem('CE_buyer_id');
  //     if(user === null || user === '' || user === 'null'){
  //         window.localStorage.setItem('unknownBuyer',`CE-unknown-user-${uuid()}`);
  //         dispatch(setBuyerTo(null))
  //     }else{
  //       async function getData(){
  //         window.localStorage.removeItem('unknownBuyer')
  //         let result = await GetBuyer(window.localStorage.getItem('CE_buyer_id'))
  //         dispatch(setBuyerTo(result))
  //       }
  //       async function fetchData() {
  //         let result = await GetSavedItem(window.localStorage.getItem('CE_buyer_id'))
  //         dispatch(setSaveTo(result))
  //       }
  //       fetchData() 
  //       getData()

  //     }
  // }, [pathname])
  
  return (
    <>

      <Provider store={store}>
        <NextUIProvider>
          {
            <SellerLayout children={children}/>
          }
        </NextUIProvider>
      </Provider>
    </>
  )
}

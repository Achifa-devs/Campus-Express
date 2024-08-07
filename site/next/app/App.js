"use client"
import BuyerLayout from '@/files/layout/Buyer'
import SellerLayout from '@/files/layout/Seller'
import store from '@/redux/store'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import {NextUIProvider} from '@nextui-org/react'
import Login from './seller/login/page'
import { setNewCookie } from './layout'

export default function App({children, cookieBook}) {
  let pathname = usePathname();
  

  async function setCookie(data) {
    if(data !== null && data !== 'null' && data !== ''){
      let response = await setNewCookie(data)
      let result = JSON.parse(response);
      if(result){
        window.location.href=('/seller/shop')

      }
    }
  }

  


  
  return (
    <>
      {
        <Provider store={store}>
          {
            pathname.split('/').splice(-2)[0] === 'seller'
            ?
              <SellerLayout setCookie={setCookie}>
                {children}
              </SellerLayout>
            :
              <BuyerLayout>
                {children}
              </BuyerLayout>
          }
        </Provider>
      }
    </>
  )
}

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
import { IsClientCtxProvider } from '@/files/reusable.js/isClieent'

export default function App({children}) {
  let pathname = usePathname();
  

  // async function setCookie(data,role) {
  //   if(data !== null && data !== 'null' && data !== ''){
  //     let response = await setNewCookie(data, role)
  //     let result = JSON.parse(response);
  //     if(role === 1 && result){
  //       window.location.href=('/seller/shop')
  //     }else if(role === 0 && result){
  //       window.location.href=('/')

  //     }
  //   }
  // }

  


  
  return (
    <>
      {
        <Provider store={store}>
          
          {
            pathname.split('/').splice(-2)[0] === 'seller'
            ?
            <IsClientCtxProvider>
              <SellerLayout>
                {children}
              </SellerLayout>
            </IsClientCtxProvider>
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

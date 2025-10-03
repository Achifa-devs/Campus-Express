"use client"
import BuyerLayout from '@/files/layout/Buyer'
import SellerLayout from '@/files/layout/Seller'
import store from '@/redux/store'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Provider, useSelector } from 'react-redux'
import { IsClientCtxProvider } from '@/files/reusable.js/isClieent'

export default function App({children}) {
  let pathname = usePathname();

  


  
  return (
    <>
      {
        <Provider store={store}>
          
          {
            pathname.split('/').splice(-2)[0] === 'vendor'
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

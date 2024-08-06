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
  let [seller_auth, set_seller_auth] = useState(false)
  
  useEffect(() => {
    if(!pathname.split('/').splice(-1)[0] === 'login' && !pathname.split('/').splice(-1)[0] === 'login'){
      if(pathname.split('/').splice(-2)[0] === 'seller'){
        let getSellerJwt = cookieBook.filter(item => item.name === 'seller_secret')
        if(getSellerJwt.length > 0){
          console.log(getSellerJwt)
          set_seller_auth(true)
        }else{
          window.location.href=('/seller/login')
        }
      }else{
  
      }
    }else{

    }
  }, [])


  function setCookie(data) {
    setNewCookie(data)
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

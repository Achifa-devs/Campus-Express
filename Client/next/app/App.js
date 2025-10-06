"use client"
import BuyerLayout from '@/files/layout/Buyer'
import SellerLayout from '@/files/layout/Seller'
import store from '@/redux/store'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { IsClientCtxProvider } from '@/files/reusable.js/isClieent'
import { v4 as uuidv4 } from 'uuid'
import { setBuyerIdTo } from '@/redux/buyer_store/buyer_data'
import { setBuyerInfoTo } from '@/redux/buyer_store/buyerInfo'
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup'

export default function App({children}) {
  return (
    <Provider store={store}>
      <Auth>{children}</Auth>
    </Provider>
  )
}

function Auth({children}) {
  const pathname = usePathname()
  const dispatch = useDispatch()

  const { user_id } = useSelector((s) => s.user_id)
  const [excludedPaths, setExcludedPaths] = React.useState(['login', 'signup', 'password-recovery', ''])

  useEffect(() => {
    const currentPath = pathname.split('/').length > 2 ? pathname.split('/').splice(-2)[0] : pathname.split('/').splice(-1)[0]
    console.log('Current Pathname:', pathname.split('/')) // Debugging line
    console.log('Current Path:', currentPath) // Debugging line
    if(currentPath === 'vendor'){
      setExcludedPaths(['login', 'password-recovery', ''])
    }else{
      setExcludedPaths(['login', 'signup', 'password-recovery', ''])
    }

    if (!excludedPaths.includes(currentPath)) {
      // alert('Fetching user authentication...')
      fetch('/api/store/auth', {
        method: 'GET'
      })
      .then(async (res) => {
        const data = await res.json()
        if (data.success) {
          dispatch(setBuyerIdTo(data.id))
        } else {
          // window.location.href = '/login'
        }
      })
      .catch((err) => {
        console.error('Auth Error:', err)
        // window.location.href = '/login'
      })
    }
  }, [pathname, dispatch])

  useEffect(() => {
    if (user_id !== null) {
      buyer_overlay_setup(true, 'Loading Your Info...')
      fetch(`/api/store/customer?user_id=${user_id}`, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(async (result) => {
        let response = await result.json()
        if (response?.success) {
          dispatch(setBuyerInfoTo(response?.data))
          window.localStorage.setItem('CE_user_id', response?.data?.user_id)
          buyer_overlay_setup(false, '')
        }
      })
      .catch((error) => {
        console.log(error)
        buyer_overlay_setup(false, '')
      })
    } else {
      let id_for_unknown_buyer = uuidv4()
      window.localStorage.setItem('id_for_unknown_buyer', id_for_unknown_buyer)
    }
  }, [user_id, dispatch])

  // ✅ FIX: return JSX, not object
  return pathname.split('/').splice(-2)[0] === 'vendor' ? (
    <IsClientCtxProvider>
      <SellerLayout>{children}</SellerLayout>
    </IsClientCtxProvider>
  ) : (
    <BuyerLayout>{children}</BuyerLayout>
  )
}

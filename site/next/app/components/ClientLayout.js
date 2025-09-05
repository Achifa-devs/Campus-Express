"use client"

import BuyerLayout from '@/files/layout/Buyer'
import SellerLayout from '@/files/layout/Seller'
import { usePathname } from 'next/navigation'
import { IsClientCtxProvider } from '@/files/reusable.js/isClieent'

export default function ClientLayout({ children }) {
  const pathname = usePathname()

  return (
    <>
      {pathname.split('/').splice(-2)[0] === 'vendor' ? (
        <IsClientCtxProvider>
          <SellerLayout>
            {children}
          </SellerLayout>
        </IsClientCtxProvider>
      ) : (
        <BuyerLayout>
          {children}
        </BuyerLayout>
      )}
    </>
  )
}
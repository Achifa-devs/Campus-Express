"use client"
import React from 'react'
import './styles/xx-large.css'
import Ads from '@/files/components/Buyer/dashboard/Ads'
import Showcase from '@/files/components/Buyer/dashboard/Showcase'

export default function Dashboard() {
  return (
    <>
      <div className="buyer-dashboard-cnt">
        <Ads />
        
        <Showcase />


      </div>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import home from '../../../assets/home-svgrepo-com (6).svg'
import me from '../../../assets/profile-circle-svgrepo-com (3).svg'
import mssg from '../../../assets/message-circle-lines-alt-svgrepo-com.svg'
import lib from '../../../assets/store-svgrepo-com.svg'
import { openNotice } from '../../../reusable.js/notice';
import {usePathname} from 'next/navigation'
export default function Nav() {
  let [screenWidth, setScreenWidth] = useState(0) 
  let pathname = usePathname()
  
  useEffect(() => {
      setScreenWidth(window.innerWidth)
  }, [])
  let [active, set_active] = useState('shop')

  useEffect(() => {
      set_active(pathname.split('/').splice(-1)[0])
  }, [pathname])

  return (
    <nav className='shadow-sm' style={{
        height: '70px',
        width: '100%',
        color: '#000',
        display: screenWidth > 760 ? 'none' : 'flex',
        position: 'fixed',
        bottom: '0',
        left: '0',
        borderTop: '1px solid #fff4e0',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '#fff',
        padding: '5px',
        color: '#fff',
        fontWeight: 'bold '
      }}>

      <div  onClick={e => {
        window.location.href=('/vendor/orders')
        // alert('Check back later')  

      }} style={{
        width: '33.3%',
        fontSize: 'x-small',
        color: '#000',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderBottom: active === 'orders' ? '#FF4500' : '#fff'
      }}>
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="4" width="14" height="17" rx="2" stroke="#000" stroke-width="2"/>
          <path d="M9 9H15" stroke="#000" stroke-width="2" stroke-linecap="round"/>
          <path d="M9 13H15" stroke="#000" stroke-width="2" stroke-linecap="round"/>
          <path d="M9 17H13" stroke="#000" stroke-width="2" stroke-linecap="round"/>
        </svg>  
        &nbsp;
        &nbsp;
        <span>Orders</span>
      </div>
      <div onClick={e => window.location.href=('/vendor/listing')} style={{width: '33.3%', fontSize: 'x-small', color: '#000', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0px', flexDirection: 'column', borderBottom: active === 'listing' ? '#FF4500' : '#fff'}}>
        <svg width="20px" height="20px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FF4500">
  strokeLinejoin
          <g id="SVGRepo_bgCarrier" stroke-width="0"/>strokeLinejoinstrokeLinejoinstrokeLinejoinstrokeLinejoin

          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

          <g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </g>

        </svg>
        &nbsp;
        &nbsp;
        <span>Listing</span>
      </div>
      <div style={{width: '33.3%', borderBottom: active === 'balance' ? '#FF4500' : '#fff', fontSize: 'x-small', color: '#000', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0px', flexDirection: 'column'}} onClick={e => 
      {
        window.location.href=('/vendor/balance')
        // alert('Check back later')

      }
      }>
          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 15L7 9" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round"/>
              <path d="M20.8333 9H18.2308C16.4465 9 15 10.3431 15 12C15 13.6569 16.4465 15 18.2308 15H20.8333C20.9167 15 20.9583 15 20.9935 14.9979C21.5328 14.965 21.9623 14.5662 21.9977 14.0654C22 14.0327 22 13.994 22 13.9167V10.0833C22 10.006 22 9.96726 21.9977 9.9346C21.9623 9.43384 21.5328 9.03496 20.9935 9.00214C20.9583 9 20.9167 9 20.8333 9Z" stroke="#000" stroke-width="1.5"/>
              <path d="M20.965 9C20.8873 7.1277 20.6366 5.97975 19.8284 5.17157C18.6569 4 16.7712 4 13 4L10 4C6.22876 4 4.34315 4 3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20H13C16.7712 20 18.6569 20 19.8284 18.8284C20.6366 18.0203 20.8873 16.8723 20.965 15" stroke="#000" stroke-width="1.5"/>
              <path d="M17.9912 12H18.0002" stroke="#000" stroke-width="2" stroke-linecap="round" strokeLinejoin="round"/>
          </svg>
          &nbsp;
          &nbsp;

          <span>Balance</span>
      </div>
      
      <div onClick={e =>window.location.href=('/vendor/shop')} style={{width: '33.3%', borderBottom: active === 'shop' ? '#FF4500' : '#fff', fontSize: 'x-small', color: '#000', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0px', flexDirection: 'column'}}>
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000">
strokeLinejoin
          <g id="SVGRepo_bgCarrier" stroke-width="0"/>strokeLinejoin

          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

          <g id="SVGRepo_iconCarrier"> <path d="M20 11.6211V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V11.6211M7.5 9.75C7.5 10.9926 6.49264 12 5.25 12C4.09397 12 3.14157 11.1282 3.01442 10.0062C2.99524 9.83688 3.02176 9.66657 3.06477 9.50173L4.10996 5.49516C4.3397 4.6145 5.13506 4 6.04519 4H17.9548C18.8649 4 19.6603 4.6145 19.89 5.49516L20.9352 9.50173C20.9782 9.66657 21.0048 9.83688 20.9856 10.0062C20.8584 11.1282 19.906 12 18.75 12C17.5074 12 16.5 10.9926 16.5 9.75M7.5 9.75C7.5 10.9926 8.50736 12 9.75 12C10.9926 12 12 10.9926 12 9.75M7.5 9.75L8 4M12 9.75C12 10.9926 13.0074 12 14.25 12C15.4926 12 16.5 10.9926 16.5 9.75M12 9.75V4M16.5 9.75L16 4" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g>

        </svg>
        &nbsp;
        &nbsp;

        <span>Shop</span>
      </div>
    </nav>
  )
} 

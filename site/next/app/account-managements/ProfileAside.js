import React, { useEffect, useRef, useState } from 'react'
import '@/app/account-managements/styles/xx-large.css'
import '../../files/styles/Buyer/aside.css'
import '@/app/account-managements/styles/x-large.css'
import '@/app/account-managements/styles/large.css'
import '@/app/account-managements/styles/medium.css'
import closeSvg from '@/public/close-square-svgrepo-com (1).svg'

import '@/app/account-managements/styles/small.css'
import { useSelector } from 'react-redux'
import me from '../../public/user-rounded-svgrepo-com.svg'
import security from '../../public/password-svgrepo-com.svg'
import arrow from '../../public/down-arrow-backup-2-svgrepo-com.svg'
import { data } from 'autoprefixer'
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup'
import axios from 'axios'
import { v4 } from 'uuid'
import { open_notice } from '@/files/reusable.js/notice'

export default function ProfileAside({updateMenuTab}) {
    let [screenWidth, setScreenWidth] = useState(0)
    let [btn1, setbtn1] = useState(false)
    let [menu, updateMenu] = useState([
        'profile-edit', 'edit', 'profile', 'password'
    ])
    let [edit, setedit] = useState('email')

    let [btn2, setbtn2] = useState(false)
    
    let {
        buyer_info
    } = useSelector(s => s.buyer_info);

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)

    }, [])
    // function updateMenuTab(data) {
    //     updateMenuTab(data)
    // }
    function updateEdit(data) {
        setedit(data)
    }
    
  function closeProfileAside() {
    document.querySelector('.profile-aside-overlay').removeAttribute('id')
  }
  return (
      <div className='profile-aside-overlay' onClick={e => e.target === e.currentTarget ? closeProfileAside() : ''} style={{ zIndex: '1000000' }}>
        <div style={{ width: '45%', height: '100vh', position: 'absolute', top: '0', left: '0', background: '#fff', padding: '10px'}}>
            <div onClick={closeProfileAside} className="aside-close">
                <img src={closeSvg.src} style={{height: '30px', width: '30px'}} alt="" />
            </div>
            <section style={{textAlign: 'center', display: 'flex', justifyContent:'flex-start', flexDirection: 'column', alignItems: 'flex-start'}}>
                <img src={'https://res.cloudinary.com/daqbhghwq/image/upload/c_thumb,w_200,g_face/v1724852529/448223033_380994008307411_3052806854721458949_n_fbxqpk.jpg'} style={{height: screenWidth > 760 ? '50px' : '50px', width: screenWidth > 760 ? '50px' : '50px', borderRadius: '5px'}}  alt="" />
                <h5 style={{fontSize: 'medium', textAlign: 'left', width: '100%', marginTop: '15px'}}>Hello {buyer_info?.fname} {buyer_info?.lname}</h5>
            </section>
          
            <br />
            <section>
                <div className='profile-aside'>
                    <button style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} className='shadow-sm' onClick={e=>setbtn1(!btn1)}>
                    <span style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span>
                        <img style={{height: screenWidth > 760 ? '25px' : '25px', width: screenWidth > 760 ? '25px' : '25px'}} src={me.src} alt="" />
                        </span>
                        &nbsp;
                        &nbsp;
                        <span>Profile Details</span>
                    </span>
                    <span>
                        <img style={{height: screenWidth > 760 ? '15px' : '15px', width: screenWidth > 760 ? '15px' : '15px'}} src={arrow.src} alt="" />
                    </span>
                    </button>
                    {
                    btn1 &&
                    <ul className='ul' style={{ padding: '10px 0px' }}>
                    <li onClick={e=> updateMenuTab('profile')} className='li'>Basic Details</li>
                    <li onClick={e=> {updateMenuTab('edit'); updateEdit('Phone number')}} className='li'>Edit Phone</li>
                    <li onClick={e=> {updateMenuTab('edit'); updateEdit('Email')}} className='li'>Edit Email</li>
                    </ul>
                    }
                </div>
                <div className='profile-aside'>
                    <button onClick={e=>setbtn2(!btn2)} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} className='shadow-sm'>
                    <span style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span>
                        <img style={{height: screenWidth > 760 ? '25px' : '25px', width: screenWidth > 760 ? '25px' : '25px'}} src={security.src} alt="" />
                        </span>
                        &nbsp;
                        &nbsp;
                        <span>Security</span>
                    </span>
                    <span>
                        <img style={{height: screenWidth > 760 ? '15px' : '15px', width: screenWidth > 760 ? '15px' : '15px'}} src={arrow.src} alt="" />
                    </span>
                    </button>
                    {
                    btn2 &&
                    <ul className='ul' style={{ padding: '10px 0px' }}>
                    {/* <li className='li'>Manage passkey</li> */}
                    {/* <li className='li'>Change pin</li> */}
                    <li onClick={e=> updateMenuTab('password')} className='li'>Change password</li>
                    <li onClick={e=> ''} className='li err-mssg' style={{color: 'red', fontWeight: '500'}}>Delete account</li>
                    </ul>
                    }
                </div>
            </section>
        </div>
      </div>
  )
}

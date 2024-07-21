import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import home from '../../../assets/home-svgrepo-com (6).svg'
import me from '../../../assets/profile-circle-svgrepo-com (3).svg'
import mssg from '../../../assets/message-circle-lines-alt-svgrepo-com.svg'
import lib from '../../../assets/store-svgrepo-com.svg'
import { openNotice } from '../../../Functions/notice';

export default function Nav() {
  let [screenWidth, setScreenWidth] = useState(0)
  let navigate = useNavigate()

  useEffect(() => {
    let width = window.innerWidth;
    setScreenWidth(width)
}, [])

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
        background: '#fff',
        color: '#fff',
        fontWeight: 'bold '
      }}>

      <div onClick={e => window.location.href=('/seller')} style={{
        width: '33.3%',
        fontSize: 'x-small',
        color: '#000',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column-reverse'
      }}>
        <div>Home</div>
        <div>
          <img src={home} style={{height: '25px', width: '25px'}} alt="" />
        </div>
      </div>
      <div onClick={e => window.location.href=('/seller.shop')} style={{width: '33.3%', fontSize: 'x-small', color: '#000', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column-reverse'}}>
        <div>Inventory</div>
        <div>
          <img src={lib} style={{height: '25px', width: '25px'}} alt="" />
        </div>
      </div>
      
      
      <div onClick={e => 
        // window.location.href=('/seller.messages')
        openNotice('Feature is coming soon.')
      } style={{width: '33.3%', fontSize: 'x-small', color: '#000', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column-reverse'}}>
        <div>Messages</div>
        <div>
          <img src={mssg} style={{height: '25px', width: '25px'}} alt="" />
        </div>
      </div>

      <div onClick={e => window.location.href=('/seller.profile')} style={{width: '33.3%', fontSize: 'x-small', color: '#000', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column-reverse'}}>
        <div>Me</div>
        <div>
          <img src={me} style={{height: '25px', width: '25px'}} alt="" />
        </div>
      </div>
    </nav>
  )
} 

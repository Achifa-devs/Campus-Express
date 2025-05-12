"use client"
import React from 'react'
import './styles/xx-large.css'
import './styles/x-large.css'
import './styles/large.css'
import './styles/medium.css'
import { 
  useEffect,
  useState
} from 'react'
import './styles/small.css' 
import Showcase from '@/files/components/Buyer/dashboard/Showcase'
export default function Dashboard() {
  let [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
      setScreenWidth(window.innerWidth)
  }, [])
  
  return (
    <>
      <div className="buyer-dashboard-cnt" style={{background: screenWidth > 760 ? '#f9f9f9' : '#fff'}}>
        <Showcase />
        <button className="shadow" style={{position: 'fixed', bottom: '20px', padding: '10px', display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', right: '20px', width: 'auto', height: 'auto', background: '#FF4500', borderRadius: '10px'}} onClick={e => window.location.href=('/vendor')}>  
        
          {/* <img src={mssg} style={{height: '25px', width: '25px'}} alt="" /> */}
          <span>
              {/* <img src={sellSvg} style={{height: '25px', width: '25px'}} alt="" /> */}
          </span>
          &nbsp;
          <span style={{color: '#fff'}}>Become a vendor</span>

        </button>
      </div>
    </>
  )
}



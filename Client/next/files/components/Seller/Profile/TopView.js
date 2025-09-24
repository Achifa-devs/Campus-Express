import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import editSvg from '../../../assets/edit-svgrepo-com.svg'


import { useNavigate } from 'react-router-dom'
import { GetSellerPhoto } from '../../../api/seller/get'
export default function TopView({photo,userData}) {
    
    
  let [screenWidth, setScreenWidth] = useState(0)
  let navigate = useNavigate()

  useEffect(() => { 
    let width = window.innerWidth;
    setScreenWidth(width)
  }, [])

    


  return (
    <>
        <div className="seller-profile-left">
            
          <img style={{padding: '10px'}} src={photo}  alt="" />

          <img onClick={e => window.location.href=('/seller.settings.profile')} src={editSvg} style={{position: 'absolute', height: '30px', width: '30px', border: 'none', right: '10px', top: '10px'}}  alt="" />

          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          <div>
            <div className="seller-profile-name">
                {userData?.fname} {userData?.lname}
            </div>


            <div className="seller-profile-date">
                {userData?.state}-{userData?.campus}
            </div>
            <div className="seller-profile-date">
                Member since {userData?.date?(userData.date):'loading...'}
            </div>
          </div>

        </div>
    </>
  )
}

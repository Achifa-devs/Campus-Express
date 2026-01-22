import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import editSvg from '../../../assets/edit-svgrepo-com.svg'

import userPhoto from '../../../assets/user-svgrepo-com (2).svg'

import { useNavigate } from 'react-router-dom'
import { GetSellerPhoto } from '../../../api/seller/get'
export default function TopView({userData}) {
    

    let [screenWidth, setScreenWidth] = useState(0)
    let [photo, setPhoto] = useState(userPhoto)
    // let [userData, setUserData] = useState()

    let navigate = useNavigate()

    useEffect(() => { 
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

    

    useEffect(() => {
      async function getPhoto(){
        let result = await GetSellerPhoto(window.localStorage.getItem('CE_user_id'))
        console.log(result)
        setPhoto(result?.file)
      }
      getPhoto()
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

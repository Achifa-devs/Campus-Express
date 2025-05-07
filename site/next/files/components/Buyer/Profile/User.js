import React, { useEffect, useState } from 'react'
import { GetSeller } from '../../../api/seller/get'
// import { GetSeller } from '../../../api/seller'


export default function User() {

  let [fname, setFname] = useState('')
  let [lname, setLname] = useState('')
  let [email, setEmail] = useState('')
  let [phone, setPhone] = useState('')
  let [state, setState] = useState('')
  let [campus, setCampus] = useState('')
  let [userData, setUserData] = useState('')

  useEffect(() => {
      let overlay = document.querySelector('.overlay')
      //overlay.setAttribute('id', 'overlay');
      GetSeller(window.localStorage.getItem('CE_user_id'))
      .then((result) => {
          setUserData(result)
          setFname(result.fname)
          setLname(result.lname)
          setEmail(result.email)
          setPhone(result.phone)
          setCampus(result.campus)
          setState(result.state)
          overlay.removeAttribute('id')

      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
    
      <div className="seller-profile-personal-data-cnt">
        <div className="input-cnt">
            <label htmlFor="">First Name</label>
            <input value={fname} type="text" placeholder='First Name' />
        </div>

        <div className="input-cnt">
            <label htmlFor="">Last Name</label>
            <input value={lname} type="text" placeholder='Last Name' />
        </div>

        <div className="input-cnt">
            <label htmlFor="">Email</label>
            <input value={email} type="text" placeholder='Email' />
        </div>

        <div className="input-cnt">
            <label htmlFor="">Phone</label>
            <input value={phone} type="text" placeholder='Phone' />
        </div>

        <div className="input-cnt">
            <label htmlFor="">Campus</label>
            <input value={campus} type="text" placeholder='Campus' />
        </div>

        <div className="input-cnt">
            <label htmlFor="">State</label>
            <input value={state} type="text" placeholder='State' />
        </div>
      </div>
    </> 
  ) 
}

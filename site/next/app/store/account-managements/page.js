"use client"
import React, { useEffect, useRef, useState } from 'react'
import '@/app/store/account-managements/styles/xx-large.css'
// import '@/app/store/account-managements/styles/x-large.css'
// import '@/app/store/account-managements/styles/large.css'
import '@/app/store/account-managements/styles/medium.css'
import '@/app/store/account-managements/styles/small.css'
import { useSelector } from 'react-redux'
import me from '../../../public/user-rounded-svgrepo-com.svg'
import security from '../../../public/password-svgrepo-com.svg'
import arrow from '../../../public/down-arrow-backup-2-svgrepo-com.svg'
import { data } from 'autoprefixer'
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup'
import axios from 'axios'
import { v4 } from 'uuid'
import { open_notice } from '@/files/reusable.js/notice'
import ProfileAside from './ProfileAside'
import { setMenuTo } from '@/redux/seller_store/settings_option'

// import img from '../../../../assets/logo.png'
export default function AccounManagement() {
  let [screenWidth, setScreenWidth] = useState(0)
  let [btn1, setbtn1] = useState(false)
  let [menu, setmenu] = useState([
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
  function updateMenu(data) {
    setmenu(data)
  }
  function updateEdit(data) {
    setedit(data)
  }
  const validation = useRef(false);

  function updateMenuTab(data) {
    updateMenu(data)
  }

  return (
    <>
      <div className="profile-cnt">
        {
          screenWidth < 761
          ?
          <ProfileAside updateMenuTab={updateMenuTab} />
          :
          <div id="left">
            <section style={{textAlign: 'center', display: 'flex', justifyContent:'center', flexDirection: 'column', alignItems: 'center'}}> 
              <img src={'https://res.cloudinary.com/daqbhghwq/image/upload/c_thumb,w_200,g_face/v1724852529/448223033_380994008307411_3052806854721458949_n_fbxqpk.jpg'} style={{height: screenWidth > 760 ? '50px' : '50px', width: screenWidth > 760 ? '50px' : '50px', borderRadius: '5px'}}  alt="" />
              <h5 style={{fontSize: 'medium'}}>Hello {buyer_info?.fname} {buyer_info?.lname}</h5>

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
                  <li onClick={e=> setmenu('profile')} className='li'>Basic Details</li>
                  <li onClick={e=> {setmenu('edit'); updateEdit('Phone number')}} className='li'>Edit Phone</li>
                  <li onClick={e=> {setmenu('edit'); updateEdit('Email')}} className='li'>Edit Email</li>
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
                  <li onClick={e=> setmenu('password')} className='li'>Change password</li>
                  <li onClick={e=> ''} className='li err-mssg' style={{color: 'red', fontWeight: '500'}}>Delete account</li>
                  </ul>
                }
              </div>
            </section>
          </div>
        }


        <div id="right">
          {
            menu === 'profile-edit'
            ?
            <>
              <EditProfile data={buyer_info} />
            </>
            :
            menu === 'edit'
            ?
            <>
              <Edit data={buyer_info} edit={edit} updateEdit={updateEdit} />
            </>
            :
            menu === 'profile'
            ?
            <>
              <Input updateMenu={updateMenu} data={buyer_info} />
            </>
            :
            <>
              <Password />
            </>
          }
        </div>
      </div>
    </>
  )
}


function Input({data, updateMenu}) {
  

  return (
    <>
      
      <section style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}} >
        <h4>Profile Details</h4>
        <button onClick={e=> updateMenu('profile-edit')} style={{width: 'auto', color: '#FF4500', background: '#f9f9f9'}}>Edit profile</button>
      </section>
      <br />
      
      <section>
        <div className="input-cnt">
          <label htmlFor="">First name</label>
          <input value={data?.fname} style={{borderBottom: '1px solid #000', fontWeight: '400', padding: '10px 5px'}} type="text" name="" id="" />
        </div>
        <div className="input-cnt">
          <label htmlFor="">Last name</label>
          <input value={data?.lname} style={{borderBottom: '1px solid #000', fontWeight: '400', padding: '10px 5px'}} type="text" name="" id="" />
        </div>
        <div className="input-cnt">
          <label htmlFor="">Email</label>
          <input value={data?.email} style={{borderBottom: '1px solid #000', fontWeight: '400', padding: '10px 5px'}} type="text" name="" id="" />
        </div>
        <div className="input-cnt">
          <label htmlFor="">Phone number</label>
          <input value={data?.phone} style={{borderBottom: '1px solid #000', fontWeight: '400', padding: '10px 5px'}} type="text" name="" id="" />
        </div>
        <div className="input-cnt">
          <label htmlFor="">Gender</label>
          <input value={data?.gender ? 'Male' : 'Female'} style={{borderBottom: '1px solid #000', fontWeight: '400', padding: '10px 5px'}} type="text" name="" id="" />
        </div>
      </section>
    </>
  )
}

function EditProfile({ data, Validation }) {
  let [fname, setfname] = useState('')
  let [lname, setlname] = useState('')
  let [gender, setgender] = useState('')
  let {
    buyer_id
  } = useSelector(s => s.buyer_id);
  
  function update_buyer() {
    // let inputs = [...document.querySelectorAll('input')]
    if (fname !== '' && lname !== '' && gender !== '' && fname.length > 3 && lname.length > 3) {
      buyer_overlay_setup(true, 'Updating profile')

      axios.post('http://192.168.24.146:9090/profile-update', {fname,lname,gender,buyer_id})
      .then(({data})=>{
        window.location.reload()
        buyer_overlay_setup(false, '')
          
      })
      .catch(error=>{
        console.log(error)
        buyer_overlay_setup(false, '')
  
      })
    } else {
      open_notice(true, 'Please ensure all field has at least 3 characters')
    }
  }

  useEffect(() => {
    setfname(data?.fname)
    setlname(data?.lname)
    setgender(parseInt(data?.gender) === 0 ? 'Female' : 'Male')
  }, [data])

  return (
    <>
      <section>
        <div className="input-cnt">
          <label htmlFor="">First name</label>
          <input defaultValue={data?.fname} onInput={e=> setfname(e.target.value)} style={{border: '2px solid #FF4500', fontWeight: '400', padding: '10px 5px'}} type="text" name="" id="" />
        </div>
        <div className="input-cnt">
          <label htmlFor="">Last name</label>
          <input defaultValue={data?.lname} onInput={e=> setlname(e.target.value)} style={{border: '2px solid #FF4500', fontWeight: '400', padding: '10px 5px'}} type="text" name="" id="" />
        </div>
        
        <div className="input-cnt">
          <label htmlFor="">Gender</label>
          <select name="" id="" onInput={e=> setgender(e.target.value)} style={{border: '2px solid #FF4500', fontWeight: '400', padding: '10px 5px'}}>
            <option value="">Select gender</option>
            {[0, 1].map((item, index) => parseInt(data?.gender) === item ? <option value={item} selected key={index}>{item === 0? 'Female' : 'Male'}</option> : <option value={item} key={index}>{item === 0? 'Female' : 'Male'}</option>)}
          </select>
        </div>
        <br />
        <button onClick={e => update_buyer()} style={{background: '#FF4500', color: '#fff', width: 'auto', borderRadius: '5px'}}>
          Save
        </button>
      </section> 
    </>
  )
}

function Edit({ edit, data }) {

  
  let [email, setemail] = useState('')
  let [phone, setphone] = useState('')
  let [err, seterr] = useState('')

  let {
    buyer_id
  } = useSelector(s => s.buyer_id);
  
  function update_() {
    // let inputs = [...document.querySelectorAll('input')]
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (edit.toLowerCase() === 'email' && email !== '' && emailRegex.test(email) || edit.toLowerCase().split(' ')[1] === 'number' && phone !== '' && phone.length >= 10 ) {
      buyer_overlay_setup(true, `Updating ${edit}`)
      // let ee = edit.toLowerCase() === 'email' ? 'email' : 'phone';
      let body = {
        buyer_id: buyer_id,
      }
      let value_state = edit.toLowerCase() === 'email'
        ?
        email
        :
        phone;
      
      body[edit.toLowerCase().split(' ')[0]] = value_state;

      axios.post(`http://192.168.24.146:9090/${(edit.toLowerCase().split(' ')[0])}-update`, body)
      .then(({data})=>{
        if (data.success) {
          window.location.reload()
          buyer_overlay_setup(false, '');
          
        }
        seterr(data.message)
          
      })
      .catch(error=>{
        console.log(error)
        buyer_overlay_setup(false, '')
        seterr(error.response.data.message)
        
      })
    } else {
      open_notice(true, `Please ensure ${edit} is valid`)
    }
  }
  return (
    <>
      
      <section style={{ textAlign: 'center' }}>
        
        <h5>Current {edit}</h5>
        <div style={{width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center', margin: '20px 0px'}}>
          <div style={{
            color: '#FF4500',
            background: '#fff4e0',
            borderRadius: '10px',
            width: 'fit-content',
            padding: '0px 10px'
          }}><b>active</b></div>
        </div>
        <h6 style={{width: '100%', textAlign: 'center', color: 'red'}} className='err-mssg'>{err}</h6>
        
        <p style={{fontWeight: '400'}}>This is the {edit} currently associated to your profile. You can change it by clicking on the button below</p>
        <div className="input-cnt">
          <label htmlFor="">Current {edit}</label>
          <input value={edit.toLowerCase() === 'email' ? data?.email : data?.phone} style={{border: '1px solid #000'}} type="text" name="" id="" />
        </div>
        <br />
        {
          <div className="input-cnt">
            <label htmlFor="">New {edit}</label>
            <input onInput={e => {
              edit.toLowerCase() === 'email'
              ?
              setemail(e.target.value)
              :
              setphone(e.target.value)
            }} style={{border: '1px solid #000'}} type="text" name="" id="" />
          </div>
        }
        <br />
        <div>
          <button onClick={e=> update_()} style={{background: '#FF4500', color: '#fff', width: '100%', textAlign: 'center', borderRadius: '5px'}}>
            Update {edit}
          </button>
        </div>
      </section>


    </>
  )
}

function Password() {
  let [oldpwd, setoldpwd] = useState('')
  let [pwd, setpwd] = useState('')
  let [cpwd, setcpwd] = useState('')
  let [err, seterr] = useState('')

  let {
    buyer_id
  } = useSelector(s => s.buyer_id);

  function update_() {
    // let inputs = [...document.querySelectorAll('input')]
    if (oldpwd.length >= 8) {
      if (pwd.length >= 8) {
        if (pwd === cpwd) {
          // alert(buyer_id)
          buyer_overlay_setup(true, `Updating password`)
          axios.post(`http://192.168.24.146:9090/alter-password`, {pwd,buyer_id,oldpwd})
          .then(({data})=>{
            console.log(data)
            
            if (data.success) {
              window.location.reload()
              buyer_overlay_setup(false, '')
            } else {
              open_notice(true, 'Server error, please try again.')
              seterr(data.message)
            }
              
          })
          .catch(error=>{
            console.log(error)
            seterr(error.response.data.message)
            open_notice(true, 'Server error, please try again.')

            buyer_overlay_setup(false, '')
      
          })
        } else {
          open_notice(true, `Password mismatch`)
          
        }
      } else {
        open_notice(true, `Please ensure New password is at least 8 characters`)
        
      }
    } else {
      open_notice(true, `Please ensure Current password is at least 8 characters`)
    }
  }
  return (
    <>
      <h5 style={{ width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center', margin: '20px 0px' }}>Password settings</h5>
      
      <h6 style={{width: '100%', textAlign: 'center', color: 'red'}} className='err-mssg'>{err}</h6>
      <section>
        <div className="input-cnt">
          <label htmlFor="">Current password</label>
          <input placeholder='Current password' onInput={e=> setoldpwd(e.target.value)} style={{border: '1px solid #000', fontWeight: '400', padding: '10px 5px'}} type="text" name="" id="" />
        </div>
        <div className="input-cnt">
          <label htmlFor="">New password</label>
          <input placeholder='New password' onInput={e=> setpwd(e.target.value)} style={{border: '1px solid #000', fontWeight: '400', padding: '10px 5px'}} type="text" name="" id="" />
        </div>
        <div className="input-cnt">
          <label htmlFor="">Confirm new password</label>
          <input placeholder='Confirm new password' onInput={e=> setcpwd(e.target.value)} style={{border: '1px solid #000', fontWeight: '400', padding: '10px 5px'}} type="text" name="" id="" />
        </div>
        <br />
        <button onClick={e=> update_()} style={{background: '#FF4500', color: '#fff', width: 'auto', borderRadius: '5px'}}>
          Update password
        </button>
      </section>
    </>
  )
}
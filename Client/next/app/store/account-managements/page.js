"use client"
import React, { useEffect, useRef, useState } from 'react'
import '@/app/store/account-managements/styles/xx-large.css'
import '@/app/store/account-managements/styles/medium.css'
import '@/app/store/account-managements/styles/small.css'
import { useSelector } from 'react-redux'
import me from '../../../public/user-rounded-svgrepo-com.svg'
import security from '../../../public/password-svgrepo-com.svg'
import arrow from '../../../public/down-arrow-backup-2-svgrepo-com.svg'
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup'
import axios from 'axios'
import { open_notice } from '@/files/reusable.js/notice'
import ProfileAside from './ProfileAside'

export default function AccounManagement() {
  let [screenWidth, setScreenWidth] = useState(0)
  let [btn1, setbtn1] = useState(false)
  let [menu, setmenu] = useState('profile')
  let [edit, setedit] = useState('email')
  let [btn2, setbtn2] = useState(false)
  
  let { buyer_info } = useSelector(s => s.buyer_info);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function updateEdit(data) {
    setedit(data)
  }

  function updateMenuTab(data) {
    setmenu(data)
  }

  const ArrowIcon = ({ isOpen }) => (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease'
      }}
    >
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <>
      <div className="profile-cnt">
        {screenWidth < 761 ? (
          <ProfileAside updateMenuTab={updateMenuTab} />
        ) : (
          <div id="left" className="h-100">
            <section className="text-center d-flex flex-column align-items-center p-4 border-bottom">
              <img 
                src={'https://res.cloudinary.com/daqbhghwq/image/upload/c_thumb,w_200,g_face/v1724852529/448223033_380994008307411_3052806854721458949_n_fbxqpk.jpg'} 
                className="rounded-circle object-fit-cover"
                style={{
                  height: '80px', 
                  width: '80px'
                }}  
                alt="Profile" 
              />
              <h5 className="mt-3 mb-0 fw-semibold">
                Hello {buyer_info?.fname} {buyer_info?.lname}
              </h5>
              <small className="text-muted">Account Management</small>
            </section>

            <section className="p-3">
              <div className='profile-aside mb-3'>
                <button 
                  className="w-100 border-0 rounded p-3 d-flex justify-content-between align-items-center text-white shadow-sm"
                  onClick={() => setbtn1(!btn1)}
                  style={{ background: '#FFA500', transition: 'all 0.3s ease' }}
                >
                  <div className="d-flex align-items-center">
                    <img 
                      src={me.src} 
                      className="flex-shrink-0"
                      style={{
                        height: '25px', 
                        width: '25px'
                      }} 
                      alt="Profile" 
                    />
                    <span className="ms-3 fw-semibold">Profile Details</span>
                  </div>
                  <ArrowIcon isOpen={btn1} />
                </button>
                {btn1 && (
                  <ul className='ul list-unstyled mt-2 mb-0 rounded shadow-sm' style={{ padding: '10px 0px', background: '#f8f9fa' }}>
                    <li onClick={() => setmenu('profile')} className='li px-3 py-2 hover-menu-item'>Basic Details</li>
                    <li onClick={() => { setmenu('edit'); updateEdit('Phone number') }} className='li px-3 py-2 hover-menu-item'>Edit Phone</li>
                    <li onClick={() => { setmenu('edit'); updateEdit('Email') }} className='li px-3 py-2 hover-menu-item'>Edit Email</li>
                  </ul>
                )}
              </div>

              <div className='profile-aside'>
                <button 
                  className="w-100 border-0 rounded p-3 d-flex justify-content-between align-items-center text-white shadow-sm"
                  onClick={() => setbtn2(!btn2)}
                  style={{ background: '#FFA500', transition: 'all 0.3s ease' }}
                >
                  <div className="d-flex align-items-center">
                    <img 
                      src={security.src} 
                      className="flex-shrink-0"
                      style={{
                        height: '25px', 
                        width: '25px'
                      }} 
                      alt="Security" 
                    />
                    <span className="ms-3 fw-semibold">Security</span>
                  </div>
                  <ArrowIcon isOpen={btn2} />
                </button>
                {btn2 && (
                  <ul className='ul list-unstyled mt-2 mb-0 rounded shadow-sm' style={{ padding: '10px 0px', background: '#f8f9fa' }}>
                    <li onClick={() => setmenu('password')} className='li px-3 py-2 hover-menu-item'>Change password</li>
                    <li onClick={() => ''} className='li px-3 py-2 hover-menu-item err-mssg' style={{color: 'red', fontWeight: '500'}}>Delete account</li>
                  </ul>
                )}
              </div>
            </section>
          </div>
        )}

        <div id="right" className="p-4">
          {menu === 'profile-edit' ? (
            <EditProfile data={buyer_info} />
          ) : menu === 'edit' ? (
            <Edit data={buyer_info} edit={edit} updateEdit={updateEdit} />
          ) : menu === 'profile' ? (
            <Input updateMenu={updateMenuTab} data={buyer_info} />
          ) : (
            <Password />
          )}
        </div>
      </div>
    </>
  )
}

function Input({ data, updateMenu }) {
  return (
    <>
      <section className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0 fw-semibold">Profile Details</h4>
        <button 
          onClick={() => updateMenu('profile-edit')} 
          className="btn btn-outline-primary border-2 fw-semibold"
          style={{ color: '#FFA500', borderColor: '#FFA500', background: 'transparent' }}
        >
          Edit Profile
        </button>
      </section>
      
      <section className="row g-3">
        <div className="col-md-6">
          <div className="input-cnt">
            <label className="form-label fw-semibold small text-muted">First name</label>
            <input 
              value={data?.fname} 
              className="form-control border-0 border-bottom rounded-0 px-0"
              style={{ fontWeight: '400', background: 'transparent' }}
              type="text" 
              readOnly
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-cnt">
            <label className="form-label fw-semibold small text-muted">Last name</label>
            <input 
              value={data?.lname} 
              className="form-control border-0 border-bottom rounded-0 px-0"
              style={{ fontWeight: '400', background: 'transparent' }}
              type="text" 
              readOnly
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-cnt">
            <label className="form-label fw-semibold small text-muted">Email</label>
            <input 
              value={data?.email} 
              className="form-control border-0 border-bottom rounded-0 px-0"
              style={{ fontWeight: '400', background: 'transparent' }}
              type="text" 
              readOnly
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-cnt">
            <label className="form-label fw-semibold small text-muted">Phone number</label>
            <input 
              value={data?.phone} 
              className="form-control border-0 border-bottom rounded-0 px-0"
              style={{ fontWeight: '400', background: 'transparent' }}
              type="text" 
              readOnly
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-cnt">
            <label className="form-label fw-semibold small text-muted">Gender</label>
            <input 
              value={data?.gender === 0 ? 'Female' : 'Male'} 
              className="form-control border-0 border-bottom rounded-0 px-0"
              style={{ fontWeight: '400', background: 'transparent' }}
              type="text" 
              readOnly
            />
          </div>
        </div>
      </section>
    </>
  )
}

function EditProfile({ data }) {
  let [fname, setfname] = useState('')
  let [lname, setlname] = useState('')
  let [gender, setgender] = useState('')
  let { user_id } = useSelector(s => s.user_id);
  
  function update_buyer() {
    if (fname !== '' && lname !== '' && gender !== '' && fname.length > 3 && lname.length > 3) {
      buyer_overlay_setup(true, 'Updating profile')

      axios.post('https://cs-server-olive.vercel.app/profile-update', {fname, lname, gender, user_id})
      .then(({data}) => {
        window.location.reload()
        buyer_overlay_setup(false, '')
      })
      .catch(error => {
        console.log(error)
        buyer_overlay_setup(false, '')
      })
    } else {
      open_notice(true, 'Please ensure all field has at least 3 characters')
    }
  }

  useEffect(() => {
    setfname(data?.fname || '')
    setlname(data?.lname || '')
    setgender(data?.gender?.toString() || '')
  }, [data])

  return (
    <>
      <section className="row g-3">
        <div className="col-md-6">
          <div className="input-cnt">
            <label className="form-label fw-semibold">First name</label>
            <input 
              defaultValue={data?.fname} 
              onInput={e => setfname(e.target.value)} 
              className="form-control border-2"
              style={{ fontWeight: '400', borderColor: '#FFA500' }}
              type="text" 
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-cnt">
            <label className="form-label fw-semibold">Last name</label>
            <input 
              defaultValue={data?.lname} 
              onInput={e => setlname(e.target.value)} 
              className="form-control border-2"
              style={{ fontWeight: '400', borderColor: '#FFA500' }}
              type="text" 
            />
          </div>
        </div>
        <div className="col-12">
          <div className="input-cnt">
            <label className="form-label fw-semibold">Gender</label>
            <select 
              onInput={e => setgender(e.target.value)} 
              className="form-select border-2"
              style={{ borderColor: '#FFA500', fontWeight: '400' }}
              defaultValue={data?.gender || ''}
            >
              <option value="">Select gender</option>
              <option value="0">Female</option>
              <option value="1">Male</option>
            </select>
          </div>
        </div>
        <div className="col-12">
          <button 
            onClick={update_buyer} 
            className="btn fw-semibold text-white px-4 py-2"
            style={{ background: '#FFA500', borderRadius: '8px' }}
          >
            Save Changes
          </button>
        </div>
      </section> 
    </>
  )
}

function Edit({ edit, data }) {
  let [email, setemail] = useState('')
  let [phone, setphone] = useState('')
  let [err, seterr] = useState('')
  let { user_id } = useSelector(s => s.user_id);
  
  function update_() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = edit.toLowerCase() === 'email';
    
    if ((isEmail && email !== '' && emailRegex.test(email)) || 
        (!isEmail && phone !== '' && phone.length >= 10)) {
      
      buyer_overlay_setup(true, `Updating ${edit}`)
      
      const body = {
        user_id: user_id,
        [isEmail ? 'email' : 'phone']: isEmail ? email : phone
      };

      axios.post(`https://cs-server-olive.vercel.app/${isEmail ? 'email' : 'phone'}-update`, body)
      .then(({data}) => {
        if (data.success) {
          window.location.reload()
          buyer_overlay_setup(false, '');
        }
        seterr(data.message)
      })
      .catch(error => {
        console.log(error)
        buyer_overlay_setup(false, '')
        seterr(error.response?.data?.message || 'An error occurred')
      })
    } else {
      open_notice(true, `Please ensure ${edit} is valid`)
    }
  }

  return (
    <>
      <section className="text-center max-w-md mx-auto">
        <h4 className="fw-semibold mb-3">Update {edit}</h4>
        
        <div className="mb-4">
          <div className="badge px-3 py-2 fw-semibold" style={{ background: '#fff4e0', color: '#FFA500', borderRadius: '10px' }}>
            Active
          </div>
        </div>
        
        {err && (
          <div className="alert alert-danger mb-4" role="alert">
            {err}
          </div>
        )}
        
        <p className="text-muted mb-4">
          This is the {edit} currently associated with your profile. You can change it by entering a new one below.
        </p>
        
        <div className="row g-3">
          <div className="col-12">
            <div className="input-cnt">
              <label className="form-label fw-semibold">Current {edit}</label>
              <input 
                value={edit.toLowerCase() === 'email' ? data?.email : data?.phone} 
                className="form-control"
                type="text" 
                readOnly
              />
            </div>
          </div>
          
          <div className="col-12">
            <div className="input-cnt">
              <label className="form-label fw-semibold">New {edit}</label>
              <input 
                onInput={e => edit.toLowerCase() === 'email' ? setemail(e.target.value) : setphone(e.target.value)} 
                className="form-control"
                type={edit.toLowerCase() === 'email' ? 'email' : 'tel'}
                placeholder={`Enter new ${edit}`}
              />
            </div>
          </div>
          
          <div className="col-12">
            <button 
              onClick={update_} 
              className="btn w-100 fw-semibold text-white py-2"
              style={{ background: '#FFA500', borderRadius: '8px' }}
            >
              Update {edit}
            </button>
          </div>
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
  let { user_id } = useSelector(s => s.user_id);

  function update_() {
    if (oldpwd.length >= 8) {
      if (pwd.length >= 8) {
        if (pwd === cpwd) {
          buyer_overlay_setup(true, `Updating password`)
          axios.post(`https://cs-server-olive.vercel.app/alter-password`, { pwd, user_id, oldpwd })
          .then(({data}) => {
            if (data.success) {
              window.location.reload()
              buyer_overlay_setup(false, '')
            } else {
              open_notice(true, 'Server error, please try again.')
              seterr(data.message)
            }
          })
          .catch(error => {
            console.log(error)
            seterr(error.response?.data?.message || 'An error occurred')
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
      <h4 className="text-center fw-semibold mb-4">Password Settings</h4>
      
      {err && (
        <div className="alert alert-danger mb-4" role="alert">
          {err}
        </div>
      )}
      
      <section className="row g-3 max-w-md mx-auto">
        <div className="col-12">
          <div className="input-cnt">
            <label className="form-label fw-semibold">Current password</label>
            <input 
              placeholder="Current password" 
              onInput={e => setoldpwd(e.target.value)} 
              className="form-control"
              type="password" 
            />
          </div>
        </div>
        <div className="col-12">
          <div className="input-cnt">
            <label className="form-label fw-semibold">New password</label>
            <input 
              placeholder="New password" 
              onInput={e => setpwd(e.target.value)} 
              className="form-control"
              type="password" 
            />
          </div>
        </div>
        <div className="col-12">
          <div className="input-cnt">
            <label className="form-label fw-semibold">Confirm new password</label>
            <input 
              placeholder="Confirm new password" 
              onInput={e => setcpwd(e.target.value)} 
              className="form-control"
              type="password" 
            />
          </div>
        </div>
        <div className="col-12">
          <button 
            onClick={update_} 
            className="btn fw-semibold text-white w-100 py-2"
            style={{ background: '#FFA500', borderRadius: '8px' }}
          >
            Update Password
          </button>
        </div>
      </section>
    </>
  )
}
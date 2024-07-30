import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img from '../../../assets/logo.png'
import arrow from '../../../assets/down-arrow-backup-2-svgrepo-com.svg'
// import logo from '../../../assets/c'
import sell from '../../../assets/sell-svgrepo-com (3).svg'
import mssg from '../../../assets/message-circle-dots-svgrepo-com.svg'
import settings from '../../../assets/settings-svgrepo-com (5).svg'
import user from '../../../assets/account-management-svgrepo-com.svg'
import inventory from '../../../assets/store-inventory-inventory-stock-supply-svgrepo-com.svg'
import dashboard from '../../../assets/dashboard-svgrepo-com (1).svg'
export default function Aside() {

    let navigate = useNavigate()
    let [balance, setBalance] = useState('0.00');
    let [settingOption, setSettingOption] = useState(false)

    useEffect(() => {
        // WalletData(window.localStorage.getItem("CE_seller_id"))
        // .then(({walletBalance, TransactionHistory}) => {
        //     setBalance(`${walletBalance[0].wallet_balance}.00`)
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
    },[])

    
  return (

    <>
        <div className='seller-aside-overlay'></div>

        <div className='seller-aside' style={{zIndex: '20000'}}>
            <div className='seller-logo'>
                <img src={img} style={{height: '40px', width: '40px', color: '#fff', fontSize: 'medium', display: 'flex'}} alt="" />
                &nbsp;
                &nbsp;
                <div style={{fontSize: 'small'}}>
                    <span style={{color: 'purple'}}>Cam</span>
                    <span style={{color: 'green'}}>pus</span>
                    &nbsp;
                    <span style={{color: 'orange'}}>Exp</span>
                    <span style={{color: 'black'}}>re</span>
                    <span style={{color: 'blue'}}>ss</span>
                </div>

            </div> 
            {/* <hr /> */}
            <ul>

                <li style={{display: 'flex'}} onClick={e => window.location.href=('/seller/')}>
                    <span>
                        <img src={dashboard} style={{height: '25px', width: '25px', color: '#fff', fontSize: 'medium', display: 'flex'}} alt="" />

                    </span>  
                    &nbsp;
                    &nbsp;
                    <span>Dashboard</span>
                </li> 

               

                {/* <li style={{display: 'flex'}} onClick={e => window.location.href=('/seller.message')}>
                    <span>
                        <img src={mssg} style={{height: '25px', width: '25px', color: '#fff', fontSize: 'medium', display: 'flex'}} alt="" />

                    </span>

                    &nbsp;
                    &nbsp;

                    <span>Messages</span>
                </li> */}

                

                <li style={{display: 'flex'}} onClick={e => window.location.href=('/seller.shop')}>
                    <span>
                        <img src={inventory} style={{height: '25px', width: '25px', color: '#fff', fontSize: 'medium', display: 'flex'}} alt="" />

                    </span>
                    &nbsp;
                    &nbsp;

                    <span>Listing</span>
                </li>

                <li style={{display: 'flex'}} onClick={e => window.location.href=('/seller.editor')}>
                    <span>
                        <img src={sell} style={{height: '25px', width: '25px', color: '#fff', fontSize: 'medium', display: 'flex'}} alt="" />

                    </span>

                    &nbsp;
                    &nbsp;

                    <span>Sell</span>
                </li>

                {/* <li style={{display: 'flex', flexDirection: 'column'}} className='seller__extra__menu' >
                    <div style={{display: 'flex', flexDirection: 'row', position: 'relative'}} onClick={e => setSettingOption(!settingOption)}>
                        <span>
                            <img src={settings} style={{height: '25px', width: '25px', color: '#fff', fontSize: 'medium', display: 'flex'}} alt="" />
                            
                        </span>

                        <span>
                            <img src={arrow} style={{height: '15px', width: '15px', color: '#fff', fontSize: 'medium', display: 'flex', position: 'absolute', right: '2.5px', top: '8px', rotate: settingOption ? '45deg': '90deg'}} alt="" />
                            
                        </span>

                        &nbsp;
                        &nbsp;

                        <span>Settings</span>
                    </div>

                    <div style={{display: settingOption ? 'flex': 'none', maxHeight: '150px', overflow: 'auto', fontSize: 'small', width: '100%', padding: '10px'}}>
                        <ul>
                            <li onClick={e => window.location.href=('/seller.settings.profile')} style={{fontSize: 'small', padding: '5px 0 5px 0', listStyleType: 'disc'}}>
                                <span></span>
                                <span>Profile</span>
                            </li>
                            <li onClick={e => window.location.href=('/seller.settings.notice')} style={{fontSize: 'small', padding: '10px 0 10px 0', listStyleType: 'disc'}}>
                                <span></span>
                                <span>Notification</span>
                            </li>
                            <li onClick={e => window.location.href=('/seller.settings.verification')} style={{fontSize: 'small', padding: '5px 0 5px 0', listStyleType: 'disc'}}>
                                <span></span>
                                <span>Id Verification</span>
                            </li>
                            <li onClick={e => window.location.href=('/seller.settings.payments')} style={{fontSize: 'small', padding: '5px 0 5px 0', listStyleType: 'disc'}}>
                                <span></span>
                                <span>Payments/Billing</span>
                            </li>
                        </ul>
                    </div>
                </li> */}

            </ul>

            <ul style={{position: 'absolute', bottom: '20px', width: '100%'}}>

                {/* <li className='seller__extra__menu' onClick={e => window.location.href=('/seller.inbox')}>
                    <span></span>
                    <span>Inbox</span>
                </li> */}

                {/* <li style={{display: 'flex'}} onClick={e => window.location.href=('/seller.orders')}>
                    <span></span>
                    <span>Orders</span>
                </li> */}

                {/* <li style={{display: 'flex'}} onClick={e => window.location.href=('/seller.')}>
                    <span></span>
                    <span>Refunds/Return</span>
                </li> */}

               

                

                <li style={{display: 'flex'}} className='seller__extra__menu' onClick={e => window.location.href=('/seller.profile')}>
                    <span>
                        <img src={user} style={{height: '25px', width: '25px', color: '#fff', fontSize: 'medium', display: 'flex'}} alt="" />

                    </span>
                    &nbsp;
                    &nbsp;

                    <span>Account</span>
                </li>

            
            </ul>
        </div>
    </>
  )
}

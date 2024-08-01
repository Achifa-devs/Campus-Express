import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img from '../../../assets/logo.png'
import arrow from '../../../assets/down-arrow-backup-2-svgrepo-com.svg'
// import logo from '../../../assets/c'
import sell from '../../../assets/sell-svgrepo-com (3).svg'
import vendorCy from '@/files/assets/vendor-center-typo.svg'
import vendorSymbol from '@/files/assets/vendor-center-symbol.svg'
import orders from '../../../assets/order-svgrepo-com (1).svg'
import user from '../../../assets/account-management-svgrepo-com.svg'
import inventory from '../../../assets/store-inventory-inventory-stock-supply-svgrepo-com.svg'
import dashboard from '../../../assets/dashboard-svgrepo-com (1).svg'
export default function Aside() {

    let [balance, setBalance] = useState('0.00');
    let [settingOption, setSettingOption] = useState(false)

  return (

    <>
        <div className='seller-aside-overlay'></div>

        <div className='seller-aside' style={{zIndex: '20000'}}>
            <div className='seller-aside-logo' style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                    <img src={vendorSymbol.src} style={{height: '100px', width: '100px', color: '#fff', fontSize: 'medium', display: 'flex'}} alt="" />
                    &nbsp;
                    &nbsp;
                    <img src={vendorCy.src} style={{height: '120px', width: '120px', color: '#fff', fontSize: 'medium', display: 'flex'}} alt="" />
            </div> 
            {/* <hr /> */}
            <ul>

                <li onClick={e => window.location.href=('/seller/')}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5" y="4" width="14" height="17" rx="2" stroke="#000" stroke-width="2"/>
                        <path d="M9 9H15" stroke="#000" stroke-width="2" stroke-linecap="round"/>
                        <path d="M9 13H15" stroke="#000" stroke-width="2" stroke-linecap="round"/>
                        <path d="M9 17H13" stroke="#000" stroke-width="2" stroke-linecap="round"/>
                    </svg>  
                    &nbsp;
                    &nbsp;
                    <span>Orders</span>
                </li> 


                <li onClick={e => window.location.href=('/seller/listing')}>
                        <svg width="30px" height="30px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FF4500">
strokeLinejoin
                            <g id="SVGRepo_bgCarrier" stroke-width="0"/>strokeLinejoinstrokeLinejoinstrokeLinejoinstrokeLinejoin

                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

                            <g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </g>

                        </svg>
                    &nbsp;
                    &nbsp;

                    <span>Listing</span>
                </li>

                <li onClick={e => window.location.href=('/seller/new-listing')}>
                    <svg width="30px" height="30px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000" d="M704 288h131.072a32 32 0 0 1 31.808 28.8L886.4 512h-64.384l-16-160H704v96a32 32 0 1 1-64 0v-96H384v96a32 32 0 0 1-64 0v-96H217.92l-51.2 512H512v64H131.328a32 32 0 0 1-31.808-35.2l57.6-576a32 32 0 0 1 31.808-28.8H320v-22.336C320 154.688 405.504 64 512 64s192 90.688 192 201.664v22.4zm-64 0v-22.336C640 189.248 582.272 128 512 128c-70.272 0-128 61.248-128 137.664v22.4h256zm201.408 483.84L768 698.496V928a32 32 0 1 1-64 0V698.496l-73.344 73.344a32 32 0 1 1-45.248-45.248l128-128a32 32 0 0 1 45.248 0l128 128a32 32 0 1 1-45.248 45.248z"/></svg>

                    &nbsp;
                    &nbsp;

                    <span>New Listing</span>
                </li>

                <li onClick={e => window.location.href=('/seller/editor')}>
                    <svg fill="#000000" version="1.1" id="Layer_1" 
                            width="30px" height="30px" viewBox="0 0 72 72" enable-background="new 0 0 72 72">
                        <g>
                            <path d="M66.318,7.585c-0.045-0.905-0.705-1.675-1.601-1.856c-0.077-0.015-0.153-0.026-0.229-0.033L38.635,3.139
                                c-0.601-0.06-1.187,0.152-1.611,0.576L6.55,34.191c-4.571,4.571-4.571,7.359,0,11.929l19.338,19.34
                                c2.049,2.05,3.847,3.412,5.965,3.412s3.916-1.366,5.961-3.413l30.479-30.478c0.424-0.423,0.635-1.014,0.576-1.611L66.318,7.585z
                                M34.987,62.631c-0.961,0.961-2.332,2.24-3.134,2.24c-0.803,0-2.175-1.279-3.137-2.24L9.378,43.291
                                c-2.989-2.988-2.989-3.283,0-6.271L39.186,7.212l23.303,2.306l2.308,23.304L34.987,62.631z"/>
                            <path d="M24.043,27.496l-9.09,9.089c-2.295,2.295-2.925,3.851-0.297,6.479c0.195,0.195,0.451,0.293,0.707,0.293
                                c0.256,0,0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.022,0-1.414c-1.567-1.567-1.548-1.805,0.297-3.651l9.09-9.089
                                c0.391-0.391,0.391-1.023,0-1.414S24.434,27.105,24.043,27.496z"/>
                            <path d="M26.888,24.649l-0.813,0.814c-0.39,0.391-0.39,1.024,0.002,1.414c0.195,0.194,0.45,0.292,0.706,0.292
                                c0.256,0,0.512-0.097,0.708-0.294l0.813-0.814c0.39-0.391,0.39-1.024-0.002-1.414C27.911,24.258,27.279,24.256,26.888,24.649z"/>
                            <path d="M50.604,12.862c-4.571,0-8.293,3.72-8.293,8.292c0,4.572,3.722,8.292,8.293,8.292c4.573,0,8.291-3.72,8.291-8.292
                                C58.895,16.582,55.176,12.862,50.604,12.862z M50.604,25.446c-2.367,0-4.293-1.926-4.293-4.292c0-2.366,1.926-4.292,4.293-4.292
                                c2.369,0,4.291,1.926,4.291,4.292C54.895,23.52,52.971,25.446,50.604,25.446z"/>
                        </g>
                    </svg>

                    &nbsp;
                    &nbsp;

                    <span>Promotion</span>
                </li>


            </ul>

            <ul style={{position: 'absolute', bottom: '20px', width: '100%'}}>

                <li className='seller__extra__menu' onClick={e => window.location.href=('/seller/shop')}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000">
strokeLinejoin
                        <g id="SVGRepo_bgCarrier" stroke-width="0"/>strokeLinejoin

                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

                        <g id="SVGRepo_iconCarrier"> <path d="M20 11.6211V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V11.6211M7.5 9.75C7.5 10.9926 6.49264 12 5.25 12C4.09397 12 3.14157 11.1282 3.01442 10.0062C2.99524 9.83688 3.02176 9.66657 3.06477 9.50173L4.10996 5.49516C4.3397 4.6145 5.13506 4 6.04519 4H17.9548C18.8649 4 19.6603 4.6145 19.89 5.49516L20.9352 9.50173C20.9782 9.66657 21.0048 9.83688 20.9856 10.0062C20.8584 11.1282 19.906 12 18.75 12C17.5074 12 16.5 10.9926 16.5 9.75M7.5 9.75C7.5 10.9926 8.50736 12 9.75 12C10.9926 12 12 10.9926 12 9.75M7.5 9.75L8 4M12 9.75C12 10.9926 13.0074 12 14.25 12C15.4926 12 16.5 10.9926 16.5 9.75M12 9.75V4M16.5 9.75L16 4" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g>

                    </svg>
                    &nbsp;
                    &nbsp;

                    <span>Shop</span>
                </li>

                <li className='seller__extra__menu' onClick={e => window.location.href=('/seller/profile')}>
                    <span style={{height: '30px', width: '30px', color: '#fff', fontSize: 'medium', display: 'flex', borderRadius: '50%', background: '#FF4500', padding: '8px', alignItems: 'center', justifyContent: 'center', fontSize: 'x-small', fontWeight: '500'}}>
                        A.C
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

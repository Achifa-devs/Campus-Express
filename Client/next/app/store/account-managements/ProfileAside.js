import React, { useEffect, useRef, useState } from 'react'
import '@/app/store/account-managements/styles/xx-large.css'
import '../../../files/styles/Buyer/aside.css'
import '@/app/store/account-managements/styles/x-large.css'
import '@/app/store/account-managements/styles/large.css'
import '@/app/store/account-managements/styles/medium.css'
import closeSvg from '@/public/close-square-svgrepo-com (1).svg'
import '@/app/store/account-managements/styles/small.css'
import { useSelector } from 'react-redux'
import me from '../../../public/user-rounded-svgrepo-com.svg'
import security from '../../../public/password-svgrepo-com.svg'
import arrow from '../../../public/down-arrow-backup-2-svgrepo-com.svg'

export default function ProfileAside({ updateMenuTab }) {
    let [screenWidth, setScreenWidth] = useState(0)
    let [btn1, setbtn1] = useState(false)
    let [btn2, setbtn2] = useState(false)
    let [edit, setedit] = useState('email')
    
    let { buyer_info } = useSelector(s => s.buyer_info);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function updateEdit(data) {
        setedit(data)
    }
    
    function closeProfileAside() {
        document.querySelector('.profile-aside-overlay').removeAttribute('id')
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
        <div 
            className="profile-aside-overlay position-fixed top-0 start-0 w-100 h-100" 
            onClick={e => e.target === e.currentTarget ? closeProfileAside() : ''} 
            style={{ zIndex: '1000000', backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
            <div className="profile-aside card h-100 border-0 rounded-0" style={{ width: '45%', maxWidth: '400px' }}>
                {/* Header */}
                <div className="card-header bg-white border-bottom d-flex align-items-center justify-content-between py-3">
                    <h5 className="mb-0 fw-semibold">Profile Menu</h5>
                    <button 
                        className="btn btn-sm p-0 border-0" 
                        onClick={closeProfileAside}
                    >
                        <img src={closeSvg.src} style={{height: '30px', width: '30px'}} alt="Close" />
                    </button>
                </div>

                {/* User Profile Section */}
                <div className="card-body p-3 border-bottom">
                    <div className="d-flex align-items-center">
                        <img 
                            src={'https://res.cloudinary.com/daqbhghwq/image/upload/c_thumb,w_200,g_face/v1724852529/448223033_380994008307411_3052806854721458949_n_fbxqpk.jpg'} 
                            className="rounded-circle flex-shrink-0"
                            style={{
                                height: '50px', 
                                width: '50px', 
                                objectFit: 'cover'
                            }}  
                            alt="Profile" 
                        />
                        <div className="ms-3">
                            <h6 className="mb-1 fw-semibold">
                                Hello {buyer_info?.fname} {buyer_info?.lname}
                            </h6>
                            <small className="text-muted">Manage your account settings</small>
                        </div>
                    </div>
                </div>

                {/* Menu Sections */}
                <div className="card-body p-0" style={{overflowY: 'auto'}}>
                    {/* Profile Details Section */}
                    <div className="accordion-item border-0">
                        <button 
                            className="accordion-button collapsed d-flex align-items-center justify-content-between w-100 p-3 border-bottom"
                            onClick={() => setbtn1(!btn1)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                            }}
                        >
                            <div className="d-flex align-items-center">
                                <img 
                                    src={me.src} 
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
                            <div className="accordion-collapse show">
                                <div className="p-0">
                                    <button 
                                        className="btn btn-link text-decoration-none text-dark w-100 text-start px-4 py-2 d-block hover-menu-item"
                                        onClick={() => updateMenuTab('profile')}
                                    >
                                        Basic Details
                                    </button>
                                    <button 
                                        className="btn btn-link text-decoration-none text-dark w-100 text-start px-4 py-2 d-block hover-menu-item"
                                        onClick={() => {
                                            updateMenuTab('edit'); 
                                            updateEdit('Phone number');
                                        }}
                                    >
                                        Edit Phone
                                    </button>
                                    <button 
                                        className="btn btn-link text-decoration-none text-dark w-100 text-start px-4 py-2 d-block hover-menu-item"
                                        onClick={() => {
                                            updateMenuTab('edit'); 
                                            updateEdit('Email');
                                        }}
                                    >
                                        Edit Email
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Security Section */}
                    <div className="accordion-item border-0">
                        <button 
                            className="accordion-button collapsed d-flex align-items-center justify-content-between w-100 p-3 border-bottom"
                            onClick={() => setbtn2(!btn2)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                            }}
                        >
                            <div className="d-flex align-items-center">
                                <img 
                                    src={security.src} 
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
                            <div className="accordion-collapse show">
                                <div className="p-0">
                                    <button 
                                        className="btn btn-link text-decoration-none text-dark w-100 text-start px-4 py-2 d-block hover-menu-item"
                                        onClick={() => updateMenuTab('password')}
                                    >
                                        Change Password
                                    </button>
                                    <button 
                                        className="btn btn-link text-decoration-none text-danger w-100 text-start px-4 py-2 d-block hover-menu-item"
                                        onClick={() => ''}
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
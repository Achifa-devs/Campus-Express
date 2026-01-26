import '../../../styles/Buyer/aside.css'
import closeSvg from '@/public/close-square-svgrepo-com (1).svg'
import items from '../../../items.json'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import login from '@/public/login.svg'
import loginw from '@/public/loginw.svg'

import savedSvg from '@/public/bookmark-outlined-saved-svgrepo-com.svg'
import sellSvg1 from '@/public/sell-svgrepo-com (1).svg'
import logoutSvg from '@/public/logout-2-svgrepo-com.svg'

import foodSvg from '@/public/food-market-purchasing-svgrepo-com.svg'
import electronicsSvg from '@/public/broadcast-device-electronics-svgrepo-com.svg'
import vehicleSvg from '@/public/car-hand-drawn-outlined-vehicle-svgrepo-com.svg'
import phoneSvg from '@/public/phone-rounded-svgrepo-com.svg'
import laptopSvg from '@/public/laptop-svgrepo-com.svg'
import lodgeSvg from '@/public/apartment-left-svgrepo-com.svg'
import appliancesSvg from '@/public/appliances-svgrepo-com.svg'
import furnitureSvg from '@/public/furniture-svgrepo-com.svg'
import fashionSvg from '@/public/casual-clothing-fashion-svgrepo-com.svg'
import utensilSvg from '@/public/utensils-svgrepo-com.svg'
import petSvg from '@/public/pets-svgrepo-com.svg'
import phoneassSvg from '@/public/phone-repair-symbol-svgrepo-com.svg'
import laptopassSvg from '@/public/laptop-fix-svgrepo-com.svg'
import cosmeticsSvg from '@/public/medical-medicine-health-23-svgrepo-com.svg'
import tabletsSvg from '@/public/tablet-svgrepo-com.svg'
import chatSvg from '../../../assets/messages-1-svgrepo-com (1).svg'

import helpSvg from '@/public/help-svgrepo-com.svg'
import userSvg from '@/public/user-alt-1-svgrepo-com.svg'
import contactSvg from '@/public/costumer-support-call-svgrepo-com.svg'

import WhatsAppSvg from '@/public/whatsapp-whats-app-svgrepo-com.svg'
import tweeterSvg from '@/public/twitter-svgrepo-com (2).svg'
import fbSvg from '@/public/facebook-1-svgrepo-com (1).svg'
import { setCategoryTo } from '@/redux/buyer_store/Category'

import orderSvg from '../../../assets/order-completed-svgrepo-com.svg'
import inboxSvg from '../../../assets/inbox-alt-svgrepo-com (1).svg'
import bookSvg from '../../../assets/book-svgrepo-com.svg'

const Aside = ({
    ChangeAsideCategory
}) => {

    let {
        storedCategory
    } = useSelector(s => s.storedCategory)
    let {
        buyer_info
    } = useSelector(s => s.buyer_info)

    let [categoriesList, setCategoriesList] = useState([])

    let categories = [
        ["Book", bookSvg.src],
        ["Food", foodSvg.src],
        ["Electronics", electronicsSvg.src],
        ["Fashion", fashionSvg.src],
        ["Health & Beauty", cosmeticsSvg.src],
        ["Mobile Phones", phoneSvg.src],
        ["Tablets", tabletsSvg.src],
        ["Laptops & Desktops", laptopSvg.src],
        ["Laptops & Desktops Accessories", laptopassSvg.src],
        ["Phone & Tablet Accessories", phoneassSvg.src],
        ["Pets", petSvg.src],
        ["Vehicle", vehicleSvg.src],
        ["Lodge & Apartments", lodgeSvg.src],
        ["Furnitures", furnitureSvg.src],
        ["Appliances", appliancesSvg.src],
        ["Utensils",utensilSvg.src]
    ]

    useEffect(() => {
        setCategoriesList(items.items.category)
    },[])
    let dispatch = useDispatch()

    let list1 = [
        {text: 'Inbox', svg: inboxSvg.src, uri: 'inbox'},
        {text: 'Favourites', svg: savedSvg.src, uri: 'favourites'},
        {text: 'Messages', svg: chatSvg.src, uri: 'chat'},
    ]

    let list2 = [
        {uri: 'account-managements',text: 'My Account', img: userSvg.src},
        {uri: 'faq',text: 'Help Center', img: helpSvg.src}, 
        {uri: 'policy',text: 'Privacy Policy', img: contactSvg.src}, 
        {uri: 'logout',text: buyer_info?.fname ? 'Logout' : 'Login', img: buyer_info?.fname ? logoutSvg.src : login.src}
    ]
    
    let list3 = categoriesList

    const handleNavigation = (uri) => {
        if (uri === 'chat') {
            window.open(`/store/${uri}`);
        } else if (uri === 'logout') {
            window.localStorage.removeItem('buyer_info');
            alert('You are logged out.');
            window.location.href = '/';
        } else {
            window.location.href = `/store/${uri}`;
        }
    };

    const handleCategoryClick = (category) => {
        window.location.href = `/store/category/${category}`;
        dispatch(setCategoryTo(category));
    };

    function closeAside() {
        document.querySelector('.aside-overlay').removeAttribute('id');
    }

    return ( 
        <>
            <div className="aside-overlay" style={{zIndex: '11000'}} onClick={e => e.target === e.currentTarget ? closeAside() : ''}>
                {/* Close Button */}
                <div className="position-absolute top-0 end-0 p-3">
                    <button 
                        className="btn btn-sm p-0 border-0" 
                        onClick={closeAside}
                        style={{background: 'transparent'}}
                    >
                        <img src={closeSvg.src} style={{height: '30px', width: '30px'}} alt="Close" />
                    </button>
                </div>

                {/* Main Content */}
                <div className="aside-cnt h-100 bg-white" style={{padding: 0}}>
                    {/* User Header Section */}
                    <div className="p-3 text-white" style={{background: '#FFA500'}}>
                        <div className="d-flex align-items-center mb-3">
                            <div 
                                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                style={{
                                    background: '#FFF6E0', 
                                    width: '50px', 
                                    height: '50px', 
                                    color: '#FFA500'
                                }}
                            >
                                <h6 className="mb-0 fw-bold">
                                    {buyer_info?.fname ? 
                                        buyer_info.fname.split('')[0] + buyer_info.lname.split('')[0] : 
                                        '?'
                                    }
                                </h6>
                            </div>
                            <div>
                                {buyer_info?.fname ? (
                                    <span className="fw-semibold">
                                        {buyer_info.fname + " " + buyer_info.lname}
                                    </span>
                                ) : (
                                    <button 
                                        className="btn btn-link p-0 text-white text-decoration-none d-flex align-items-center"
                                        onClick={() => window.location.href = '/login'}
                                    >
                                        <img 
                                            src={loginw.src} 
                                            style={{
                                                height: '20px', 
                                                width: '20px', 
                                                transform: 'rotate(180deg)'
                                            }} 
                                            alt="Login" 
                                        />
                                        <span className="ms-2 small">Login</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="h-100" style={{overflow: 'auto', height: 'calc(100% - 100px)'}}>
                        <div className="p-3">
                            {/* Services Section */}
                            <div className="mb-4">
                                <h6 className="fw-semibold mb-3" style={{color: '#FFA500'}}>
                                    Services
                                </h6>
                                <ul className="list-unstyled">
                                    {list1.map((item, i) => (
                                        <li 
                                            key={i}
                                            className="d-flex align-items-center py-2 px-2 rounded hover-cursor"
                                            style={{transition: 'all 0.2s ease'}}
                                            onClick={() => handleNavigation(item.uri)}
                                        >
                                            <img 
                                                src={item.svg} 
                                                style={{height: '20px', width: '20px'}} 
                                                alt={item.text} 
                                            />
                                            <span className="ms-3 small">{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Categories Section */}
                            <div className="mb-4">
                                <h6 className="fw-semibold mb-3" style={{color: '#FFA500'}}>
                                    Categories
                                </h6>
                                <ul className="list-unstyled">
                                    {categories.map((item, i) => (
                                        <li 
                                            key={i}
                                            className={`d-flex align-items-center py-2 px-2 rounded hover-cursor ${
                                                storedCategory?.toLowerCase() === item[0].toLowerCase() ? 
                                                'active-category' : ''
                                            }`}
                                            style={{transition: 'all 0.2s ease'}}
                                            onClick={() => handleCategoryClick(item[0])}
                                        >
                                            <img 
                                                src={item[1]} 
                                                style={{height: '20px', width: '20px'}} 
                                                alt={item[0]} 
                                            />
                                            <span className="ms-3 small">{item[0]}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Help Center Section */}
                            <div className="mb-4">
                                <h6 className="fw-semibold mb-3" style={{color: '#FFA500'}}>
                                    Help Center
                                </h6>
                                <ul className="list-unstyled">
                                    {list2.map((item, i) => (
                                        <li 
                                            key={i}
                                            className="d-flex align-items-center py-2 px-2 rounded hover-cursor"
                                            style={{transition: 'all 0.2s ease'}}
                                            onClick={() => handleNavigation(item.uri)}
                                        >
                                            <img 
                                                src={item.img} 
                                                style={{height: '20px', width: '20px'}} 
                                                alt={item.text} 
                                            />
                                            <span className="ms-3 small">{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact Us Section */}
                            <div className="p-3 border-top">
                                <h6 className="fw-semibold mb-3" style={{color: '#FFA500'}}>
                                    Contact Us
                                </h6>
                                <div className="d-flex justify-content-between">
                                    {[
                                        { 
                                            name: 'Facebook', 
                                            icon: fbSvg.src, 
                                            onClick: () => {
                                                const url = window.location.href;
                                                // window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                                            }
                                        },
                                        { 
                                            name: 'Twitter', 
                                            icon: tweeterSvg.src, 
                                            onClick: () => {
                                                const url = window.location.href;
                                                // const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
                                                // window.open(twitterUrl, '_blank');
                                            }
                                        },
                                        { 
                                            name: 'WhatsApp', 
                                            icon: WhatsAppSvg.src, 
                                            onClick: () => {
                                                const url = window.location.href;
                                                // WhatsApp sharing logic here
                                            }
                                        }
                                    ].map((social, index) => (
                                        <button
                                            key={index}
                                            className="btn btn-link text-decoration-none p-0 d-flex flex-column align-items-center"
                                            onClick={social.onClick}
                                            style={{color: '#6c757d'}}
                                        >
                                            <img 
                                                src={social.icon} 
                                                style={{height: '25px', width: '25px'}} 
                                                alt={social.name} 
                                            />
                                            <small className="mt-1">{social.name}</small>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Aside;
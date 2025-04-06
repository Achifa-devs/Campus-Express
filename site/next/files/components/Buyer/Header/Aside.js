import '../../../styles/Buyer/aside.css'
import closeSvg from '@/public/close-square-svgrepo-com (1).svg'
import items from '../../../items.json'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import login from '@/public/login.svg'
import loginw from '@/public/loginw.svg'

import savedSvg from '@/public/bookmark-outlined-saved-svgrepo-com.svg'
import sellSvg1 from '@/public/sell-svgrepo-com (1).svg'
// import inboxSvg from '@/public/inbox-in-svgrepo-com.svg'
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

import helpSvg from '@/public/help-svgrepo-com.svg'
import userSvg from '@/public/user-alt-1-svgrepo-com.svg'
import contactSvg from '@/public/costumer-support-call-svgrepo-com.svg'


import WhatsAppSvg from '@/public/whatsapp-whats-app-svgrepo-com.svg'
import tweeterSvg from '@/public/twitter-svgrepo-com (2).svg'
import fbSvg from '@/public/facebook-1-svgrepo-com (1).svg'
import { setCategoryTo } from '@/redux/buyer_store/Category'

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
        ["Book", ''],
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
        {text: 'Orders', svg: '', uri: 'orders'},
        {text: 'Inbox', svg: '', uri: 'inbox'},
        {text: 'Favourites', svg: '', uri: 'favourites'},
        // {text: 'Followed Sellers', svg: '', uri: 'following'},
        // {text: 'Recently Viewed', svg: '', uri: 'history'},
        // {text: 'Refunds', svg: '', uri: 'refunds'}
    ]
    let list2 = [
        {uri: 'account-managements',text: 'My Account', img: userSvg.src},
        {uri: 'faq',text: 'Help Center', img: helpSvg.src}, 
        // {uri: '',text: 'Refund & Return', img: refundSvg.src}, 
        // {uri: '',text: 'Cancel An Order', img: cancelSvg.src}, 
        // {uri: 'customer-service',text: 'Contact Us', img: contactSvg.src}, 
        {uri: 'policy',text: 'Privacy Policy', img: contactSvg.src}, 
        {uri: 'logout',text: buyer_info?.fname ? 'Logout' : 'Login', img: buyer_info?.fname ? logoutSvg.src : login.src}
    ]
    
    let list3 = categoriesList

    let CEservices = list1.map((item,i) => 
        <li onClick={e => window.location.href=(`/${item.uri}`)} key={i} style={{display: 'flex', }}>
            <span>
                <img src={item.img} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
            </span>
            &nbsp;
            &nbsp;
            <span style={{fontSize: 'small'}}>{item.text}</span>
        </li>
    )

    let Help = list2.map((item, i) => 
        <li onClick={e => i === list2.length - 1 ?  () => {window.localStorage.removeItem('buyer_info'); alert('You are logged out.')} : window.location.href=(`${item.uri}`)} key={i} style={{display: 'flex', }}>
            <span>
                <img src={item.img} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
            </span>
            &nbsp;
            &nbsp;
            <span style={{fontSize: 'small'}}>{item.text}</span>
        </li>
    )

    let Categories = categories.map((item,i) => 
        <li style={{display: 'flex', }} id={storedCategory.toLowerCase() === item[0].toLowerCase() ? 'aside-list-active' : ''} data-category={item[0]} onClick={e => {window.location.href=(`/category/${item[0]}`); dispatch(setCategoryTo(item[0]))}} key={i}>
            <span>
            
                <img src={(item[1])} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
            </span>
            &nbsp;
            &nbsp;
            <span style={{fontSize: 'small'}}>{(item[0])}</span>
        </li>
    )

    function closeAside() {
        document.querySelector('.aside-overlay').removeAttribute('id')
    
    }
 

    return ( 
        <>

            <div className="aside-overlay" style={{zIndex: '11000'}} onClick={e=>e.target === e.currentTarget ? closeAside():''}>

                <div onClick={closeAside} className="aside-close">
                    <img src={closeSvg.src} style={{height: '30px', width: '30px'}} alt="" />
                </div>
                <div className="aside-cnt" style={{position: 'relative', overflow: 'hidden', padding: '0'}}>
                    <div style={{textAlign: 'left', width: '100%', height: 'fit-content', fontWeight: '500', display: 'flex', flexDirection: 'column', fontSize: 'large', marginTop: '0', padding: '10px', color: '#fff', background: 'orangered'}}>
                        <span style={{borderRadius: '50%', background: '#fff4e0', width: '50px', height: '50px', color: 'orangered', display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'center'}}><h6 style={{padding: '0', margin: '0'}}>{
                            buyer_info?.fname ? buyer_info?.fname.split('')[0] + buyer_info?.lname.split('')[0] : '?'
                        }</h6></span>
                        <span>
                            {
                                buyer_info?.fname 
                                ?  
                                buyer_info?.fname + " " + buyer_info?.lname 
                                : 
                                <>
                                <span onClick={e => window.location.href=('/login')} style={{cursor: 'pointer'}}>
                                    <img src={loginw.src} style={{height: '20px', transform: 'rotate(180deg)', color: '#fff', width: '20px', marginBottom: '5px', }} alt="" />
                                </span>
                                &nbsp;
                                {/* &nbsp; */}
                                <span onClick={e => window.location.href=('/login')} style={{fontSize: 'small', cursor: 'pointer'}}>Login</span>
                                </>
                            }
                        </span>
                    </div>

                    <div style={{height: 'calc(100% - 100px)', overflow: 'auto'}}>

                        <ul style={{overflowX: 'hidden', padding: '10px'}}>
                            {
                                
                                <>
                                    {/* <hr /> */}
                                    
                                    <p style={{textAlign: 'left', width: '100%', fontWeight: '400', fontSize: 'medium', marginTop: '10px', color: 'orangered', fontWeight: '500'}}>Services</p>
                                    {
                                        CEservices
                                    }

                                    {/* <hr /> */}
                                    <p style={{textAlign: 'left', width: '100%', fontWeight: '400', fontSize: 'medium', marginTop: '10px', color: 'orangered', fontWeight: '500'}}>Categories</p>
                                    {
                                        Categories
                                    }

                                    {/* <hr /> */}
                                    <p style={{textAlign: 'left', width: '100%', fontWeight: '400', fontSize: 'medium', marginTop: '10px', color: 'orangered', fontWeight: '500'}}>Help Center</p>

                                    {
                                        Help
                                    }
                                </>
                                
                            }
                        </ul>

                        <div style={{padding: '20px'}}>
                            <div style={{color: '#FF4500'}}><b>Contact Us</b></div>
                            <ul style={{display: 'flex', padding: '10px', flexDirection: 'row', justifyContent: 'space-between', }}>
                                <li onClick={e => {
                                    const url = window.location.href;
                                    // window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(item.title)}&description=${encodeURIComponent(item.description)}&picture=${encodeURIComponent(activeImg)}`, '_blank');
                                }} style={{border: 'none', padding: '0',cursor: 'pointer',display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', }}>
                                    <img src={fbSvg.src} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
                                    &nbsp;
                                    &nbsp;
                                    
                                    <small>Facebook</small>
                                </li>

                                <li onClick={e => {
                                    const url = window.location.href;
                                    // const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(item.title)}&image=${metaImg}`;
                                    // window.open(twitterUrl, '_blank');
                                }} style={{border: 'none', padding: '0',cursor: 'pointer', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', }}>
                                    <img src={tweeterSvg.src} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
                                    
                                    &nbsp;
                                    &nbsp;
                                    
                                    <small>Twitter</small>
                                </li>

                                <li onClick={e => {
                                    const url = window.location.href;
                                    const shareBase64ImageToWhatsApp = (base64ImageData, title, description) => {
                // Convert Base64 image data to a Blob
                                        const byteCharacters = atob(base64ImageData.split(',')[1]);
                                        const byteArrays = [];
                                        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                                            const slice = byteCharacters.slice(offset, offset + 512);
                                            const byteNumbers = new Array(slice.length);
                                            for (let i = 0; i < slice.length; i++) {
                                            byteNumbers[i] = slice.charCodeAt(i);
                                            }
                                            const byteArray = new Uint8Array(byteNumbers);
                                            byteArrays.push(byteArray);
                                        }
                                        const blob = new Blob(byteArrays, { type: 'image/jpeg' });
                                        const message = description.length > 0 ? `${title}\n\nDescription:  \n${description} \n ${url}` : `${title} \n ${url}`;
                                        const encodedMessage = encodeURIComponent(message);
                                        const imageUrl = URL.createObjectURL(blob);
                                        console.log(imageUrl)
                                        // const whatsappUrl = `whatsapp://send?text=${encodedMessage}%20${`https://ce-app-server.vercel.app/share-image?product_id=${item.product_id}`}`;

                                        // Open WhatsApp with the share URL
                                        // window.open(whatsappUrl, '_blank');


                                    }
                                    // shareBase64ImageToWhatsApp(activeImg, item.title, item.description)


                                
                                }} style={{border: 'none', padding: '0',cursor: 'pointer', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', }}>
                                    <img src={WhatsAppSvg.src} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
                                    &nbsp;
                                    &nbsp;
                                    <small>WhatsApp</small>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Aside;  
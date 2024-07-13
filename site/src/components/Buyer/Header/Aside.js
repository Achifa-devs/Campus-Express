import '../../../styles/Buyer/aside.css'
import closeSvg from '../../../assets/close-square-svgrepo-com (1).svg'
import items from '../../../items.json'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import login from '../../../assets/login.svg'
import loginw from '../../../assets/loginw.svg'

import sellSvg from '../../../assets/sell-svgrepo-com (2).svg'
import historySvg from '../../../assets/history-svgrepo-com (1).svg'
import settingsSvg from '../../../assets/settings-svgrepo-com (3).svg'
import adsSvg from '../../../assets/ad-svgrepo-com.svg'
import savedSvg from '../../../assets/bookmark-outlined-saved-svgrepo-com.svg'
import inboxSvg from '../../../assets/inbox-alt-svgrepo-com (1).svg'
import walletSvg from '../../../assets/wallet-2-svgrepo-com.svg'
import sellSvg1 from '../../../assets/sell-svgrepo-com (1).svg'
// import inboxSvg from '../../../assets/inbox-in-svgrepo-com.svg'
import logoutSvg from '../../../assets/logout-2-svgrepo-com.svg'

import foodSvg from '../../../assets/food-market-purchasing-svgrepo-com.svg'
import electronicsSvg from '../../../assets/broadcast-device-electronics-svgrepo-com.svg'
import vehicleSvg from '../../../assets/car-hand-drawn-outlined-vehicle-svgrepo-com.svg'
import phoneSvg from '../../../assets/phone-rounded-svgrepo-com.svg'
import laptopSvg from '../../../assets/laptop-svgrepo-com.svg'
import lodgeSvg from '../../../assets/apartment-left-svgrepo-com.svg'
import appliancesSvg from '../../../assets/appliances-svgrepo-com.svg'
import furnitureSvg from '../../../assets/furniture-svgrepo-com.svg'
import fashionSvg from '../../../assets/casual-clothing-fashion-svgrepo-com.svg'
import utensilSvg from '../../../assets/utensils-svgrepo-com.svg'
import petSvg from '../../../assets/pets-svgrepo-com.svg'
import phoneassSvg from '../../../assets/phone-repair-symbol-svgrepo-com.svg'
import laptopassSvg from '../../../assets/laptop-fix-svgrepo-com.svg'
import cosmeticsSvg from '../../../assets/medical-medicine-health-23-svgrepo-com.svg'
import tabletsSvg from '../../../assets/tablet-svgrepo-com.svg'

import helpSvg from '../../../assets/help-svgrepo-com.svg'
import refundSvg from '../../../assets/return-svgrepo-com.svg'
import cancelSvg from '../../../assets/cancel-delivery-svgrepo-com.svg'
import userSvg from '../../../assets/user-alt-1-svgrepo-com.svg'
import contactSvg from '../../../assets/costumer-support-call-svgrepo-com.svg'
import { setCategoryTo } from '../../../redux/buyer_store/Category'


import WhatsAppSvg from '../../../assets/whatsapp-whats-app-svgrepo-com.svg'
import tweeterSvg from '../../../assets/twitter-svgrepo-com (2).svg'
import fbSvg from '../../../assets/facebook-1-svgrepo-com (1).svg'

const Aside = ({
    ChangeAsideCategory
}) => {

    let {
        storedCategory
    } = useSelector(s => s.storedCategory)

    let {
        buyerData
    } = useSelector(s => s.buyerData)

    let [categoriesList, setCategoriesList] = useState([])
    let navigate = useNavigate()
    // let {category} = useSelector(s => s.Category)
   

    let categories = [
        ["Food", foodSvg],
        ["Electronics", electronicsSvg],
        ["Fashion", fashionSvg],
        ["Health/Beauty", cosmeticsSvg],
        ["Mobile Phones", phoneSvg],
        ["Tablets", tabletsSvg],
        ["Laptops/Desktops", laptopSvg],
        ["Laptops/Desktops Accessories", laptopassSvg],
        ["Phone/Tablet Accessories", phoneassSvg],
        ["Pets", petSvg],
        ["Vehicle", vehicleSvg],
        ["Lodge/Apartments", lodgeSvg],
        ["Furnitures", furnitureSvg],
        ["Appliances", appliancesSvg],
        ["Utensils",utensilSvg]
    ]

    useEffect(() => {
        setCategoriesList(items.items.category)
    },[])
    let dispatch = useDispatch()

    

    let list1 = [
        // {uri: 'message',text: 'Messages', img: inboxSvg}, 
        {uri: 'favourites',text: 'Favourites', img: savedSvg},  
        // {uri: '',text: 'History', img: historySvg},
        {uri: 'orders',text: 'Orders', img: sellSvg1}
    ]
    let list2 = [
        {uri: 'profile',text: 'My Account', img: userSvg},
        {uri: 'faq',text: 'Help Center', img: helpSvg}, 
        // {uri: '',text: 'Refund & Return', img: refundSvg}, 
        // {uri: '',text: 'Cancel An Order', img: cancelSvg}, 
        // {uri: 'customer-service',text: 'Contact Us', img: contactSvg}, 
        {uri: 'policy',text: 'Privacy Policy', img: contactSvg}, 
        {uri: 'logout',text: buyerData?.fname ? 'Logout' : 'Login', img: buyerData?.fname ? logoutSvg : login}
    ]
    
    let list3 = categoriesList

    let CEservices = list1.map((item,i) => 
        <li onClick={e => window.open(`/${item.uri}`)} key={i} style={{display: 'flex', }}>
            <span>
                <img src={item.img} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
            </span>
            &nbsp;
            &nbsp;
            <span style={{fontSize: 'small'}}>{item.text}</span>
        </li>
    )

    let Help = list2.map((item, i) => 
        <li onClick={e => i === list2.length - 1 ?  () => {window.localStorage.removeItem('buyerData'); alert('You are logged out.')} : window.location.href=(`${item.uri}`)} key={i} style={{display: 'flex', }}>
            <span>
                <img src={item.img} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
            </span>
            &nbsp;
            &nbsp;
            <span style={{fontSize: 'small'}}>{item.text}</span>
        </li>
    )

    let Categories = categories.map((item,i) => 
        <li style={{display: 'flex', }} id={storedCategory.toLowerCase() === item[0].toLowerCase() ? 'aside-list-active' : ''} data-category={item[0]} onClick={e => {dispatch(setCategoryTo((item[0].toLowerCase())))}} key={i}>
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
                    <img src={closeSvg} style={{height: '30px', width: '30px'}} alt="" />
                </div>
                <div className="aside-cnt" style={{position: 'relative', overflow: 'hidden', padding: '0'}}>
                    <div style={{textAlign: 'left', width: '100%', height: 'fit-content', fontWeight: '500', display: 'flex', flexDirection: 'column', fontSize: 'large', marginTop: '0', padding: '10px', color: '#fff', background: 'orangered'}}>
                        <span style={{borderRadius: '50%', background: '#fff4e0', width: '50px', height: '50px', color: 'orangered', display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'center'}}><h3 style={{padding: '0', margin: '0'}}>{
                            buyerData?.fname ? buyerData?.fname.split('')[0] + buyerData?.lname.split('')[0] : '?'
                        }</h3></span>
                        <span>
                            {
                                buyerData?.fname 
                                ?  
                                buyerData?.fname + " " + buyerData?.lname 
                                : 
                                <>
                                <span onClick={e => window.location.href=('/login')} style={{cursor: 'pointer'}}>
                                    <img src={loginw} style={{height: '20px', transform: 'rotate(180deg)', color: '#fff', width: '20px', marginBottom: '5px', }} alt="" />
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
                                    <img src={fbSvg} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
                                    &nbsp;
                                    &nbsp;
                                    
                                    <small>Facebook</small>
                                </li>

                                <li onClick={e => {
                                    const url = window.location.href;
                                    // const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(item.title)}&image=${metaImg}`;
                                    // window.open(twitterUrl, '_blank');
                                }} style={{border: 'none', padding: '0',cursor: 'pointer', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', }}>
                                    <img src={tweeterSvg} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
                                    
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
                                    <img src={WhatsAppSvg} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
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
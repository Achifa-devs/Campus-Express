
import ads from '../../../images/Slider.png'
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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setCategoryTo } from '@/redux/buyer_store/Category'

const Ads = () => {
    let [screenWidth, setScreenWidth] = useState(0)
 

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])
    let dispatch = useDispatch()

 
    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

    let categories = [
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
    let Categories = categories.map((item, i) => 
        <li style={{textAlign: 'left', position: 'relative', width: '100%', cursor: 'pointer', display: 'flex', justifyContent: 'flex-start', height: '30px'}} data-category={item[0]} onClick={e => {window.location.href=(`/category/${item[0]}`); dispatch(setCategoryTo(item[0]))}} key={i}>
            <span style={{width: '25px', float: 'left', position: 'absolute', left: '5px'}}> 
                <img src={(item[1])} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
            </span>
            <span style={{fontSize: 'small', whiteSpace: 'nowrap', float: 'right', width: 'calc(100% - 30px)', textAlign: 'left', marginLeft: '45px'}}>{(item[0])}</span>
        </li>
    )


    return (   
        <>
            <div className="buyer-ads-cnt shadow" style={{ background: '#FF4500', padding: screenWidth > 760 ? '10px' : '0', position: 'relative', marginBottom: screenWidth > 760 ? '0px' : '20px', marginTop: screenWidth > 760 ? '0px' : '10px'}}>
                <section style={{background: '#fff', padding: '5px', overflow: 'auto', backgroundColor: '#fff', borderRadius: '0', color: '#000'}}>
                    <ul style={{listStyleType: 'none', margin: '0', padding: '10px 0 10px 0', overflow: 'auto'}}>
                        {
                            Categories
                        }
                    </ul>   
                </section>
                <section className="img-cnt" style={{width: screenWidth > 1200 ? 'calc(100% - 280px)' : '98%', display: 'block', height: '100%', position: 'relative', borderRadius: '2.5px', padding: '0', margin: '0'}}>
                    <img src={ads.src} style={{borderRadius: '2.5px', margin: '0 0 0 0px'}}  alt="" /> 
                </section>
            </div> 
        </>   
     );
} 
 
export default Ads; 
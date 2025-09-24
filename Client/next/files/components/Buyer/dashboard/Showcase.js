import React, { useRef } from 'react'
import { 
  useEffect,
  useState
} from 'react'

import ShowcaseCard from './ShowcaseCard'
import ShowCaseCardCnt from './ShowCaseCardCnt'
import Carousel from './Carousel'
import SuperSale from './SuperSale'
import PaidAds from './PaidAds'
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup'

let iphoneSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467382/iPhones_xotw64.png'
let androidSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467387/smart-phones_q9ptm3.png'
let cellPhoneSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467379/cell-phones_nm1xp8.png'
let budgetPhoneSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467379/budget-phones-under150k_xzb8jm.png'
let phoneAccessSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467387/phones-accessories_oymcuh.png'
let tabPhonesSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467388/Tablets_yxnmxq.png'

let bedSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467377/Beddings_jxdric.jpg'
let tvSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467377/TV_Furniture_feecql.jpg'
let genSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467381/Generators_mxuedn.jpg'
let chanSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467380/Chandeliers_dpgqa2.jpg'
let decorSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467382/Home_Decor_fl4cds.jpg'
let kitchenSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467382/Kitchen_Dining_kvv4lo.jpg'

let fAccessSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467380/Fashion_Accessories_mw8wko.jpg'
let menFSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467387/Men_s_Fashion_f6kzsp.jpg'
let SneakerSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467388/Sneakers_jc52ox.jpg'
let wmenFSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467378/Women_s_Fashion_fio3jo.jpg'
let watchSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467378/Watches_ifaxnr.jpg'
let shoesSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467377/Upgrade_your_Shoe_Game_hudl1k.jpg'

let soapSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467378/Bathing_saop_ci0anv.png'
let faceCareSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467380/Face_care_uh30ya.png'
let hairSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467381/Hair_accessories_oez5sh.png'
let makeupSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467387/Makeup_thnxpv.png'
let shampooSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467387/shampoo_sxxipi.png'

let wineSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467378/Wines_tudhlo.png'
let foodSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467379/Artboard_1_qjlbtr.png'
let cleanerSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467378/Artboard_1_copy_2_1_oz69ed.png'
let waterSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467379/Bottled_Water_jqytj5.png'
let drinksSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467379/Artboard_1_copy_3_1_pkfn7q.png'
let fragSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467380/Fragrance_1_sjyp9z.png'

let fridgeSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467381/Fridgee_1_zv1r9e.png'
let washerSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467377/Washer_ygcz5r.png'
let freezerSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467381/Freezer_1_akd6d7.png'
let ironSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467387/Pressing_Iron_1_csdazs.png'
let fanSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467380/Fans_1_azojfy.png'
let acSvg = 'https://res.cloudinary.com/daqbhghwq/image/upload/v1725467379/Air_conditioner_1_ejv0dj.png'

export default function Showcase({type}) {

    let [limit, setlimit] = useState(30)
    let [screenWidth, setScreenWidth] = useState(0)
    let [cards, setCards] = useState([])
    let [hasLoaded, setHasLoaded] = useState(false);

    function updateReq(data) {
        if(data){
            setHasLoaded(true)
        } else {
            setHasLoaded(false)
            
        }
    }

 

    useEffect(() => {
        let overlay = document.querySelector('.overlay');

        if (hasLoaded) {
            overlay.removeAttribute('id')
            console.log(overlay)
            
        } else {
            // let overlay = document.querySelector('.overlay');
            overlay.setAttribute('id', 'overlay');
            console.log(overlay)
            
        }
    }, [hasLoaded])

    useEffect(() => {
        setScreenWidth(window.innerWidth)
    }, [])

    let [activeJSX, setActiveJSX] = useState(<ShowCaseCardCnt cards={cards} />)
    
    async function fetchData(category) {

        if(screenWidth > 999){
            setlimit(30);
        }else if(screenWidth > 761 && screenWidth < 1000){
            setlimit(30);
        }else if(screenWidth < 659){
            setlimit(30);
        } 
     
    }
        
    useEffect(() => {
        try {
            fetch(`/api/products/category?category=${btoa('trends')}&limit=${limit}`, {
                headers: {
                    'Gender': window.localStorage.getItem('cs-gender') 
                }
            })
            .then(async(res) => {
                let response = await res.json();

                if (response.bool) {
                    

                    setCards(
                        response?.data?.map((item, index) => 
                            item?.product_id !== product_id ? <Card index={index} item={item} />: ''
                        ) 
                    )

                }else{
                    

                }
            })
            .catch(err =>{
                console.log(err)
                

            });
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        setActiveJSX(<ShowCaseCardCnt cards={cards} />)
    },[cards])

    const headerStyle = {
        background: '#fff',
        color: '#000',
        padding: '20px 20px 0 20px',
        textAlign: 'left',
        fontWeight: '600'

    };

    const sectionStyle = {
        padding: '20px'
    };

    const h2Style = {
        fontSize: 'small',
        color: '#000',
        fontWeight: '600'
    };

    const faqsStyle = {
        borderTop: '1px solid #ddd',
        marginTop: '20px',
        padding: '20px',
        fontSize: 'small'
    };
  return (
    <>
      
      <div className="buyer-showcase" style={{background: '#fff'}}>

      
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#FFF', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: 'row'}}>
                <div>
                    <b>Fashion Deals</b>
                </div>
                <button onClick={e=> {
                    window.location.href=`/store/category/Fashion`
                }}  style={{padding: '3px 8px', borderRadius: '5px'}}>View more</button>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel updateReq={updateReq} category={btoa('Fashion')} cards={cards} />
            </div>
        </section>

        

        
         <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#FFF', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: 'row'}}>
                
                <div>
                    <b>Health & Beauty Deals</b>
                </div>
                <button onClick={e=> {
                    window.location.href=`/store/category/Health & Beauty`
                }}   style={{padding: '3px 8px', borderRadius: '5px'}}>View more</button>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={btoa('Health & Beauty')} cards={cards} />
            </div>
        </section>

        <section style={{marginBottom: 10, borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px'}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#FFF', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: 'row'}}>
                <div style={{float: 'left', color: '#000', fontFamily: 'sans-serif', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: 'row'}}>
                    <div>
                        <b>Phone Deals</b>
                    </div>
                    <button onClick={e=> {
                        window.location.href=`/store/category/Mobile Phones`
                    }} style={{padding: '3px 8px', borderRadius: '5px'}}>View more</button>
                </div>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={btoa('Mobile Phones')} cards={cards} />
            </div>
        </section>
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#FFF', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: 'row'}}>

                 <div>
                    <b>Phone & Tablet Accessories Deals</b>
                </div>
                <button onClick={e=> {
                    window.location.href=`/store/category/Phone & Tablet Accessories`
                }}  style={{padding: '3px 8px', borderRadius: '5px'}}>View more</button>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={btoa('Phone & Tablet Accessories')} cards={cards} />
            </div>
        </section>

        <section style={{marginBottom: 10, borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px'}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#FFF', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: 'row'}}>

                 <div>
                    <b>Laptop Deals</b>
                </div>
                <button onClick={e=> {
                    window.location.href=`/store/category/Laptops & Desktops`
                }}  style={{padding: '3px 8px', borderRadius: '5px'}}>View more</button>
            </div>
            <div>
                <Carousel category={btoa('Laptops & Desktops')} cards={cards} />
            </div>
        </section>
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#FFF', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: 'row'}}>
                <div style={{float: 'left', color: '#000', fontFamily: 'sans-serif',}}><b>Laptops & Desktops Accessories</b></div>
                <button onClick={e=> {
                    window.location.href=`/store/category/Laptops & Desktops`
                }}  style={{padding: '3px 8px', borderRadius: '5px'}}>View more</button>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={btoa('Laptops & Desktops Accessories')} cards={cards} />
            </div>
        </section>

        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#FFF', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: 'row'}}>
                
                <div>
                    <b>Lodge Deals</b>
                </div>
                <button onClick={e=> {
                    window.location.href=`/store/category/Lodge & Apartments`
                }}   style={{padding: '3px 8px', borderRadius: '5px'}}>View more</button>
            </div>
            <div>
                <Carousel category={btoa('Lodge & Apartments')} cards={cards} />
            </div>
        </section>
        
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#FFF', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: 'row'}}>
                <div style={{float: 'left', color: '#000', fontFamily: 'sans-serif',}}><b>Electronics Deals</b></div>
                <button onClick={e=> {
                    window.location.href=`/store/category/Electronics`
                }}  style={{padding: '3px 8px', borderRadius: '5px'}}>View more</button>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={btoa('Electronics')} cards={cards} />
            </div>
        </section>
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#FFF', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: 'row'}}>
                <div style={{float: 'left', color: '#000', fontFamily: 'sans-serif',}}><b>Furnitures</b></div>
                <button onClick={e=> {
                    window.location.href=`/store/category/Furnitures`
                }}  style={{padding: '3px 8px', borderRadius: '5px'}}>View more</button>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={btoa('Furnitures')} cards={cards} />
            </div>
        </section>

        <section style={{marginBottom: 10, borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px'}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#FFF', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: 'row'}}>
                <div style={{float: 'left', color: '#000', fontFamily: 'sans-serif', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: 'row'}}>
                    <div>
                        <b>Book Libs</b>
                    </div>
                    <button onClick={e=> {
                        window.location.href=`/store/category/Books`
                    }} style={{padding: '3px 8px', borderRadius: '5px'}}>View more</button>
                </div>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={btoa('Books')} cards={cards} />
            </div>
        </section>

        
        
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#FFF', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: 'row'}}>
                <div style={{float: 'left', color: '#000', fontFamily: 'sans-serif',}}><b>Vehicle</b></div>
                <button onClick={e=> {
                    window.location.href=`/store/category/Vehicle`
                }}  style={{padding: '3px 8px', borderRadius: '5px'}}>View more</button>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={btoa('Vehicle')} cards={cards} />
            </div>
        </section>
        
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#FFF', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: 'row'}}>
                <div style={{float: 'left', color: '#000', fontFamily: 'sans-serif',}}><b>Pets</b></div>
                <button onClick={e=> {
                    window.location.href=`/store/category/Pets`
                }}  style={{padding: '3px 8px', borderRadius: '5px'}}>View more</button>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={btoa('Pets')} cards={cards} />
            </div>
        </section>
        
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#FFF', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: 'row'}}>
                <div style={{float: 'left', color: '#000', fontFamily: 'sans-serif',}}><b>Cleaning Agents</b></div>
                <button onClick={e=> {
                    window.location.href=`/store/category/Cleaning Agents`
                }}  style={{padding: '3px 8px', borderRadius: '5px'}}>View more</button>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={btoa('Cleaning Agents')} cards={cards} />
            </div>
        </section>
        

        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#FFF', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: 'row'}}>

                <div>
                    <b>Appliances Deals</b>
                </div>
                <button onClick={e=> {
                    window.location.href=`/store/category/Appliances`
                }}  style={{padding: '3px 8px', borderRadius: '5px'}}>View more</button>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={btoa('Appliances')} cards={cards} />
            </div>
        </section>

        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#FFF', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: 'row'}}>
                
                <div>
                    <b>Lodge Revamp Deals</b>
                </div>
                <button onClick={e=> {
                    window.location.href=`/store/category/Furnitures`
                }}   style={{padding: '3px 8px', borderRadius: '5px'}}>View more</button>
            </div>
            <div>
                <Carousel category={btoa('Furnitures')} cards={cards} />
            </div>
        </section>
         
              
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#FFF', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: 'row'}}>
               
                <div>
                    <b>Kitchen Utensils</b>
                </div>
                <button onClick={e=> {
                    window.location.href=`/store/category/Utensils`
                }}  style={{padding: '3px 8px', borderRadius: '5px'}}>View more</button>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={btoa('Utensils')} cards={cards} />
            </div>
        </section>
        
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#FFF', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', justifyContent: 'space-between', display: 'flex', width: '100%', flexDirection: 'row'}}>
               
                <div>
                    <b>Groceries Deals</b>
                </div>
                <button onClick={e=> {
                    window.location.href=`/store/category/Food`
                }}  style={{padding: '3px 8px', borderRadius: '5px'}}>View more</button>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={btoa('Food')} cards={cards} />
            </div>
        </section>

        
        <section style={{marginBottom: 10}}> 
            <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: '1.6', margin: '0', padding: '0', background: '#fff', borderRadius: '5px'}}>
                <header style={headerStyle}>
                    <h1 style={{ fontSize: 'large', marginTop: '0' }}>Campus Sphere - Nigeria’s Top Online Shopping Destination for Students</h1>
                </header>

                <section style={sectionStyle}>
                    <h2 style={h2Style}>Find Everything You Need with Campus Sphere</h2>
                    <p style={{fontSize: 'small'}}>Campus Sphere is the ultimate online shopping platform for Nigerian students living on campus. We provide a convenient way for students to shop for all their essentials from one place, whether you're in your dorm or taking a study break. On the Campus Sphere website or mobile app, you can effortlessly shop for <b><u>fashion</u></b>, <b><u>electronics</u></b>, <b><u>textbooks</u></b>, <b><u>groceries</u></b>, and more, all from the comfort of your campus accommodation.</p>
                    
                    <h2 style={h2Style}>Get the Best Deals on Quality Items</h2>
                    <p style={{fontSize: 'small'}}>At Campus Sphere, we take pride in offering the best prices and highest quality products available. Our partnerships with popular brands and suppliers ensure that students get genuine products at affordable rates. Whether it's the <b><u>latest gadgets</u></b>, <b><u>trendy clothing</u></b>, or <b><u>essential study materials</u></b>, Campus Sphere has you covered.</p>

                    <h2 style={h2Style}>Explore the Latest Fashion Trends</h2>
                    <p style={{fontSize: 'small'}}>Discover a wide selection of fashion items for students of all styles. Our collection includes casual wear, trendy outfits, and accessories that fit both your budget and campus lifestyle. From stylish jeans and tees to comfy hoodies and sneakers, find everything you need to stay fashionable while on campus.</p>

                    <h2 style={h2Style}>Beauty Products for Students</h2>
                    <p style={{fontSize: 'small'}}>Campus Sphere also offers a range of beauty products from trusted brands. Shop for skincare, makeup, and personal care items to help you look and feel your best. Our products are curated to ensure quality and authenticity, so you can shop with confidence.</p>

                    <h2 style={h2Style}>Convenient Campus Essentials</h2>
                    <p style={{fontSize: 'small'}}>Shop for all your daily needs, from groceries and snacks to household items. Our online store features a variety of products to help you manage your campus life efficiently. Stock up on essentials like food, cleaning supplies, and other must-haves without leaving your room.</p>

                    <h2 style={h2Style}>Latest Electronics and Gadgets</h2>
                    <p style={{fontSize: 'small'}}>Stay connected and productive with the latest electronics and gadgets. Whether you need a new laptop, smartphone, or accessories like headphones and chargers, Campus Sphere offers competitive prices on top brands. Shop for tech gear that supports your academic and social life.</p>

                    <h2 style={h2Style}>Enjoy Exclusive Offers and Discounts</h2>
                    <p style={{fontSize: 'small'}}>Take advantage of fantastic deals and discounts available exclusively on Campus Sphere. From flash sales and seasonal offers to special student discounts, we provide numerous ways for you to save money on your purchases. Keep an eye out for our ongoing promotions to get the best value.</p>

                    <h2 style={h2Style}>Fast Delivery and Student-Friendly Service</h2>
                    <p style={{fontSize: 'small'}}>Campus Sphere ensures quick delivery to campuses across Nigeria. For items with our express tag, you can expect your order to arrive within 24 hours. We also offer flexible delivery options to fit your schedule and needs.</p>
                </section>

                <section style={faqsStyle}>
                    <h2 style={{ fontSize: 'large', marginTop: '0' }}>Frequently Asked Questions (FAQs)</h2>
                    <br />
                    <h3 style={{ color: '#000', fontSize: 'small', fontWeight: '600' }}>What Payment Options are Available on Campus Sphere?</h3>
                    <p style={{fontSize: 'small'}}>You can pay online or choose cash on delivery with Campus Sphere. We accept various payment methods including cards (MasterCard, Visa, and Verve), bank transfers, and mobile payments.</p>

                    <h3 style={{ color: '#000', fontSize: 'small', fontWeight: '600' }}>Can I Return Items Purchased from Campus Sphere?</h3>
                    <p style={{fontSize: 'small'}}>Yes, you can return eligible items within 7 days for a refund. Our return policy is designed to make your shopping experience smooth and hassle-free.</p>

                    <h3 style={{ color: '#000', fontSize: 'small', fontWeight: '600' }}>When is the Next Major Sale?</h3>
                    <p style={{fontSize: 'small'}}>Stay tuned for our special sales events, including Back-to-School promotions and end-of-semester deals. These sales offer significant discounts on a wide range of products, so you can stock up on everything you need.</p>

                    <h3 style={{ color: '#000', fontSize: 'small', fontWeight: '600' }}>Do You Offer Free Delivery?</h3>
                    <p style={{fontSize: 'small'}}>We offer free delivery on select items and promotions. Check for items marked with our free delivery tag for more details. Note that delivery charges may apply to larger items.</p>

                    <h3 style={{ color: '#000', fontSize: 'small', fontWeight: '600' }}>How Can I Contact Campus Sphere Customer Service?</h3>
                    <p style={{fontSize: 'small'}}>For any inquiries or support, reach out to our customer service team at [Customer Care Number]. You can also chat with us through the Campus Sphere app for a more convenient experience.</p>

                    <h3 style={{ color: '#000', fontSize: 'small', fontWeight: '600' }}>How Can I Become a Seller on Campus Sphere?</h3>
                    <p style={{fontSize: 'small'}}>Students and vendors can partner with Campus Sphere to sell their products. Register with us and benefit from our extensive student customer base to reach more buyers.</p>

                    <h3 style={{ color: '#000', fontSize: 'small', fontWeight: '600' }}>What Other Events Does Campus Sphere Host?</h3>
                    <p style={{fontSize: 'small'}}>Besides our regular promotions, we celebrate events such as Semester Sales and Tech Weeks. These events feature exclusive offers and the latest products for students.</p>
                </section>
            </div>
        </section>
      </div> 
    </>
  )
};



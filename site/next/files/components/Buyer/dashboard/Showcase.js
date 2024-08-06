import React, { useRef } from 'react'
import { 
  useEffect,
  useState
} from 'react'

import { GetFilteredAds, GetItems } from '@/app/api/buyer/get'
import ShowcaseCard from './ShowcaseCard'
import Skeleton from 'react-loading-skeleton'
import database from '@/database/seller_shop.json'
import ShowCaseCardCnt from './ShowCaseCardCnt'
import Carousel from './Carousel'
import SuperSale from './SuperSale'

import iphoneSvg from '@/app/pngs/iPhones.png'
import androidSvg from '@/app/pngs/smart-phones.png'
import cellPhoneSvg from '@/app/pngs/cell-phones.png'
import budgetPhoneSvg from '@/app/pngs/budget-phones-under150k.png'
import phoneAccessSvg from '@/app/pngs/phones-accessories.png'
import tabPhonesSvg from '@/app/pngs/Tablets.png'

import bedSvg from '@/app/pngs/Beddings.jpg'
import tvSvg from '@/app/pngs/TV_Furniture.jpg'
import genSvg from '@/app/pngs/Generators.jpg'
import chanSvg from '@/app/pngs/Chandeliers.jpg'
import decorSvg from '@/app/pngs/Home_Decor.jpg'
import kitchenSvg from '@/app/pngs/Kitchen_Dining.jpg'

import fAccessSvg from '@/app/pngs/Fashion_Accessories.jpg'
import menFSvg from '@/app/pngs/Men_s_Fashion.jpg'
import SneakerSvg from '@/app/pngs/Sneakers.jpg'
import wmenFSvg from '@/app/pngs/Women_s_Fashion.jpg'
import watchSvg from '@/app/pngs/Watches.jpg'
import shoesSvg from '@/app/pngs/Upgrade_your_Shoe_Game.jpg'

import soapSvg from '@/app/pngs/Bathing_saop.png'
import faceCareSvg from '@/app/pngs/Face_care.png'
import hairSvg from '@/app/pngs/Hair_accessories.png'
import makeupSvg from '@/app/pngs/Makeup.png'
import shampooSvg from '@/app/pngs/shampoo.png'
import deodorantSvg from '@/app/pngs/Fragrance (1).png'

import wineSvg from '@/app/pngs/Wines.png'
import foodSvg from '@/app/pngs/Artboard_1.png'
import cleanerSvg from '@/app/pngs/Artboard_1_copy_2 (1).png'
import waterSvg from '@/app/pngs/Bottled_Water.png'
import drinksSvg from '@/app/pngs/Artboard_1_copy_3 (1).png'
import fragSvg from '@/app/pngs/Fragrance (1).png'

import fridgeSvg from '../../../../app/pngs/Fridgee (1).png'
import washerSvg from '../../../../app/pngs/Washer.png'
import freezerSvg from '../../../../app/pngs/Freezer (1).png'
import ironSvg from '../../../../app/pngs/Pressing_Iron (1).png'
import fanSvg from '../../../../app/pngs/Fans (1).png'
import acSvg from '../../../../app/pngs/Air_conditioner (1).png'


export default function Showcase({title}) {

    let [limit, setlimit] = useState(30)
    let [screenWidth, setScreenWidth] = useState(0)
    let [cards, setCards] = useState([])

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
        // GetItems(category, limit)
        // .then((result) => {
        //     console.log(result)
        //     if(result){
        //         setCards(
        //             result?.map((item, index) => 
        //                 <ShowcaseCard index={index} item={item} />
        //             ) 
        //         )
        //     }

            
        // })

        function GetData(category, limit){

            let data = database.filter(item => item).splice(0,limit);
            setCards(
                data?.map((item, index) => 
                    <ShowcaseCard index={index} item={item} />
                ) 
            )
        }
        // .catch(error=>{
        //     console.log(error)
        // })

        GetData(category,limit)
    }
        
    useEffect(() => {
        try {
            fetchData('trends')
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
      
      <div className="buyer-showcase">

      
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#AADEF1'}}>
                <div style={{float: 'left', color: '#fff', fontFamily: 'sans-serif',}}><b>Showcase</b></div>
            </div>
            <div>
                {activeJSX}
                {activeJSX}
            </div>
        </section>

        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#AADEF1'}}>
                <div style={{float: 'left', color: '#fff', fontFamily: 'sans-serif',}}><b>Phone Super Sale</b></div>
            </div>
            {
                screenWidth > 480
                ?
                <div style={{display: 'flex'}}>
                    <SuperSale
                        item={
                            [
                                {title: 'Iphone', svg: iphoneSvg},
                                {title: 'Android', svg: androidSvg},
                                {title: 'Cell Phone', svg: cellPhoneSvg},
                                {title: 'Tablets', svg: tabPhonesSvg},
                                {title: 'Phones Under 150k', svg: budgetPhoneSvg},
                                {title: 'Mobile Accessories', svg: phoneAccessSvg}
                            ]
                        }       
                    />
                </div>
                :
                <>
                    <div style={{display: 'flex'}}>
                        <SuperSale
                            item={
                                [
                                    {title: 'Iphone', svg: iphoneSvg},
                                    {title: 'Android', svg: androidSvg},
                                    {title: 'Cell Phone', svg: cellPhoneSvg},
                                    
                                ]
                            }       
                        />
                    </div>
                    <div style={{display: 'flex'}}>
                        <SuperSale
                            item={
                                [
                                   
                                    {title: 'Tablets', svg: tabPhonesSvg},
                                    {title: 'Phones Under 150k', svg: budgetPhoneSvg},
                                    {title: 'Mobile Accessories', svg: phoneAccessSvg}
                                ]
                            }       
                        />
                    </div>
                </>
            }
        </section>
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#AADEF1'}}>
                <div style={{float: 'left', color: '#fff', fontFamily: 'sans-serif',}}><b>Phone Deals</b></div>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={'Mobile Phones'} cards={cards} />
            </div>
        </section>

        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#AADEF1'}}>
                <div style={{float: 'left', color: '#fff', fontFamily: 'sans-serif',}}><b>Laptops Deals</b></div>
            </div>
            <div>
                <Carousel category={'Laptops/Desktops'} cards={cards} />
            </div>
        </section>
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#AADEF1'}}>
                <div style={{float: 'left', color: '#fff', fontFamily: 'sans-serif',}}><b>Pets Deals</b></div>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={'Pets'} cards={cards} />
            </div>
        </section>
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#AADEF1'}}>
                <div style={{float: 'left', color: '#fff', fontFamily: 'sans-serif',}}><b>Lodge Deals</b></div>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={'Lodge/Apartments'} cards={cards} />
            </div>
        </section>

        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#AADEF1'}}>
                <div style={{float: 'left', color: '#fff', fontFamily: 'sans-serif',}}><b>Appliances</b></div>
            </div>
            <div>
                {
                    screenWidth > 480
                    ?
                    <SuperSale
                        item={
                            [
                                {title: 'Fridge', svg: fridgeSvg},
                                {title: 'Freezer', svg: freezerSvg},
                                {title: 'Pressing Iron', svg: ironSvg},
                                {title: 'Fan', svg: fanSvg},
                                {title: 'Air Conditioner', svg: acSvg},
                                {title: 'Washing Machine', svg: washerSvg}
                            ]
                        }       
                    />
                    :
                    <>
                        <SuperSale
                            item={
                                [
                                    {title: 'Fan', svg: fanSvg},
                                    {title: 'Air Conditioner', svg: acSvg},
                                    {title: 'Washing Machine', svg: washerSvg}
                                ]
                            }       
                        />
                        <SuperSale
                            item={
                                [
                                    {title: 'Fridge', svg: fridgeSvg},
                                    {title: 'Freezer', svg: freezerSvg},
                                    {title: 'Pressing Iron', svg: ironSvg},
                                ]
                            }       
                        />
                    </>
                }
            </div>
        </section>
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#AADEF1'}}>
                <div style={{float: 'left', color: '#fff', fontFamily: 'sans-serif',}}><b>Appliances Deals</b></div>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={'Appliances'} cards={cards} />
            </div>
        </section>

        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#AADEF1'}}>
                <div style={{float: 'left', color: '#fff', fontFamily: 'sans-serif',}}><b>Lodge Revamp</b></div>
            </div>
            <div>
                {    
                    screenWidth > 480
                    ?
                    <SuperSale
                        item={
                            [
                                {title: 'Beddings', svg: bedSvg},
                                {title: 'Chanderlier', svg: chanSvg},
                                {title: 'Home Decor', svg: decorSvg},
                                {title: 'TV Furniture', svg: tvSvg},
                                {title: 'Generators', svg: genSvg},
                                {title: 'Kitchen & Dining', svg: kitchenSvg}
                            ]
                        }       
                    />
                    :
                    <>
                        <SuperSale
                            item={
                                [
                                    {title: 'Beddings', svg: bedSvg},
                                    {title: 'Chanderlier', svg: chanSvg},
                                    {title: 'Home Decor', svg: decorSvg},
                                ]
                            }       
                        />
                        <SuperSale
                        item={
                            [
                                {title: 'TV Furniture', svg: tvSvg},
                                {title: 'Generators', svg: genSvg},
                                {title: 'Kitchen & Dining', svg: kitchenSvg}
                            ]
                        }       
                    />
                    </>
                }
            </div>
        </section>
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#AADEF1'}}>
                <div style={{float: 'left', color: '#fff', fontFamily: 'sans-serif',}}><b>Lodge Revamp</b></div>
            </div>
            <div>
                <Carousel category={'Furnitures'} cards={cards} />
            </div>
        </section>

        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#AADEF1'}}>
                <div style={{float: 'left', color: '#fff', fontFamily: 'sans-serif',}}><b>Health & Beauty Deals</b></div>
            </div>
            <div>
                {
                    screenWidth > 480
                    ?
                    <SuperSale
                        item={
                            [
                                {title: 'Bathing Soap', svg: soapSvg},
                                {title: 'Face Care', svg: faceCareSvg},
                                {title: 'Shampoo', svg: shampooSvg},
                                {title: 'Hair Accessories', svg: hairSvg},
                                {title: 'Make Up', svg: makeupSvg},
                                {title: 'Fragrance & Deodorants', svg: decorSvg}
                            ]
                        }       
                    />
                    :
                    <>
                        <SuperSale
                            item={
                                [
                                    {title: 'Bathing Soap', svg: soapSvg},
                                    {title: 'Face Care', svg: faceCareSvg},
                                    {title: 'Shampoo', svg: shampooSvg},
                                ]
                            }       
                        />
                        <SuperSale
                            item={
                                [
                                    {title: 'Hair Accessories', svg: hairSvg},
                                    {title: 'Make Up', svg: makeupSvg},
                                    {title: 'Fragrance & Deodorants', svg: decorSvg}
                                ]
                            }       
                        />
                    </>

                 }
            </div>
        </section>
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#AADEF1'}}>
                <div style={{float: 'left', color: '#fff', fontFamily: 'sans-serif',}}><b>Health & Beauty Deals</b></div>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={'Health/Beauty'} cards={cards} />
            </div>
        </section>
        
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#AADEF1'}}>
                <div style={{float: 'left', color: '#fff', fontFamily: 'sans-serif',}}><b>Fashion Deals</b></div>
            </div>
            <div>
                    {    
                        screenWidth > 480
                        ?
                        <SuperSale
                            item={
                                [
                                    {title: 'Women Fashion', svg: wmenFSvg},
                                    {title: 'Men Fashion', svg: menFSvg},
                                    {title: 'Wrist Watch', svg: watchSvg},
                                    {title: 'Sneakers', svg: SneakerSvg},
                                    {title: 'Upgrade Your Shoes Games', svg: shoesSvg},
                                    {title: 'Accessories', svg: fAccessSvg}
                                ]
                            }       
                        />

                        :

                        <>
                            <SuperSale
                                item={
                                    [
                                        {title: 'Sneakers', svg: SneakerSvg},
                                        {title: 'Upgrade Your Shoes Games', svg: shoesSvg},
                                        {title: 'Accessories', svg: fAccessSvg}
                                    ]
                                }       
                            />
                            <SuperSale
                                item={
                                    [
                                        {title: 'Women Fashion', svg: wmenFSvg},
                                        {title: 'Men Fashion', svg: menFSvg},
                                        {title: 'Wrist Watch', svg: watchSvg},
                                    ]
                                }       
                            />
                        </>
                    }
            </div>
        </section>
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#AADEF1'}}>
                <div style={{float: 'left', color: '#fff', fontFamily: 'sans-serif',}}><b>Fashion Deals</b></div>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={'Fashion'} cards={cards} />
            </div>
        </section>

        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#AADEF1'}}>
                <div style={{float: 'left', color: '#fff', fontFamily: 'sans-serif',}}><b>Groceries</b></div>
            </div>
            <div>
                {
                    screenWidth > 480
                    ?
                    <SuperSale
                        item={
                            [
                                {title: 'Food', svg: foodSvg},
                                {title: 'Wine', svg: wineSvg},
                                {title: 'Soft Drink', svg: drinksSvg},
                                {title: 'Lodge Cleaning', svg: cleanerSvg},
                                {title: 'Water', svg: waterSvg},
                                {title: 'Fragrance', svg: fragSvg}
                            ]
                        }       
                    />
                    :
                    <>
                        <SuperSale
                            item={
                                [
                                    {title: 'Lodge Cleaning', svg: cleanerSvg},
                                    {title: 'Water', svg: waterSvg},
                                    {title: 'Fragrance', svg: fragSvg}
                                ]
                            }       
                        />
                        <SuperSale
                            item={
                                [
                                    {title: 'Food', svg: foodSvg},
                                    {title: 'Wine', svg: wineSvg},
                                    {title: 'Soft Drink', svg: drinksSvg},
                                ]
                            }       
                        />
                    </>
                }
            </div>
        </section>
        <section style={{marginBottom: 10}}> 
            <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#AADEF1'}}>
                <div style={{float: 'left', color: '#fff', fontFamily: 'sans-serif',}}><b>Groceries Deals</b></div>
            </div>
            <div style={{display: 'flex'}}>
                <Carousel category={'Food'} cards={cards} />
            </div>
        </section>

        
        <section style={{marginBottom: 10}}> 
            <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: '1.6', margin: '0', padding: '0', background: '#fff', borderRadius: '5px'}}>
                <header style={headerStyle}>
                    <h1 style={{ fontSize: 'large', marginTop: '0' }}>Campus Express - Nigeria’s Top Online Shopping Destination for Students</h1>
                </header>

                <section style={sectionStyle}>
                    <h2 style={h2Style}>Find Everything You Need with Campus Express</h2>
                    <p style={{fontSize: 'small'}}>Campus Express is the ultimate online shopping platform for Nigerian students living on campus. We provide a convenient way for students to shop for all their essentials from one place, whether you're in your dorm or taking a study break. On the Campus Express website or mobile app, you can effortlessly shop for <b><u>fashion</u></b>, <b><u>electronics</u></b>, <b><u>textbooks</u></b>, <b><u>groceries</u></b>, and more, all from the comfort of your campus accommodation.</p>
                    
                    <h2 style={h2Style}>Get the Best Deals on Quality Items</h2>
                    <p style={{fontSize: 'small'}}>At Campus Express, we take pride in offering the best prices and highest quality products available. Our partnerships with popular brands and suppliers ensure that students get genuine products at affordable rates. Whether it's the <b><u>latest gadgets</u></b>, <b><u>trendy clothing</u></b>, or <b><u>essential study materials</u></b>, Campus Express has you covered.</p>

                    <h2 style={h2Style}>Explore the Latest Fashion Trends</h2>
                    <p style={{fontSize: 'small'}}>Discover a wide selection of fashion items for students of all styles. Our collection includes casual wear, trendy outfits, and accessories that fit both your budget and campus lifestyle. From stylish jeans and tees to comfy hoodies and sneakers, find everything you need to stay fashionable while on campus.</p>

                    <h2 style={h2Style}>Beauty Products for Students</h2>
                    <p style={{fontSize: 'small'}}>Campus Express also offers a range of beauty products from trusted brands. Shop for skincare, makeup, and personal care items to help you look and feel your best. Our products are curated to ensure quality and authenticity, so you can shop with confidence.</p>

                    <h2 style={h2Style}>Convenient Campus Essentials</h2>
                    <p style={{fontSize: 'small'}}>Shop for all your daily needs, from groceries and snacks to household items. Our online store features a variety of products to help you manage your campus life efficiently. Stock up on essentials like food, cleaning supplies, and other must-haves without leaving your room.</p>

                    <h2 style={h2Style}>Latest Electronics and Gadgets</h2>
                    <p style={{fontSize: 'small'}}>Stay connected and productive with the latest electronics and gadgets. Whether you need a new laptop, smartphone, or accessories like headphones and chargers, Campus Express offers competitive prices on top brands. Shop for tech gear that supports your academic and social life.</p>

                    <h2 style={h2Style}>Enjoy Exclusive Offers and Discounts</h2>
                    <p style={{fontSize: 'small'}}>Take advantage of fantastic deals and discounts available exclusively on Campus Express. From flash sales and seasonal offers to special student discounts, we provide numerous ways for you to save money on your purchases. Keep an eye out for our ongoing promotions to get the best value.</p>

                    <h2 style={h2Style}>Fast Delivery and Student-Friendly Service</h2>
                    <p style={{fontSize: 'small'}}>Campus Express ensures quick delivery to campuses across Nigeria. For items with our express tag, you can expect your order to arrive within 24 hours. We also offer flexible delivery options to fit your schedule and needs.</p>
                </section>

                <section style={faqsStyle}>
                    <h2 style={{ fontSize: 'large', marginTop: '0' }}>Frequently Asked Questions (FAQs)</h2>
                    <br />
                    <h3 style={{ color: '#000', fontSize: 'small', fontWeight: '600' }}>What Payment Options are Available on Campus Express?</h3>
                    <p style={{fontSize: 'small'}}>You can pay online or choose cash on delivery with Campus Express. We accept various payment methods including cards (MasterCard, Visa, and Verve), bank transfers, and mobile payments.</p>

                    <h3 style={{ color: '#000', fontSize: 'small', fontWeight: '600' }}>Can I Return Items Purchased from Campus Express?</h3>
                    <p style={{fontSize: 'small'}}>Yes, you can return eligible items within 7 days for a refund. Our return policy is designed to make your shopping experience smooth and hassle-free.</p>

                    <h3 style={{ color: '#000', fontSize: 'small', fontWeight: '600' }}>When is the Next Major Sale?</h3>
                    <p style={{fontSize: 'small'}}>Stay tuned for our special sales events, including Back-to-School promotions and end-of-semester deals. These sales offer significant discounts on a wide range of products, so you can stock up on everything you need.</p>

                    <h3 style={{ color: '#000', fontSize: 'small', fontWeight: '600' }}>Do You Offer Free Delivery?</h3>
                    <p style={{fontSize: 'small'}}>We offer free delivery on select items and promotions. Check for items marked with our free delivery tag for more details. Note that delivery charges may apply to larger items.</p>

                    <h3 style={{ color: '#000', fontSize: 'small', fontWeight: '600' }}>How Can I Contact Campus Express Customer Service?</h3>
                    <p style={{fontSize: 'small'}}>For any inquiries or support, reach out to our customer service team at [Customer Care Number]. You can also chat with us through the Campus Express app for a more convenient experience.</p>

                    <h3 style={{ color: '#000', fontSize: 'small', fontWeight: '600' }}>How Can I Become a Seller on Campus Express?</h3>
                    <p style={{fontSize: 'small'}}>Students and vendors can partner with Campus Express to sell their products. Register with us and benefit from our extensive student customer base to reach more buyers.</p>

                    <h3 style={{ color: '#000', fontSize: 'small', fontWeight: '600' }}>What Other Events Does Campus Express Host?</h3>
                    <p style={{fontSize: 'small'}}>Besides our regular promotions, we celebrate events such as Semester Sales and Tech Weeks. These events feature exclusive offers and the latest products for students.</p>
                </section>
            </div>
        </section>
      </div> 
    </>
  )
};



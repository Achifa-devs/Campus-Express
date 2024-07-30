"use client"
import '@/app/product/styles/xx-large.css'
import Product from "@/files/components/Buyer/Product/Product";
import { useEffect, useRef, useState } from "react";
import Description from "@/files/components/Buyer/Product/Description";
import { AddView } from "../../api/buyer/post";
import { useSelector } from "react-redux";

import imgSvg from '@/files/assets/image-svgrepo-com (4).svg'; 
import database from '@/database/seller_shop.json'

import Aside from "@/files/components/Buyer/Product/Aside";
import { usePathname } from "next/navigation";
import Head from "next/head";
import { GetSeller } from "@/app/api/seller/get";
import Reviews from '@/files/components/Buyer/Product/Reviews';
import Carousel from '@/files/components/Buyer/dashboard/Carousel';
const ProductPage = () => {
    let pathname = usePathname()

    let {ItemImages} = useSelector(s => s.itemImages);
    let {ActiveImg} = useSelector(s => s.ActiveImg);
    let {buyerData} = useSelector(s => s.buyerData);

    let [phone, set_phone] = useState(1);
    let [screenWidth, setScreenWidth] = useState(0);

    let [activeImg, setActiveImg] = useState(imgSvg);
    let [item, setItem] = useState();
    let [order_list, set_order_list] = useState([]);

    const searchParams = new URLSearchParams(window.location.search);

    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)}, []);
    useEffect(() => {setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg] : imgSvg)}, [ItemImages]);
    useEffect(() => {setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg] : imgSvg)}, [ActiveImg]);
    useEffect(() => {setActiveImg('')}, [searchParams.get('product_id')]);

    function fetchData(overlay) {
        // GetItem([pathname.split('/').splice(-1)[0]])
        // .then((result) => {
        //     setItem(result[0])
        //     overlay.removeAttribute('id')
        // })
        // .catch(error=>{
        //     console.log(error)
        //     openNotice('Error Occured Please Wait While We Reload...')
        //     setTimeout(() => {
        //         window.pathname.reload()
        //     }, 1000);
        // })

        function GetData(id){

            let data = database.filter(item => item.product_id === id);
            
            setItem(data[0])
        }
        // .catch(error=>{
        //     console.log(error)
        // })
    
        GetData(pathname.split('/').splice(-1)[0])
    }

    useEffect(() => {
        
        try {
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            fetchData(overlay)
        } catch (error) {
            console.log(error)
            
        }


    }, [])

    


    useEffect(() => {
        try {
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            fetchData(overlay)
            
        } catch (error) {
            console.log(error)
            
        }

    }, [pathname])

    useEffect(() => {
        try {
            async function getData() {
                let result = await GetSeller(item?.seller_id)
                set_phone(result?.phone)
                SaveHistory()
            }
            getData()
        } catch (error) {
            console.log(error)
        }
    },[item])

  
 
    async function AddNewViewer(product_id,buyer_id) {
        let result = await AddView(product_id, buyer_id)
        if(result?.length > 0){
            setItem(result[0])
        //    .removeAttribute('id');

        }
    }
 
    window.onload= (()=> {
        let buyer_id = window.localStorage.getItem("CE_buyer_id")
        if(buyer_id !== '' && buyer_id !== undefined && buyer_id !== null && buyer_id !== 'null'){
            try {
                setTimeout(() => {
                    AddNewViewer(item?.product_id,buyer_id)
                }, 3000); 
            } catch (error) {
                console.log(error)
            }
        }else{
            let buyer_id = window.localStorage.getItem("unknownBuyer")
            try {
                setTimeout(() => { 
                    AddNewViewer(item?.product_id,buyer_id)
                }, 3000);
            } catch (error) {
                console.log(error)
            }
        }
        
    })

    // async function handleOrder() {
    //     let result = order_list.filter((data) => data.product.product_id === item.product_id && data.order.buyer_id === buyerData.buyer_id).length
    //     if(result<1){
    //         let buyer = window.localStorage.getItem('CE_buyer_id');
    //         if(buyer === null || buyer === '' || buyer === 'null'){
    //             window.pathname.href=(`/login`)
                
    //         }else{
                
    //             // let channels = pickup_channel.includes((item) => {
    //             //     if(item.channel === 'Custom Location Pickup'){

    //             //     }
    //             //     (item.channel === 'Door Step Delivery')
    //             // })
    //             // let response = await CreateOrder(buyer,item.product_id,item.price,pickup_channel)
    //             // if(response){
    //             //     window.pathname.href=(`/checkout/${item.product_id}`)
    //             // }

    //         window.pathname.href=(`/new-order/${item.product_id}`)

    //         }
    //     }else{
    //         window.pathname.href=(`/checkout/${item.product_id}`)
    //     }
    // }

    // function SaveHistory() {
    //     let history = window.localStorage.getItem('campus_express_history');
    //     if(history !== '' && history !== undefined && history !== null && history !== 'null'){
    //         let result = JSON.parse(history)
    //         if(result.length>0) {
    //             let duplicateItems = result.filter(data => data?.product_id === item?.product_id)
    //             if(duplicateItems.length < 1){
    //                 window.localStorage.setItem('campus_express_history', JSON.stringify(JSON.parse(history).push({category: item?.category, product_id: item?.product_id})));
    
    //             }
    //         }
    //     }else{
    //         window.localStorage.setItem('campus_express_history', JSON.stringify([{category: item?.category, product_id: item?.product_id}]));
    //     }
    // }

    // useEffect(() => {
    //     GetOrders(buyerData?.buyer_id)
    //     .then((result) => {
    //         console.log(result)
    //         if(result){
    //             set_order_list(result)
    //         }
    //     })
    //     .catch((err) => console.log(err))
    // }, [buyerData]) 
    
    return ( 
        <>
            <Head>
                <meta name="title" content={`${item?.title}`} />
                <meta name="description" content={`${item?.description}`} />
                
                <meta name="robots" content="index,follow" />
                <meta name="googlebot" content="index,follow" />
                <meta name="google" content="sitelinkssearchbox" />

                <link rel="icon" href={ItemImages[ActiveImg]} />
                <link rel="shortcut icon" href={ItemImages[ActiveImg]} type="image/x-icon" />
                <title>{item?.title}</title>

                {/* FaceBook Tags */}
                <meta property="og:site_name" content={`Campus Express Nigeria`} />
                <meta property="og:title" content={`${item?.title}`} />
                <meta property="og:description" content={`${item?.description}`} />
                <meta property="og:image" itemprop="image" content={`${ItemImages[ActiveImg]}`} />
                <meta property="og:type" content="website" />
                <meta property="og:url"  content={`https://www.campusexpressng.com/product?product_id=${item?.product_id}`} />
                <meta property="og:type" content="website"/>


               
                {/* Twitter */}
                <meta name="twitter:title" content={`${item?.title}`} />
                <meta name="twitter:description" content={`${item?.description}`} />
                <meta name="twitter:image" content={`${ItemImages[ActiveImg]}`} />
                <meta name="twitter:card" content="summary_large_image" />

            </Head>
           
            <div className='buyer-product'>
                <div className="buyer-product-cnt">

                    
                    <Product order_list={order_list} item={item} phone={phone} />

                    {
                        screenWidth > 481
                        ?
                        ''
                        :
                        <>
                            {/* <Contact phone={phone} SendMssg={SendMssg}  />
                            <br /> */}
                            <button style={{marginBottom: '15px', background: '#FF4500', color: '#fff'}} onClick={'handleOrder'}>{
                                order_list.filter((data) => data.product.product_id === item.product_id && data.order.buyer_id === buyerData.buyer_id).length > 0
                                ?

                                'View Order'
                                :
                                'Place Order Now'
                            }</button>
                        </>
                    }

                    {
                        item?.description
                        ?
                        <Description item={item} />
                        :
                        ''
                    }


                    <Reviews />
                    <section style={{marginBottom: 10}}> 
                        <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#fff'}}>
                            <div style={{float: 'left', color: '#000', fontFamily: 'sans-serif',}}><b>Similar Items You May like</b></div>
                        </div>
                        <div style={{display: 'flex'}}>
                            <Carousel category={'Fashion'} />
                        </div>
                    </section>

                </div>

                <div className="buyer-product-aside">
                    <Aside />
                </div>
            </div>
        </>
     );
}
 
export default ProductPage;



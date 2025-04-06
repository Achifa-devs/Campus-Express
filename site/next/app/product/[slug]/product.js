"use client"
import Head from 'next/head';
import '@/app/product/styles/xx-large.css'
import '@/app/product/styles/x-large.css'
import '@/app/product/styles/large.css'
import '@/app/product/styles/semi-medium.css'
import '@/app/product/styles/medium.css'
import Product from "@/files/components/Buyer/Product/Product";
import { useEffect, useRef, useState } from "react";
import Description from "@/files/components/Buyer/Product/Description";
import { AddView } from "../../api/buyer/post";
import { useSelector } from "react-redux";

import imgSvg from '@/files/assets/image-svgrepo-com (4).svg'; 
import database from '@/database/seller_shop.json'

import Aside from "@/files/components/Buyer/Product/Aside";
import { usePathname } from "next/navigation";
import { GetSeller } from "@/app/api/seller/get";
import Reviews from '@/files/components/Buyer/Product/Reviews';
import Carousel from '@/files/components/Buyer/dashboard/Carousel';
import axios from 'axios';
import { open_notice } from '@/files/reusable.js/notice';
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup';
import Share from '@/files/components/Buyer/Product/Share';
import { NextSeo } from 'next-seo'
import { useParams } from 'next/navigation';

const ProductPageClient = ({product, slug}) => {
    let pathname = usePathname()
    let {
        buyer_id
    }=useSelector(s=>s.buyer_id);

    let {ItemImages} = useSelector(s => s.itemImages);
    let {ActiveImg} = useSelector(s => s.ActiveImg);
    let {buyerData} = useSelector(s => s.buyerData);

    let [seller, set_seller] = useState(1);
    let [screenWidth, setScreenWidth] = useState(0);

    let [activeImg, setActiveImg] = useState(imgSvg);
    let [item, setItem] = useState();
    let [order_list, set_order_list] = useState([]);
    const params = useParams();
    //const searchParams = new URLSearchParams(window.location.search);
    
    let [searchParams, set_searchParams]=useState('');
    useEffect(() => {
    
        const product = pathname.split('/').splice(-1)[0];
        set_searchParams(product)
        //set_searchParams(new URLSearchParams(window.location.search).get('product'))
    }, []);
    
    
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)}, []);
    useEffect(() => {setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg] : imgSvg)}, [ItemImages]);
    useEffect(() => {setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg] : imgSvg)}, [ActiveImg]);
    useEffect(() => {setActiveImg('')}, [searchParams]);

    useEffect(() => {
        buyer_overlay_setup(true, 'Getting Product Info...')
        try {
            if (product) {
                setItem(product)
                buyer_overlay_setup(false, '')
            }else{
                open_notice(true, error.message)
                buyer_overlay_setup(false, '')

                console.log(error)
            }
        } catch (error) {
            buyer_overlay_setup(false, '')

            console.log(error)
        }
    }, [pathname])

    useEffect(() => {
        try {
            GetSeller(item?.seller_id).then((res) => set_seller(res)).catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    },[item])

    async function AddNewViewer(product_id,buyer_id) {
        let result = await AddView(product_id, buyer_id)
        if(result?.length > 0){
            setItem(result[0])
        }
    }
 
    const hasRun = useRef(false);

    useEffect(() => {
    if (!item?.product_id || hasRun.current) return;
        hasRun.current = true;

        const buyer_id =
        window.localStorage.getItem("CE_buyer_id") ||
        window.localStorage.getItem("id_for_unknown_buyer");

        const finalBuyerId = buyer_id && buyer_id !== 'null' ? buyer_id : window.localStorage.getItem("id_for_unknown_buyer");

        try {
            setTimeout(() => {
                AddNewViewer(item?.product_id, finalBuyerId);
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }, [item?.product_id]);
    
    async function handleOrder() {
        let result = order_list.filter((data) => data.product.product_id === item.product_id && data.order.buyer_id === buyer_id).length
        if(result<1){
            if(buyer_id === null || buyer_id === '' || buyer_id === 'null'){
                window.location.href=(`/login`)
            }else{
                window.location.href=(`/new-order/${item.product_id}`)
            }
        }else{
            window.location.href=(`/checkout/${item.product_id}`)
        }
    }

    function SaveHistory() {
        const history = JSON.parse(localStorage.getItem('campus_express_history') || '[]');
        const isDuplicate = history.some(data => data?.product_id === item?.product_id);
        if (!isDuplicate) {
            const updatedHistory = [...history, { category: item?.category, product_id: item?.product_id }];
            localStorage.setItem('campus_express_history', JSON.stringify(updatedHistory));
        }
    }

    useEffect(() => {
        
        if (buyer_id) {
           fetch(`/api/orders?buyer_id=${buyer_id}`, { cache: 'no-store',}).then(async (res) => {
                let response = await res.json()
                set_order_list(response)
           }).catch(err => console.log(err))
        }
      
    }, [buyer_id]) 
    

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: item?.name,
        image: item?.thumbnail_id,
        description: item?.description,
    }
    const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": item?.title,
    "image": [item?.thumbnail_id],
    "description": item?.description,
    "sku": item?.product_id,
    "brand": {
      "@type": "Brand",
      "name": "Campus Sphere"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.campussphere.net/product/${item?.product_id}`,
      "priceCurrency": "NGN",
      "price": item?.price,
   
    }
  };
   
    return ( 
        <>
            <Head>
                <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className='buyer-product'>
                <div className="buyer-product-cnt">

                    
                    <Product order_list={order_list} item={item} seller={seller} />

                    {
                        screenWidth > 481
                        ?
                        ''
                        :
                        <>
                            {/* <Contact phone={phone} SendMssg={SendMssg}  />
                            <br /> */}
                            <button style={{marginBottom: '15px', background: '#FF4500', color: '#fff', border: 'none', outline: 'none',borderRadius: '2.5px'}} className='shadow-sm' onClick={handleOrder}>{
                                order_list.filter((data) => data.product.product_id === item.product_id && data.order.buyer_id === buyer_id).length > 0
                                ?

                                'View Order'
                                :
                                'Place Order Now'
                            }</button>
                        </>
                    }

                    {
                        screenWidth <= 620
                        ?
                        <div className="buyer-product-aside">
                            <Aside seller={seller} item={item} order_list={order_list} />
                        </div>
                        :
                        ''
                    }
                    

                    {
                        item?.description
                        ?
                        <Description item={item} />
                        :
                        ''
                    }


                    <Reviews />
                    <section style={{marginBottom: '0'}}> 
                        <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#fff'}}>
                            <div style={{float: 'left', color: '#000', fontFamily: 'sans-serif',}}><b>Similar Items You May like</b></div>
                        </div>
                        <div style={{display: 'flex'}}>
                            {
                                item
                                ?
                                <Carousel category={btoa(item?.category)} product_id={item?.product_id} />
                                :
                                ''
                            }
                        </div>
                    </section>

                    

                </div>

                {
                    screenWidth > 620
                    ?
                    <div className="buyer-product-aside">
                        <Aside seller={seller} item={item} order_list={order_list} />
                    </div>
                    :
                    ''
                }
            </div>
        </>
     );
}
 
export default ProductPageClient;



// export default function Page({ params, searchParams }) {}
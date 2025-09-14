"use client"
import Head from 'next/head';
import '@/app/store/product/styles/xx-large.css'
import '@/app/store/product/styles/x-large.css'
import '@/app/store/product/styles/large.css'
import '@/app/store/product/styles/semi-medium.css'
import '@/app/store/product/styles/medium.css'
import Product from "@/files/components/Buyer/Product/Product";
import { useEffect, useRef, useState } from "react";
import Description from "@/files/components/Buyer/Product/Description";
// import { AddView } from "../../api/buyer/post";
import { useSelector } from "react-redux";

import imgSvg from '@/files/assets/image-svgrepo-com (4).svg'; 

import Aside from "@/files/components/Buyer/Product/Aside";
import { usePathname } from "next/navigation";
// import { GetSeller } from "@/app/storeapi/seller/get";
import Reviews from '@/files/components/Buyer/Product/Reviews';
import Carousel from '@/files/components/Buyer/dashboard/Carousel';
import axios from 'axios';
import { open_notice } from '@/files/reusable.js/notice';
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup';
import Share from '@/files/components/Buyer/Product/Share';
import { useParams } from 'next/navigation';
import Contact from '@/files/components/Buyer/Product/Contact';

const ProductPageClient = ({product, slug}) => {
    let pathname = usePathname()
    let {
        user_id
    }=useSelector(s=>s.user_id);

    let {ItemImages} = useSelector(s => s.itemImages);
    let {ActiveImg} = useSelector(s => s.ActiveImg);

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
        set_searchParams(product);
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
            let overlay = document.querySelector('.overlay');
            overlay.setAttribute('id', 'overlay');
            if (product.user_id) {
                fetch(`/api/store/vendor?user_id=${product?.user_id}`, { cache: 'no-store',}).then(async (res) => {
                    let response = await res.json()
                    set_seller(response.data)
                    overlay.removeAttribute('id')

               }).catch(err => console.log(err))
            }
        } catch (error) {
            console.log(error)
            // window.location.reload()

        }
    },[product])

    async function AddNewViewer(product_id,user_id) {
        fetch(`/api/store/new-view`, {
            method: 'post',
            headers: {
                'Gender': window.localStorage.getItem('cs-gender') 
            },
            body: JSON.stringify({
                product_id,
                user_id
            })
        })
        .then(async(res) => {
            let response = await res.json();

            if (response.bool) {
                
                
            } else {
                
            }
        })
        .catch(err =>{
            console.log(err)
        });
    }
 
    const hasRun = useRef(false);

    useEffect(() => {
        if (!item?.product_id || hasRun.current) return;
        hasRun.current = true;

        const user_id =
        window.localStorage.getItem("CE_user_id") ||
        window.localStorage.getItem("id_for_unknown_buyer");

        const finalBuyerId = user_id && user_id !== 'null' ? user_id : window.localStorage.getItem("id_for_unknown_buyer");

        try {
            setTimeout(() => {
                AddNewViewer(item?.product_id, finalBuyerId);
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }, [product?.product_id]);
    
    async function handleOrder() {
        let result = order_list.filter((data) => data.product.product_id === product.product_id && data.order.user_id === user_id).length
        if(result<1){
            if(user_id === null || user_id === '' || user_id === 'null'){
                window.location.href=(`/login`)
            }else{
                window.location.href=(`/new-order/${product.product_id}`)
            }
        }else{
            window.location.href=(`/checkout/${product.product_id}`)
        }
    }

    function SaveHistory() {
        const history = JSON.parse(localStorage.getItem('campus_express_history') || '[]');
        const isDuplicate = history.some(data => data?.product_id === product?.product_id);
        if (!isDuplicate) {
            const updatedHistory = [...history, { category: product?.category, product_id: product?.product_id }];
            localStorage.setItem('campus_express_history', JSON.stringify(updatedHistory));
        }
    }

    useEffect(() => {
        
        if (user_id) {
            fetch(`/api/store/orders?user_id=${user_id}`, { cache: 'no-store', }).then(async (res) => {
                let response = await res.json();
               
               if (response?.bool) {
                    set_order_list(response?.data)
               }
           }).catch(err => console.log(err))
        }
      
    }, [user_id]) 
    

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product?.name,
        image: product?.thumbnail_id,
        description: product?.description,
    }
    const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product?.title,
    "image": [product?.thumbnail_id],
    "description": product?.description,
    "sku": product?.product_id,
    "brand": {
      "@type": "Brand",
      "name": "Campus Sphere"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.campussphere.net/store/product/${product?.product_id}`,
      "priceCurrency": "NGN",
      "price": product?.price,
   
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

                    
                    <Product order_list={order_list} item={product} seller={seller} />

                    {
                        screenWidth > 481
                        ?
                        ''
                        :
                        <>
                            <Contact phone={seller?.phone} item={product}  />
                            <br /> 
                            {/* <button style={{marginBottom: '15px', background: '#FF4500', color: '#fff', border: 'none', outline: 'none',borderRadius: '2.5px'}} className='shadow-sm' onClick={handleOrder}>{
                                order_list.filter((data) => data.product.product_id === product.product_id && data.order.user_id === user_id).length > 0
                                ?

                                'View Order'
                                :
                                'Place Order Now'
                            }</button> */}
                        </>
                    }

                    {
                        screenWidth <= 620
                        ?
                        <div className="buyer-product-aside">
                            <Aside seller={seller} item={product} order_list={order_list} />
                        </div>
                        :
                        ''
                    }
                    

                    {
                        product?.description
                        ?
                        <Description item={product} />
                        :
                        ''
                    }


                    {/* <Reviews /> */}
                    <section style={{marginBottom: '0'}}> 
                        <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#fff'}}>
                            <div style={{float: 'left', color: '#000', fontFamily: 'sans-serif',}}><b>Similar Items You May like</b></div>
                        </div>
                        <div style={{display: 'flex'}}>
                            {
                                product
                                ?
                                <Carousel category={btoa(product?.category)} product_id={product?.product_id} />
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
                        <Aside seller={seller} item={product} order_list={order_list} />
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
"use client"
import React, { useEffect, useState } from 'react'
import '@/app/vendor/listing/styles/xx-large.css'
import '@/app/vendor/listing/styles/x-large.css'
import '@/app/vendor/listing/styles/large.css'
import '@/app/vendor/listing/styles/medium.css'
import '@/app/vendor/listing/styles/small.css'
import database from '@/database/products.json'
import js_ago from 'js-ago'
import Thumbnail from '@/files/components/Buyer/Thumbnail'
import { useSelector } from 'react-redux'
import { seller_overlay_setup } from '@/files/reusable.js/overlay-setup'
import { open_notice } from '@/files/reusable.js/notice'
import Video from '@/files/components/Buyer/Video'
import { NextSeo } from 'next-seo'

export default function Listing() {
    let {
        user_id
    }=useSelector(s=>s.user_id);
    let [limit, setlimit] = useState(30)
    let [screenWidth, setScreenWidth] = useState(0)
    let [cards, setCards] = useState([])

    useEffect(() => {
        setScreenWidth(window.innerWidth)
    }, [])

    useEffect(() => {

        if(user_id !== null && user_id !== 'null'){
            seller_overlay_setup(true, 'Getting Your Products')
            fetch(`/api/vendor/products?user_id=${user_id}`)
            .then(async(result) => {
                let response = await result.json();  
                console.log(response)
                setCards(response.data)
                seller_overlay_setup(false, '')
            })
            .catch((error) => {
                seller_overlay_setup(false, '')
                console.log(error)
            }) 
        }
    }, [user_id])

  
    
  return (
    <>
    
        
      <div className="seller-listing">
        <div>
            <b>Manage your products</b> here
        </div>
        <hr />
        <div className="seller-listing-cnt">
            {
                cards.map((item,index) => 
                    <>
                        <NextSeo
                            config={{
                                title: item?.title,
                                description: item?.description,
                                canonical: `https://www.campussphere.net/product/${item?.product_id}`,
                                openGraph: {
                                url: `https://www.campussphere.net/product/${item?.product_id}`,
                                title: item?.title,
                                description: item?.description,
                                images: [
                                    {
                                    url: item?.thumbnail_id,
                                    width: 800,
                                    height: 600,
                                    alt: item?.title,
                                    },
                                    {
                                    url: item?.thumbnail_id,
                                    width: 900,
                                    height: 800,
                                    alt: item?.title,
                                    },
                                    // { url: 'https://www.example.ie/og-image-03.jpg' },
                                    // { url: 'https://www.example.ie/og-image-04.jpg' },
                                ],
                                site_name: 'Campus Sphere',
                                },
                                twitter: {
                                handle: '@Campus Sphere',
                                site: `https://www.campussphere.net/product/${item?.product_id}`,
                                cardType: 'summary_large_image',
                                },
                            }}
                        />
                                
                        <div key={index} className="seller-listing-card-cnt">
                            <header style={{borderBottom: '1px solid #f9f9f9'}}>
                                
                                <div>
                                    {
                                        item?.date ? js_ago(new Date(item?.date)) : ''
                                    }
                                </div>
                                <div style={{color: item.state.state === 'active' ? 'green' : 'red', fontWeight: '500'}}>
                                    {
                                        item.state.state
                                    }
                                    &nbsp;
                                    &nbsp;
                                    <button onClick={e => window.location.href=(`/seller/new-listing?update=true&product_id=${item?.product_id}`)} style={{
                                        height: 'fit-content', fontSize: 'small', width: 'fit-content', padding: '2.5px 8px', borderRadius: '3px'
                                    }}>
                                        Edit
                                    </button>
                                </div>
                            </header>
                            <section>
                                <ul>
                                    <li>

                                        <div className="top">
                                            <div className="product-thumbnail">
                                                {
                                                    (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(item.thumbnail_id?.split('.').pop().toLowerCase())) ? 
                                                    <Thumbnail thumbnail_id={item.thumbnail_id} height={'100%'} />
                                                    :
                                                    <Video thumbnail_id={item.thumbnail_id} height={'100%'} />
                                                }
                                            </div>
                                            <div className="product-title">
                                                <h5 style={{
                                                    display: 'block',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: '.875rem',
                                                    fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                                                    height: '18px',
                                                    color: '#000',
                                                    overflow: 'hidden', 
                                                    width: '100%',
                                                    
                                                    textOverflow: 'ellipsis',
                                                }}>
                                                {
                                                    item.title
                                                }
                                                </h5>
                                                <small style={{
                                                    display: 'block',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: 'small',
                                                    fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                                                    height: '18px',
                                                    color: '#000',
                                                    overflow: 'hidden', 
                                                    width: '100%',
                                                    textOverflow: 'ellipsis',
                                                }}>
                                                {
                                                    item.description === 'null'
                                                    ? 
                                                    ''
                                                    :
                                                    item.description
                                                }
                                                </small>
                                            </div>
                                            <div className="product-price">
                                                {
                                                
                                                    <small>
                                                    &#8358; <b>{new Intl.NumberFormat('en-us').format(item.price)}</b>
                                                    </small>
                                                }
                                            </div>
                                        </div>

                                        <div className="btm" style={{borderTop: '1px solid #f9f9f9', position: 'relative'}}>
                                            <div className="product-stock">
                                                {item.stock} in stock
                                            </div>
                                            |
                                            <div className="product-orders">
                                                {item.orders} orders placed 
                                            </div>
                                            |
                                            <div className="product-views">
                                                {item.views} views 
                                            </div>
                                            |
                                            <div className="product-reviews">
                                                {item.reviews} reviews
                                            </div>

                                            <div style={{border: 'none', outline: 'none', padding: '0px 8px', height: '70%', cursor: 'pointer', borderRadius: '5px', color: '#fff', position: 'absolute', right: '0px', bottom: '5px'}}>
                                                {/* <button onClick={e=> window.location.href=`/seller/new-listing?product_id=${item.product_id}`} style={{border: 'none', outline: 'none', background: 'orange', padding: '0px 8px', height: '100%', cursor: 'pointer', borderRadius: '5px', color: '#fff'}}>
                                                    Edit
                                                </button>
                                                &nbsp; */}
                                                <button onClick={e => {
                                                    if (navigator.share) {
                                                        navigator.share({
                                                            title: item?.title,
                                                            text: item?.description,
                                                            url: `https://www.campussphere.net/product/${item?.product_id}`, // or any custom URL
                                                        })
                                                        .then(() => console.log('Share successful'))
                                                        .catch((error) => console.error('Error sharing:', error));
                                                    } else {
                                                        console.log('Web Share API not supported in this browser');
                                                    }

                                                }} style={{border: 'none', outline: 'none', background: 'blue', padding: '0px 8px', height: '100%', cursor: 'pointer', borderRadius: '5px', color: '#fff'}}>
                                                    Share
                                                </button>
                                                &nbsp;

                                                <button onClick={e=> {
                                                    seller_overlay_setup(true, 'Deleting Product...')
                                                    fetch(`http://192.168.24.146:9090/vendor/delete-product?product_id=${item?.product_id}`)
                                                    .then(async(result) => {
                                                        let response = await result.json();
                                                        if(response){
                                                            e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
                                                            seller_overlay_setup(false, '')
                                                            open_notice(true, 'Product Deleted...')

                                                        }else{
                                                            seller_overlay_setup(false, '')
                                                            open_notice(true, 'Failed To Delete Product, Please Try Again...')
                                                        }
                                                        
                                                    })
                                                    .catch((error) => {
                                                        seller_overlay_setup(false, '')
                                                        console.log(error)
                                                    }) 
                                                }} style={{border: 'none', outline: 'none', background: 'red', padding: '0px 8px', height: '100%', cursor: 'pointer', borderRadius: '5px', color: '#fff'}}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                    </li>
                                </ul>
                            </section>
                            <footer>

                            </footer>
                        </div>
                    </>
                )
            }
        </div>
      </div>
    </>
  )
}

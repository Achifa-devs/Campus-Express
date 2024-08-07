"use client"
import React, { useEffect, useState } from 'react'
import '@/app/seller/listing/styles/xx-large.css'
import '@/app/seller/listing/styles/x-large.css'
import '@/app/seller/listing/styles/large.css'
import '@/app/seller/listing/styles/medium.css'
import '@/app/seller/listing/styles/small.css'
import database from '@/database/seller_shop.json'
import js_ago from 'js-ago'
import Thumbnail from '@/files/components/Buyer/Thumbnail'

export default function Listing() {

    let [limit, setlimit] = useState(30)
    let [screenWidth, setScreenWidth] = useState(0)
    let [cards, setCards] = useState([])

    useEffect(() => {
        setScreenWidth(window.innerWidth)
    }, [])

    
    async function fetchData() {

        if(screenWidth > 999){
            setlimit(30);
        }else if(screenWidth > 761 && screenWidth < 1000){
            setlimit(30);
        }else if(screenWidth < 659){
            setlimit(30);
        } 

        fetch(`https://ce-server.vercel.app/seller.listing?id=${seller_id}`)
        .then(async(result) => {
            let response = await result.json(); 
            setCards(response)
        })
        .catch((error) => {
            console.log(error)
        }) 

        
    }
        
    useEffect(() => {
        try {
            fetchData('trends')
        } catch (error) {
            console.log(error)
        }
    }, [])

    // function handleShare() {
    //     if (navigator.share) {
    //         navigator.share({

    //             // Title that occurs over
    //             // web share dialog
    //             title: 'GeeksForGeeks',

    //             // URL to share
    //             url: 'https://geeksforgeeks.org'
    //         }).then(() => {
    //             console.log('Thanks for sharing!');
    //         }).catch(err => {

    //             // Handle errors, if occurred
    //             console.log(
    //             "Error while using Web share API:");
    //             console.log(err);
    //         });
    //     } else {

    //         // Alerts user if API not available 
    //         alert("Browser doesn't support this API !");
    //     }
    // }

    
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
                
                    <div key={index} className="seller-listing-card-cnt">
                        <header style={{borderBottom: '1px solid #f9f9f9'}}>
                            
                            <div>
                                {
                                    js_ago(new Date(item.date))
                                }
                            </div>
                            <div style={{color: item.state.state === 'active' ? 'green' : 'red', fontWeight: '500'}}>
                                {
                                    item.state.state
                                }
                            </div>
                        </header>
                        <section>
                            <ul>
                                <li>

                                    <div className="top">
                                        <div className="product-thumbnail">
                                            <Thumbnail height={'100%'} title={item.title} product_id={item.product_id} />
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
                                                item.description
                                            }
                                            </small>
                                        </div>
                                        <div className="product-price">
                                            <h5>
                                            &#8358; {new Intl.NumberFormat('en-us').format(item.price)}
                                            </h5>
                                        </div>
                                    </div>

                                    <div className="btm" style={{borderTop: '1px solid #f9f9f9', position: 'relative'}}>
                                        <div className="product-stock">
                                            20 in stock
                                        </div>
                                        |
                                        <div className="product-orders">
                                            12 orders placed
                                        </div>
                                        |
                                        <div className="product-views">
                                            {item.views} Views
                                        </div>
                                        |
                                        <div className="product-reviews">
                                            123 reviews
                                        </div>
{/* 
                                        <button onClick={handleShare} style={{border: 'none', outline: 'none', background: '#FF4500', padding: '0px 8px', height: '70%', cursor: 'pointer', borderRadius: '5px', color: '#fff', position: 'absolute', right: '10px', bottom: '5px'}}>
                                            share
                                        </button> */}
                                    </div>

                                </li>
                            </ul>
                        </section>
                        <footer>

                        </footer>
                    </div>
                )
            }
        </div>
      </div>
    </>
  )
}

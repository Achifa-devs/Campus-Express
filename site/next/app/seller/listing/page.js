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
            setCards(data)
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

    
  return (
    <>
      <div className="seller-listing">
        <div>
            <b>Manage your products</b> here
        </div>
        <hr />
        <div className="seller-listing-cnt">
            {
                cards.map(item => 
                
                    <div className="seller-listing-card-cnt">
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

                                    <div className="btm" style={{borderTop: '1px solid #f9f9f9'}}>
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

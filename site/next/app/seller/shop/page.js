"use client"
import React, { useEffect, useState } from 'react'
import '@/app/seller/shop/styles/xx-large.css'
import '@/app/seller/shop/styles/x-large.css'
import '@/app/seller/shop/styles/large.css'
import '@/app/seller/shop/styles/medium.css'
import '@/app/seller/shop/styles/small.css'
import { useSelector } from 'react-redux'

export default function Shop() {
    let {
        seller_id
    }=useSelector(s=>s.seller_id);

    let [shop, setShop] = useState('')
    let [newShopName, setNewShopName] = useState('')

    useEffect(() => {
        if(seller_id !== 'null' && seller_id !== null && seller_id !== ''){

            fetch(`https://ce-server.vercel.app/seller.shop?seller_id=${seller_id}`,{
                headers: {
                    "Content-Type": "Application/json"
                },
            })
            .then(async(result) => {
                let response = await result.json(); 
                setShop(response)
            })
            .catch((error) => {
                console.log(error)
            }) 

            
        }
    }, [seller_id])

    useEffect(() => {
        if(!shop.shop_id){
            fetch(`https://ce-server.vercel.app/seller.shop-setup`, {
                method: 'post',
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({seller_id})
            })
            .then(async(result) => {
                let response = await result.json(); 
                setShop(response)
                
            })
            .catch((error) => {
                console.log(error)
            }) 
        }
    }, [shop])

    useEffect(() => {
      if(shop?.shop_title === ''){
        document.querySelector('.seller-overlay').setAttribute('id', 'seller-overlay')
      }
    }, [shop])

    

  return (
    <>
        <div className="seller-overlay">
            <section style={{width: 'auto', height: 'fit-content', borderRadius: '5px', padding: '10px', background: '#fff'}}>
                <div className="seller-input-cnt" style={{height: 'auto'}}>
                    <label htmlFor="">Shop Name</label>
                    <input type="text" onInput={e=>setNewShopName(e.target.value)} name="" placeholder='Shop Name' id="" />
                </div>
                <div className="seller-input-cnt">
                    <button onClick={e=> {
                        fetch(`https://ce-server.vercel.app/seller.shop-name-update`, {
                            method: 'post',
                            headers: {
                                "Content-Type": "Application/json"
                            },
                            body: JSON.stringify({seller_id,newShopName})
                        })
                        .then(async(result) => {
                            // let response = await result.json(); 
                            document.querySelector('.seller-overlay').removeAttribute('id');
                            window.location.reload()
                            
                        })
                        .catch((error) => {
                            console.log(error)
                        }) 
                    }} style={{
                        background: '#FF4500',
                        color: '#FFF', 
                        border: 'none', 
                        outline: 'none',
                        padding: '10px',
                        borderRadius: '5px'
                    }}>
                        <b><small>Set Shop Name</small></b>
                    </button>
                </div>
            </section>
        </div>
      <div className="seller-shop">
            <div>
                <b>Hey there,</b> here is a resume of where <b>Xina</b> is at
            </div>
            <hr />

            <div className="seller-shop-cnt">
                <div className="seller-shop-learner">
                    <div className='learner-cnt' style={{padding: '0px 15px'}}>
                        <div>
                            <h6>Publish New Item Now</h6>
                        </div>

                    </div>

                    <ul className='learner-data-cnt'>
                        <li style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', flexDirection: 'row', color: '#FF4500', border: '1px solid #FF4500'}}  className='learner-data' onClick={e => window.location.href=('/seller/new-listing')}>Add New Product To Your Listing </li>
                    </ul>
                </div> 
                <div className="seller-shop-metrics">
                    <div className='metrics-cnt'>
                        <div>
                            <h5>Business Metrics</h5>
                        </div>

                        <ul>
                            <li>9 days</li>
                            <li>30 days</li>
                            <li>90 days</li>
                        </ul>
                    </div>

                    <ul className='metrics-data-cnt'>
                        <li style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', flexDirection: 'column'}} className='metrics-data'>
                            <div>Revenue</div>
                            <div>&#8358; {new Intl.NumberFormat('en-us').format(0.00)}</div>
                        </li>
                        <li style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', flexDirection: 'column'}} className='metrics-data'>
                            <div>Items Sold</div>
                            <div>0</div>
                        </li>
                        <li style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', flexDirection: 'column'}} className='metrics-data'>
                            <div>Items Rejected</div>
                            <div>0</div>
                        </li>
                    </ul>
                </div>

                <div className="seller-shop-learner">
                    <div className='learner-cnt' style={{padding: '0px 15px'}}>
                        <div>
                            <h6>Learn how to do</h6>
                        </div>

                    </div>

                    <ul className='learner-data-cnt'>
                        <li className='learner-data'></li>
                        <li className='learner-data'></li>
                        <li className='learner-data'></li>
                    </ul>
                </div>
            
            </div>
      </div>
    </>
  )
}

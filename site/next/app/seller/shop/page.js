import React from 'react'
import '@/app/seller/shop/styles/xx-large.css'
import '@/app/seller/shop/styles/x-large.css'
import '@/app/seller/shop/styles/large.css'
import '@/app/seller/shop/styles/medium.css'
import '@/app/seller/shop/styles/small.css'

export default function Shop() {
  return (
    <>
      <div className="seller-shop">
            <div>
                <b>Hey there,</b> here is a resume of where <b>Xina</b> is at
            </div>
            <hr />

            <div className="seller-shop-cnt">

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
                        <li className='metrics-data'></li>
                        <li className='metrics-data'></li>
                        <li className='metrics-data'></li>
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

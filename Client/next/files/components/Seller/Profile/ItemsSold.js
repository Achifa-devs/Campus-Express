import React, { useState } from 'react'
import Thumbnail from '../Thumbnail'
import { useNavigate } from 'react-router-dom'

export default function ItemsSold({soldItems}) {
  let navigate = useNavigate()
  let [screenWidth, setScreenWidth] = useState(0)

  return (
    <>
      <div>
            <span>Items Sold</span>
            
            <div className='seller-profile-items-sold'>
              <ul>
                {
                  (typeof soldItems) === 'array' && soldItems.length > 0 ? soldItems.map((item, index) => <li style={{listStyleType: 'disc'}}>
                    <li style={{listStyleType: 'disc'}}>
                      <div className="cols" >
                        <div className="card" key={index} style={{height: 'fit-content', marginBottom: '10x', flexShrink: '0', width: '200px', borderRadius: '10px'}}>
                            
                          <Thumbnail product_id={item.product_id} />

                          <div className="card-body">
                              
                            {
                              screenWidth > 479
                              ?
                              <small style={{fontSize: 'small', fontFamily: 'sans-serif', height: '35px', lineHeight: '18px', color: '#000'}} onClick={e => navigate(`/product/${item.product_id}`)} >{item.title}</small>
                              : 
                              <small style={{fontSize: 'small', fontFamily: 'sans-serif', height: '35px', lineHeight: '18px', color: '#000'}} onClick={e => navigate(`/product/${item.product_id}`)} >{item.title}</small>
                            }

                            {/* <br /> */}

                            {/* <hr  /> */}
                            
                            {
                              screenWidth > 479
                              ?
                              <h6 onClick={e => navigate(`/product/${item.product_id}`)} style={{marginBottom: '10px', marginTop: '10px', fontWeight: '500', color: '#000'}}>&#8358;{
                                  new Intl.NumberFormat('en-us').format(item.price)
                              }</h6>
                              : 
                              <h6 onClick={e => navigate(`/product/${item.product_id}`)} style={{marginBottom: '10px', fontWeight: '700', color: '#000'}}>&#8358;{new Intl.NumberFormat('en-us').format(item.price)}</h6>
                            }

                              
                          </div>

                            

                        </div>
                      </div> 
                    </li>
                  </li>)
                  : 
                    <li style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FF4500', color: '#fff'}}>
                      No Sold Items Yet
                    </li>

                }
              </ul>
            </div>
          </div>
    </>
  )
}

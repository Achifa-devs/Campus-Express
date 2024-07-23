import React from 'react'
import { Link } from 'react-router-dom'
import phn from '../../../assets/phone-rounded-svgrepo-com.svg'
import mssg from '../../../assets/messages-1-svgrepo-com (1).svg'
import deleteSvg from '../../../assets/delete-svgrepo-com (1).svg'
export default function Contact({role,phone,SendMssg}) {
  return (
    <>
      <div style={{
            height: '60px',
            width: '100%',
            borderRadius: '10px',
            outline: 'none',
            border: 'none',
            textAlign: 'center',
            color: '#fff',

            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            fontSize: 'medium',
            fontWeight: '500',
            backgroundColor: '#fff',
            marginTop: '20px'
        }}>
        {/* onClick={e => role !== 0 ? DeleteProduct(e,item.product_id) : AddToCart(e,item.product_id)} */}
            <button onClick={e => {SendMssg()}} style={{height: '50px', width: role ? '100%' : '45%', borderRadius: '5px', display: 'flex', alignItems: 'center', cursor: 'pointer',fontSize: 'x-small', justifyContent: 'space-evenly', background: 'orangered', color: '#fff'}}>
                <span>
                    <img src={mssg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px',marginRight: '5px'}} alt="" />
                </span>
                <span>Message</span>
            </button>

            <Link to={`tel:+234${phone}`} style={{height: '50px', width: '45%', borderRadius: '5px', display: role ? 'none' : 'flex', alignItems: 'center', cursor: 'pointer', justifyContent: 'space-evenly', fontSize: 'x-small', background: 'orangered', color: '#fff'}}>
                {
                    
                    <>
                        <span>
                            <img src={phn} style={{height: '25px', width: '25px', position: 'relative',  margin: 'auto'}} alt="" />
                        </span>
                        <span style={{marginTop: '0'}}>
                            Call
                        </span>
                    </>  

                    
                }
            </Link>

        </div>
    </>
  )
}

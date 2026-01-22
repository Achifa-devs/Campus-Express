import React from 'react'
import phn from '../../../assets/phone-rounded-svgrepo-com.svg'
import mssg from '../../../assets/whatsapp-whats-app-svgrepo-com.svg'
import axios from 'axios'
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup'
import { open_notice } from '@/files/reusable.js/notice'
import { useSelector } from 'react-redux'
export default function Contact({phone,item}) {
    const {
        buyer_info
    } = useSelector(s => s?.buyer_info)
  return (
    <>
      <div style={{
            height: '120px',
            width: '100%',
            // borderRadius: '10px',
            outline: 'none',
            border: 'none',
            textAlign: 'center',
            color: '#fff',
            padding: '10px 20px',
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            fontSize: 'medium',
            fontWeight: '500',
            backgroundColor: '#fff',
            marginTop: '20px'
        }}>
            <button style={{height: '50px', width: '100%', borderRadius: '5px', display: 'flex', alignItems: 'center', cursor: 'pointer',fontSize: 'x-small', justifyContent: 'center', background: '#FFA500', color: '#fff', fontWeight: 'bold'}}  onClick={async e => {
                // Chat vendor now on our mobile app
                if (buyer_info?.user_id !== item?.user_id) {
                    buyer_overlay_setup(true, 'Loading Chat...');

                    axios.post('/api/store/create-room', {
                        user_id: buyer_info?.user_id,
                        receiver_id: item?.user_id, 
                        content: "I need more enquiries on your offer now!", 
                        message_type: "enquire", 
                        media_url:  item.product_id,
                        date: new Date(),
                        
                    }).then(res => {
                        if(res.data.success){
                            window.location.href = `/store/chat`;
                        }
                    }).catch(err => {
                        buyer_overlay_setup(false, '');
                        open_notice(true, "Internal Server Error, try again later")
                        console.log(err)
                    })
                    
                }else{
                    open_notice(true, "You cannot chat yourself", 'error')
                }
            }}>
                Chat Vendor Now
            </button>
        {/* onClick={e => true !== 0 ? DeleteProduct(e,item.product_id) : AddToCart(e,item.product_id)} */}
            {/* <button className='shadow-sm' style={{height: '50px', width: '45%', borderRadius: '5px', display: 'flex', alignItems: 'center', cursor: 'pointer',fontSize: 'x-small', justifyContent: 'center', background: '#FFA500', color: '#fff'}}  onClick={async e => {
                const whatsappUrl = `whatsapp://send?text=Hey, I would love to make more enquiries about "${item.title}" ${encodeURIComponent(window.location.href)}`;
                window.open(whatsappUrl, '_blank');

            }}>
                <span>
                    <img src={mssg.src} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px',marginRight: '5px'}} alt="" />
                </span>
                &nbsp;
                &nbsp;
                &nbsp;
                <span>WhatsApp</span>
            </button>

            <div onClick={e => window.location.href = `tel:+234${phone}`} style={{height: '50px', width: '45%', borderRadius: '5px', display: 'flex', alignItems: 'center', cursor: 'pointer', justifyContent: 'center', fontSize: 'x-small', background: '#FFA500', color: '#fff'}}>
                {
                    
                    <>
                        <span>
                            <img src={phn.src} style={{height: '25px', width: '25px', position: 'relative',  margin: 'auto'}} alt="" />
                        </span>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        
                        <span style={{marginTop: '0'}}>
                            Call
                        </span>
                    </>  

                    
                }
            </div> */}

        </div>
    </>
  )
}

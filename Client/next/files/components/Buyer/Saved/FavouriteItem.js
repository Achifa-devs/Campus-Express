import React, { useEffect, useState } from 'react'
import Thumbnail from '../Thumbnail'
import js_ago from 'js-ago'
import ellipsisSvg from '../../../assets/ellipsis-svgrepo-com.svg'
import Video from '../Video';
import axios from 'axios';
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup';
import { open_notice } from '@/files/reusable.js/notice';
import { useSelector } from 'react-redux';

export default function FavouriteItem({ item, index , deleteFavourite}) {
    let {
        user_id 
    } = useSelector(s => s.user_id);
    let {
        buyer_info 
    } = useSelector(s => s.buyer_info);
    let [orders, set_orders] = useState([0]);
    let [ordered, set_ordered] = useState([0]);
   
    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {setScreenWidth(window.innerWidth)},[]);
    useEffect(() => {
        if (user_id !== '' && user_id !== null) {
            // buyer_overlay_setup(true, 'Loading')
            
            axios.get('https://www.campussphere.net/api/store/orders', {params: {user_id: user_id.trim()}})
            .then(({data})=>{
                console.log(data)
                set_orders(data) 
                buyer_overlay_setup(false, '')

            })
            .catch(error=>{
                console.log(error)
                buyer_overlay_setup(false, '')

            })

        }

    }, [user_id])
    
    useEffect(() => {
        if (orders) {
            if (orders.length > 0) {
                let result = orders.filter((data) => data?.product?.product_id === item?.item?.product_id);
                console.log(result)
                if(result.length > 0){
                    set_ordered(true)
                } else {
                    set_ordered(false)
                }
            }
        }
    }, [orders])
    
  return (
    <>
        
        <div key={index} className="favourite-card-data">
            <div className="favourite-card-data-cnt">
                <div className='thumbnail-cnt' style={{height: '100%'}}>
                    {
                        item?.product?.purpose === 'accomodation'
                        ?
                        <Video thumbnail_id={item?.product?.thumbnail_id} height={"100%"} />
                        :
                        <Thumbnail thumbnail_id={item?.product?.thumbnail_id} height={"100%"}/>
                    }
                </div> 

                <div style={{position: 'absolute', top: '5px', right: '5px', padding: '4px'}}>
                    <img src={ellipsisSvg} style={{height: '10px', width: '10px'}} alt="..." />
                </div>
                
                <div className="body-cnt">
                    <div className="body-cnt-top">
                        <div className="title">
                            <p style={{
                                whiteSpace: 'nowrap', /* Prevent text from wrapping */
                                overflow: 'hidden',    /* Hide any overflow text */
                                textOverflow: 'ellipsis'
                            }}>{item?.product?.title}</p>
                        </div>

                        <div className="price">
                            &#8358;&nbsp;{
                            new Intl.NumberFormat('en-us').format(item?.product?.price)}
                        </div>
                    </div>
                    
                    <div className="body-cnt-mid">
                        <div className="seller">
                            <span style={{
                                whiteSpace: 'nowrap', /* Prevent text from wrapping */
                                overflow: 'hidden',    /* Hide any overflow text */
                                textOverflow: 'ellipsis'
                            }}>{item?.product?.campus} in <b>{item?.product?.uni_state} state</b></span>
                        </div>
                    </div>
                    
                    <div className="body-cnt-btm"> 
                        <button onClick={async(e) => { 
                            buyer_overlay_setup(true, 'Unsaving item');
                            await deleteFavourite(item?.saved_item?.saveditems_id, buyer_info?.user_id, item?.saved_item?.product_id);
                           
                        }}>
                            Remove
                        </button>

                        <button onClick={e => {
                            ordered
                            ?
                                window.location.href=(`/orders?item=${item?.product?.product_id}`)
                            :
                                window.location.href=(`/new-order/${item?.product?.product_id}`)
                        }}>
                            {
                                ordered
                                ?
                                'View order'
                                :
                                'Place order now'
                            }
                        </button>
                    </div>

                </div>
            </div>
        
        </div>
    </>
  )
}

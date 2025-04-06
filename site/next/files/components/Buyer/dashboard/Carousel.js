import React, { useEffect, useState } from 'react'
import Thumbnail from '../Thumbnail'
import Video from '../Video'
import img from '@/public/eye-svgrepo-com (1).svg'
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup'
export default function Carousel({category,product_id}) {
    let [screenWidth, setScreenWidth] = useState(0)
    let [cardsSet, setcardsSet] = useState([])
    let [cards, setCards] = useState([])
   
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    }, [])
    

    useEffect(() => {
        setcardsSet(cards)
    },[cards,screenWidth])


   
    useEffect(() => {
        fetch(`/api/products/category?category=${category}&limit=${10}`, {
            headers: {
                'Gender': window.localStorage.getItem('cs-gender') 
            }
        })
        .then(async(res) => {
            let response = await res.json();

            if (response.bool) {
                

                setCards(
                    response?.data?.map((item, index) => 
                        item?.product_id !== product_id ? <Card index={index} item={item} />: ''
                    ) 
                )

            }else{
                

            }
        })
        .catch(err =>{
            console.log(err)
            

        });

    },[])

  return (
    <>
        <div className='buyer-showcase-cnt' style={{display: 'flex', flexShrink: '0', marginBottom: 0, overflowY: 'hidden', overflowX: 'auto', flexWrap: 'nowrap', flexDirection: 'row', width: '100%', height: '230px', borderRadius: '0'}}>
          
          <div className="content" style={{padding: '10px', display: 'flex', flexWrap: 'nowrap', width: '100%', background: '#fff', borderRadius: '0'}}>
            {
                Array.isArray(cardsSet)
                ?
                cardsSet.map((item,index) => item)
                :
                <cardSkeleton />
            }
          </div>
        </div>
    </>
  )
}



function cardSkeleton(screenWidth) {

    return(
        <>
            {
                screenWidth <= 480
                ?
                [0,1].map((item,index)=><div key={index} className="card"style={{height: '200px', marginBottom: '10px', borderRadius: '5px', display: 'flex', flexShrink: '0', border: 'none'}}>
                    <div style={{padding: '10px'}}>
                        <SkeletonLoader width="100%" height="100px" />
                    </div>
                    <div style={{padding: '10px'}}>
                        <SkeletonLoader width="100%" height="10px" />
                    </div>
                    <div style={{padding: '10px'}}>
                        <SkeletonLoader width="100%" height="10px" />
                    </div>
                </div>)
                :
                screenWidth > 480 && screenWidth < 1000
                ?
                [0,1,2].map((item,index)=><div key={index} className="card"style={{height: '200px', marginBottom: '10px', borderRadius: '5px', display: 'flex', flexShrink: '0', border: 'none'}}>
                    <div style={{padding: '10px'}}>
                        <SkeletonLoader width="100%" height="100px" />
                    </div>
                    <div style={{padding: '10px'}}>
                        <SkeletonLoader width="100%" height="10px" />
                    </div>
                    <div style={{padding: '10px'}}>
                        <SkeletonLoader width="100%" height="10px" />
                    </div>
                </div>)
                :
                screenWidth >= 1000
                ?
                [0,1,2,3,4,5].map((item,index)=><div key={index} className="card"style={{height: '200px', marginBottom: '10px', borderRadius: '5px', display: 'flex', flexShrink: '0', border: 'none'}}>
                    <div style={{padding: '10px'}}>
                        <SkeletonLoader width="100%" height="100px" />
                    </div>
                    <div style={{padding: '10px'}}>
                        <SkeletonLoader width="100%" height="10px" />
                    </div>
                    <div style={{padding: '10px'}}>
                        <SkeletonLoader width="100%" height="10px" />
                    </div>
                </div>)
                :
                ''

            }
        </>
    )
}


const Card = ({item, index}) => {

   
    let [screenWidth, setScreenWidth] = useState(0)

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

    return ( 
        <> 
            
            <div className="cols" key={index} id={item.product_id} >
                <div className="card" key={index} style={{height: 'auto', marginBottom: '10px', border: 'none', borderRadius: '0', padding: '5px', display: 'flex', width: '180px', flexDirection: 'column', flexShrink: '0'}}>
                      
                    <div onClick={e => window.location.href=(`/product/${item.product_id}`)}>
                        {
                            (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(item?.thumbnail_id?.split('.').pop().toLowerCase())) ? 
                            <Thumbnail thumbnail_id={item?.thumbnail_id} />
                            :
                            <Video thumbnail_id={item?.thumbnail_id}/>
                            
                        }

                    </div>
                    <div className="card-body" style={{position: 'relative', padding: '5px', height: '50px'}}>
                        
                        {
                            screenWidth > 479
                            ?
                            <small style={{
                                display: 'block',
                                whiteSpace: 'nowrap',
                                fontSize: '.875rem',
                                fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                                height: '18px',
                                color: '#000',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }} onClick={e => window.location.href=(`/product/${item.product_id}`)} >{item.title}</small>
                            : 
                            <small style={{
                                display: 'block',
                                fontSize: 'x-small',
                                whiteSpace: 'nowrap',
                                fontWeight: '500',
                                fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                                height: '18px',
                                color: '#000',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }} onClick={e => window.location.href=(`/product/${item.product_id}`)} >{item.title}</small>
                        }

                      
                        
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            {
                                screenWidth > 479
                                ?
                                <h6 onClick={e => window.location.href=(`/product/${item.product_id}`)} style={{marginBottom: '10px', marginTop: '10px', fontWeight: '500', fontSize: 'small', color: '#000', fontFamily: 'sans-serif'}}>&#8358;{
                                    new Intl.NumberFormat('en-us').format(item.price)
                                }</h6>
                                : 
                                <h6 onClick={e => window.location.href=(`/product/${item.product_id}`)} style={{marginBottom: '10px', fontWeight: '500', color: '#000'}}>&#8358;{new Intl.NumberFormat('en-us').format(item.price)}</h6>
                            }

                            <div style={{
                            display: 'flex', justifyContent: 'right', flexDirection: 'row', width: '50%', alignItems: 'center',
                        }}>
                                <img src={img.src} style={{height: '15px', width: '15px', borderRadius: '10px'}} alt="" />
                                &nbsp;
                                <div style={{height: 'fit-content', width: 'fit-content', fontWeight: '400', fontSize: 'small'}} > {item.views}</div>
                        </div>
                        </div>

                    </div>
                    
                </div>
            </div> 
        </>
     );
}
 
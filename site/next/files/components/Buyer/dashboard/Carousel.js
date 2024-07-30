import React, { useEffect, useState } from 'react'
import database from '@/database/seller_shop.json'
import ShowcaseCard from './ShowcaseCard'
import Thumbnail from '../Thumbnail'

export default function Carousel({category}) {
    let [screenWidth, setScreenWidth] = useState(0)
    let [cardsSet, setcardsSet] = useState([])
    let [cards, setCards] = useState([])
   
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    }, [])
    

    useEffect(() => {
        setcardsSet(cards)
    },[cards,screenWidth])

    function GetData(category, limit){
        let data = database.filter(item => item.category === category).splice(0,limit);
        setCards(
            data?.map((item, index) => 
                <Card index={index} item={item} />
            ) 
        ) 
    }
    useEffect(() => {
        GetData(category, 18)
    },[])

  return (
    <>
        <div className='buyer-showcase-cnt' style={{display: 'flex', flexShrink: '0', marginBottom: 0, overflowY: 'hidden', overflowX: 'auto', flexWrap: 'nowrap', flexDirection: 'row', width: '100%', height: '230px'}}>
          
          <div className="content" style={{padding: '10px', display: 'flex', flexWrap: 'nowrap', width: '100%', background: '#fff'}}>
            {
                Array.isArray(cardsSet)
                ?
                cardsSet.map((item,index) => item)
                :
                console.log(cardsSet)
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
                      
                    {
                        item.category === 'Lodge/Apartments'
                        ?
                        <Video product_id={item.product_id} folder={item.title} />
                        :
                        <Thumbnail product_id={item.product_id} title={item.title} />
                    }

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
                                fontSize: '.875rem',
                                whiteSpace: 'nowrap',
                                fontWeight: '500',
                                fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                                height: '18px',
                                color: '#000',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }} onClick={e => window.location.href=(`/product/${item.product_id}`)} >{item.title}</small>
                        }

                      
                        
                        {
                            screenWidth > 479
                            ?
                            <h6 onClick={e => window.location.href=(`/product/${item.product_id}`)} style={{marginBottom: '10px', marginTop: '10px', fontWeight: '500', fontSize: 'small', color: '#000', fontFamily: 'sans-serif'}}>&#8358;{
                                new Intl.NumberFormat('en-us').format(item.price)
                            }</h6>
                            : 
                            <h6 onClick={e => window.location.href=(`/product/${item.product_id}`)} style={{marginBottom: '10px', fontWeight: '500', color: '#000'}}>&#8358;{new Intl.NumberFormat('en-us').format(item.price)}</h6>
                        }

                    </div>
                    
                </div>
            </div> 
        </>
     );
}
 
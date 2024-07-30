import React, { useEffect, useState } from 'react'

export default function ShowCaseCardCnt({cards}) {
    let [screenWidth, setScreenWidth] = useState(0)
    let [cardsSet, setcardsSet] = useState([])
   
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    }, [])
    

    useEffect(() => {
        console.log(cards)
        if(cards.length > 0){
            if(screenWidth < 480){
                setcardsSet(cards.splice(0,2))
            }else if(screenWidth > 480 && screenWidth < 1000){
                setcardsSet(cards.splice(0,3))
            }else if(screenWidth >= 1000 ){
                setcardsSet(cards.splice(0,6))
            } 
        }else{
           
        }
    },[cards,screenWidth])

  return (
    <>
        <div className='buyer-showcase-cnt' style={{display: 'flex', flexShrink: '0', marginBottom: 0}}>
          
          <div className="content" style={{padding: '10px'}}>
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
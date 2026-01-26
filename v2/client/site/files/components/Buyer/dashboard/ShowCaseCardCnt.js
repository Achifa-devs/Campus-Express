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
                setcardsSet(cards.splice(0,3))
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
        <div className='buyer-showcase-cnt' style={{display: cardsSet.length > 0 ? 'flex' : 'none', borderRadius: '0', flexShrink: '0', marginBottom: 0}}>
          
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



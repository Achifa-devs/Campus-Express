import React, { useEffect } from 'react'

export default function SaveButton({Saver, data, isItemSaved}) {
   
  return (
    <>
        <button onClick={e => Saver(e,data.product_id)} style={{position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', right: '0px', top: '45px', background: 'transparent', color: '#626262', height: '50px', width: 'fit-content'}}>
            {/* <img src={saveSvg} style={{height: '25px', width: '25px', position: 'relative',  margin: 'auto'}} alt="" /> */}
            
           
            <svg width="18px" height="20px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="favouriteIconTitle" stroke="orangered" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" fill={
                isItemSaved ? 'orangered' : '#fff'
            } color="orangered"> <title id="favouriteIconTitle">Favourite</title> <path d="M12,21 L10.55,19.7051771 C5.4,15.1242507 2,12.1029973 2,8.39509537 C2,5.37384196 4.42,3 7.5,3 C9.24,3 10.91,3.79455041 12,5.05013624 C13.09,3.79455041 14.76,3 16.5,3 C19.58,3 22,5.37384196 22,8.39509537 C22,12.1029973 18.6,15.1242507 13.45,19.7149864 L12,21 Z"/>
            </svg>

            <section style={{marginTop: '-1px', fontSize: 'xx-small'}}>
                {isItemSaved ? 'Unsave' : 'Save'}
            </section>
        </button> 
    </>
  )
}

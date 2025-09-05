import React from 'react'
import { 
  useEffect,
  useState
} from 'react'
import Thumbnail from '../Thumbnail'

// import { GetFilteredAds } from '@/app/api/buyer/get'
// import { 
//   GetFilteredAds
// } from '../../../api/buyer/get'
export default function PaidAds({condition,cntName,top}) {
  let [screenWidth, setScreenWidth] = useState(0)
  let [items, setItems] = useState([])

  useEffect(() => {
    let width = window.innerWidth;
    setScreenWidth(width)
}, [])
  useEffect(() => {
    // try {
    //   async function getData() {
    //     let result = await GetFilteredAds(condition)
    //     setItems(result)
    //   }
    //   getData()
    // } catch (error) {
    //   console.log(error)
    // }

}, []) 
    // let navigate = useNavigate()
    

  
  return (
    <>
      
      <div className="buyer-flash-ads" style={{display: 'flex', flexDirection: 'column', borderRadius: '2.5px', height: 'auto', marginBottom: top, position: 'relative', width: screenWidth > 760 ?'calc(100% - 320px)' : '100%', float: 'right', padding: '8px', marginRight: screenWidth > 760 ? '20px' : '0px', background: '#f9f9f9'}}>
        <div style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', borderRadius: '2.5px', width: '100%', color: '#FF4500', background: '#fff', margin: '0 0 10px 0'}}>
          <div style={{float: 'left', color: '#FF4500', fontFamily: 'roboto',}}><b>{cntName}</b></div>
        </div>

        <div style={{display: 'flex', overflow: 'auto'}}>
          {
            !items?.length > 0
            ?
            ''
            :
            items.map((item, index) => 
            
            <div className="cols" key={index} id={item.product_id} >
              <div className="card shadow-sm" onClick={e => window.location.href=(`/product/${item.product_id}`)} key={index} style={{height: 'auto', cursor: 'pointer', margin: ' 0 5px 5px 5px', width: '200px', borderRadius: '4px'}}>
                  
                  
                  
                <div style={{padding: '10px'}}>
                  <Thumbnail thumbnail_id={item.thumbnail_id} height={'100px'} />
                </div>

                <div className="card-body" style={{position: 'relative'}}>
                    
                    {
                        screenWidth > 479
                        ?
                        <small style={{
                          fontSize: 'x-small',
                          fontWeight: '500',
                          fontFamily: 'roboto',
                          maxHeight: '18px',
                          lineHeight: '18px',
                          color: '#000',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: '100%'
                      }} onClick={e => window.location.href=(`/product?product_id=${item.product_id}`)} >{item.title}</small>
                        : 
                        <small style={{
                          fontSize: 'small',
                          fontWeight: '500',
                          fontFamily: 'roboto',
                          maxHeight: '18px',
                          lineHeight: '18px',
                          color: '#000',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: '100%'
                      }} onClick={e => window.location.href=(`/product?product_id=${item.product_id}`)} >{item.title}</small>
                    }

                    {/* <br /> */}

                    {/* <hr  /> */}
                    
                    {
                      screenWidth > 479
                      ?
                      <h6 onClick={e => window.location.href=(`/product?product_id=${item.product_id}`)} style={{marginBottom: '10px', marginTop: '10px', fontWeight: '400', fontSize: 'small', color: '#000', fontFamily: 'roboto'}}>&#8358;{
                          new Intl.NumberFormat('en-us').format(item.price)
                      }</h6>
                      : 
                      <h6 onClick={e => window.location.href=(`/product?product_id=${item.product_id}`)} style={{marginBottom: '10px', fontWeight: '700', color: '#000'}}>&#8358;{new Intl.NumberFormat('en-us').format(item.price)}</h6>
                    }

                  
                </div>
              </div>
            </div> 
            )

          }
        </div>
          
      </div> 
    </>
  )
}

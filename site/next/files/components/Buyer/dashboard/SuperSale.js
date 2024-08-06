import { 
    useEffect,
    useState
} from 'react'

import Thumbnail from '../Thumbnail'
import Video from '../Video'

const SuperSale = ({item}) => {

    let [screenWidth, setScreenWidth] = useState(0)
    let [cardsSet, setcardsSet] = useState([])
   
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    }, [])
    

    useEffect(() => {
        console.log(item)
        if(item.length > 0){
            if(screenWidth < 480){
                setcardsSet(item.splice(0,3))
            }else if(screenWidth > 480 && screenWidth < 1000){
                setcardsSet(item.splice(0,4))
            }else if(screenWidth >= 1000 ){
                setcardsSet(item.splice(0,6))
            } 
        }else{
           
        }
    },[item,screenWidth])

    return ( 
        <> 
            
            <div className='buyer-showcase-cnt' style={{display: 'flex', flexShrink: '0', marginBottom: 0, flexWrap: 'nowrap', flexDirection: 'row', width: '100%', height: 'auto'}}>
          
                <div className="content" style={{padding: '2px 0 0 10px', width: '100%', background: '#fff'}}>
                    {
                        Array.isArray(cardsSet)
                        ?
                        cardsSet.map((data,index) => <Card item={data} index={index} />)
                        :
                        console.log(cardsSet)
                    }
                </div>
            </div>
        </>
    );
}
 
export default SuperSale;


const Card = ({item, index}) => {

   
    let [screenWidth, setScreenWidth] = useState(0)

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

    return ( 
        <> 
            
            <div className="cols"  key={index}>
                <div className="card" key={index} style={{height: 'auto', marginBottom: '10px', border: 'none', borderRadius: '0', padding: '5px', display: 'block'}}>
                      
                    <img loading='lazy' onClick={e => window.location.href=(`/product/`)} src={item.svg.src} style={{height: screenWidth > 480 ? '200px' : '120px', width: '100%', borderRadius: '2px', display: 'table', margin: '0 auto', borderRadius: '5px', position: 'relative'}} alt="" />

                    <div className="card-body" style={{position: 'relative', padding: '5px', height: 'auto'}}>
                        
                        {
                            screenWidth > 479
                            ?
                            <small style={{
                                display: 'block',
                                whiteSpace: 'nowrap',
                                fontSize: '.875rem',
                                fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                                height: 'auto',
                                textAlign: 'center',
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
                                textAlign: 'center',
                                height: 'auto',
                                color: '#000',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }} onClick={e => window.location.href=(`/product/${item.product_id}`)} >{item.title}</small>
                        }

                    </div>
                    
                </div>
            </div> 
        </>
     );
}
 
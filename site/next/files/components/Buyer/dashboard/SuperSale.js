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

   
    let [screenWidth, setScreenWidth] = useState(0);
    let [url, set_url] = useState('')

    function url_generator(item) {
        let category = item?.category;
        let type = item?.type;
        let filter = item?.filter;

        if(filter){
            set_url(`/category/${category}?filter=${filter.type}*${filter.value}`)
        }else{
            if(type !== ''){
                set_url(`/category/${category}?type=${type}`)
            }else{
                set_url(`/category/${category}`)
            }
        }
    }

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
        url_generator(item)
    }, [item])

    return ( 
        <> 
            
            <div className="cols"  key={index}>
                <div className="card" key={index} style={{height: 'auto', marginBottom: '10px', border: 'none', borderRadius: '5px', padding: '5px', display: 'block', background: '#fff'}}>
                      
                    <img loading='lazy' onClick={e => window.location.href=(url)} src={item.svg} style={{height: screenWidth > 480 ? '200px' : '120px', background: '#fff4e0', width: '100%', borderRadius: '2px', display: 'table', margin: '0 auto', borderRadius: '5px', position: 'relative'}} alt="" />

                    <div className="card-body" style={{position: 'relative', padding: '5px', height: 'auto'}}>
                        
                        {
                            screenWidth > 479
                            ?
                            <small style={{
                                display: 'block',
                                whiteSpace: 'nowrap',
                                fontSize: 'x-small',
                                fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                                height: 'auto',
                                textAlign: 'center',
                                color: '#000',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }} onClick={e => window.location.href=(url)} >{item.type}</small>
                            : 
                            <small style={{
                                display: 'block',
                                fontSize: 'x-small',
                                whiteSpace: 'nowrap',
                                fontWeight: '500',
                                fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                                textAlign: 'center',
                                height: 'auto',
                                color: '#000',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }} onClick={e => window.location.href=(url)} >{item.type}</small>
                        }

                    </div>
                    
                </div>
            </div> 
        </>
     );
}
 
import img from '../../../assets/download (3).jpeg'
import deleteSvg from '../../../assets/delete-svgrepo-com (1).svg'
import { 
    useEffect, 
    useState 
} from 'react'
import emptySvg from '../../../assets/empty-white-box-svgrepo-com.svg'
import jsAgo from 'js-ago'
import imgSvg from '../../../assets/image-svgrepo-com (4).svg'; 
import js_ago from 'js-ago';
import Card from './Card';
import { 
    GetSavedItem 
} from '../../../api/buyer/get';
import BuyerLayout from '../../../layout/Buyer';
import FavouriteSummary from './FavouriteSummary';
import { Link } from 'react-router-dom'

const SavedItem = () => {   
    let [Items, setItems] = useState([])
    let [activeImg, setActiveImg] = useState(imgSvg)      

    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {setScreenWidth(window.innerWidth)},[]);
  
    useEffect(() => {
        // GetCart(window.localStorage.getItem('CE_buyer_id'))
        // .then((result) => {
        //     dispatch(setCartTo(result))
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
    
       try {
         async function fetchData() {
          let result = await GetSavedItem(window.localStorage.getItem('CE_buyer_id'))
          setItems(result)
          console.log('saved item: ',result)
         }
         fetchData()
       } catch (error) {
          console.log(error)
       }
    
      }, [])

    
   
    return ( 
        <>
            <BuyerLayout>
                <div className="buyer-savedItem" style={{display: 'flex', alignItems: 'flex-start', flexDirection: screenWidth > 760 ? 'row' : 'column', justifyContent: 'center', height: '100vh',width: '100%', backgroundColor: '#f9f9f9', margin: '0px', padding: '20px'}}>
                {
                    
                    Items?.length > 0
                    ?
                        <section style={{
                            height: 'calc(100vh - 100px)', 
                            width: '100%',
                            display: 'flex',
                            overflow: 'auto',
                            alignItems: 'flex-start',
                            padding: '5px',
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}> 
                            {
                                Items.map((item, index) => {
                                    return( <Card item={item} index={index} items={Items} activeImg={activeImg} /> )
                                })
                            }
                        </section>
                        
                    :

                                    
                    <section style={{
                        height: 'calc(100vh - 100px)', 
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        <img src={emptySvg} style={{
                            height: '90px', 
                            width: '90px', 
                            position: 'relative',
                            
                            fontSize: 'medium',
                        }} alt="" />

                        <div style={{color: '#FF4500',fontFamily: 'sans-serif', fontWeight: '800'}}>You Have'nt Saved Any Item Yet</div>
                        <Link to={'/'} style={{color: 'orange',fontFamily: 'sans-serif', fontWeight: '500'}}>Click Here To Continue Shopping Your</Link>
                    </section>
                }
                    <FavouriteSummary Items={Items} />
                </div>
            </BuyerLayout>
        </>
     );
}


 
export default SavedItem;
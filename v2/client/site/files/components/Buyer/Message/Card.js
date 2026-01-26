import { 
    useDispatch, 
    useSelector 
} from 'react-redux'
import img from '@/public/eye-svgrepo-com (1).svg'
import locationSvg from '@/public/location-svgrepo-com-1.svg'
import { 
    useEffect,
    useState
} from 'react'
import conditionSvg from '@/public/condition-point-svgrepo-com.svg'
import timsSvg from '@/public/date-2-svgrepo-com.svg'
import js_ago from 'js-ago'
import { open_notice } from '@/files/reusable.js/notice'
import axios from 'axios';
import Thumbnail from '../Thumbnail'
import Video from '../Video'
// import { SaveItem } from '@/app/api/buyer/post'
// import { UnSaveItem } from '@/app/api/buyer/delete'
// import { GetOrders } from '@/app/api/buyer/get'

const Card = ({product_id}) => {

    const fetchProductDetails = () => {
        axios.get(`/api/store/products/details`, {params: {slug: product_id}})
        .then(res => {
            console.log(res.data)
            setItem(res.data.data)
        })
        .catch(err => {
            console.log(err)
            open_notice('Error fetching product details', 'error')
        })
    }

    let [screenWidth, setScreenWidth] = useState(0)
    let [item, setItem] = useState(false)

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
        fetchProductDetails()
    }, [])
    let { 
        savedItem
    } = useSelector(s => s.savedItem)
    let {
        buyer_info
    } = useSelector(s => s.buyer_info);



 
    return ( 
        <> 

            <div className="cols" id={item?.product_id} style={{width: '180px', height: 'auto', cursor: 'pointer'
            }} >
                <div className="card shadow-md" style={{height: 'auto', marginBottom: '10px', borderRadius: '4px'}}>
                    
                    
                    
                    {
                        
                        (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(item?.thumbnail_id?.split('.').pop().toLowerCase())) ? 
                        <Thumbnail height={'100px'} thumbnail_id={item?.thumbnail_id}/>
                        :
                        <Video height={'100px'} thumbnail_id={item?.thumbnail_id} />
                        
                        
                    }

                    <div className="card-body" style={{position: 'relative', padding: '10px'}}>
                        
                       <small 
                            className="d-block text-dark fw-medium font-sans-serif cursor-pointer"
                            style={{
                                fontSize: '0.875rem',
                                maxHeight: '36px',
                                lineHeight: '18px',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: '2',
                                overflow: 'hidden'
                            }}
                            onClick={() => window.open(`/store/product/${item?.product_id}`)}
                        >
                            {item?.title}
                        </small>
                      
                        
                        {
                            screenWidth > 479
                            ?
                            <h6 onClick={e => window.open(
                                `/store/product/${item?.product_id}`
                            )} style={{marginBottom: '10px', marginTop: '10px', fontWeight: 'bold', fontSize: 'small', color: 'green', fontFamily: 'sans-serif'}}>&#8358;{
                                new Intl.NumberFormat('en-us').format(item?.price)
                            }</h6>
                            : 
                            <h6 onClick={e => window.open(
                                `/store/product/${item?.product_id}`
                            )} style={{marginBottom: '10px', fontWeight: 'bold', color: 'green'}}>&#8358;{new Intl.NumberFormat('en-us').format(item?.price)}</h6>
                        }

                     
                        {/* <SaveButton data={item} Saver={Saver} isItemSaved={saved} /> */}

                    </div>

                </div>
            </div> 
        </>
     );
}
 
export default Card;



// npm install -g pm2
//     pm2 start npm --name "next-app" -- run start
//     pm2 save
//     pm2 startup
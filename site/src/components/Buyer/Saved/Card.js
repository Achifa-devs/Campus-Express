import img from '../../../assets/download (3).jpeg'
import deleteSvg from '../../../assets/delete-svgrepo-com (1).svg'
import { 
    useEffect,
    useState 
} from 'react'
import js_ago from 'js-ago';
import { 
    useDispatch, 
    useSelector 
} from 'react-redux';
import cartSvg from '../../../assets/cart-shopping-fast-svgrepo-com.svg'
import { 
    DeleteItemFromCart 
} from '../../../api/buyer/delete';
import { 
    setCartTo 
} from '../../../redux/buyer_store/Cart';
import { 
    AddItemToCart 
} from '../../../api/buyer/post';
import { GetSavedItem } from '../../../api/buyer/get';
import { setSaveTo } from '../../../redux/buyer_store/Save';
import Thumbnail from '../Thumbnail';
import { useNavigate } from 'react-router-dom';

const Card = ({activeImg,item,index}) => {
    let navigate = useNavigate()
    
    return ( 
        <>
             <div key={index} onClick={e => navigate(`/product/${item.saved_item[0].product_id}`)} className="buyer-savedItem-card shadow-sm" style={{width: '100%',borderRadius: '5px'}}>
                <div>
                    <Thumbnail product_id={item.saved_item[0].product_id}/>
                </div>
                <button style={{width: 'auto', height: 'auto',padding: '5px'}}>
                    <img style={{width: '20px', height: '20px'}} src={deleteSvg} alt="" />
                </button>

                <div className="buyer-savedItem-body">

                    
                    <div className='buyer-item-title' style={{width: 'auto'}}>
                        <p style={{fontWeight: '500', fontSize: 'medium'}}>{item.saved_item ? item.saved_item[0].title : ''}</p> 
                    </div>

                    


                    <div className="buyer-item-price">
                        <span style={{fontWeight: '500', fontSize: 'medium'}}>&#8358;{item.saved_item ?  new Intl.NumberFormat('en-us').format(item.saved_item[0].price) : ''} </span>
                    </div> 

                    {/* <div className='buyer-item-seller'>
                        <span style={{fontWeight: '500', fontSize: 'medium'}}>Seller: {item.seller.fname} {item.seller.lname}</span>
                    </div> */}

                    {/* <div className="buyer-items-btn">
                    
                    </div> */}
                </div>
            </div>
        </>
     );
}
 
export default Card;
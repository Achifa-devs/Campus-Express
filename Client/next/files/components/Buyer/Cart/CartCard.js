import { 
    useDispatch, 
    useSelector
} from "react-redux";
import { 
    useEffect, 
    useState 
} from "react";
import imgSvg from '../../../assets/image-svgrepo-com (4).svg'; 

import { 
    isBuyerLoggedIn 
} from "../LoggedIn"; 
import { 
    useNavigate 
} from "react-router-dom";
// import { 
//     GetProductThumbnail 
// } from "@/app/api/buyer/get";
// import { 
//     UpdateCartUnit 
// } from "@/app/api/buyer/update";
// import { DeleteItemFromCart } from "@/app/api/buyer/delete";
import { setCartTo } from "@/redux/buyer_store/Cart";
// import { GetProductThumbnail } from "@/app/api/buyer/get";
import Thumbnail from "../Thumbnail";
import axios from "axios";
import { buyer_overlay_setup } from "@/files/reusable.js/overlay-setup";
import { open_notice } from "@/files/reusable.js/notice";

const Card = ({item,index,unit,getTotalPrice}) => {

    let dispatch = useDispatch()
    let {Cart} = useSelector(s => s.Cart)
    



    function RmFromCart(e) {
        e.target.disabled = true;
        try {
            cartHandler(e);
           
        } catch (error) {
            console.log(error)
        }
    }

    function cartHandler (e) {
        buyer_overlay_setup(true, 'Processing')
        let id = Cart.filter(d => d.product_id === item.product_id)[0].cart_id
        axios.post('/api/store/cart/delete', {
            cart_id: id
        }).then((response) => {
            buyer_overlay_setup(false, '...')
            e.target.disabled = true;
            if(response.data.success){
                getTotalPrice(); 
                dispatch(setCartTo(Cart.filter(d => d.cart_id !== id)))
                open_notice(true, "Item was  deleted from cart successfully")
            }else{
                open_notice(true, "Item was not deleted from cart due to error")
            }
        }).catch(err => {
            console.log(err);
            e.target.disabled = true;
            buyer_overlay_setup(false, '...')
            open_notice(true, "Item was not deleted from cart due to error")
        })
    }


    function updateHandler (type) {
        buyer_overlay_setup(true, 'Processing')
        let id = Cart.filter(d => d.product_id === item.product_id)[0].cart_id
        axios.post(`/api/store/cart/update`, {
            cart_id: id,
            type
        }).then((response) => {
            buyer_overlay_setup(false, '...')

            if(response.data.success){
                dispatch(setCartTo(
                    Cart.map(item =>
                        item.cart_id === id
                        ? { ...item, unit: type === 'add' ? parseInt(item.unit)+1 : parseInt(item.unit)-1}
                        : item
                    )
                ))
                open_notice(true, "Item was  deleted from cart successfully")
            }else{
                open_notice(true, "Item was not deleted from cart due to error")
            }
        }).catch(err => {
            console.log(err);
            buyer_overlay_setup(false, '...')
            open_notice(true, "Item was not deleted from cart due to error")
        })
    }

    useEffect(() => {
       getTotalPrice(); 
    }, [Cart])
  
    return ( 
        <>
            <div key={index} className="buyer-cart-card shadow-sm">
                <div className='thumbnail-cnt'>
                    <Thumbnail  thumbnail_id={item?.thumbnail_id} height={'100%'} />
                </div> 
                <button  className="buyer-cart-remove-btn" style={{background: 'orangered'}} onClick={e => RmFromCart(e)}>
                    Remove
                </button>

                <div className="buyer-cart-body">

                    <div className='buyer-item-title' style={{fontWeight: '500', fontSize: 'medium'}}>
                        <p>{item.title}</p>
                    </div>

                    <div className="buyer-item-price"> 
                        <span style={{fontWeight: 'bold'}}>&#8358;{new Intl.NumberFormat('en-us').format(item.price)} </span>
                    </div>

                    <div className="buyer-item-units">
                        <span>{item.stock} units Available</span>
                    </div>

                    <div className="buyer-item-spec">
                        
                    </div>

                    <div className="buyer-items-stock" data-price={item.price}>
                        <button onClick={e => updateHandler('reduce')} data-id={item.product_id} disabled={unit.unit < 2 ? true : false}>-</button>

                        <div id={`ce${item.product_id}`}>
                            {item.unit}
                        </div>

                        <button onClick={e => updateHandler('add')} disabled={unit.unit == item.stock ? true : false}>+</button>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Card;
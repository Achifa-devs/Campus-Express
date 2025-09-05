import { 
    useDispatch 
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
} from "next/link";
import Thumbnail from "./Thumbnail";
// import { 
//     GetProductThumbnail 
// } from "@/app/api/buyer/get";
import { 
    UpdateCartUnit 
} from "@/app/api/buyer/update";
import { DeleteItemFromCart } from "@/app/api/buyer/delete";
import { setCartTo } from "@/redux/buyer_store/Cart";
import { GetProductThumbnail } from "@/app/api/buyer/get";

const Card = ({item,index,unit,getTotalPrice, product_id}) => {

    // let [isLoggedIn, setIsLoggedIn] = useState(false)
    // useEffect(() => {
    //     setIsLoggedIn(isBuyerLoggedIn)
    // },[])
    let dispatch = useDispatch()

    function UpdateCart(type,item) {
        let oldUnit = unit.filter(data => data.product_id === item.item.product_id)[0].unit;
                    
                   
        
        function Handler(params) {
            try {
                let result = UpdateCartUnit(type,window.localStorage.getItem('CE_user_id'),item.item.product_id)
                if(type === 'add'){
                    let oldUnit = unit.filter(data => data.product_id === item.item.product_id)[0].unit;
                    
                    if(oldUnit < JSON.parse(item.item.others).stock){
                        //unit.filter(data => data.product_id === item.item.product_id).item.unit = oldUnit + 1;
        
                        document.querySelector(`#ce${item.item.product_id}`).innerHTML = unit.filter(data => data.product_id === item.item.product_id)[0].unit = oldUnit + 1;
                        getTotalPrice()
                    }
        
                }else{
                    let oldUnit = unit.filter(data => data.product_id === item.item.product_id)[0].unit;
        
                    if(oldUnit > 1){
                        //unit.filter(data => data.product_id === item.item.product_id).item.unit = oldUnit + 1;
                        document.querySelector(`#ce${item.item.product_id}`).innerHTML = unit.filter(data => data.product_id === item.item.product_id)[0].unit = oldUnit - 1;
                        getTotalPrice()
                    }
                    
                }
            } catch (error) {
                console.log(error)
            }
        }

        if(type === 'add'){
            if(oldUnit < JSON.parse(item.item.others).stock){
                Handler()
            }
        }else{
            if(oldUnit > 1){
                Handler()
            }
        }
 
    }

    function AddToCart(e,product_id) {
        e.target.disabled = true;

        try {
            let result = DeleteItemFromCart(product_id, window.localStorage.getItem('CE_user_id'))
            dispatch(setCartTo(result))
            e.target.disabled = false;
            e.target.parentElement.remove()
            getTotalPrice(); 
        } catch (error) {
            console.log(error)
        }
    }

    let [img, set_img] = useState(imgSvg);
  
    useEffect(() => {
        try {
            let result = GetProductThumbnail(item.product_id)
            set_img(result.file)
        } catch (error) {
            console.log(error)
        }
    },[])

    return ( 
        <>
            <div key={index} className="buyer-cart-card shadow-sm">
                <Thumbnail product_id={product_id} />
                <button  className="buyer-cart-remove-btn" style={{background: 'orangered'}} onClick={e => AddToCart(e,item.item.product_id)}>
                    Remove
                </button>

                <div className="buyer-cart-body">

                    <div className='buyer-item-title' style={{fontWeight: '500', fontSize: 'medium'}}>
                        <p>{item.item.title}</p>
                    </div>

                    <div style={{fontWeight: '500', fontSize: 'small'}} className='buyer-item-seller'>
                        <span>Seller: Jason.N.N</span>
                    </div>

                    <div className="buyer-item-price"> 
                        <span style={{fontWeight: 'bold'}}>&#8358;{new Intl.NumberFormat('en-us').format(item.item.price)} </span>
                    </div>

                    <div className="buyer-item-units">
                        <span>{JSON.parse(item.item.others).stock} units Available</span>
                    </div>

                    <div className="buyer-item-spec">
                        
                    </div>

                    <div className="buyer-items-stock" data-price={item.item.price}>
                        <button onClick={e => UpdateCart('minus',item)} data-id={item.item.product_id} disabled={unit < 2 ? true : false}>-</button>

                        <div id={`ce${item.item.product_id}`}>
                            {item.cart.unit}
                        </div>

                        <button onClick={e => UpdateCart('add',item)} disabled={JSON.parse(item.item.others).stock > 1 && unit.filter(data => data.product_id === item.item.product_id)[0].unit <= JSON.parse(item.item.others).stock ? false : true}>+</button>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Card;
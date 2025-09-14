import img from '../../../assets/download (3).jpeg'
import deleteSvg from '../../../assets/delete-svgrepo-com (1).svg'
import { 
    useEffect, useState 
} from 'react'
import jsAgo from 'js-ago'
import imgSvg from '../../../assets/image-svgrepo-com (4).svg'; 
import { 
    useDispatch, useSelector 
} from 'react-redux';
// import { 
//     setCartTo 
// } from '../../../redux/buyer_store/Cart';
// import { 
//     useNavigate 
// } from 'react-router-dom';
import Card from './CartCard';
import Btn from './Btn';
import { GetCartItems } from '@/app/api/buyer/get';


const Cart = () => { 
    let [Items, setItems] = useState([])
    let [unit, setUnit] = useState([])
    let [url, setUrl] = useState('')
    let [subTotal, setSubTotal] = useState('0.00')

    function getTotalPrice() {
        let list = [...document.querySelectorAll(".buyer-items-stock")];
        let values = []
        list.map((item) => values.push(parseInt(item.children[1].innerHTML) * parseInt(item.dataset.price)))
        let total = sum(values, values.length)
        setSubTotal(total)
        console.log(list)
    }
    function sum(arr, n)
    {
        // base or terminating condition
        if (n <= 0) {
        return 0;
        }
    
        // Calling method recursively
        return sum(arr, n-1 ) + arr[n-1];
    }
    useEffect(() => {
        
        try {
            let result = GetCartItems(window.localStorage.getItem('CE_user_id'))

            if(result){
                setItems(result);
                let prices = []
                let unitList = []

                result.map((item) => prices.push(parseInt(item.item.price)))
                result.forEach((product) => unitList.push({product_id: product.item.product_id, unit: parseInt(product.cart.unit)}))
                setUnit(unitList)
                let s = sum(prices, prices.length);
                setSubTotal(s)
            }
        } catch (error) {
            console.log(error)
        }
        
        
    }, [])

    // function StockChange(type,item) {
    //     if(type === 'add'){
    //         let oldUnit = unit.filter(data => data.product_id === item[0].product_id)[0].unit;
            
    //         if(oldUnit < item[0].stock){
    //             //unit.filter(data => data.product_id === item[0].product_id)[0].unit = oldUnit + 1;

    //             document.querySelector(`#ce${item[0].product_id}`).innerHTML = unit.filter(data => data.product_id === item[0].product_id)[0].unit = oldUnit + 1;
    //             getTotalPrice()
    //         }

    //     }else{
    //         let oldUnit = unit.filter(data => data.product_id === item[0].product_id)[0].unit;

    //         if(oldUnit > 1){
    //             //unit.filter(data => data.product_id === item[0].product_id)[0].unit = oldUnit + 1;
    //             document.querySelector(`#ce${item[0].product_id}`).innerHTML = unit.filter(data => data.product_id === item[0].product_id)[0].unit = oldUnit - 1;
    //             getTotalPrice()
    //         }
            
    //     }
    // }
    
    let [screenWidth, setScreenWidth] = useState(0)

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

   useEffect(() => {
        getTotalPrice();
        let id = [];
        let list = [...document.querySelectorAll(".buyer-items-stock")]
        list.map((item) => id.push(item.children[0].dataset.id));
        setUrl(btoa(id.join('-')))
        console.log(btoa(id.join('-')))
   },[unit])
    
    return ( 
        <>
            <div className="buyer-cart">
               {
                Items?.map((item, index) => {
                    return(
                        <Card product_id={item.item.product_id} unit={unit} getTotalPrice={getTotalPrice} item={item} index={index} />
                    )
                })
               }
            </div>

            {
                screenWidth > 659
                
                ?

                    <div className="buyer-cart-checkout">
                        <div style={{borderBottom: '1px solid #eeeeee'}}>
                                <span>Cart Summary</span>
                        </div>

                        <div>
                                <small style={{float: 'left'}}>Sub total</small>
                                <small style={{float: 'right'}}><small>&#8358;</small>{new Intl.NumberFormat('en-us').format(subTotal)}</small>
                        </div>

                        <div style={{fontSize: 'small'}}>
                                <small>Delivery is free</small>
                        </div>
                        <div style={{height: '80px'}}>
                                <Btn url={url} subTotal={subTotal} />
                        </div>
                    </div>
                :
                <>
                    <div style={{position: 'fixed', bottom: '0', padding: '20px', left: '0', width: '100%'}}>
                        <Btn url={url} subTotal={subTotal} />
                    </div>
                </>
                

            }
        </>
    );
}


 
export default Cart;
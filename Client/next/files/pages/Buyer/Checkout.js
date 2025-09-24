import { 
    useLocation 
} from "react-router-dom";
import CheckoutSummary from "../../components/Buyer/Checkout/CheckoutSummary";
import CustomerAddress from "../../components/Buyer/Checkout/CustomerAddress";
import DeliveryData from "../../components/Buyer/Checkout/DeliveryData";
import PaymentMethod from "../../components/Buyer/Checkout/PaymentMethod";
import BuyerLayout from "../../layout/Buyer";
import { 
    useEffect, 
    useState 
} from "react";
import { 
    GetBuyer, 
    GetItem, 
    GetOrder
} from "../../api/buyer/get";
import Flw from "../../components/Payments/Flw";
import { useSelector } from "react-redux";

const CheckOut = () => {
    
    let location = useLocation()
    let {buyerData}=useSelector(s=>s.buyerData)

    let [screenWidth, setScreenWidth] = useState(0);
    let [order_list, set_order_list] = useState('');
    let [payment, setPayMent] = useState(<Flw buyer={buyerData} price={order_list?.product?.price} product_id={location.pathname.split('/').splice(-1)[0]}  />)

    useEffect(() => {setScreenWidth(window.innerWidth)},[]);
    useEffect(() => {
        let overlay = document.querySelector('.overlay'); 
        overlay.setAttribute('id', 'overlay');

        GetOrder(buyerData?.user_id,location.pathname.split('/').splice(-1)[0])
        .then((result) => {
            // console.log(result)
            if(result){
                set_order_list(result[0]);
                overlay.removeAttribute('id');
            }
        })
        .catch((err) => {
            console.log(err);
            overlay.removeAttribute('id');
        })
    }, [buyerData]) 

   
    // function set_up_payment_source(data) {if(data === 'wallet'){setPayMent(<CEStack price={Total} product_id={product_id}  />); set_type(data)}else{setPayMent(<PayStack buyer={buyer} price={Total} product_id={product_id} />); set_type(data)}}

   
    return ( 
        <> 
            <BuyerLayout>

                <div style={{display: 'flex', alignItems: 'flex-start', flexDirection: screenWidth > 760 ? 'row' : 'column', justifyContent: 'space-around', height: '100vh',width: '100%', backgroundColor: '#f9f9f9'}}>
                    <div className="buyer-checkout" style={{overflow: 'auto', height: 'calc(100% - 60px)'}}>
                        <CustomerAddress buyerData={buyerData} />
                        <DeliveryData order_list={order_list}  />
                        <PaymentMethod />
                    </div>
                    <CheckoutSummary order_list={order_list} Method={payment} type={'purchase'} price={order_list?.product?.price} buyerData={buyerData} />
                </div>

            
            </BuyerLayout>

        </>
     );
}
 
export default CheckOut;
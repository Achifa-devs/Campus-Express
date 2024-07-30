import Cart from "../../components/Buyer/Cart/Cart";
import { ErrorBoundary } from "react-error-boundary";
import BuyerLayout from "../../layout/Buyer";
const CartPage = () => {
    return ( 
        <>
            <BuyerLayout fallback={<div>Something went wrong</div>}>
                <div className="buyer-cart-cnt" style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around', background: '#f9f9f9'}}>
                    <Cart />      
                </div> 
            </BuyerLayout>
        </>
     );
} 
 
export default CartPage;
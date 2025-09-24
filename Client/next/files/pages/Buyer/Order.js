import { useEffect, useState } from "react";
import OrderSummary from "../../components/Buyer/Order/OrderSummary";
import Orders from "../../components/Buyer/Order/Orders";
import BuyerLayout from "../../layout/Buyer";

const Order = () => {
    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {setScreenWidth(window.innerWidth)},[]);
    return ( 
        <>
            <BuyerLayout>
                <div style={{display: 'flex', alignItems: 'flex-start', flexDirection: screenWidth > 760 ? 'row' : 'column', justifyContent: 'space-around', height: '100vh',width: '100%', backgroundColor: '#f9f9f9'}}>
                    <Orders />
                    <OrderSummary />
                </div>
            </BuyerLayout>
        </>
     );
}
 
export default Order;
import Wallets from "../../components/Buyer/Wallet/Wallet";
import BuyerLayout from "../../layout/Buyer";
import '../../styles/Seller/overlays.css';

const Wallet = () => {
    return ( 
        <>
            <BuyerLayout>
                <Wallets />
            </BuyerLayout>
        </>
     );
}
 
export default Wallet;
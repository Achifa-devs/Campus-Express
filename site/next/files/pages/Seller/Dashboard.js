import '../../styles/Seller/xx-large-screen.css'
import '../../styles/Seller/x-large-screen.css'
import '../../styles/Seller/large-screen.css'
import '../../styles/Seller/medium-screen.css'
import '../../styles/Seller/small-screen.css'
import Home from "../../components/Seller/Dashboard/Home";
import SellerLayout from '../../layout/Seller'

const SellerDashboard = () => {
    return ( 
        <>
            
            <div className="seller-main">
                <SellerLayout >
                    <Home />
                </SellerLayout>
            </div>
        </>
     );
}
 
export default SellerDashboard;
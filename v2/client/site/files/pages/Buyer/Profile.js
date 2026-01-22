import '../../styles/Seller/x-large-screen.css'
import '../../styles/Seller/large-screen.css'
import '../../styles/Seller/medium-screen.css'
import '../../styles/Seller/small-screen.css'
import TopView from "../../components/Buyer/Profile/TopView";
import Body from "../../components/Buyer/Profile/Body";
import BuyerLayout from '../../layout/Buyer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const Me = () => {
    let {buyerData} = useSelector(s=> s.buyerData);

    let [userData, setUserData] = useState()

    useEffect(() => {
        console.log(buyerData)
        setUserData(buyerData)
      }, [buyerData])
    return ( 
        <>
            <BuyerLayout>
                <div className="buyer-main">
                    <div className="seller-profile-cnt" style={{height: '100%'}}>

                        <TopView userData={userData} />
                        <Body userData={userData} />
                        
                    </div>

                </div>
            </BuyerLayout>
        </>
     );
}
 
export default Me;
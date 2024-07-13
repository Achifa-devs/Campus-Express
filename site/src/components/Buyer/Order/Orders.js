import { 
    useEffect, 
    useState 
} from "react";
import Card from "./Card";
import { 
    GetOrders,
    GetSavedItem 
} from "../../../api/buyer/get";
import { 
    useSelector 
} from "react-redux";
import emptySvg from '../../../assets/empty-white-box-svgrepo-com.svg'
import { 
    Link 
} from "react-router-dom";


const Orders = () => {

    let {
        buyerData
    }=useSelector(s=>s.buyerData)
    
    let [order_list, set_order_list] = useState([])

    useEffect(() => {
        GetOrders(buyerData?.buyer_id)
        .then((result) => {
            console.log(result)
            set_order_list(result)
        })
        .catch((err) => console.log(err))
    }, [buyerData]) 
   
    return ( 
        <>
            <div className="seller-order-cnt" style={{background: '#f9f9f9', height: 'auto', margin: '0', overflow: 'hidden'}}>


                {
                    order_list?.length >0
                    ?
                    order_list.map((item, index) => 
                    
                        <Card index={index} item={item}  />
                    )
                    :
                    <section style={{
                        height: 'calc(100vh - 100px)', 
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        <img src={emptySvg} style={{
                            height: '90px', 
                            width: '90px', 
                            position: 'relative',
                            
                            fontSize: 'medium',
                        }} alt="" />

                        <div style={{color: '#FF4500',fontFamily: 'sans-serif', fontWeight: '800'}}>You Have'nt Ordered Any Item Yet</div>
                        <Link to={'/'} style={{color: 'orange',fontFamily: 'sans-serif', fontWeight: '500'}}>Click Here To Continue Shopping Your</Link>
                    </section>
                }
            </div>
        </>
     );
}
 
export default Orders;
"use client"
import OrderItem from "@/files/components/Buyer/Order/OrderItem";
import OrderSummary from "@/files/components/Buyer/Order/OrderSummary";
import { useEffect, useState } from "react";
import database from '@/database/seller_shop.json'
import '@/app/orders/styles/xx-large.css'

const Order = () => {
    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {setScreenWidth(window.innerWidth)},[]);
    let [items, setItems] = useState([])

    function GetData(){

        let data = database.filter(item => item).splice(0,10);
        setItems(data)
    }
    // .catch(error=>{
    //     console.log(error)
    // })
    useEffect(() => {
        GetData()

    },[])
    return ( 
        <>
            <div className='order-card'>
      
                <div className="order-card-aside">
                    <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', fontSize: 'medium', width: '100%', background: '#fff', fontWeight: '500', display: 'flex', alignItems: 'center', fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue'"}}>My Campus Express Account</h6>

                    <OrderSummary />
                </div>
                <div className="order-card-cnt">
                <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center'}}>Order List</h6>

                    {
                    items.map((item,index) => <OrderItem key={index} item={item}/> )
                    }
                </div>

                
            </div>
        </>
     );
}
 
export default Order;
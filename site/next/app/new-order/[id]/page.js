"use client"

import React, 
{ 
    useEffect, 
    useState 
} from 'react'
import { 
    useSelector 
} from 'react-redux';
import OrderedItem from '@/files/components/Buyer/NewOreder/OrderedItem';
import BuyerAddress from '@/files/components/Buyer/NewOreder/BuyerAddress';
import DeliveryAddress from '@/files/components/Buyer/NewOreder/DeliveryAddress';
import NewOrderSummary from '@/files/components/Buyer/NewOreder/NewOrderSummary';
import { 
    GetItem 
} from '@/app/api/buyer/get';
import { 
    openNotice
} from '@/files/reusable.js/notice';
import { 
    usePathname 
} from 'next/navigation';
import Carousel from '@/files/components/Buyer/dashboard/Carousel';
import '@/app/new-order/styles/xx-large.css'

export default function NewOrder() {
    let pathname = usePathname()
    let {buyerData}=useSelector(s=>s.buyerData)

    let [screenWidth, setScreenWidth] = useState(0);
    let [item, setItem] = useState('');

    useEffect(() => {setScreenWidth(window.innerWidth)},[]);

    function fetchData(overlay) {
        GetItem([pathname.split('/').splice(-1)[0]])
        .then((result) => {
            setItem(result[0])
            console.log(result)
            overlay.removeAttribute('id')
        })
        .catch(error=>{
            console.log(error)
            openNotice('Error Occured Please Wait While We Reload...')
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        })
    }

    useEffect(() => {
        
        try {
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            fetchData(overlay)
        } catch (error) {
            console.log(error)
            
        }


    }, [])

  return (
    <>
        <div className='new-order-card'>
            <div className="new-order-card-cnt">
                <OrderedItem item={item}/>
                <BuyerAddress />
                <br />
                <DeliveryAddress item={item} />
                {/* <PaymentMethod /> */}
                <section style={{marginBottom: 10}}> 
                    <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#fff', borderBottom: '1px solid #f9f9f9'}}>
                        <div style={{float: 'left', color: '#5f5f5f', fontFamily: 'sans-serif',}}><b>You May Also Like This </b></div>
                    </div>
                    <div style={{display: 'flex'}}>
                        <Carousel category={item.category}/>
                    </div>
                </section>
            </div>

            <div className="new-order-card-aside">
                <NewOrderSummary buyerData={buyerData} item={item} />
            </div>

            
        </div>
       
    </>
  )
} 

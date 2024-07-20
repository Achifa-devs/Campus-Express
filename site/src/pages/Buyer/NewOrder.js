import React, { useEffect, useState } from 'react'
import BuyerLayout from '../../layout/Buyer'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutSummary from '../../components/Buyer/Checkout/CheckoutSummary';
import OrderedItem from '../components/Buyer/NewOreder/OrderedItem';
import BuyerAddress from '../components/Buyer/NewOreder/BuyerAddress';
import DeliveryAddress from '../components/Buyer/NewOreder/DeliveryAddress';
import PaymentMethod from '../components/Buyer/NewOreder/PaymentMethod';
import { GetItem } from '../../api/buyer/get';
import { openNotice } from '../../Functions/notice';
import NewOrderSummary from '../components/Buyer/NewOreder/NewOrderSummary';

export default function NewOrder() {
    let location = useLocation()
    let {buyerData}=useSelector(s=>s.buyerData)

    let [screenWidth, setScreenWidth] = useState(0);
    let [item, setItem] = useState('');

    useEffect(() => {setScreenWidth(window.innerWidth)},[]);

    function fetchData(overlay) {
        GetItem([location.pathname.split('/').splice(-1)[0]])
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
      <BuyerLayout>
        <div style={{display: 'flex', alignItems: 'flex-start', flexDirection: screenWidth > 760 ? 'row' : 'column', justifyContent: 'space-around', height: '100vh',width: '100%', backgroundColor: '#f9f9f9'}}>
            <div className="buyer-checkout" style={{overflow: 'auto', height: 'calc(100% - 60px)'}}>
                <OrderedItem item={item}/>
                <BuyerAddress />
                <DeliveryAddress item={item} />
                <PaymentMethod />
            </div>
            <NewOrderSummary buyerData={buyerData} item={item} />
        </div>
      </BuyerLayout>
    </>
  )
} 

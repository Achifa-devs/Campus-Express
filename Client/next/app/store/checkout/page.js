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
import DeliveryAddress from '@/files/components/Buyer/NewOreder/DeliveryAddress';
import NewOrderSummary from '@/files/components/Buyer/NewOreder/NewOrderSummary';

import { 
    usePathname 
} from 'next/navigation';
import Carousel from '@/files/components/Buyer/dashboard/Carousel';
import '@/app/store/checkout/styles/xx-large.css'
import '@/app/store/checkout/styles/x-large.css'
import '@/app/store/checkout/styles/large.css'
import '@/app/store/checkout/styles/medium.css'
import '@/app/store/checkout/styles/small.css'
import { uuid } from 'uuidv4';

export default function NewOrder() {
    let pathname = usePathname();

    const {
        buyer_info
    } = useSelector(s => s.buyer_info)
    let {
        Cart
    }=useSelector(s=>s.Cart);
    let [deliveryOpt, setdeliveryOpt] = useState(-1);
    let [screenWidth, setScreenWidth] = useState(0);
    let [item, setItem] = useState([]);
    let [order_id, set_order_id] = useState('');

    useEffect(() => {
        if (buyer_info) {
            let searchParams = new URLSearchParams(window.location.search);
            let params = searchParams.get('single');
            let order_id = uuid(10);
            set_order_id(order_id);
            if(params === 'false'){
               setItem(Cart);
            }else{
                let path = pathname.split('/').splice(-1)[0];
                let pathList = path.split('-');
                pathList.map((item) => {
                    getOrders(item);
                })
            }
        }
    }, [pathname, buyer_info, Cart]);

    function updateDeliveryOpt(data) {
        setdeliveryOpt(data)
    }
   
    useEffect(() => {setScreenWidth(window.innerWidth)},[]);

    const getOrders = (id) => {
        
        try {
            let overlay = document.querySelector('.overlay');
            overlay.setAttribute('id', 'overlay');

            fetch(`/api/store/products/details?slug=${id}`, {
                headers: {
                    'Gender': window.localStorage.getItem('cs-gender') 
                }
            })
            .then(async(res) => {
                overlay.removeAttribute('id')
                
                let response = await res.json();

                if (response.success) {
                    console.log(response.data)
                    setItem(prevItem => [...prevItem, response?.data])
            } else {
                    // updateReq ? updateReq(false): ''
                }
            })
            .catch(err =>{
                
                console.log(err)
                // updateReq ? updateReq(false): ''

            });
            
        } catch (error) {
            console.log(error)
            
        }

    }

  return (
    <>
        <div className='new-order-card'> 
            <div className="new-order-card-cnt">
                <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center'}}>New Orders ({item.length})</h6>

                <>
                    <OrderedItem data={item} />
                    <DeliveryAddress item={item[0]} updateDeliveryOpt={updateDeliveryOpt} />
                    {/* <PaymentMethod /> */}
                    <section style={{marginBottom: 10}}>
                        <div className="header" style={{height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', position: 'relative', width: '100%', background: '#fff', borderBottom: '1px solid #f9f9f9'}}>
                            <div style={{float: 'left', color: '#5f5f5f', fontFamily: 'sans-serif',}}><b>You May Also Like This </b></div>
                        </div>
                        <div style={{display: 'flex'}}>
                            {
                                item
                                ?
                                <Carousel category={btoa(item?.category)} product_id={item?.product_id} />
                                :
                                ''
                            }
                        </div>
                    </section>
                </>
                
            </div>

            <div className="new-order-card-aside">
                <NewOrderSummary  deliveryOpt={deliveryOpt} item={item} />
            </div>

            
        </div>
       
    </>
  )
} 

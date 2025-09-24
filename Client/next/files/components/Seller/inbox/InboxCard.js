import { useNavigate } from 'react-router-dom';
import img from '../../../assets/download (3).jpeg'
import { useState } from 'react';

const InboxCard = ({inboxList}) => {
    let navigate = useNavigate()
    let [loaderText, setLoaderText] = useState('Loading...')

    return ( 
        <>
            <div className="seller-inbox-cnt">
                <ul>
                    {
                        inboxList.map((item,index) => {
                            return(
                                <li className="seller-inbox-card shadow-sm">

                                    <section className="top">
                                        <div className="seller-inbox-date"><small>2 days ago</small></div>

                                        <button onClick={e => navigate('/seller/orders')} style={{width: '80px', height: '40px', position: 'absolute', top: '10px', right: '10px', padding: '5px'}}><small>See details</small></button>

                                        <br />

                                        <div className="seller-inbox-status"><b>Pickup is ready</b></div>


                                        <div className="seller-inbox-message">
                                            <h6><small>Your order 1937723362 has been confirmed and is expected to be delivered between 26-Sep-2023 and 28-Sep-2023. Thank you for shopping on Jumia!</small></h6>
                                        </div>
                                    </section>
                                    <br />

                                    <section className="btm">
                                        <img src={img} alt="" />

                                        <div className="seller-inbox-product-card-body">
                                            <p style={{
                                                fontWeight: '500',
                                                overflow: 'hidden',
                                                color: '#000',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: '3',
                                                WebkitBoxOrient: 'vertical',
                                            }}>
                                                Wireless Bluetooth Keyboard For Phone And Tablet-VSC
                                            </p>
                                        </div>
                                    </section>



                                </li>
                            )
                        })

                    }
                </ul>
            </div>
        </>
     );
}
 
export default InboxCard;
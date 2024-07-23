import ellipsisSvg from '../../../assets/ellipsis-svgrepo-com.svg'
import js_ago from 'js-ago' 
import Thumbnail from '../Thumbnail';
import { useEffect, useState } from 'react';
import deleteSvg from '../../../assets/delete-svgrepo-com (1).svg'
const Card = ({index, item}) => {
    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)},[]);
    return ( 
        <>
            <div className="seller-order-card shadow-sm" style={{position: 'relative', height: 'fit-content', display: 'flex', background: '#fff', margin: '5px 0 5px 0', borderRadius: '10px'}}>
                <div style={{height: '100%', width: screenWidth > 760 ? '20%' : '40%', borderRadius: '5px', display: 'table', margin: '0 auto'}}>
                
                    <Thumbnail product_id={item.product.product_id} />
                    <button onClick={e => window.location.href=(`/checkout/${item.product.product_id}`)} className='shadow-sm' style={{height: 'auto',display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 10px 5px 10px', textAlign: 'center', background: '#fff', color: '#FF4500', fontSize: 'small', margin: '5px 0 0 0', color: '#fff', background: '#FF4500', width: '100%'}}>
                        <span>
                            <img src={deleteSvg} style={{height: '25px', width: '25px'}} alt="" />
                        </span>
                        <span>
                            Delete
                        </span>
                    </button>
                </div>

                <div style={{position: 'absolute', top: '5px', right: '5px', padding: '4px'}}>
                    <img src={ellipsisSvg} style={{height: '10px', width: '10px'}} alt="..." />
                </div>
                
                <div className="seller-order-body" style={{width: 'calc(80%)', position: 'relative'}}>
                    {/* <img src={deleteSvg}alt="" /> */}

                    <div className="seller-order-title" style={{display: 'flex', width: '80%', fontSize: 'medium', height: '40%', alignItems: 'center', fontWeight: '500'}}>
                    <p style={{
                            whiteSpace: 'nowrap', /* Prevent text from wrapping */
                            overflow: 'hidden',    /* Hide any overflow text */
                            textOverflow: 'ellipsis'
                        }}>{item.product.title}</p>
                    </div>
                    <div className="seller-order-id" style={{display: 'flex', height: '40px', alignItems: 'flex-start'}}>
                        <h3 style={{fontWeight: '500', fontSize: 'small'}}>&#8358;{
                                new Intl.NumberFormat('en-us').format(item.product.price)}</h3>
                    </div>
                    <div className="seller-order-id" style={{display: 'flex', height: '40px', alignItems: 'flex-start'}}>
                        <p style={{fontWeight: '500', fontSize: 'small'}}>Order-code: {item.order.order_id}</p>
                    </div>
{/* <hr /> */}
                    <div className="seller-order-status" style={{background: '#fff', color: '#FF4500'}}>
                        {item.order.status.state}
                    </div>
                    <button onClick={e => window.location.href=(`/checkout/${item.product.product_id}`)} className='shadow-sm' style={{position: 'absolute', top: '4px', right: '4px', height: 'auto', width: 'auto', display: 'flex', alignItems: 'center', justifyContents: 'center', padding: '10px', textAlign: 'center', background: '#fff', color: '#FF4500', fontSize: 'small', float: 'right', color: '#fff', background: '#FF4500', fontSize: screenWidth > 760 ? 'medium' : 'x-small'}}>{
                        item.order.havePaid
                        ?
                        'View Progress'
                        :
                        'Pay for this item'
                    }</button>

                    <div className="seller-order-date" style={{bottom: '5px'}}>
                        {js_ago(new Date(item.order.date))}
                    </div>

                </div>
            
            </div>
        </>
     );
}
 
export default Card;
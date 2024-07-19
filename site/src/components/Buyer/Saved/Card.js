import img from '../../../assets/download (3).jpeg'
import deleteSvg from '../../../assets/delete-svgrepo-com (1).svg'
import { 
    useEffect,
    useState 
} from 'react'
import ellipsisSvg from '../../../assets/ellipsis-svgrepo-com.svg'

import js_ago from 'js-ago';
import { GetSavedItem } from '../../../api/buyer/get';
import { setSaveTo } from '../../../redux/buyer_store/Save';
import Thumbnail from '../Thumbnail';
import { useNavigate } from 'react-router-dom';

const Card = ({activeImg,item,index}) => {
    let navigate = useNavigate()
    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)},[]); 
    return ( 
        <>
             <div className="seller-order-card shadow-sm" style={{position: 'relative', display: 'flex', background: '#fff', margin: '5px 0 5px 0', borderRadius: '10px'}}>
                <div style={{height: '100%', width: screenWidth > 760 ? '20%' : '20%', borderRadius: '5px', display: 'table', margin: '0 auto'}}>
                    <Thumbnail product_id={item?.saved_item[0]?.product_id} />
                </div>

               
                <div className="seller-order-body" style={{width: 'calc(80%)', position: 'relative'}}>
                    {/* <img src={deleteSvg}alt="" /> */}

                    <div className="seller-order-title" style={{display: 'flex', width: '80%', fontSize: 'medium', height: '40%', alignItems: 'center', fontWeight: '500'}}>
                        <p style={{
                            whiteSpace: 'nowrap', /* Prevent text from wrapping */
                            overflow: 'hidden',    /* Hide any overflow text */
                            textOverflow: 'ellipsis'
                        }}>{item.saved_item[0].title}</p>
                    </div>
                    <div className="seller-order-id" style={{display: 'flex', height: '40px', alignItems: 'flex-start'}}>
                        <h3 style={{fontWeight: '500', fontSize: 'small'}}>&#8358;{
                                new Intl.NumberFormat('en-us').format(item.saved_item[0].price)}</h3>
                    </div>
                   
{/* <hr /> */}
                    {/* <div className="seller-order-status" style={{background: '#fff', color: '#FF4500'}}>
                        {item.savedItem.status.state}
                    </div> */}
                    

                    <div className="seller-order-date" style={{bottom: '5px', fontWeight: '400', fontSize: 'small'}}>
                        {item?js_ago(new Date(item?.saved_item[0]?.date)):''}
                    </div>

                </div>
            
                <button onClick={e => ''} className='shadow-sm' style={{position: 'absolute', top: '10px', right: '10px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', textAlign: 'center', fontSize: 'small', color: '#fff', background: '#FF4500', width: '30px'}}>
                    <img src={deleteSvg} style={{height: '100%', width: '100%', position: 'relative'}} alt="" />
                </button>
            </div>
        </>
     );
}
 
export default Card;
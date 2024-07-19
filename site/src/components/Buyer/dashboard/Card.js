import { 
    useDispatch, 
    useSelector 
} from 'react-redux'
import img from '../../../assets/eye-svgrepo-com (1).svg'
import locationSvg from '../../../assets/location-svgrepo-com-1.svg'
import { 
    useEffect,
    useState
} from 'react'

import orderSvg from '../../../assets/order-completed-svgrepo-com.svg'
import Thumbnail from '../Thumbnail'
import conditionSvg from '../../../assets/condition-point-svgrepo-com.svg'
import { 
    setSaveTo 
} from '../../../redux/buyer_store/Save'
import timsSvg from '../../../assets/date-2-svgrepo-com.svg'
import { UnSaveItem } from '../../../api/buyer/delete'
import { SaveItem } from '../../../api/buyer/post'
import SaveButton from './SaveButton'
import js_ago from 'js-ago'
import { GetOrders, GetSavedItem } from '../../../api/buyer/get'
import { openNotice } from '../../../Functions/notice'
import { useLocation } from 'react-router-dom'

const Card = ({item, index}) => {

    let BtnStyles = {
        height: '35px',
        width: '100%',
        borderRadius: '5px',
        outline: 'none',
        // padding: '0',
        border: 'none',
        float: 'left',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 'small',
        fontWeight: '500',
        backgroundColor: 'orangered',
        margin: '0'
    }
    let dispatch = useDispatch()
    let location = useLocation()
    let [screenWidth, setScreenWidth] = useState(0)
    let [btnMode, setBtnMode] = useState(true)
    let [saved,setSaved] = useState(false)
    let [order_list, set_order_list] = useState([])

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])
    let { 
        savedItem
    } = useSelector(s => s.savedItem)
    let {
        buyerData
    } = useSelector(s => s.buyerData)



    async function Saver(e,product_id) {  
        if(buyerData !== null){ 
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            setBtnMode(btnMode) 
            // let saveList = savedItem;
           
            let duplicateSearch = savedItem.filter(data=> (data.saved_item[0].product_id === product_id))
            // console.log('savedItem: ', savedItem.length > 0, savedItem)

            if(savedItem.length > 0){
                console.log('duplicateSearch: ', duplicateSearch.length > 0)

                if(duplicateSearch.length > 0){
    
                    let result = await UnSaveItem(product_id, window.localStorage.getItem('CE_buyer_id'));
                    setBtnMode(!btnMode) 
                    overlay.removeAttribute('id')
                    dispatch(setSaveTo(result))
                    openNotice('Item Was Successfuly Unsaved')
    
                }else{
                    
                    let result = await SaveItem(product_id, window.localStorage.getItem('CE_buyer_id'))
                    setBtnMode(!btnMode) 
                    overlay.removeAttribute('id')
                    dispatch(setSaveTo(result))
                    openNotice('Item Was Successfuly Saved')
    
                }
            }else{
    
                let result = await SaveItem(product_id, window.localStorage.getItem('CE_buyer_id'))
                setBtnMode(!btnMode) 
                overlay.removeAttribute('id')
                dispatch(setSaveTo(result))
                openNotice('Item Was Successfuly Saved')

            }
        }
    }

    useEffect(() => {
        if(savedItem){
            let result = savedItem.filter(data=> (data.saved_item[0].product_id === item.product_id)).length > 0 ? true : false
            setSaved(result);
        }
    }, [savedItem])

  

    useEffect(() => {
        if(buyerData){
            GetOrders(buyerData?.buyer_id)
            .then((result) => {
                console.log(result)
                if(result){
                    set_order_list(result)
                }
            })
            .catch((err) => console.log(err))
        }
    }, [buyerData]) 
 
    return ( 
        <> 
            
            <div className="cols" key={index} id={item.product_id} >
                <div className="card shadow-sm" key={index} style={{height: 'auto', marginBottom: '10px', borderRadius: '10px'}}>
                    
                    
                    
                   {
                    item
                    ?
                    <Thumbnail product_id={item.product_id} />
                    :
                    ''
                   }

                    <div className="card-body" style={{position: 'relative'}}>
                        
                        {
                            screenWidth > 479
                            ?
                            <small style={{
                                fontSize: 'small',
                                fontWeight: '500',
                                fontFamily: 'sans-serif',
                                maxHeight: '36px',
                                lineHeight: '18px',
                                color: '#000',
                                display: 'webkitBox',
                                
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: '2',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }} onClick={e => window.location.href=(`/product?product_id=${item.product_id}`)} >{item.title}</small>
                            : 
                            <small style={{
                                fontSize: 'small',
                                fontWeight: '500',
                                fontFamily: 'sans-serif',
                                maxHeight: '36px',
                                lineHeight: '18px',
                                color: '#000',

                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: '2',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }} onClick={e => window.location.href=(`/product?product_id=${item.product_id}`)} >{item.title}</small>
                        }

                      
                        
                        {
                            screenWidth > 479
                            ?
                            <h6 onClick={e => window.location.href=(`/product?product_id=${item.product_id}`)} style={{marginBottom: '10px', marginTop: '10px', fontWeight: '400', fontSize: 'small', color: '#000', fontFamily: 'sans-serif'}}>&#8358;{
                                new Intl.NumberFormat('en-us').format(item.price)
                            }</h6>
                            : 
                            <h6 onClick={e => window.location.href=(`/product?product_id=${item.product_id}`)} style={{marginBottom: '10px', fontWeight: '700', color: '#000'}}>&#8358;{new Intl.NumberFormat('en-us').format(item.price)}</h6>
                        }

                        <div onClick={e => window.location.href=(`/product?product_id=${item.product_id}`)} style={{display: 'flex',background: '#fff', color: 'orangered',  alignItems: 'center', justifyContent: 'left', padding: '0'}}>
                            <span  style={{background: '#fff', color: '#000', borderRadius: '5px', top: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', left: '20px', padding: '5px 0 5px 0'}}>
                                <span  style={{background: '#fff',color: 'orangered', padding: '0'}}>

                                    <img src={conditionSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />

                                </span>
                                &nbsp;

                                <span  style={{background: '#fff',color: 'rgb(98, 98, 98)', padding: '0',  fontSize: 'x-small', fontWeight: '500'}}> 
                                    {JSON.parse(item.others)?.condition}
                                </span>
                            </span>
                            
                        </div>

                        <SaveButton data={item} Saver={Saver} isItemSaved={saved} />

                    </div>

                    
                    {/*<br />*/} 

                    

                    <span  style={{background: '#fff',display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'left', position: 'relative',color: '#000', borderRadius: '5px', padding: '2.5px', zIndex: '1000', padding: '0 5px 0 5px', overflow: 'hidden'}}>
                        <span  style={{background: '#fff',color: 'orangered', padding: '0'}}>
                            <img src={locationSvg} style={{height: screenWidth  > 480 ? '15px' : '12px', width: screenWidth  > 480 ? '20px' : '12px', marginBottom: '5px'}} alt="" />

                        </span>

                        &nbsp;
                        {/* &nbsp; */}

                        <span  style={{background: '#fff', color: '#FF4500', padding: '0',  fontSize: screenWidth > 480 ? 'x-small' : 'xx-small', fontWeight: '500', overflow: 'hidden', height: '15px'}}> 
                            {JSON.parse(item.others)?.locale}
                        </span>
                    </span>

                    

                    <div className="" style={{height: 'fit-content', display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', padding: '0 5px 0 5px', margin: '10px 0 0 0'}}>
                       <div style={{
                         display: 'flex', justifyContent: 'left', width: '50%', alignItems: 'center',
                       }}>
                            <img src={img} style={{height: '15px', width: '15px', borderRadius: '10px'}} alt="" />
                            &nbsp;
                            <div style={{height: 'fit-content', width: 'fit-content', fontWeight: '400', fontSize: 'x-small'}} > {item.views} views</div>
                       </div>

                        <div style={{color: '#626262', fontSize: 'x-small', fontWeight: '500', height: '30px', display: 'flex', justifyContent: 'left', flexWrap: 'nowrap', width: '50%', alignItems: 'center'}}>
                            <span>
                                <img src={timsSvg} style={{height: '15px', width: '15px', marginBottom: '3px'}} alt="" />
                            </span>
                            &nbsp;
                            &nbsp;
                            <span style={{fontSize: 'x-small'}}>
                                {
                                    js_ago(new Date(item.date))
                                }
                            </span>
                        </div>
                    </div>

                    <button style={BtnStyles} onClick={e => {
                        order_list.filter((data) => data.product.product_id === item.product_id && data.order.buyer_id === buyerData.buyer_id).length > 0
                        ?
                        window.location.href = `/checkout/${item.product_id}`
                        :
                        window.location.href = `/new-order/${item.product_id}`

                    }}>

                        <span>
                            <img src={orderSvg} style={{height: '20px', width: '20px', position: 'relative', borderRadius: '2.5px',marginRight: '5px'}} alt="" />
                        </span>

                        &nbsp;
                        &nbsp;
                        <span style={{fontSize: 'x-small', background: '#FF4500'}}>{
                            order_list.filter((data) => data?.product?.product_id === item?.product_id && data?.order?.buyer_id === buyerData?.buyer_id)?.length > 0
                            ?

                            'View Order'
                            :
                            'Place Order Now'
                        }</span>
                    </button>

                </div>
            </div> 
        </>
     );
}
 
export default Card;
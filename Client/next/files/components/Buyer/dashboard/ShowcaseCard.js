import { 
    useDispatch, 
    useSelector 
} from 'react-redux'
import img from '@/public/eye-svgrepo-com (1).svg'
import locationSvg from '@/public/location-svgrepo-com-1.svg'
import { 
    useEffect,
    useState
} from 'react'

import orderSvg from '@/public/order-completed-svgrepo-com.svg'
import Thumbnail from '../Thumbnail'
import conditionSvg from '@/public/condition-point-svgrepo-com.svg'
import timsSvg from '@/public/date-2-svgrepo-com.svg'
import SaveButton from './SaveButton'
import js_ago from 'js-ago'
import { useLocation } from 'react-router-dom'
import Video from '../Video'

const ShowcaseCard = ({item, index}) => {

    useEffect(() => {
        setScreenWidth(window.innerWidth)
    },[])
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
    let [screenWidth, setScreenWidth] = useState(0)
    let [btnMode, setBtnMode] = useState(true)
    let [saved,setSaved] = useState(false)
    let [order_list, set_order_list] = useState([])

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
        console.log(orderSvg)
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
    
                    // let result = await UnSaveItem(product_id, window.localStorage.getItem('CE_user_id'));
                    // setBtnMode(!btnMode) 
                    // overlay.removeAttribute('id')
                    // dispatch(setSaveTo(result))
                    // openNotice('Item Was Successfuly Unsaved')
    
                }else{
                    
                    // let result = await SaveItem(product_id, window.localStorage.getItem('CE_user_id'))
                    // setBtnMode(!btnMode) 
                    // overlay.removeAttribute('id')
                    // dispatch(setSaveTo(result))
                    // openNotice('Item Was Successfuly Saved')
    
                }
            }else{
    
                // let result = await SaveItem(product_id, window.localStorage.getItem('CE_user_id'))
                // setBtnMode(!btnMode) 
                // overlay.removeAttribute('id')
                // dispatch(setSaveTo(result))
                // openNotice('Item Was Successfuly Saved')

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
            // GetOrders(buyerData?.user_id)
            // .then((result) => {
            //     console.log(result)
            //     if(result){
            //         set_order_list(result)
            //     }
            // })
            // .catch((err) => console.log(err))
        }
    }, [buyerData]) 
 
    return ( 
        <> 
            
            <div className="cols" key={index} id={item.product_id} >
                <div className="card" key={index} style={{marginBottom: '10px', border: 'none', borderRadius: '0', padding: '5px', display: 'flex', flexDirection: 'column', flexShrink: '0'}}>
                      
                    {
                        item.category === 'Lodge & Apartments'
                        ?
                        <Video product_id={item.product_id} folder={item.title} />
                        :
                        <Thumbnail thumbnail_id={item.thumbnail_id} height={screenWidth > 480 ? '150px' : '100px'} />
                    }

                    <div className="card-body" style={{position: 'relative', padding: '5px', height: '50px'}}>
                        
                        {
                            screenWidth > 479
                            ?
                            <small style={{
                                display: 'block',
                                whiteSpace: 'nowrap',
                                fontSize: '.875rem',
                                fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                                height: '18px',
                                color: '#000',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }} onClick={e => window.location.href=(`/product/${item.product_id}`)} >{item.title}</small>
                            : 
                            <small style={{
                                display: 'block',
                                fontSize: '.875rem',
                                whiteSpace: 'nowrap',
                                fontWeight: '500',
                                fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                                height: '18px',
                                color: '#000',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }} onClick={e => window.location.href=(`/product/${item.product_id}`)} >{item.title}</small>
                        }

                      
                        
                        {
                            screenWidth > 479
                            ?
                            <h6 onClick={e => window.location.href=(`/product/${item.product_id}`)} style={{marginBottom: '10px', marginTop: '10px', fontWeight: '500', fontSize: 'small', color: '#000', fontFamily: 'sans-serif'}}>&#8358;{
                                new Intl.NumberFormat('en-us').format(item.price)
                            }</h6>
                            : 
                            <h6 onClick={e => window.location.href=(`/product/${item.product_id}`)} style={{marginBottom: '10px', fontWeight: '500', color: '#000'}}>&#8358;{new Intl.NumberFormat('en-us').format(item.price)}</h6>
                        }

                    </div>
                    
                </div>
            </div> 
        </>
     );
}
 
export default ShowcaseCard;
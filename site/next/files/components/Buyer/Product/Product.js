import cartSvg from '../../../assets/cart-shopping-fast-svgrepo-com.svg'
import { 
    useEffect, 
    useState 
} from 'react'

import { 
    useDispatch, 
    useSelector 
} from 'react-redux'
import phn from '../../../assets/phone-rounded-svgrepo-com.svg'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import imgSvg from '../../../assets/image-svgrepo-com (4).svg'; 
import ItemImgs from './ItemImgs'
import Share from './Share'
import StarRating from '@/files/reusable.js/star';
import SaveButton from '../dashboard/SaveButton'
import { UnSaveItem } from '@/app/api/buyer/delete'
import { setSaveTo } from '@/redux/buyer_store/Save'
import { SaveItem } from '@/app/api/buyer/post'
import { open_notice } from '@/files/reusable.js/notice'
import Contact from './Contact'
import { Link } from 'react-router-dom'



const Product = ({ item, seller, order_list }) => {
    
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


    let {
        buyer_id
    } = useSelector(s => s.buyer_id);
    let { 
        savedItem
    } = useSelector(s => s.savedItem)
    let {
        buyer_info
    } = useSelector(s => s.buyer_info);
    let [saved, setSaved] = useState(false)
    let [searchParams, setsearchParams] = useState({})
    let dispatch = useDispatch()
    let [btnMode, setBtnMode] = useState(true)
    let {ItemImages} = useSelector(s => s.itemImages)
    let {ActiveImg} = useSelector(s => s.ActiveImg)

    let [metaImg, setMetaImg] = useState('')
    let [activeImg, setActiveImg] = useState(imgSvg)
    let [screenWidth, setScreenWidth] = useState(0)

 

    useEffect(() => {setMetaImg(ItemImages[0])}, [])
    useEffect(() => {setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg].secure_url : imgSvg)}, [ItemImages])
    useEffect(() => {setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg].secure_url : imgSvg)},[])
    useEffect(() => {setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg].secure_url : imgSvg)},[ActiveImg])
   
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams?.get('product_id')) {
            setActiveImg('')
        }
    }, [searchParams])
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)}, [])

    const [rating, setRating] = useState(3);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        // Perform any additional actions on rating change
        console.log('New Rating:', newRating);
    };

    

    async function handleOrder(id) {
        // window.location.href=(`/new-order/${id.trim()}`)

        let result = order_list.filter((data) => data?.product?.product_id === item?.product_id && data?.order?.buyer_id === buyer_id)?.length
        if(result<1){
            if(buyer_id === null || buyer_id === '' || buyer_id === 'null'){
                window.location.href=(`/login`)
                
            }else{
                
                

                window.location.href=(`/new-order/${item.product_id}`)

            }
        }else{
            window.location.href=(`/checkout/${item.product_id}`)
        }

    }


    return ( 
        <>
           
            <div className="overlay">
                <div className="loader">
                </div>
            </div>

            <div className="buyer-product-data">
                <div id="left">
                    {
                        
                        activeImg !== '' && !activeImg.src
                        ?
                            <div className="img-cnt" style={{ backgroundImage: `url(${activeImg})`, borderRadius: '5px', backgroundRepeat: 'no-repeat', backgroundSize: '350px 350px', backgroundPosition: 'center' }}>
                                {
                                    (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(activeImg?.split('.').pop().toLowerCase())) ? 
                                    <img src={activeImg} style={{height: '100%', width: '100%', borderRadius: '5px'}} alt="" loading="lazy" />

                                    :
                                    <video src={activeImg} controls style={{width: '100%', borderRadius: '2px', height: '100%'}}></video>

                                }
                            </div>
                        :
                            <img src={activeImg?.src} style={{height: '100%', width: '100%', borderRadius: '5px'}} alt="" />
                    } 
                    {
                        item 
                        ?
                        <ItemImgs category={item?.category} product_id={item?.product_id} title={item?.title} />
                        :
                        ''
                    }
                </div>

                <div id="right" style={{position: 'relative'}}>

                    <div style={{borderBottom: '1px solid #696969'}}>
                        <div style={{fontSize: '3vh', marginBottom: '10px'}}>{item?.title}</div>
                        <div style={{fontSize: '13px', marginBottom: '10px'}}>
                            Category: <span style={{color: 'blue'}}>{item?.category}</span> | <span style={{color: 'blue'}}>Similar products from {item?.category}</span>
                        </div>
                    </div>

                    {   
                        item ?

                        <div style={{background: '#fff', padding: '10px',    color: 'orangered', fontWeight: '500', position: 'relative', borderRadius: '5px', height: 'fit-content'}}>
                            
                            <p style={{fontWeight: '700', margin: '0', padding: '10px 0', fontSize: '3.5vh', color: '#000'}}>
                                <small>&#8358;</small>{new Intl.NumberFormat('en-us').format(item?.price)}
                            </p>


                            <h3 style={{ fontSize: 'small', fontWeight: 'bold', textDecoration: 'underline', padding: '0px', textTransform: 'capitalize', color: '#FF4500', marginBottom: '10px'}}>{item?.stock} units availble</h3>
                            <br />

                            <div style={{color: '#000', fontSize: 'smalll'}}>+ Shipping fee: from ₦{new Intl.NumberFormat('en-us').format(JSON.parse(item?.shipping_range)?.in_campus?.price)} ({seller?.campus})</div>

                            <div style={{ padding: '20px 0px', textAlign: 'left' }}>
                                <StarRating
                                    rating={rating}
                                    changeRating={handleRatingChange}
                                />
                            </div>

                            

                            

                            {/* <p>+ shipping from ₦0 to AWKA TOWN</p>  */}
                        </div>
                        :
                        <>
                            <div style={{padding: '10px'}}>
                                <Skeleton height={60}baseColor="#efefef" highlightColor="#f9f9f9" count={1} />
                                <Skeleton height={15}baseColor="#efefef" highlightColor="#f9f9f9" count={3} />
                                <Skeleton height={15}baseColor="#efefef" highlightColor="#f9f9f9" count={3} />
                            </div>

                        </>
                    }

                    {/* <hr /> */}
                    {/* <br /> */}

                    {/* <div style={BtnStyles} onClick={e => {
                        document.querySelector('.buy_now_overlay').setAttribute('id', 'buy_now_overlay')
                    }}>
                        Buy Now
                    </div> */}

                    {/* <SaveButton data={item} Saver={Saver} isItemSaved={saved} /> */}

                    <br />

                    

                    {
                        screenWidth > 481
                        ?
                        <>
                            {/* <Contact phone={phone}   /> */}
                            <button style={{borderRadius: '2.5px',border: 'none', outline: 'none', width: '100%'}} className='shadow' onClick={e=>handleOrder(item.product_id)}>
                                {
                                    order_list?.filter((data) => data?.product?.product_id === item?.product_id && data?.order?.buyer_id === buyer_id).length > 0
                                    ?

                                    'View Order'
                                    :
                                    'Place Order Now'
                                }
                                {/* <Link to={`tel:+234${phone}`} style={{height: '50px', width: '45%', borderRadius: '5px', display: 'flex', alignItems: 'center', cursor: 'pointer', justifyContent: 'space-evenly', fontSize: 'x-small', background: 'orangered', color: '#fff'}}>
                                    {
                                        
                                        <>
                                            <span>
                                                <img src={phn} style={{height: '25px', width: '25px', position: 'relative',  margin: 'auto'}} alt="" />
                                            </span>
                                            <span style={{marginTop: '0'}}>
                                                Call
                                            </span>
                                        </>  
                    
                                        
                                    }
                                </Link> */}
                            </button>

                            <br />

                            

                           
                        </>
                        :
                        ''
                        
                    }
                    


                    <Share activeImg={activeImg} item={item} url={`https://www.campusexpressng.com/product/${item?.product_id}`} metaImg={metaImg} />

                </div>
            </div>

        </>
     );
}
 
export default Product;
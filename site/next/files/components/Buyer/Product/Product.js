import cartSvg from '../../../assets/cart-shopping-fast-svgrepo-com.svg'
import { 
    useEffect, 
    useState 
} from 'react'

import { 
    useDispatch, 
    useSelector 
} from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import imgSvg from '../../../assets/image-svgrepo-com (4).svg'; 
import ItemImgs from './ItemImgs'
import Share from './Share'
import StarRating from '@/files/reusable.js/star';



const Product = ({item,phone,order_list}) => {
    const searchParams = new URLSearchParams(window.location.search);

    let {ItemImages} = useSelector(s => s.itemImages)
    let {ActiveImg} = useSelector(s => s.ActiveImg)
    let {buyerData} = useSelector(s => s.buyerData)

    let [metaImg, setMetaImg] = useState('')
    let [activeImg, setActiveImg] = useState(imgSvg)
    let [screenWidth, setScreenWidth] = useState(0)
    let [locale, setLocale] = useState([]);

    useEffect(() => {setMetaImg(ItemImages[0])}, [])
    useEffect(() => {setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg] : imgSvg)}, [ItemImages])
    useEffect(() => {setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg] : imgSvg)},[])
    useEffect(() => {setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg] : imgSvg)},[ActiveImg])
    useEffect(() => {setActiveImg('')}, [searchParams.get('product_id')])
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)}, [])

    const [rating, setRating] = useState(3);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        // Perform any additional actions on rating change
        console.log('New Rating:', newRating);
    };

    async function handleOrder() {
        let result = order_list.filter((data) => data.product.product_id === item.product_id && data.order.buyer_id === buyerData.buyer_id).length
        if(result<1){
            let buyer = window.localStorage.getItem('CE_buyer_id');
            if(buyer === null || buyer === '' || buyer === 'null'){
                window.location.href=(`/login`)
                
            }else{
                
                // let channels = pickup_channel.includes((item) => {
                //     if(item.channel === 'Custom Location Pickup'){

                //     }
                //     (item.channel === 'Door Step Delivery')
                // })
                // let response = await CreateOrder(buyer,item.product_id,item.price,pickup_channel)
                // if(response){
                //     window.location.href=(`/checkout/${item.product_id}`)
                // }

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
                        activeImg !== ''
                        ?
                            <div className="img-cnt" style={{backgroundImage: `url(${activeImg})`, borderRadius: '5px', backgroundRepeat: 'no-repeat', backgroundSize: '350px 350px', backgroundPosition: 'center'}}>
                            </div>
                        :
                            <img src={imgSvg} style={{height: '100%', width: '100%', borderRadius: '5px'}} alt="" />
                    }
                    {
                        item 
                        ?
                        <ItemImgs product_id={item.product_id} title={item.title} />
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


                            <h3 style={{ fontSize: 'small', fontWeight: 'lighter', textDecoration: 'underline', padding: '0px', textTransform: 'capitalize', color: '#FF4500', marginBottom: '10px'}}>{item?.stock} units availble</h3>
                            <br />

                            <div style={{color: '#000', fontSize: 'smalll'}}>+ shipping from ₦ 600 to AWKA TOWN</div>

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
                                <Skeleton height={60}baseColor="#fff4e0" highlightColor="#FF4500" count={1} />
                                <Skeleton height={15}baseColor="#fff4e0" highlightColor="#FF4500" count={3} />
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

                    {/* <div style={BtnStyles} onClick={e => {
                        document.querySelector('.buy_now_overlay').setAttribute('id', 'buy_now_overlay')
                    }}>
                        <>
                            <span>
                                <img src={saveSvg} style={{height: '35px', width: '35px', position: 'relative',  margin: 'auto'}} alt="" />
                            </span>
                            <span style={{marginTop: '0'}}>
                                {[...Save].filter(savedItem => savedItem?.product_id === item?.product_id)[0] ? 'Unsave' : 'Save'}
                            </span>
                        </>
                    </div> */}

                    <br />
                    {
                        screenWidth > 481
                        ?
                        <>
                            {/* <Contact phone={phone} SendMssg={SendMssg}  /> */}
                            <button style={{borderRadius: '2.5px'}} className='shadow' onClick={handleOrder}>
                                {
                                    order_list.filter((data) => data.product.product_id === item.product_id && data.order.buyer_id === buyerData.buyer_id).length > 0
                                    ?

                                    'View Order'
                                    :
                                    'Place Order Now'
                                }
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
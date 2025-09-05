import { useLocation, useNavigate } from "next/link";
import Product from "../../components/Buyer/Product/Product";
import BuyerLayout from "../../layout/Buyer";
import { useEffect, useRef, useState } from "react";
import SimilarItems from "../../components/Buyer/Product/SimilarItems";
import Description from "../../components/Buyer/Product/Description";
import { GetItem, GetOrders } from "../../api/buyer/get";
import { GetSeller } from "../../api/seller/get";
import { AddView, CreateOrder, LogBuyerIn, RegisterBuyer, UploadChat } from "../../api/buyer/post";
import { v4 as uuid } from "uuid";
import Contact from "../../components/Buyer/Product/Contact";
// import Share from "../../components/Buyer/Product/Share";
import { useSelector } from "react-redux";
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import { openNotice } from "../../reusable.js/notice";
import { useFlutterwave } from "flutterwave-react-v3";
// import BuyerLogin from "../../Authorization/Buyer.js/Login";
import { 
    data, 
    school_choices 
} from '../../location';
import Aside from "../../components/Buyer/Product/Aside";
const ProductPage = () => {


    let location = useLocation();
    let navigate = useNavigate();

    

    let {ItemImages} = useSelector(s => s.itemImages);
    let {ActiveImg} = useSelector(s => s.ActiveImg);
    let {pickup_channel} = useSelector(s=>s.pickup_channel)
    let {buyerData} = useSelector(s => s.buyerData);

    let [screenWidth, setScreenWidth] = useState(0);
    let [activeImg, setActiveImg] = useState(imgSvg);
    let [item, setItem] = useState();
    let [phone, set_phone] = useState(1);
    let [order_list, set_order_list] = useState([]);

    const searchParams = new URLSearchParams(window.location.search);

    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)}, []);
    useEffect(() => {setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg] : imgSvg)}, [ItemImages]);
    useEffect(() => {setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg] : imgSvg)}, [ActiveImg]);
    useEffect(() => {setActiveImg('')}, [searchParams.get('product_id')]);

    function fetchData(overlay) {
        GetItem([location.pathname.split('/').splice(-1)[0]])
        .then((result) => {
            setItem(result[0])
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

    useEffect(() => {
        try {
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            fetchData(overlay)
        } catch (error) {
            console.log(error)
            
        }

    }, [location])

    useEffect(() => {
        try {
            async function getData() {
                let result = await GetSeller(item?.user_id)
                set_phone(result?.phone)
                SaveHistory()
            }
            getData()
        } catch (error) {
            console.log(error)
        }
    },[item])

  
 
    async function AddNewViewer(product_id,user_id) {
        let result = await AddView(product_id, user_id)
        if(result?.length > 0){
            setItem(result[0])
        //    .removeAttribute('id');

        }
    }

    window.onload= (()=> {
        let user_id = window.localStorage.getItem("CE_user_id")
        if(user_id !== '' && user_id !== undefined && user_id !== null && user_id !== 'null'){
            try {
                setTimeout(() => {
                    AddNewViewer(item?.product_id,user_id)
                }, 3000); 
            } catch (error) {
                console.log(error)
            }
        }else{
            let user_id = window.localStorage.getItem("unknownBuyer")
            try {
                setTimeout(() => { 
                    AddNewViewer(item?.product_id,user_id)
                }, 3000);
            } catch (error) {
                console.log(error)
            }
        }
        
    })

    function SendMssg() {
        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
        if(screenWidth > 760){
            try {
                let result = UploadChat(window.localStorage.getItem('CE_user_id'), item.user_id)
                overlay.removeAttribute('id')
                navigate(`/buyer.message/${item.user_id}`, {user_id: item.user_id})
    
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                let result = UploadChat(window.localStorage.getItem('CE_user_id'), item.user_id)
                overlay.removeAttribute('id')
                navigate(`/buyer.room/${item.user_id}?room=''`, {user_id: item.user_id})
    
            } catch (error) {
                console.log(error)
            }
        }
      
    }

    const config = {
        public_key: 'FLWPUBK-502f1f73c8abf430f161a528241c198a-X',
        tx_ref: Date.now(),
        amount: parseInt(item?.price) + 45,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: buyerData?.email,
            phone_number: buyerData?.phone,
            name: buyerData?.name,
            ce_id: item?.user_id
        },
        customizations: {
        title: 'Campus Sphere',
        description: 'Campus Purchase',
        logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    async function handleOrder() {
        let result = order_list.filter((data) => data.product.product_id === item.product_id && data.order.user_id === buyerData.user_id).length
        if(result<1){
            let buyer = window.localStorage.getItem('CE_user_id');
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

    function SaveHistory() {
        let history = window.localStorage.getItem('campus_express_history');
        if(history !== '' && history !== undefined && history !== null && history !== 'null'){
            let result = JSON.parse(history)
            if(result.length>0) {
                let duplicateItems = result.filter(data => data?.product_id === item?.product_id)
                if(duplicateItems.length < 1){
                    window.localStorage.setItem('campus_express_history', JSON.stringify(JSON.parse(history).push({category: item?.category, product_id: item?.product_id})));
    
                }
            }
        }else{
            window.localStorage.setItem('campus_express_history', JSON.stringify([{category: item?.category, product_id: item?.product_id}]));
        }
    }

    useEffect(() => {
        GetOrders(buyerData?.user_id)
        .then((result) => {
            console.log(result)
            if(result){
                set_order_list(result)
            }
        })
        .catch((err) => console.log(err))
    }, [buyerData]) 
    
    return ( 
        <>
            <div className="overlay" style={{padding: '20px'}} onClick={e => {
                let overlay = document.querySelector('.overlay')

                if(e.target === overlay){
                    overlay.removeAttribute('id');
                }
            }}>
                
            </div>

            <div className="notice-cnt" style={{margin: 'auto'}}>
                <span style={{margin: "0 15px 0 .5px"}}></span>
                <button className="notice-cnt-btn" style={{width: '40px', height: '30px', background: 'red', borderRadius: '2px', fontWeight: '500', fontSize: 'small'}}>
                    close
                </button>
            </div>
            <BuyerLayout>
                <div className="buyer-product shadow-sm" style={{background: '#fff'}}>
                    <div className="buyer-product-cnt" style={{display: 'flex', flexDirection: 'column', width: screenWidth > 1001 ? 'calc(100% - 360px)' : '100%'}}>

                        
                        <Product order_list={order_list} item={item} phone={phone} />

                        {
                            screenWidth > 481
                            ?
                            ''
                            :
                            <>
                                {/* <Contact phone={phone} SendMssg={SendMssg}  />
                                <br /> */}
                                <button style={{marginBottom: '15px', background: '#FF4500', color: '#fff'}} onClick={handleOrder}>{
                                    order_list.filter((data) => data.product.product_id === item.product_id && data.order.user_id === buyerData.user_id).length > 0
                                    ?

                                    'View Order'
                                    :
                                    'Place Order Now'
                                }</button>
                            </>
                        }

                        {
                            item?.description?.length > 0 
                            ?
                            <Description item={item} />
                            :
                            ''
                        }

                        

                        
                        <br />

                        <section style={{fontWeight: '400', padding: '15px', background: '#fff4e0', }}>
                            
                            <small style={{fontSize: 'small', color: '#FF4500', lineHeight: '12px', borderRadius: '6px'}}>Payment Must Be Made Via Campus Sphere Platform To Avoid Fraud Else You Can <b>Trade With The Seller Outside The Platform At Your Own Risk.</b></small>
                        </section>

                        <br />

                        
                        <SimilarItems category={item?.category} product_id={item?.product_id} />


                        

                    </div>
                    <div className="buyer-product-aside-cnt shadow-sm" style={{width: screenWidth > 1001 ? '340px' : '100%', height: 'fit-content', background: '#fff'}}>
                        <Aside order_list={order_list} item={item} />
                    </div>
                </div>
            </BuyerLayout>
        </>
     );
}
 
export default ProductPage;



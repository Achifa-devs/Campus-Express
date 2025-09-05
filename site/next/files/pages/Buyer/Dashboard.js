import CardCnt from "../../components/Buyer/dashboard/CardCnt";
import '../../styles/Buyer/xx-large-screen.css'
import '../../styles/Buyer/x-large-screen.css'
import '../../styles/Buyer/medium-screen.css'
import '../../styles/Buyer/small-screen.css'
import '../../styles/Buyer/large-screen.css'
import sellSvg from '../../assets/sell-svgrepo-com.svg'

import '../../styles/Buyer/buy_now.css'
import '../../styles/filter.css'
import '../../styles/Buyer/semi-medium-screen.css'
import { useEffect, useId, useRef, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import BuyerLayout from '../../layout/Buyer'
import { 
    useLocation, 
    useNavigate 
} from "next/link";
import SearchOutput from "../../components/Buyer/Header/SearchOutput";
import { 
    Helmet 
} from "react-helmet-async";
import Ads from "../../components/Buyer/dashboard/Ads";
import mssg from '../../assets/messages-1-svgrepo-com (1).svg'
import { 
    Filter_Cards,
    NewVisitor 
} from "../../api/buyer/post";
import Card from "../../components/Buyer/dashboard/Card";
import { GetItems, GetSavedItem } from "../../api/buyer/get";
import Filterfilter from "../../components/Buyer/dashboard/FilterAside";
import { setSaveTo } from "../../redux/buyer_store/Save";
import { openNotice } from "../../reusable.js/notice";
import PaidAds from "../../components/Buyer/dashboard/PaidAds";
import FlashAds from "../../components/Buyer/dashboard/FlashAds";
 
const Dashboard = () => {

    let location = useLocation()
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let [cards, setCards] = useState([]);
    let {storedCategory} = useSelector(s => s.storedCategory);

    let [category, setcategory] = useState('')
    let [state, setstate] = useState('')
    let [limit, setlimit] = useState(30)
    let [items, setitems] = useState([])

    let [activeJSX, setActiveJSX] = useState(<CardCnt 
            ChangeCampus={ChangeCampus} 
            ChangeCondition={ChangeCondition} 
            ChangePrice={ChangePrice} 
            ChangeCategory={ChangeCategory} 
            ChangeState={ChangeState}
            ChangeSubCategory={ChangeSubCategory} 
            category={category}
            state={state} 
            applyFilter={applyFilter}
            cards={cards} 

        />)
    let [screenWidth, setScreenWidth] = useState(0)
    const [geoLocation, setGeoLocation] = useState({ lat: null, lng: null });
    const [city, setCity] = useState('');
    let reactId = useId();

   
    // let {Buyer} = useSelector(s=>s.Buyer)

    async function fetchData(overlay,category) {

        if(screenWidth > 999){
            setlimit(32)
        }else if(screenWidth > 761 && screenWidth < 1000){
            setlimit(30) 
        }else if(screenWidth < 659){
            setlimit(30)
        } 
        GetItems(category, limit)
        .then((result) => {
            if(result){
                setCards(
                    result?.map((item, index) => 
                        <Card index={index} item={item} />
                    ) 
                )
                setitems(items)
                overlay.removeAttribute('id')
            }

             
        })
        .catch(error=>{
            console.log(error)
        })
    }

    async function fetchSavedData(user_id) {
        GetSavedItem(user_id)
        .then((result) => {
            dispatch(setSaveTo(result))
        })
        .catch(error=>{
            console.log(error)
        })

        // overlay.removeAttribute('id');
    }

    const fetchCity = async (lat, lng) => {
        const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    
        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;
            const cityComponent = addressComponents.find(component =>
              component.types.includes('locality')
            );
            if (cityComponent) {
              setCity(cityComponent.long_name);
            }
          }
        } catch (error) {
          console.error('Error fetching city', error);
        }
      };

    useEffect(() => {
        if (location.lat && location.lng) {
          fetchCity(location.lat, location.lng);
        }
    }, [location]);

    useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        position => {
            setGeoLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            });
        },
        error => {
            console.error('Error fetching location', error);
        }
        );
    } else {
        console.error('Geolocation is not supported by this browser');
    }
    }, []);

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

    useEffect(() => {
        
        try {
            fetchSavedData(window.localStorage.getItem('CE_user_id'))
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        let overlay = document.querySelector('.overlay');
            if(overlay){
                overlay.setAttribute('id', 'overlay');
            try {
                fetchData(overlay, 'trends')
            } catch (error) {
                console.log(error)
            }
        }
    }, [location])

    useEffect(() => {
        let overlay = document.querySelector('.overlay');
            if(overlay){
                overlay.setAttribute('id', 'overlay');
            try {
                fetchData(overlay, 'trends')
            } catch (error) {
                console.log(error)
            }
        }
    }, [])
    

    useEffect(() => {
        setActiveJSX(<CardCnt
            ChangeCampus={ChangeCampus} 
            ChangeCondition={ChangeCondition} 
            ChangePrice={ChangePrice} 
            ChangeCategory={ChangeCategory} 
            ChangeState={ChangeState}
            ChangeSubCategory={ChangeSubCategory} 
            category={category}
            state={state} 
            applyFilter={applyFilter}
            cards={cards} 
            
        />)
        
    }, [location]) 

    useEffect(() => {

        async function uploadNewRef() {
            let response = await NewVisitor(src)
            console.log(response)
        }
        let src = location.search ?location.search.split('=')[1] : ''

        if(localStorage.getItem('new-visitor')){

            let user = JSON.parse(localStorage.getItem('new-visitor'))
            let id = window.localStorage.getItem('CE_user_id')

            let userId = user.id;
            let visit = user.visit;
            let dates = user.date;

            let newVisit = visit + 1;
            let newDate = [...dates, new Date()];
    
            // let str = {id: userId, date: newDate, visit: newVisit, isRegistered: id !== null ? true : false, user_id: id !== '' ? id : ''}

            let str = {id: userId, date: newDate, visit: newVisit, src: src}
            localStorage.setItem('new-visitor', JSON.stringify(str))
            uploadNewRef()
            

        }else{
            let newVisitorID = reactId;
            let date = new Date();
            let visit = 1
    
            let str = {id: newVisitorID, date: [date], visit: visit, src: src}
    
            localStorage.setItem('new-visitor', JSON.stringify(str))
            
            uploadNewRef()
        }

    }, [cards]);

    useEffect(() => {
        setActiveJSX(<CardCnt
            ChangeCampus={ChangeCampus} 
            ChangeCondition={ChangeCondition} 
            ChangePrice={ChangePrice} 
            ChangeCategory={ChangeCategory} 
            ChangeState={ChangeState}
            ChangeSubCategory={ChangeSubCategory} 
            category={category}
            state={state} 
            applyFilter={applyFilter}
            cards={cards} />)
    }, [cards])
    
    let categoryRef = useRef('')
    let subCategoryRef = useRef('')
    let conditionRef = useRef('')
    let stateRef = useRef('')
    let campusRef = useRef('')
    let priceRef = useRef([])

    async function applyFilter() {
        let overlay = document.querySelector('.overlay');
        overlay.setAttribute('id', 'overlay');

        try {
            // console.log(categoryRef)
            let response = await Filter_Cards(categoryRef.current,subCategoryRef.current,conditionRef.current,priceRef.current,stateRef.current,campusRef.current)
            .then((result) => {
                setCards(
                    result?.map((item, index) => 
                        <Card index={index} item={item} />
                    )
                )
                document.querySelector('.filter-overlay').removeAttribute('id')
                overlay.removeAttribute('id');
            })
            .catch((err )=> console.log(err))            
        } catch (error) {
            console.log(error)
        }
    }


    function ChangeCategory(data) {
        categoryRef.current = data
        setcategory(data)
        // navigate(`/?category=${data.toLowerCase()}`)
    }

    function ChangeSubCategory(data) {
        subCategoryRef.current = data
    }

    function ChangeCondition(data) {
        conditionRef.current = data
    }

    function ChangeState(data) {
        stateRef.current = data
        setstate(data)
    }

    function ChangeCampus(data) {
        campusRef.current = data
        // alert(data)
    } 

    function ChangePrice(data) {
        priceRef.current = data
    }

   

    return ( 
        <>

            <Helmet>
                <meta name="description" content="Online Shopping On Campus In Nigeria." />
                <meta name="keywords" content="Campus, Express, Nigeria, Products, Services, Shopping, Jumia. Jiji, Shopify, Online-Shopping" />
                <meta name="author" content="Campus Sphere Nigeria" />
            </Helmet>
            
            <div className="notice-cnt" style={{margin: 'auto'}}>
                    <span style={{margin: "0 15px 0 .5px"}}></span>
                    <button className="notice-cnt-btn" style={{width: '40px', height: '30px', background: 'red', borderRadius: '2px', fontWeight: '500', fontSize: 'small'}}>
                        close
                    </button>
            </div>
            <Helmet>
                    <meta name="title" content={`Campus Sphere (Connecting Campus Sphere)`} />
                    <meta name="description" content={`Welcome to Campus Sphere, Your Online Market Place  For Easy Shopping On Campus.`} />
                    {/* <meta name="google-site-verification" content="+nxGUDJ4QpAZ5l9Bsjdi102tLVC21AIh5d1Nl23908vVuFHs34=" /> */}
                    <meta name="robots" content="nosnippet" />
                    <meta name="googlebot" content="nosnippet" />
                    <meta name="google" content="sitelinkssearchbox" />

                    {/* FaceBook Tags */}
                    <meta property="og:site_name" content="Campus Sphere (Connecting Campus Sphere)" />
                    <meta property="og:title" content="Campus Sphere (Connecting Campus Sphere)" />
                    <meta property="og:description" content={`Welcome to Campus Sphere, Your Online Market Place  For Easy Shopping On Campus.`} />
                    {/* <meta property="og:image" itemprop="image" content="http://pollosweb.wesped.es/programa_pollos/play.png" /> */}
                    <meta property="og:type" content="website" />
                    <meta property="og:url"  content="https://www.campusexpressng.com" />
                    {/* <meta property="og:updated_time" content="1440432930" /> */}

                    {/* Twitter */}
                    <meta name="twitter:title" content="Campus Sphere (Connecting Campus Sphere)" />
                    <meta name="twitter:description" content={`Shop category is ${storedCategory}`} />
                    <meta name="twitter:card" content="summary_large_image" />

                    
            </Helmet>
            <div style={{
                height: screenWidth > 480 ? 'calc(100vh - 70px)' : 'calc(100vh - 200px)',
                background: '#fff',
                overflow:'auto',
                width: '100%'

            }}>  
                <div className="buyer-main-cnt" style={{
                    height: 'fit-content',
                    background: '#fff',
                    flexDirection:'column'
                }}>  

                    {
                        location.pathname.split('/').splice(-1)[0] === 'search'
                        ?
                        ''
                        :
                        <Ads />
                    }

                    
                    {
                        location.pathname.split('/').splice(-1)[0] === 'search'
                        ?
                        ''
                        :
                        <>
                            <br />
                            <br />
                        </>
                    }
                    
                </div>

                <div className="buyer-main-content buyer-main-cnt" style={{
                    // padding: '10px 80px 10px 80px',
                    background: '#fff',
                    height: 'auto',
                    width: '100%'

                }}>

                    {
                        screenWidth > 760
                        ?
                            <>
                                <Filterfilter
                                    ChangeCampus={ChangeCampus} 
                                    ChangeCondition={ChangeCondition} 
                                    ChangePrice={ChangePrice} 
                                    ChangeCategory={ChangeCategory} 
                                    ChangeState={ChangeState}
                                    ChangeSubCategory={ChangeSubCategory} 
                                    category={category}
                                    state={state} 
                                    applyFilter={applyFilter}
                                />
                            </>
                        :
                        ''
                    }

                    {
                        location.pathname.split('/').splice(-1)[0] === 'search'
                        ?
                            <>
                                <SearchOutput />
                            </>
                        :
                        <>
                            {activeJSX}
                            {activeJSX}
                            {/* <PaidAds cntName={'Brand New Items'} condition={'new'} top={'25px'} /> */}
                            {activeJSX}
                            {activeJSX}
                            {/* <PaidAds cntName={'Used Items'} condition={'used'} top={'25px'} /> */}
                            {activeJSX}
                            {activeJSX}
                        </>
                    }
                        
                </div>

                <button className="shadow" style={{position: 'fixed', bottom: '20px', padding: '10px', display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', right: '20px', width: 'auto', height: 'auto', background: '#FF4500', borderRadius: '10px'}} onClick={e => window.location.href=('/seller')}>  
                
                    {/* <img src={mssg} style={{height: '25px', width: '25px'}} alt="" /> */}
                    <span>
                        <img src={sellSvg} style={{height: '25px', width: '25px'}} alt="" />
                    </span>
                    &nbsp;
                    <span style={{color: '#fff'}}>Sell</span>

                </button>
            </div>

        </> 
     );
} 
 
export default Dashboard;
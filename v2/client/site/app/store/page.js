"use client" 

import '@/files/styles/Buyer/xx-large-screen.css'
import '@/files/styles/Buyer/x-large-screen.css'
import '@/files/styles/Buyer/medium-screen.css'
import '@/files/styles/Buyer/small-screen.css'
import '@/files/styles/Buyer/large-screen.css'
import '@/files/styles/Buyer/buy_now.css'
import '@/files/styles/filter.css'
import '@/files/styles/Buyer/semi-medium-screen.css'
// import '@/files/styles/loader.css'
// import '@/files/styles/Seller/overlay.css' 

// import sellSvg from '@/public/sell-svgrepo-com.svg' 

import { 
  useEffect,
  useId,
  useRef,
  useState 
} from "react"; 
import { 
  useDispatch,
  useSelector 
} from "react-redux";
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup';

import CardCnt from '@/files/components/Buyer/dashboard/CardCnt'
import Card from '@/files/components/Buyer/dashboard/Card'
import SearchOutput from '@/files/components/Buyer/Header/SearchOutput'
import {
  usePathname
} from 'next/navigation'

import Head from 'next/head'
import {
  v4
} from 'uuid'
import FilterAside from '@/files/components/Buyer/dashboard/FilterAside'
import PaidAds from '@/files/components/Buyer/dashboard/PaidAds'
import {
  setSaveTo
} from '@/redux/buyer_store/Save'
import {
  setCategoryTo
} from '@/redux/buyer_store/Category'


const Dashboard = () => {
  let {
    buyer_info
  } = useSelector(s => s.buyer_info);

  let {
    storedCategory
  } = useSelector(s => s.storedCategory);

  let pathname = usePathname()
  let dispatch = useDispatch()
  let [cards, setCards] = useState([]);

  let [category, setcategory] = useState('')
  let [type, settype] = useState('')
  let [state, setstate] = useState('')
  let [limit, setlimit] = useState(3)
  let [items, setitems] = useState([])

  function updateLimit(data){
    setlimit(data)
  }

  let [activeJSX, setActiveJSX] = useState()

  let [screenWidth, setScreenWidth] = useState(0)
  const [geoLocation, setGeoLocation] = useState({ lat: null, lng: null });
  const [city, setCity] = useState('');

  function applySelector(type='',subcategory='',pricerangeplus='',pricerangeminus='',gender='',products) {

    let items = products;

    if(type !== ''){
      return items.filter(item => JSON.parse(item.others).cType.toLowerCase()=== type.toLowerCase())
    }

    if(subcategory !== ''){
      return items.filter(item => JSON.parse(item.others).subCategorytoLowerCase() === subcategory.toLowerCase())
    }

    if(pricerangeplus !== ''){
      return items.filter(item => parseInt(item.price) >= Math.abs(pricerangeplus))
    }
    
    if(pricerangeminus !== ''){
      return items.filter(item => parseInt(item.price) <= Math.abs(pricerangeminus))
    }
    
    if(gender !== ''){
      
      return items.filter(item => JSON.parse(item.others).gender.toLowerCase() === gender.toLowerCase())
    }

    return items;

  }

  function insertFilterTag(result) {
    // Example URL
    const url = window.location;

    // Create a new URL object
    const parsedUrl = new URL(url);

    // Extract the category from the pathname
    const pathname = decodeURIComponent(parsedUrl.pathname);
    const category = pathname.split('/')[2]; // "Mobile Phones"

    const queryParams = new URLSearchParams(parsedUrl.search);

    // Extract the type parameter from the query string
    const type = queryParams.get('type'); // "type"

    // Extract the filter parameter from the query string
    const filter = queryParams.get('filter'); // "filter"

    // Extract price range from the filter
    const [filterType, filterValue] = filter ? filter.split('*') : []; // filterType = "price", filterValue = "-150"

    // console.log('items: ',result, type,filterType)

    // Log the extracted values
    if(type){
      return applySelector(type,'','','','',result)
    } else {
      return applySelector('','','','','',result)
      
    }

    if(filterType === 'price' && parseInt(filterValue) < 1){
      return applySelector('','','',parseInt(filterValue),'',result)
    }else if(filterType === 'price' && parseInt(filterValue) > 1){
      return applySelector('','',parseInt(filterValue),'','',result)
    }

    if(filterType === 'gender'){
      return applySelector('','','','',(filterValue),result)
    }

  }
  

  async function fetchData(overlay,category) {
    // buyer_overlay_setup(true, 'Loading...')

    // if(screenWidth > 999){
    //     setlimit(36)
    // }else if(screenWidth > 761 && screenWidth < 1000){
    //     setlimit(32) 
    // }else if(screenWidth < 659){
    //     setlimit(30)
    // } 
    const headers = {
      'Content-Type': 'application/json',  // Specify the content type if needed
      'Gender': window.localStorage.getItem('cs-gender') 
    }
    fetch(`/api/products?gender=${'male'}&limit=${50}`, {
      headers: {
        'Gender': window.localStorage.getItem('cs-gender') 
      }
    })
    .then(async(res) => {
      let response = await res.json();

      if (response.success) {
        let filtered_response = insertFilterTag(response.data)
          console.log(filtered_response)
          setCards(
            filtered_response.map((item, index) => 
              <Card key={index} index={index} item={item} />
            ) 
          )
          setitems(items)
          overlay.removeAttribute('id')
      } else {

      }
    })
    .catch(err =>{
      console.log(err)
    });
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
      setcategory(decodeURIComponent(pathname.split('/').slice(-1)[0]))
      settype(decodeURIComponent(window.location.search.split('=')[1])) 
    }, [])

    useEffect(() => {
        if (location.lat && location.lng) {
          fetchCity(location.lat, location.lng);
        }
    }, [pathname]);

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
    // alert(category)
      let overlay = document.querySelector('.overlay');
      
      if(overlay){
        overlay.setAttribute('id', 'overlay');
      try {
        category !== '' ? fetchData(overlay, btoa(category)) : ''
      } catch (error) {
        console.log(error)
      }
      }
  }, [pathname,category])

  useEffect(() => {
    let overlay = document.querySelector('.overlay');
      if(overlay){
        overlay.setAttribute('id', 'overlay');
      try {
        fetchData(overlay) 
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
      // applyFilter={applyFilter}
      cards={cards} 
      updateLimit={updateLimit}
    />)
  }, [pathname,cards]) 

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
      let newVisitorID = v4();
      let date = new Date();
      let visit = 1

      let str = {id: newVisitorID, date: [date], visit: visit, src: src}

      localStorage.setItem('new-visitor', JSON.stringify(str))
      
      uploadNewRef()
    }

  }, [cards]);

 
  let categoryRef = useRef('')
  let subCategoryRef = useRef('')
  let conditionRef = useRef('')
  let stateRef = useRef('')
  let campusRef = useRef('')
  let priceRef = useRef([])

  async function applyFilter(category_checked, price_checked, condition_checked, location_checked) {
    let overlay = document.querySelector('.overlay');
    overlay.setAttribute('id', 'overlay');

    try {
      let response = await Filter_Cards(
        !category_checked ? '' : categoryRef.current,
        !category_checked ? '' : subCategoryRef.current,
        !condition_checked ? '' : conditionRef.current,
        !price_checked ? '' : priceRef.current,
        !location_checked ? '' : stateRef.current,
        !location_checked ? '' : campusRef.current
      )
      .then((result) => {
        setCards(
          result?.map((item, index) => 
            <Card index={index} key={index} item={item} />
          )
        )
        document.querySelector('.filter-overlay').removeAttribute('id')
        overlay.removeAttribute('id');
      })
      .catch((err )=> console.log(err))            
    } catch (error) {
      console.log(error)
        overlay.removeAttribute('id');

    }
  }


  function ChangeCategory(data) {
    categoryRef.current = data;
    dispatch(setCategoryTo(data))

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
      // setstate(data)
  }

  function ChangeCampus(data) {
      campusRef.current = data
      // alert(data)
  } 

  function ChangePrice(data) {
      priceRef.current = data
  }

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (cards.length > 0 && limit > 0) {
      const numberOfRows = Math.ceil(cards.length / limit)
      const rowElements = []
      
      for (let i = 0; i < numberOfRows; i++) {
        rowElements.push(
          <CardCnt
            key={i}
            rowIndex={i}
            ChangeCampus={ChangeCampus} 
            ChangeCondition={ChangeCondition} 
            ChangePrice={ChangePrice} 
            ChangeCategory={ChangeCategory} 
            ChangeState={ChangeState}
            ChangeSubCategory={ChangeSubCategory} 
            category={category}
            state={state} 
            cards={cards}
            updateLimit={updateLimit}
          />
        )
      }
      setRows(rowElements)
    }
  }, [cards, limit])

  let [active, setActive] = useState(0);

   

  return ( 
    <>

      <div className="notice-cnt" style={{margin: 'auto'}}>
        <span style={{margin: "0 15px 0 .5px"}}></span>
        <button className="notice-cnt-btn" style={{width: '40px', height: '30px', background: 'red', borderRadius: '2px', fontWeight: '500', fontSize: 'small'}}>
            close
        </button>
      </div>

      <div style={{
        height: screenWidth <= 480 ? 'calc(100vh - 60px)' : 'calc(100vh - 70px)',
        background: '#fff',
        overflow:'auto',
        width: '100%',
        padding: '15px'

      }}> 
        
        <div className="buyer-main-content buyer-main-cnt" style={{
          background: '#fff',
          height: 'auto',
          width: '100%',
          padding: '0'

        }}>
          {
            screenWidth <= 760
            ?
            <ul style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: '10px 10px',
              background: "#FFA500",
              borderRadius: "8px",
              textAlign: "center",

            }}>
              {
                [
                  {text: "Items", svg: ""},
                  {text: "Lodges", svg: ""},
                  {text: "Services", svg: ""}
                ].map((item, index) => <li key={index} style={{
                  width: "33.3%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: '5px 5px',
                  background: active === index ? "#fff" : "#FFA500",
                  borderRadius: "8px",
                  textAlign: "center",
                  color: active === index ? "#FFA500" : "#fff",
                  fontWeight: "bold"
                }} onClick={e => {
                  setActive(index)
                }}>
                  <span>
                    {item.text}
                  </span>
                  <span>{}</span>
                </li>)
              }
            </ul>
            :
            ''
          }

          {
            screenWidth <= 760
            ?
            ''
            :
              <FilterAside
                applyFilter ={applyFilter}
                ChangeCampus ={ChangeCampus}
                ChangeCondition ={ChangeCondition}
                ChangePrice ={ChangePrice}
                ChangeCategory ={ChangeCategory}
                ChangeState ={ChangeState}
                ChangeSubCategory ={ChangeSubCategory}
                category ={storedCategory}
              />
          }

          
          {
            pathname.split('/').splice(-1)[0] === 'search'
            ?
              <>
                <SearchOutput />
              </>
            :
            <>
              {rows.length > 0 ? rows : activeJSX}
            </>
          }
              
        </div>

        
      </div>

    </> 
  );
} 
 
export default Dashboard;
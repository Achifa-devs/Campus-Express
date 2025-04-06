import { useEffect, useRef, useState } from "react";
import menuSvg from '../../../assets/menu-alt-01-svgrepo-com.svg'

import dArrowSvg from '../../../assets/down-arrow-backup-2-svgrepo-com.svg'
import filterSvg from '../../../assets/filter-edit-svgrepo-com.svg'
import '../../../styles/Buyer/overlays.css'
import '../../../styles/filter.css'
import '../../../styles/search.css'
import img from '../../../assets/logo.png'
import { useDispatch, useSelector } from "react-redux";
import SearchResult from "./SearchResult";
import Aside from "./Aside";
import login from '../../../assets/login.svg'

import SearchBar from "./SearchBar";
import { setSearchListTo } from "@/redux/buyer_store/SearchList";
import { usePathname } from "next/navigation";
import FloatingMenu from "./FloatingMenu";

import foodSvg from '../../../assets/food-market-purchasing-svgrepo-com.svg'
import electronicsSvg from '../../../assets/broadcast-device-electronics-svgrepo-com.svg'
import vehicleSvg from '../../../assets/car-hand-drawn-outlined-vehicle-svgrepo-com.svg'
import phoneSvg from '../../../assets/phone-rounded-svgrepo-com (1).svg'
import laptopSvg from '../../../assets/laptop-svgrepo-com.svg'
import lodgeSvg from '../../../assets/apartment-left-svgrepo-com.svg'
import appliancesSvg from '../../../assets/appliances-svgrepo-com.svg'
import furnitureSvg from '../../../assets/furniture-svgrepo-com.svg'
import fashionSvg from '../../../assets/casual-clothing-fashion-svgrepo-com.svg'
import utensilSvg from '../../../assets/utensils-svgrepo-com.svg'
import petSvg from '../../../assets/pets-svgrepo-com.svg'
import termsSvg from '../../../assets/condition-point-svgrepo-com.svg'
import phoneassSvg from '../../../assets/phone-repair-symbol-svgrepo-com.svg'
import laptopassSvg from '../../../assets/laptop-fix-svgrepo-com.svg'
import cosmeticsSvg from '../../../assets/medical-medicine-health-23-svgrepo-com.svg'
import tabletsSvg from '../../../assets/tablet-svgrepo-com.svg'

import orderSvg from '../../../assets/order-completed-svgrepo-com.svg'
import cartSvg from '../../../assets/cart-shopping-fast-svgrepo-com.svg'
import acctSvg from '../../../assets/user-svgrepo-com (2).svg'
import inboxSvg from '../../../assets/inbox-alt-svgrepo-com (1).svg'
import savedSvg from '../../../assets/bookmark-outlined-saved-svgrepo-com.svg'
import helpSvg from '../../../assets/help-svgrepo-com.svg'
import refundSvg from '../../../assets/return-svgrepo-com.svg'
import cancelSvg from '../../../assets/cancel-delivery-svgrepo-com.svg'
import paySvg from '../../../assets/money-total-line-svgrepo-com.svg'
import contactvg from '../../../assets/costumer-support-call-svgrepo-com.svg'
import chatSvg from '../../../assets/messages-1-svgrepo-com (1).svg'
import sellSvg from '../../../assets/sell-svgrepo-com (1).svg'
import logoutSvg from '../../../assets/logout-2-svgrepo-com.svg'
import { GetSearchWord } from "@/app/api/buyer/get";
import Filter from "./Filter";

const Header = () => {

  
  let {
      storedCategory
  } = useSelector(s => s.storedCategory);

  let {buyer_info} = useSelector(s => s.buyer_info)
  let {Cart} = useSelector(s => s.Cart)
  let dispatch = useDispatch()
  let pathname = usePathname()


  let [cartList,setCartList] = useState(0)
  let [searchChar, setSearchChar] = useState('')
  let [screenWidth, setScreenWidth] = useState(0)
  let [searchRes, setSearchRes] = useState([])

  let [getSelectedOption, setgetSelectedOption]  =useState('')
  let [list, setList] = useState([])
  let [right, setright] = useState(0)
  let [top, settop] = useState(0)
  
  let [searchResultElem, setSearchResultElem] = useState(
    <SearchResult list={[searchRes]} />
  )
  let [visible, setvisible] = useState('none')
  let [task, settask] = useState('none')
  useEffect(() => {
    let width = window.innerWidth;
    setScreenWidth(width)
  }, [])

  // useEffect(() => {
  //   setCartList([...Cart].length)
  //   console.log([...Cart]) 
  // }, [Cart])

  let [width, setWidth] = useState(0)

  
  
  useEffect(() => {
    if(pathname.split('/').splice(-1)[0] === 'product'){
      setWidth('100%')
    }else{
        setWidth(`calc(100% - 350px)`)
    }
  }, [pathname])
 

  function openAside() {
    document.querySelector('.aside-overlay').setAttribute('id', 'aside-overlay')
  }

  
  function openProfileAside() {
    document.querySelector('.profile-aside-overlay').setAttribute('id', 'profile-aside-overlay')
  }

  function openFilter() {
    document.querySelector('.filter-overlay').setAttribute('id', 'filter-overlay')
  }

  function openSearchResult(e) {
   

    let position = e.target.getBoundingClientRect();
    let top = position.top
    let left = position.left
    document.querySelector('.buyer-search-overlay').setAttribute('id', 'buyer-search-overlay')

    let searchWidth = document.querySelector('.search-cnt')?.getBoundingClientRect().width
    setSearchResultElem(<SearchResult  searchLeft={left} searchTop={top} searchWidth={searchWidth}  />)
  }

  useEffect(() => {
    async function getData() {
      if(searchChar !== '' && searchChar !== ' '){ 
        try {

          fetch(`https://ce-server.vercel.app/search-word?word=${word}`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          
          })
          .then(async(result) => {
            let response = await result.json(); 
            dispatch(setSearchListTo(response))
          })
          .catch((error) => {
            console.log(error)
          })
           
        } catch (error) {
           console.log(error)
        }
   
       }
    }
    getData()
  }, [searchChar])

  function handleCancelOrder() {
    let overlay = document.querySelector('.cancel-order-overlay')
    overlay.setAttribute('id', 'cancel-order-overlay');
  }
  function closeFilter() {
          document.querySelector('.filter-overlay').removeAttribute('id')
      }
  function openFloatingMenu(e,task) {
    settask(task)

    if(task === 'help'){
      if(visible === 'none')
      {
        let list = [
          { txt: 'Contact Us', svg: contactvg, uri: 'contact-us' },
        
          // {txt:'Help Center', svg: helpSvg, uri: 'help-center'},
          {txt:'Refund & Return', svg: refundSvg, uri: 'refund'},
          {txt:'Manage Orders', svg: cancelSvg, uri: 'orders'},
          // {txt:'Payment Option', svg: paySvg, uri: 'payments'},
          { txt: 'Terms Of Use', svg: termsSvg, uri: 'terms-of-use' },
          
          // {txt:'Live Chat', svg: chatSvg, uri: 'live-chat'}
        ]
        setList(list)
        setvisible('flex')
        let rect = e.target.getBoundingClientRect();
        let t = rect.top;

        let r = rect.right;
        setright(r)
        settop(t)

        setTimeout(() => {
          setvisible('none')
        }, 8000);
      }
      else{
        setvisible('none')

      }



    } else if (task === 'categories') { 
      let categories = [
        {txt: "Books", svg: '', uri: ''},
        {txt: "Food", svg: foodSvg, uri: ''},
        {txt: "Electronics", svg: electronicsSvg, uri: ''},
        {txt: "Fashion", svg: fashionSvg, uri: ''},
        {txt: "Health & Beauty", svg: cosmeticsSvg, uri: ''},
        {txt: "Mobile Phones", svg: phoneSvg, uri: ''},
        {txt: "Tablets", svg: tabletsSvg, uri: ''},
        {txt: "Laptops & Desktops", svg: laptopSvg, uri: ''},
        {txt: "Laptops & Desktops Accessories", svg: laptopassSvg, uri: ''},
        {txt: "Phone & Tablet Accessories", svg: phoneassSvg, uri: ''},
        {txt: "Pets", svg: petSvg, uri: ''},
        {txt: "Vehicle", svg: vehicleSvg, uri: ''},
        {txt: "Lodge & Apartments", svg: lodgeSvg, uri: ''},
        {txt: "Furnitures", svg: furnitureSvg, uri: ''},
        {txt: "Appliances", svg: appliancesSvg, uri: ''},
        { txt: "Utensils", svg: utensilSvg, uri: '' }
      ]

      if(visible === 'none')
      {
        setList(categories)
        setvisible('flex')
        let rect = e.target.getBoundingClientRect();
        let t = rect.top;

        let r = rect.right;
        setgetSelectedOption('categories')
        setright(r)
        settop(t)

        setTimeout(() => {
          setvisible('none')
        }, 8000);
      }
      else{
        setvisible('none')

      }
    } else{
      if(visible === 'none')
      {
        let list = [
          {txt:'My Account', svg: acctSvg, uri: 'account-managements'},
          {txt:'Orders', svg: orderSvg, uri: 'orders'},
          {txt:'Inbox', svg: inboxSvg, uri: 'inbox'},
          {txt:'Favourite', svg: savedSvg, uri: 'favourites'},
          // {txt:'Voucher', svg: '', uri: ''},
          {txt: 'Logout', svg: logoutSvg, uri: 'logout'}
        ]
        setList(list)
        setvisible('flex')
        let rect = e.target.getBoundingClientRect();
        let t = rect.top;

        let r = rect.right;
        setright(r)
        settop(t)


        setTimeout(() => {
          setvisible('none')
        }, 8000);

      }else{
        setvisible('none')

      }



    }
    
  }


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

        // setcategory(data)
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

   

  return ( 
    <>
     
      {
        <Aside />
      }

        {
          searchResultElem
        }

        {
          <FloatingMenu list={list}right={right}top={top}visible={visible} getSelectedOption={getSelectedOption} />
        }

        <div className="filter-overlay" onClick={e=>e.target === e.currentTarget ? closeFilter():''}>
          <Filter 
            applyFilter ={applyFilter}
            ChangeCampus ={ChangeCampus}
            ChangeCondition ={ChangeCondition}
            ChangePrice ={ChangePrice}
            ChangeCategory ={ChangeCategory}
            ChangeState ={ChangeState}
            ChangeSubCategory ={ChangeSubCategory}
            category ={storedCategory}  
          />
        </div>
      <div className="buyer-header shadow-sm"  style={{position: 'sticky', top: '0', zIndex: '10000', background: '#fff'}}>


        <img onClick={e => window.location.href = '/'} src={'https://res.cloudinary.com/daqbhghwq/image/upload/f_jpg/2024-06-27_dqlq3a.jpg'} style={{ height: screenWidth > 760 ? '50px' : '50px', width: screenWidth > 760 ? '50px' : '50px', borderRadius: '5px' }} alt="" />
        

        {

          screenWidth > 760
          ?
          <>
            &nbsp;
            &nbsp;
            &nbsp;
              <ul style={{
                width: 'fit-content'
              }}>
                <li style={{background: '#FF4500'}} onClick={e => openFloatingMenu(e,'categories')}>
                <span style={{color: '#fff'}}><b>Categories</b></span>
                
              </li>
            </ul>
          </>
          :
          <>
            
          </>
        }
        {
          screenWidth > 760
          ?
          
          <div className="input-cnt search-cnt">
            <input onFocus={e => openSearchResult(e)} onInput={e => {
              async function getData() {
                if(e.target.value !== '' && e.target.value !== ' '){ 
                  try {
                    let result = await GetSearchWord(e.target.value)
                    dispatch(setSearchListTo(result))
                  } catch (error) {
                    console.log(error)
                  }
            
                }
              }
              getData()
            }} type="search" name="" placeholder="What Are You Looking For..." id="" />
            <button style={{borderRadius: '5px'}}>Search</button>
          </div> 
          :
          ''
          
        }

        {
          
          <ul style={{
            width: 'fit-content',
          }}>
            {/* <li onClick={e => navigate('/buyer.message')}>  
              <img src={cartSvg.src} style={{height: '25px', width: '25px'}} alt="" />
              
              <span style={{height: 'fit-content', marginTop: '-19px', borderRadius: '50%', width: '20px', fontSize: 'small', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'orangered', color: '#fff'}}>
                { 
                  cartList
                }
              </span>
            </li>  */}

              {
                screenWidth < 480
                ?

                ''
                :
                screenWidth > 760
                ?
                <>

                  <li style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} onClick={e => buyer_info?.fname? openFloatingMenu(e,'user') : navigate('/login')}>
                      <span style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%'}}>
                      
                        {
                          buyer_info?.fname
                          ?
                          <h6>
                          Hi {buyer_info?.fname}
                          </h6>
                          :
                          <h6 onClick={e=>window.location.href='/login'}>
                          Login
                          </h6>
                        }
                      </span>

                      <span style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%'}}>
                        <img src={buyer_info?.fname ? dArrowSvg.src : login.src} style={{height: buyer_info?.fname ? '22px' : '16px', width: buyer_info?.fname ? '12px' : '30px', marginTop: buyer_info?.fname ? '5px' : '0px', marginLeft: buyer_info?.fname ? '5px' : '-3px', rotate: visible === 'flex' && task === 'user' ? '0deg' : '180deg'}} alt="" />
                      </span>
                    </li>
                    
                    

                  <li onClick={e => openFloatingMenu(e,'help')}> 
                    <span><h6>Help</h6></span>
                    <span>
                      <img src={dArrowSvg.src} style={{height: '22px', width: '12px', marginTop: '5px', marginLeft: '5px', rotate: visible === 'flex' && task === 'help' ? '0deg' : '180deg'}} alt="" />
                    </span>
                  </li>

                </>
                :

                ''

              }

              <>
              
                
                &nbsp;
                {
                  screenWidth > 760
                  ? 
                  ''
                  :
                  pathname.split('/').length > 2
                  ?
                  <li style={{padding: '5px'}} onClick={e => openFilter(e)}>
                    <span>
                      <img src={filterSvg.src} style={{height: '20px', width: '20px', rotate: visible === 'flex' && task === 'help' ? '0deg' : '180deg'}} alt="" />
                    </span>
                    </li>
                  :
                  ''
                }

                   
                &nbsp;
              &nbsp;
            
                {
                  screenWidth > 760
                  ? 
                  ''
                  :
                  pathname.split('/')[1] === 'account-managements'
                  ?
                  <li style={{padding: '5px'}} onClick={e => openProfileAside(e)}>
                    <span>
                      <img src={menuSvg.src} style={{height: '20px', width: '20px', rotate: visible === 'flex' && task === 'help' ? '0deg' : '180deg'}} alt="" />
                    </span>
                  </li>
                  :
                  <li style={{padding: '5px'}} onClick={e => openAside(e)}>
                    <span>
                      <img src={menuSvg.src} style={{height: '20px', width: '20px', rotate: visible === 'flex' && task === 'help' ? '0deg' : '180deg'}} alt="" />
                    </span>
                  </li>
              }
              
                
                {/* <li style={{padding: '5px 10px 5px 10px', background: '#FF4500', color: '#fff', fontSize: 'medium'}} onClick={e => window.href = (`/seller`) }>
                  <span>
                    <img src={sellSvg} style={{height: '25px', width: '25px'}} alt="" />
                  </span>
                  &nbsp;

                  <span>Sell</span>

                </li> */}
              </>
            {/* } */}
          </ul>
          
        }
        {
          screenWidth < 760 && pathname.split('/').splice(-1)[0]==='order-tracking'
          ? 
          <div style={{height: "100%", padding: '5px', width: '30%'}}>
            <button className="shadow-sm" style={{padding: '0 8px 0 8px'}} onClick={handleCancelOrder}>
                <small>Cancel Order&nbsp; </small>
                {/* <span><small>(₦</small>{Total})</span> */}
            </button>
          </div>
          :
          ''
        }
        
        

      </div>

      

      {
        screenWidth < 479 && pathname.split('/')[1]==='search'
        ? 
        <SearchBar />
        :
        screenWidth < 479 && pathname.split('/')[1]===''
        ?
        <SearchBar />
        :
        ''
        
      }

      
      {/* <Filter /> */}


    
    </>
  );
}
  
export default Header; 
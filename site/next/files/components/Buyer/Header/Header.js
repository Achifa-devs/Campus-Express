import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  FiMenu,
  FiChevronDown,
  FiFilter,
  FiHelpCircle,
  FiUser,
  FiLogIn,
  FiShoppingCart,
  FiMessageSquare,
  FiLogOut
} from "react-icons/fi";
import {
  FiBookmark,
  FiHardDrive,
  FiShoppingBag,
  FiSmile,
  FiSmartphone,
  FiTablet,
  FiMonitor,
  FiHeadphones,
  FiCpu,
  FiGitlab,
  FiTruck,
  FiHome,
  FiLayers,
  FiMicrowave,
  FiCoffee
} from 'react-icons/fi';
import { FaStoreAlt, FaPaw, FaUtensils } from 'react-icons/fa';
import { IoIosArrowDown } from "react-icons/io";

import SearchResult from "./SearchResult";
import Aside from "./Aside";
import SearchBar from "./SearchBar";
import { setSearchListTo } from "@/redux/buyer_store/SearchList";
import FloatingMenu from "./FloatingMenu";
import Filter from "./Filter";

const Header = () => {
  const { storedCategory } = useSelector(s => s.storedCategory);
  const { buyer_info } = useSelector(s => s.buyer_info);
  const { Cart } = useSelector(s => s.Cart);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const [cartList, setCartList] = useState(0);
  const [searchChar, setSearchChar] = useState('');
  const [screenWidth, setScreenWidth] = useState(0);
  const [searchRes, setSearchRes] = useState([]);
  const [getSelectedOption, setgetSelectedOption] = useState('');
  const [list, setList] = useState([]);
  const [right, setright] = useState(0);
  const [top, settop] = useState(0);
  const [searchResultElem, setSearchResultElem] = useState(
    <SearchResult list={[searchRes]} />
  );
  const [visible, setvisible] = useState('none');
  const [task, settask] = useState('none');
  const [width, setWidth] = useState(0);

  // Refs
  const categoryRef = useRef('');
  const subCategoryRef = useRef('');
  const conditionRef = useRef('');
  const stateRef = useRef('');
  const campusRef = useRef('');
  const priceRef = useRef([]);

  // Responsive width
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setWidth(pathname.split('/').splice(-1)[0] === 'product' ? '100%' : `calc(100% - 350px)`);
  }, [pathname]);

  // Helper functions
  const openAside = () => document.querySelector('.aside-overlay').setAttribute('id', 'aside-overlay');
  const openProfileAside = () => document.querySelector('.profile-aside-overlay').setAttribute('id', 'profile-aside-overlay');
  const openFilter = () => document.querySelector('.filter-overlay').setAttribute('id', 'filter-overlay');
  const closeFilter = () => document.querySelector('.filter-overlay').removeAttribute('id');
  const handleCancelOrder = () => document.querySelector('.cancel-order-overlay').setAttribute('id', 'cancel-order-overlay');

  const openSearchResult = (e) => {
    const position = e.target.getBoundingClientRect();
    const searchWidth = document.querySelector('.search-cnt')?.getBoundingClientRect().width;
    setSearchResultElem(<SearchResult searchLeft={position.left} searchTop={position.top} searchWidth={searchWidth} />);
    document.querySelector('.buyer-search-overlay').setAttribute('id', 'buyer-search-overlay');
  };

  // Search functionality
  useEffect(() => {
    if (searchChar.trim() !== '') {
      fetch(`/api/store/search?word=${searchChar}`, {
        headers: {
          'Gender': window.localStorage.getItem('cs-gender') 
        }
      })
      .then(async(res) => {
        const response = await res.json();
        if (response.bool) {
          dispatch(setSearchListTo(response.data));
        }
      })
      .catch(console.error);
    }
  }, [searchChar, dispatch]);

  // Floating menu handlers
  const openFloatingMenu = (e, task) => {
    settask(task);
    
    const menuItems = {
      help: [
        { txt: 'Contact Us', icon: <FiMessageSquare />, uri: 'contact-us' },
        { txt: 'Refund & Return', icon: <FiHelpCircle />, uri: 'refund' },
        { txt: 'Manage Orders', icon: <FiShoppingCart />, uri: 'orders' },
        { txt: 'Terms Of Use', icon: <FiBookmark />, uri: 'terms-of-use' },
      ],
      categories: [
        { txt: "Books", icon: <FiBookmark />, uri: '' },
        { txt: "Food", icon: <FaStoreAlt />, uri: '' },
        { txt: "Electronics", icon: <FiHardDrive />, uri: '' },
        { txt: "Fashion", icon: <FiShoppingBag />, uri: '' },
        { txt: "Health & Beauty", icon: <FiSmile />, uri: '' },
        { txt: "Mobile Phones", icon: <FiSmartphone />, uri: '' },
        { txt: "Tablets", icon: <FiTablet />, uri: '' },
        { txt: "Laptops & Desktops", icon: <FiMonitor />, uri: '' },
        { txt: "Laptops & Desktops Accessories", icon: <FiHeadphones />, uri: '' },
        { txt: "Phone & Tablet Accessories", icon: <FiCpu />, uri: '' },
        { txt: "Pets", icon: <FaPaw />, uri: '' },
        { txt: "Vehicle", icon: <FiTruck />, uri: '' },
        { txt: "Lodge & Apartments", icon: <FiHome />, uri: '' },
        { txt: "Furnitures", icon: <FiLayers />, uri: '' },  
        { txt: "Appliances", icon: <FiCoffee />, uri: '' },
        { txt: "Utensils", icon: <FaUtensils />, uri: '' },
        { txt: "Books", icon: <FiBookmark />, uri: '' },
        { txt: "Food", icon: <FaStoreAlt />, uri: '' }
        // Add other categories...
      ],
      user: [
        { txt: 'My Account', icon: <FiUser />, uri: 'account-managements' },
        { txt: 'Orders', icon: <FiShoppingCart />, uri: 'orders' },
        { txt: 'Favourite', icon: <FiBookmark />, uri: 'favourites' },
        { txt: 'Logout', icon: <FiLogOut />, uri: 'logout' }
      ]
    };

    if (visible === 'none') {
      setList(menuItems[task]);
      setvisible('flex');
      const rect = e.target.getBoundingClientRect();
      setright(rect.right);
      settop(rect.top);
      setgetSelectedOption(task === 'categories' ? 'categories' : '');

      setTimeout(() => setvisible('none'), 8000);
    } else {
      setvisible('none');
    }
  };

  // Filter handlers
  const applyFilter = async (category_checked, price_checked, condition_checked, location_checked) => {
    const overlay = document.querySelector('.overlay');
    overlay.setAttribute('id', 'overlay');

    try {
      // Implement your filter logic here
      document.querySelector('.filter-overlay').removeAttribute('id');
      overlay.removeAttribute('id');
    } catch (error) {
      console.error(error);
      overlay.removeAttribute('id');
    }
  };

  return (
    <>
      <Aside />
      {searchResultElem}
      <FloatingMenu list={list} right={right} top={top} visible={visible} getSelectedOption={getSelectedOption} />

      <div className="filter-overlay" onClick={e => e.target === e.currentTarget && closeFilter()}>
        {/* <Filter 
          applyFilter={applyFilter}
          ChangeCampus={ChangeCampus}
          ChangeCondition={ChangeCondition}
          ChangePrice={ChangePrice}
          ChangeCategory={ChangeCategory}
          ChangeState={ChangeState}
          ChangeSubCategory={ChangeSubCategory}
          category={storedCategory}  
        /> */}
      </div>

      <header className="buyer-header">
        {/* Logo */}
        <div className="logo-container" style={{marginLeft: '-15px'}} onClick={() => window.location.href = '/store'}>
          <Image 
            src="https://res.cloudinary.com/daqbhghwq/image/upload/v1746402998/Untitled_design-removebg-preview_peqlme.png" 
            alt="Campus Store Logo"
            width={65}
            height={65}
            className="logo"
          />
        </div>

        {/* Desktop Navigation */}
        {screenWidth > 760 && (
          <>
            {
              pathname.split('/')[1] === 'store'
              ?
              <ul className="nav-links">
                <li className="categories-btn" onClick={e => openFloatingMenu(e, 'categories')}>
                  <span>Categories</span>
                  <IoIosArrowDown className={`arrow ${visible === 'flex' && task === 'categories' ? 'up' : ''}`} />
                </li>
              </ul>
            :
            ''
            }

            <div className="search-container">
              <input 
                type="search" 
                placeholder="What Are You Looking For..." 
                onFocus={openSearchResult}
                onChange={e => setSearchChar(e.target.value)}
              />
              <button className="search-btn">Search</button>
            </div>
          </>
        )}

        {/* User Actions */}
        <ul className="user-actions">
          {screenWidth > 480 && (
            <>
              <li className="user-menu" onClick={e => buyer_info?.fname ? openFloatingMenu(e, 'user') : window.location.href='/store/login'}>
                {buyer_info?.fname ? (
                  <>
                    <span>Hi {buyer_info.fname}</span>
                    <IoIosArrowDown className={`arrow ${visible === 'flex' && task === 'user' ? 'up' : ''}`} />
                  </>
                ) : (
                  <>
                    <FiLogIn className="login-icon" />
                    <span>Login</span>
                  </>
                )}
              </li>

              <li className="help-menu" onClick={e => openFloatingMenu(e, 'help')}>
                <span>Help</span>
                <IoIosArrowDown className={`arrow ${visible === 'flex' && task === 'help' ? 'up' : ''}`} />
              </li>
            </>
          )}

          {/* Mobile Menu */}
          {screenWidth <= 760 && (
            <li className="mobile-menu-btn" onClick={pathname.split('/')[1] === 'account-managements' ? openProfileAside : openAside}>
              <FiMenu className="menu-icon" />
            </li>
          )}
        </ul>

        {/* Mobile Search */}
        {screenWidth < 480 && (pathname.split('/')[1] === 'search' || pathname === '/') && (
          <SearchBar />
        )}
      </header>

      <style jsx>{`
        .buyer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          height: 70px;
          background: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .logo-container {
          cursor: pointer;
          flex-shrink: 0;
        }

        .logo {
          border-radius: 5px;
          object-fit: contain;
        }

        .nav-links {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .categories-btn {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          background: #FF4500;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 500;
          gap: 8px;
        }

        .search-container {
          display: flex;
          width: 50%;
          max-width: 600px;
          margin: 0 auto;
        }

        .search-container input {
          flex: 1;
          height: 40px;
          padding: 0 15px;
          border: 1px solid #e2e8f0;
          border-right: none;
          border-radius: 5px 0 0 5px;
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
        }

        .search-container input:focus {
          border-color: #FF4500;
          box-shadow: 0 0 0 3px rgba(255, 69, 0, 0.1);
        }

        .search-btn {
          height: 40px;
          padding: 0 20px;
          background: #FF4500;
          color: white;
          border: none;
          border-radius: 0 5px 5px 0;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .search-btn:hover {
          background: #e03d00;
        }

        .user-actions {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 15px;
        }

        .user-menu, .help-menu {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          color: #FF4500;
          font-weight: 500;
          cursor: pointer;
          gap: 5px;
        }

        .arrow {
          transition: transform 0.3s ease;
        }

        .arrow.up {
          transform: rotate(180deg);
        }

        .mobile-menu-btn {
          padding: 8px;
          cursor: pointer;
        }

        .menu-icon {
          font-size: 20px;
          color: #4B5563;
        }

        .login-icon {
          font-size: 18px;
          margin-right: 5px;
        }

        @media (max-width: 768px) {
          .buyer-header {
            padding: 0 3%;
          }
          
          .search-container {
            width: 70%;
          }
        }

        @media (max-width: 480px) {
          .buyer-header {
            padding: 0 15px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
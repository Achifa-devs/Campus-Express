
import Dashboard from '../../pages/Buyer/Dashboard';
import ProductPage from '../../pages/Buyer/Product';
import BuyerSignup from '../../Authorization/Buyer.js/Signup';
import BuyerLogin from '../../Authorization/Buyer.js/Login';
import Checkout from '../../pages/Buyer/Checkout';
import Historhy from '../../pages/Buyer/History';
import Cart from '../../pages/Buyer/Cart'; 
import Wallet from '../../pages/Buyer/Wallet';
import Messages from '../../pages/Buyer/Messages';
import MessageRoom from '../../pages/Buyer/MessageRoom';
import SavedItem from '../../components/Buyer/Saved/SavedItem';
import ForgotPwd from '../../Authorization/ForgotPassword';
import Me from '../../pages/Buyer/Profile';
import Faq from '../../pages/Buyer/Faq';
import CustomerService from '../../pages/Buyer/CustomerService';
import PrivacyPolicy from '../../pages/Buyer/PrivacyPolicy';
import ErrorPage from '../../components/ErrorPage';
import Order from '../../pages/Buyer/Order';
import OrderTracker from '../../pages/Buyer/OrderTracker';
import NewOrder from '../../pages/Buyer/NewOrder';




export let buyer_route = [

    { path: '/:id', component: <Dashboard />}, 
    { path: '/', component: <Dashboard />}, 
    { path: '/profile', component: <Me />},
    { path: '/room/:id', component: <MessageRoom />},
    { path:'/message/:id', component: <Messages /> },
    { path:'/message', component: <Messages /> },
    { path: '/customer-service', component: <CustomerService />},
    { path: '/policy', component: <PrivacyPolicy />},
    { path: '/faq', component: <Faq />},
    { path: '/history', component: <Historhy />},
    { path: '/cart', component: <Cart />},
    { path: '/orders', component: <Order />},
    { path: '/new-order/:id', component: <NewOrder />},
    { path: '/wallet', component: <Wallet />},
    { path: '/favourites', component: <SavedItem />},
    { path: '/product', component: <ProductPage />}, 
    { path: '/order-tracking', component: <OrderTracker />}, 
    { path: '/checkout/:id', component: <Checkout />},
    { path: '/checkout/:id/:id', component: <Checkout />},
    { path: '/checkout/:id/:id/:id', component: <Checkout />},
    { path: '/signup', component: <BuyerSignup />},
    { path: '/signup/:id', component: <BuyerSignup />},
    { path: '/login', component: <BuyerLogin />},
    { path: '/search', component: <Dashboard />}, 
    { path: '/password-reset', component: <ForgotPwd />},
    
    {path: "*", component: <ErrorPage />}
]
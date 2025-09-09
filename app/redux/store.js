import { configureStore } from '@reduxjs/toolkit';
import { userMode } from './reducer/mode';
import { userAuth } from './reducer/auth';
import cookie from './vendor/cookie';
import drawer from './vendor/drawer';
import user from './vendor/user';
import shop from './shop';
import tier from './tier';
import payment_method from './paystack';
import toggleMessage from './toggleMssg';
import campus from './campus'; 
import locale_modal from './locale'
import option from './option';
import sub_modal from './sub'
import boost_modal from './boost_modal'
import connect_modal from './connect'
import subscribed from './subscribed'
import products from './products'
import connect_purchase_modal from './connect_purchase'
let store = configureStore({
  reducer: {
    mode: userMode,
    auth: userAuth,
    cookie: cookie,
    products: products,
    sub_modal: sub_modal,
    boost_modal: boost_modal,
    connect_modal: connect_modal,
    subscribed: subscribed,
    user: user,
    shop: shop,
    connect_purchase_modal: connect_purchase_modal,
    tier: tier,
    payment_method: payment_method,
    drawer: drawer,
    campus: campus,
    locale_modal: locale_modal,
    option: option,
    toggleMessage: toggleMessage
  }

})


export default store;
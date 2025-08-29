import { configureStore } from '@reduxjs/toolkit';
import { userMode } from './reducer/mode';
import { userAuth } from './reducer/auth';
import cookie from './vendor/cookie';
import drawer from './vendor/drawer';
import user from './vendor/user';
import payment_method from './paystack';
import toggleMessage from './toggleMssg';
import campus from './campus';
import locale_modal from './locale'
import option from './option';
import sub_modal from './sub'
import subscribed from './subscribed'
let store = configureStore({
  reducer: {
    mode: userMode,
    auth: userAuth,
    cookie: cookie,
    sub_modal: sub_modal,
    subscribed: subscribed,
    user: user,
    payment_method: payment_method,
    drawer: drawer,
    campus: campus,
    locale_modal: locale_modal,
    option: option,
    toggleMessage: toggleMessage
  }

})


export default store;
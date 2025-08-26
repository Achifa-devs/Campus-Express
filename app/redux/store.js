import { configureStore } from '@reduxjs/toolkit';
import { userMode } from './reducer/mode';
import { userAuth } from './reducer/auth';
import cookie from './vendor/cookie';
import drawer from './vendor/drawer';
import user from './vendor/user';
// import location from './location';
import toggleMessage from './toggleMssg';
import campus from './campus';
import locale_modal from './locale'
import option from './option';
let store = configureStore({
  reducer: {
    mode: userMode,
    auth: userAuth,
    cookie: cookie,
    user: user,
    drawer: drawer,
    campus: campus,
    locale_modal: locale_modal,
    option: option,
    toggleMessage: toggleMessage
  }

})


export default store;
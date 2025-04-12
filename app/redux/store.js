import { configureStore } from '@reduxjs/toolkit';
import { userMode } from './reducer/mode';
import { userAuth } from './reducer/auth';
import cookie from './vendor/cookie';
import drawer from './vendor/drawer';
import user from './vendor/user';

let store = configureStore({
  reducer: {
    mode: userMode,
    auth: userAuth,
    cookie: cookie,
    user: user,
    drawer: drawer
  }

})


export default store;
import { configureStore } from '@reduxjs/toolkit';
import { userMode } from './reducer/mode';
import { userAuth } from './reducer/auth';
import cookie from './cookie';
import user from './user';

let store = configureStore({
  reducer: {
    mode: userMode,
    auth: userAuth,
    cookie: cookie,
    user: user
  }

})


export default store;
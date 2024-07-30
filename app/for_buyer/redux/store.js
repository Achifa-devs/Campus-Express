import { configureStore } from '@reduxjs/toolkit';
import { userMode } from './reducer/mode';
import { userAuth } from './reducer/auth';

let store = configureStore({
  reducer: {
    mode: userMode,
    auth: userAuth
  }

})


export default store;
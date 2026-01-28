import { configureStore } from '@reduxjs/toolkit';
import user from './user'
import option from './option'
const store = configureStore({
  reducer: {
    user: user,
    option: option
  },
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import user from './user'
import option from './option'
import campus from './campus'
import locale_modal from './modals/locale'
import mode from './mode'
const store = configureStore({
  reducer: {
    user: user,
    option: option,
    campus: campus,
    mode: mode,
    locale_modal: locale_modal
  },
});

export default store;

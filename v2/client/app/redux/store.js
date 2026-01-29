import { configureStore } from '@reduxjs/toolkit';
import user from './user'
import option from './option'
import campus from './campus'
import locale_modal from './modals/locale'
import mode from './mode'
import shop from './shop'
import chat from './chat'
import products from './products'
const store = configureStore({
  reducer: {
    user: user,
    option: option,
    campus: campus,
    chat: chat,
    mode: mode,
    shop: shop,
    products: products,
    locale_modal: locale_modal
  },
});

export default store;

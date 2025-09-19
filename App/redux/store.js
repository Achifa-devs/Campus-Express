import { configureStore } from '@reduxjs/toolkit';
import user from './info/user';
import chat from './info/chat';
import mode from './info/mode';
import unread from './info/unread_chats';
import shop from './info/shop';
import campus from './info/campus'; 
import locale_modal from './modal/locale';
import option from './info/option';
import sub_modal from './modal/sub';
import boost_modal from './modal/boost_modal';
import ads_modal from './modal/ads_modal';
import connect_modal from './modal/connect';
import products from './info/products';
import sponsored_modal from './modal/disruptor';
import connect_purchase_modal from './modal/connect_purchase';
import nested_nav from './nested_navigation'
const store = configureStore({
  reducer: {
    nested_nav: nested_nav,
    unread,
    chat,
    user,
    mode,
    shop,
    campus,
    locale_modal,
    option,
    sub_modal,
    boost_modal,
    ads_modal,
    connect_modal,
    products,
    sponsored_modal,
    connect_purchase_modal,
  },
});

export default store;

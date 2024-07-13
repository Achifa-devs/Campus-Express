import { configureStore } from '@reduxjs/toolkit';
import BuyerOverlayJsx from './buyer_store/BuyerOverlayJsx';
import ItemImages from './buyer_store/ItemImages';
import ActiveImg from './buyer_store/ActiveImg';
import Cart from './buyer_store/Cart';
import storedCategory from './buyer_store/Category';
import Type from './buyer_store/Type';

import userReducer from './auth_state/auth';
import menuSlice from './seller_store/settings_option';
import savedItem from './buyer_store/Save';
import SearchList from './buyer_store/SearchList';
import sellerData from './seller_store/seller';
import BuyerData from './buyer_store/BuyerData';
import delete_list from './seller_store/delete_list';
import pickup_channel from './buyer_store/pickup_channel';


let store = configureStore({
  reducer: {
    buyerJsx: BuyerOverlayJsx,
    itemImages: ItemImages,
    ActiveImg: ActiveImg,
    Cart: Cart, 
    SearchList: SearchList,
    pickup_channel: pickup_channel,
    // Save: Save,
    storedCategory: storedCategory,
    Type: Type,
    savedItem: savedItem,
    buyerData: BuyerData,
    user: userReducer,

    menu: menuSlice,
    sellerData: sellerData,
    delete_list: delete_list


  }

})


export default store;
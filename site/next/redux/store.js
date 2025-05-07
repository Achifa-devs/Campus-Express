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
import seller_data from './seller_store/seller_data';
import bankBeneficiary from './bank';
import buyer_data from './buyer_store/buyer_data';
import buyerInfo from './buyer_store/buyerInfo';
import accessory from './buyer_store/Aceessories';
import gender from './buyer_store/gender';


let store = configureStore({
  reducer: {
    buyerJsx: BuyerOverlayJsx,
    itemImages: ItemImages,
    ActiveImg: ActiveImg,
    Cart: Cart, 
    SearchList: SearchList,
    pickup_channel: pickup_channel,
    gender: gender,
    storedCategory: storedCategory,
    Type: Type,
    savedItem: savedItem,
    buyerData: BuyerData,
    user: userReducer,
    user_id: seller_data,
    user_id: buyer_data,
    accessory: accessory,
    buyer_info: buyerInfo,
    menu: menuSlice,
    sellerData: sellerData,
    delete_list: delete_list,
    bankBeneficiary: bankBeneficiary


  }

})


export default store;
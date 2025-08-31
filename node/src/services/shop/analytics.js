import { createContactClick, createShopView, findContactClickId, findShopViewId, updateContactClick, updateContactClickForUnkownBuyer, updateShopView } from "../../repositories/shop/analytics.js";


export const postShopView = async (payload) => {
  const { shop_id, user_id } = payload;

  try {
    // Business logic
    let existingView = await findShopViewId({ shop_id, user_id }); 
    if (existingView.length > 0) {
      return;
    } 
    let newView = await createShopView({ user_id, shop_id });
    if(newView < 1){
      throw new Error("Error occured while updating view");
    }
    let response = await updateShopView({ shop_id });
    return response;
  } catch (error) {
    console.log(error)
    throw new Error("Error occured while updating view");
  }
};

export const postContactClick = async (payload) => {
  const { product_id, user_id } = payload;

  try {
    // Business logic
    let existingView = await findContactClickId({ product_id, user_id }); 
    if (existingView.length > 0) {
      return;
    } 
    let newView = await createContactClick({ user_id, product_id });
    if(newView < 1){
      throw new Error("Error occured while updating view");
    }
    let response = await updateContactClick({ product_id });
    return response;
  } catch (error) {
    console.log(error)
    throw new Error("Error occured while updating view");
  }
};

export const postUpdateContactClickForUnknownCustomer = async (payload) => {
  const { unknown_user_id, registered_id } = payload;

  // Business logic
  
  const response = await updateContactClickForUnkownBuyer({ unknown_user_id, registered_id });
  
  return response;
};

import {
    createShop,
  // createShopView, 
  findShopDetailsById, 
  findShopReviewsById, 
  // findShopViewById, 
  // UpdateShopView
} from "../../repositories/vendor/shop.js";


export const getShopReviews = async (payload) => {
  const { seller_id } = payload;

  // Business logic
  const response = await findShopReviewsById({ seller_id });
  return response;
};

export const getShopDetails = async (payload) => {
  const { seller_id } = payload;

  // Business logic
  const response = await findShopDetailsById({ seller_id });

  return response;
};

export const postNewShop = async (payload) => {
  const { seller_id,shop_id,newShopName } = payload;

  // Business logic
  const response = await createShop({ seller_id,shop_id,newShopName });

  return response;
};


// export const postUpdateShop = async (payload) => {
//     const { data, seller_id } = payload;

//     let {
//         customerCareName, 
//         customerCarePhone, 
//         customerCareEmail, 
//         customerCareAddress1, 
//         customerCareAddress2, 
//         customerCareAddress3, 
//         customerCareAddress4, 
//         City, 
//         State, 
//         Country,
//     } = data
    
//     // Business logic
//     const response = await UpdateShopView({ data, seller_id });

//     return response;
// };

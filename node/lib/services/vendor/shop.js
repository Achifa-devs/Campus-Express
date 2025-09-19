import { createShop,
// createShopView, 
findShopDetailsById, findShopReviewsById, UpdateShop
// findShopViewById, 
// UpdateShopView
} from "../../repositories/vendor/shop.js";
export const getShopReviews = async payload => {
  const {
    user_id
  } = payload;

  // Business logic
  const response = await findShopReviewsById({
    user_id
  });
  return response;
};
export const getShopDetails = async payload => {
  const {
    user_id
  } = payload;

  // Business logic
  const response = await findShopDetailsById({
    user_id
  });
  return response;
};
export const postNewShop = async payload => {
  const {
    logo,
    shopName,
    description,
    address1,
    address2,
    address3,
    user_id
  } = payload;

  // Business logic
  console.log(user_id);
  try {
    const response = await createShop({
      logo,
      shopName,
      description,
      address1,
      address2,
      address3,
      user_id
    });
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const postUpdateShop = async payload => {
  const {
    title,
    description,
    user_id,
    logo
  } = payload;
  try {
    // Business logic
    const response = await UpdateShop({
      title,
      description,
      user_id,
      logo
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
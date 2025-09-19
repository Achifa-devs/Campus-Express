import { createShopReview,
// createShopView, 
findShopContentById, findShopDetailsById, findShopOwnerById, findShopReviewsById
// findShopViewById, 
// UpdateShopView
} from "../../repositories/shop/shop.js";
export const getShopOwner = async payload => {
  const {
    user_id
  } = payload;

  // Business logic
  const response = await findShopOwnerById({
    user_id
  });
  return response;
};
export const getShopReviews = async payload => {
  const {
    shop_id
  } = payload;

  // Business logic
  const response = await findShopReviewsById({
    shop_id
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
export const getShopContent = async payload => {
  const {
    user_id
  } = payload;

  // Business logic
  const response = await findShopContentById({
    user_id
  });
  return response;
};
export const postShopReview = async payload => {
  const {
    shop_id,
    product_id,
    buyer_id,
    review,
    date,
    comment,
    rating
  } = payload;
  try {
    // Business logic
    const response = await createShopReview({
      shop_id,
      product_id,
      buyer_id,
      review,
      date,
      comment,
      rating
    });
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

// export const postShopVisit = async (payload) => {
//   const { buyer_id, product_id } = payload;
//   // Business logic

//   let existingView = await findShopViewById({ product_id, buyer_id });
//   let newView = await createShopView ({ buyer_id, product_id });
//   if (existingView.length > 0) {
//     throw new Error("Already viewed")
//   } else if(newView < 1){
//     throw new Error("Error occured while updating view");
//   }
//   const response = await UpdateShopView({ product_id });

//   return response;
// };
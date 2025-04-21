import { createShopReview,
// createShopView, 
findShopContentById, findShopDetailsById, findShopOwnerById, findShopReviewsById
// findShopViewById, 
// UpdateShopView
} from "../../repositories/shop.js";
export const getShopOwner = async payload => {
  const {
    seller_id
  } = payload;

  // Business logic
  const response = await findShopOwnerById({
    seller_id
  });
  return response;
};
export const getShopReviews = async payload => {
  const {
    seller_id
  } = payload;

  // Business logic
  const response = await findShopReviewsById({
    seller_id
  });
  return response;
};
export const getShopDetails = async payload => {
  const {
    seller_id
  } = payload;

  // Business logic
  const response = await findShopDetailsById({
    seller_id
  });
  return response;
};
export const getShopContent = async payload => {
  const {
    seller_id
  } = payload;

  // Business logic
  const response = await findShopContentById({
    seller_id
  });
  return response;
};
export const postShopReview = async payload => {
  const {
    shop_id,
    seller_id,
    order_id,
    buyer_id,
    review,
    date,
    comment,
    rating
  } = payload;

  // Business logic
  const response = await createShopReview({
    shop_id,
    seller_id,
    order_id,
    buyer_id,
    review,
    date,
    comment,
    rating
  });
  return response;
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
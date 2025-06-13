import { createFavourite, deleteFavourite, findFavouriteById, findFavourites } from "../../repositories/shop/favourite.js";
export const getFavourite = async payload => {
  const {
    saveditems_id
  } = payload;

  // Business logic
  const response = await findFavouriteById({
    saveditems_id
  });
  return response;
};
export const getFavourites = async payload => {
  const {
    user_id
  } = payload;

  // Business logic
  const response = await findFavourites({
    user_id
  });
  return response;
};
export const postFavourite = async payload => {
  const {
    product_id,
    user_id
  } = payload;

  // Business logic
  const response = await createFavourite({
    product_id,
    user_id
  });
  return response;
};
export const postDeleteFavourite = async payload => {
  const {
    product_id,
    user_id
  } = payload;

  // Business logic
  const response = await deleteFavourite({
    product_id,
    user_id
  });
  return response;
};
import {
  createFavourite, 
  deleteFavourite, 
  findFavouriteById, 
  findFavourites
} from "../../repositories/shop/favourite.js";

export const getFavourite = async (payload) => {
  const { saveditems_id } = payload;

  // Business logic
  const response = await findFavouriteById({ saveditems_id });

  return response;
};


export const getFavourites = async (payload) => {
  const { buyer_id } = payload;

  // Business logic
  const response = await findFavourites({ buyer_id });

  return response;
};


export const postFavourite = async (payload) => {
  const { product_id, buyer_id } = payload;

  // Business logic
  const response = await createFavourite({ product_id, buyer_id });

  return response;
};


export const postDeleteFavourite = async (payload) => {
  const { product_id, buyer_id } = payload;

  // Business logic
  const response = await deleteFavourite({ product_id, buyer_id });

  return response;
};

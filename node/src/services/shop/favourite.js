import {
  createFavourite, 
  deleteFavourite, 
  findFavouriteById, 
  findFavourites
} from "../../repositories/shop/favourite.js";

export const getFavourite = async (payload) => {
  const { user_id, product_id } = payload;

  // Business logic
  const response = await findFavouriteById({ user_id, product_id });

  return response;
};


export const getFavourites = async (payload) => {
  const { user_id } = payload;
  // Business logic
  const response = await findFavourites({ user_id });

  return response;
};


export const postFavourite = async (payload) => {
  const { product_id, user_id } = payload;

  try {
    // Business logic
    await createFavourite({ product_id, user_id });
  
    const response = await findFavouriteById({ user_id, product_id });
  
    return response;
  } catch (error) {
    console.log(error)
  }
};


export const postDeleteFavourite = async (payload) => {
  const { product_id, user_id } = payload;

  try {
    // Business logic
    const res = await deleteFavourite({ product_id, user_id });
  
    if (res) {
      const response = await findFavouriteById({ user_id, product_id });
    
      return response;
    }
  } catch (error) {
    console.log(error)
  }
};

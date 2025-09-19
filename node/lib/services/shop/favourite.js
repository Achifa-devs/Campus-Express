import { createFavourite, deleteFavourite, findFavouriteById, findFavourites } from "../../repositories/shop/favourite.js";
import { findProductById } from "../../repositories/shop/product.js";
export const getFavourite = async payload => {
  const {
    user_id,
    product_id
  } = payload;

  // Business logic
  const response = await findFavouriteById({
    user_id,
    product_id
  });
  return response;
};
export const getFavourites = async payload => {
  const {
    user_id
  } = payload;

  // Business logic
  try {
    const response = await findFavourites({
      user_id
    });
    const books = await Promise.all(response.map(async item => {
      const product = await findProductById({
        product_id: item?.product_id
      });
      return {
        product: product[0],
        order: item
      };
    }));

    // console.log(books)
    return books;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const postFavourite = async payload => {
  const {
    product_id,
    user_id
  } = payload;
  try {
    // Business logic
    await createFavourite({
      product_id,
      user_id
    });
    const response = await findFavouriteById({
      user_id,
      product_id
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const postDeleteFavourite = async payload => {
  const {
    product_id,
    user_id
  } = payload;
  try {
    // Business logic
    const res = await deleteFavourite({
      product_id,
      user_id
    });
    if (res) {
      const response = await findFavouriteById({
        user_id,
        product_id
      });
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
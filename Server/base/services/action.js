const { 
    findProductById 
} = require("../models/product");

const {
  findFavouriteById,
  findFavourites,
  createFavourite,
  deleteFavourite,
  findShopViewId,
  createShopView,
  updateShopView,
  findContactClickId,
  createContactClick,
  updateContactClick,
  findShareId,
  createShare,
  updateShare,
  findImpressionId,
  createImpression,
  updateImpression,
  findShopOwnerById,
  findShopReviewsById,
  findShopDetailsById,
  findShopContentById,
  createShopReview,
} = require("../models/action.js");

// 🟢 FAVOURITES
async function getFavouriteService(payload) {
  const { user_id, product_id } = payload;
  return await findFavouriteById({ user_id, product_id });
}

async function getFavouritesService(payload) {
  const { user_id } = payload;
  try {
    const response = await findFavourites({ user_id });
    const books = await Promise.all(
      response.map(async (item) => {
        const product = await findProductById({ product_id: item?.product_id });
        return {
          product: product[0],
          order: item,
        };
      })
    );
    return books;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function createFavouriteService(payload) {
  const { product_id, user_id } = payload;
  try {
    await createFavourite({ product_id, user_id });
    return await findFavouriteById({ user_id, product_id });
  } catch (error) {
    console.log(error);
  }
}

async function deleteFavouriteService(payload) {
  const { product_id, user_id } = payload;
  try {
    const res = await deleteFavourite({ product_id, user_id });
    if (res) {
      return await findFavouriteById({ user_id, product_id });
    }
  } catch (error) {
    console.log(error);
  }
}

// 🟢 SHOP VIEWS
async function createShopViewService(payload) {
  const { shop_id, user_id } = payload;
  try {
    let existingView = await findShopViewId({ shop_id, user_id });
    if (existingView.length > 0) return;

    let newView = await createShopView({ user_id, shop_id });
    if (newView < 1) throw new Error("Error occurred while updating view");

    return await updateShopView({ shop_id });
  } catch (error) {
    console.log(error);
    throw new Error("Error occurred while updating view");
  }
}

// 🟢 CONTACT CLICKS
async function createContactClickService(payload) {
  const { product_id, user_id } = payload;
  try {
    let existingView = await findContactClickId({ product_id, user_id });
    if (existingView.length > 0) return;

    let newView = await createContactClick({ user_id, product_id });
    if (newView < 1) throw new Error("Error occurred while creating view");

    return await updateContactClick({ product_id });
  } catch (error) {
    console.log(error);
    throw new Error("Error occurred while updating view");
  }
}

// 🟢 SHARES
async function createShareService(payload) {
  const { product_id, user_id } = payload;
  try {
    let existingView = await findShareId({ product_id, user_id });
    if (existingView.length > 0) return;

    let newView = await createShare({ user_id, product_id });
    if (newView < 1) throw new Error("Error occurred while creating share");

    return await updateShare({ product_id });
  } catch (error) {
    console.log(error);
    throw new Error("Error occurred while updating share");
  }
}

// 🟢 IMPRESSIONS
async function createImpressionService(payload) {
  const { product_id, user_id } = payload;
  try {
    let existingView = await findImpressionId({ product_id, user_id });
    if (existingView.length > 0) return;

    let newView = await createImpression({ user_id, product_id });
    if (newView < 1) throw new Error("Error occurred while creating impression");

    return await updateImpression({ product_id });
  } catch (error) {
    console.log(error);
    throw new Error("Error occurred while updating impression");
  }
}

// 🟢 SHOP DETAILS
async function getShopOwnerService(payload) {
  const { user_id } = payload;
  return await findShopOwnerById({ user_id });
}

async function getShopReviewsService(payload) {
  const { shop_id } = payload;
  return await findShopReviewsById({ shop_id });
}

async function getShopDetailsService(payload) {
  const { user_id } = payload;
  return await findShopDetailsById({ user_id });
}

async function getShopContentService(payload) {
  const { user_id } = payload;
  return await findShopContentById({ user_id });
}

// 🟢 SHOP REVIEWS
async function createShopReviewService(payload) {
  const { shop_id, product_id, buyer_id, review, date, comment, rating } =
    payload;
  try {
    return await createShopReview({
      shop_id,
      product_id,
      buyer_id,
      review,
      date,
      comment,
      rating,
    });
  } catch (error) {
    console.log("error: ", error);
  }
}

// ✅ EXPORT ALL FUNCTIONS
module.exports = {
  getFavouriteService,
  getFavouritesService,
  createFavouriteService,
  deleteFavouriteService,
  createShopViewService,
  createContactClickService,
  createShareService,
  createImpressionService,
  getShopOwnerService,
  getShopReviewsService,
  getShopDetailsService,
  getShopContentService,
  createShopReviewService,
};

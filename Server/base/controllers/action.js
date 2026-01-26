import {
    createShopView,
    createShare,
    createImpression,
    createFavourite,
    deleteFavourite,
    getFavouriteService,
    getFavouritesService,
    createShopReviewService,
    getShopContentService,
    getShopDetailsService,
    getShopOwnerService,
    getShopReviewsService
} from "../services/action.js";


// ✅ Async wrapper to handle errors cleanly
const asyncHandler = (fn, successCode = 200) => async (req, res) => {
    try {
        const result = await fn(req, res);
        res.status(successCode).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


// ✅ Create / POST handlers (201)
export const createShopViewHandler = asyncHandler(
    async (req) => await createShopView(req.body),
    201
);

export const createShareHandler = asyncHandler(
    async (req) => await createShare(req.body),
    201
);

export const createImpressionHandler = asyncHandler(
    async (req) => await createImpression(req.body),
    201
);

export const createFavouriteHandler = asyncHandler(
    async (req) => await createFavourite(req.body),
    201
);

export const createShopReviewHandler = asyncHandler(
    async (req) => await createShopReviewService(req.body),
    201
);


// ✅ Delete handler (200)
export const deleteFavouriteHandler = asyncHandler(
    async (req) => await deleteFavourite(req.query)
);


// ✅ Get / Query handlers (200)
export const getFavouriteHandler = asyncHandler(
    async (req) => await getFavouriteService(req.query)
);

export const getFavouritesHandler = asyncHandler(
    async (req) => await getFavouritesService(req.query)
);

export const getShopOwnerHandler = asyncHandler(
    async (req) => await getShopOwnerService(req.query)
);

export const getShopReviewHandler = asyncHandler(
    async (req) => await getShopReviewsService(req.query)
);

export const getShopDetailsHandler = asyncHandler(
    async (req) => await getShopDetailsService(req.query)
);

export const getShopContentHandler = asyncHandler(
    async (req) => await getShopContentService(req.query)
);

// import {
//     getShopContent, 
//     getShopDetails, 
//     getShopOwner, 
//     getShopReviews, 
//     postShopReview, 
//     // postShopVisit
// } from "../../services/shop/shop.js";
// import { postNewShop, postUpdateShop } from "../../services/vendor/shop.js";


module.exports =  async function getShopHandler(req, res) {
    try {
        const respomse = await getShop(req.query);
        console.log(respomse)

        res.status(201).json({ success: true, data: respomse });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports =  async function getShopReviewsHandler(req, res) {
    try {
        const respomse = await getShopReviews(req.query);
        console.log(respomse)

        res.status(201).json({ success: true, data: respomse });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}



// module.exports =  async function GET_SHOP_DETAILS(req, res) {
//     try {
//         const shop_details = await getShopDetails(req.query);
//         res.status(201).json({ success: true, data: shop_details });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// }

module.exports =  async function createShopHandler(req, res) {
    try {
        const response= await createShop(req.body);
        res.status(201).json({ success: true, data: response});
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports =  async function updateShopHandler(req, res) {
    try {
        const response = await updateShop(req.body);

        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


module.exports =  async function getProductHandler(req, res) {
    
    try {
        const response = await getProduct(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports =  async function getProductsHandler(req, res) {
    try {
        const response = await getProducts(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports =  async function getProductThumbnailHandler(req, res) {
    try {
        const response = await getProductThumbnail(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports =  async function createProductHandler(req, res) {
    try {
        const response = await createProduct(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports =  async function updateProductHandler(req, res) {
    try {
        const response = await updateProduct(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports =  async function deleteProductHandler(req, res) {
    try {
        const response = await deleteProduct(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


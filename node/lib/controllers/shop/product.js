import { getProduct, getProducts, getProductThumbnail, postProductView, postUpdateProductViewForUnknownCustomer } from "../../services/shop/product.js";
export async function GET_PRODUCT(req, res) {
  try {
    const product = await getProduct(req.query);
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function GET_PRODUCTS(req, res) {
  try {
    const products = await getProducts({
      ...req.query,
      gender: req.headers.gender
    });
    res.status(201).json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function GET_PRODUCT_THUMBNAIL(req, res) {
  try {
    const productThumbnail = await getProductThumbnail(req.query);
    res.status(201).json({
      success: true,
      data: productThumbnail
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function POST_PRODUCT_VIEW(req, res) {
  try {
    const post_product_view = await postProductView(req.body);
    res.status(201).json({
      success: true,
      data: post_product_view
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function UPDATE_PRODUCT_VIEW_FOR_UNKNOWN_CUSTOMER(req, res) {
  try {
    const update_product_view_for_unknown_customer = await postUpdateProductViewForUnknownCustomer(req.body);
    res.status(201).json({
      success: true,
      data: update_product_view_for_unknown_customer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
import {
  cancelOrder, 
  confirmOrder, 
  createOrder, 
  createOrderWithId, 
  deleteOrder, 
  deleteOrderById, 
  findOrderById,
  findOrders
} from "../../repositories/shop/order.js";
import { findProductById } from "../../repositories/shop/product.js";
import {
  createRefund
} from "../../repositories/shop/refund.js";

export const getOrder = async (payload) => {
  const { product_id, user_id } = payload;

  // Business logic
  const response = await findOrderById({ product_id, user_id });

  if (!response.length === 0) {
    throw new Error("Error getting order");
    
  }
  const productHandler = await findProductById({ product_id: response[0].product_id });

  return {order: response[0], product: productHandler[0]};
};


export const getOrders = async (payload) => {
  const { user_id } = payload;

  // Business logic
  const response = await findOrders({ user_id });
  if (!response.length > 0) {
    
    
  }

  let book = response.map(async(item) => {
    let product = await findProductById({ product_id: item.product_id });
    return {order: item, product: product[0]}
  });

  const result = await Promise.all(book);

  return result;
};


export const postCancelOrder = async (payload) => {
  const { user_id,order_id,amount,reason } = payload;

  // Business logic
  const response = await cancelOrder({ order_id });

  if (!response) {
    return response;
    
  }
  const refundHandler = await createRefund({ user_id, order_id, amount, reason });

  return refundHandler;

};


export const postNewOrder = async (payload) => {
  const { buyer,product_id,stock,price,locale } = payload;

  // Business logic
  const response = await createOrder({ buyer,product_id,stock,price,locale });

  return response;
};


export const postRemoveOrder = async (payload) => {
  const { order_id } = payload;

  // Business logic
  const response = await deleteOrderById({ order_id });

  return response;
};


export const postConfirmOrder = async (payload) => {
  const { order_id,user_id,product_id } = payload;

  // Business logic
  const response = await confirmOrder({ order_id, user_id, product_id });
  // create inbox notification

  return response;
};

export const postUpdateOrder = async (payload) => {
  const { user_id,product_id,stock,price,locale,order_id } = payload;

  // Business logic
  let deleteHandler = await deleteOrder({ user_id, product_id });
  
  
  if (deleteHandler === 0) {
    throw new Error("error updating order");
  }

  let response = await createOrderWithId({ user_id, product_id, stock, price, locale, order_id });
  
  return response;
};

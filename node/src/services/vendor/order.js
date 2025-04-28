import {
  cancelOrder, 
  findOrderById,
  findOrders
} from "../../repositories/vendor/order.js";
import {
    findProductById
} from "../../repositories/vendor/product.js";
import {
  createRefund
} from "../../repositories/shop/refund.js";

export const getOrder = async (payload) => {
  const { order_id } = payload;

  // Business logic
  const response = await findOrderById({ order_id });

  if (!response.length === 0) {
    throw new Error("Error getting order");
    
  }
  const productHandler = await findProductById({ product_id: response[0].product_id });

  return {order: response[0], product: productHandler[0]};
};


export const getOrders = async (payload) => {
  const { seller_id } = payload;

  // Business logic
  const response = await findOrders({ seller_id });
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
  const { seller_id,order_id,amount,reason } = payload;

  // Business logic
  const response = await cancelOrder({ order_id });

  if (!response) {
    return response;
    
  }
  if (response?.havepaid) {
    const refundHandler = await createRefund({ seller_id, order_id,buyer_id: response.buyer_id, amount, reason });
  
    return refundHandler;
  }
  return response;

};


import {
  findDealById,
  createNewDeal,
  updateDealById,
  findPartnerById,
  findDealsByUserId,
  findDealsByVendorId,
  findTransactionByOrderId,
  findRefundsByVendorId,
  findRefundsByUserId,
  findDisputesAsVendor,
  findDisputesAsBuyer,
} from '../models/deals';
import { findProductById } from '../models/product';

export async function getDeal(payload) {
  const { product_id } = payload;
  const response = await findDealById({ product_id });
  return response;
}

export async function getDeals(payload) {
  const { user_id } = payload;

  // Find deals where user is the buyer
  const user_as_buyer = await findDealsByUserId({ user_id });

  // Find deals where user is the vendor
  const user_as_vendor = await findDealsByVendorId({ user_id });

  // Deals where user is the buyer (partner = vendor)
  const deals_from_user_as_buyer = await Promise.all(
    user_as_buyer.map(async (deal) => {
      const partner = await findPartnerById({ user_id: deal.vendor_id });
      const product = await findProductById({ product_id: deal.product_id });
      const transaction = await findTransactionByOrderId({ order_id: deal.order_id });
      const disputes = await findDisputesAsBuyer({ order_id: deal.order_id });

      return {
        order: deal,
        partner,
        product: product[0],
        transaction,
        disputes,
      };
    })
  );

  // Deals where user is the vendor (partner = buyer)
  const deals_from_user_as_vendor = await Promise.all(
    user_as_vendor.map(async (deal) => {
      const partner = await findPartnerById({ user_id: deal.user_id });
      const product = await findProductById({ product_id: deal.product_id });
      const transaction = await findTransactionByOrderId({ order_id: deal.order_id });
      const disputes = await findDisputesAsVendor({ order_id: deal.order_id });
      return {
        order: deal,
        partner,
        product: product[0],
        transaction,
        disputes,
      };
    })
  );

  // Combine both
  const result = [...deals_from_user_as_buyer, ...deals_from_user_as_vendor];
  return result;
}

export async function getRefunds(payload) {
  const { user_id } = payload;

  // Find refunds where user is the buyer
  const user_as_buyer = await findRefundsByUserId({ user_id });

  // Find refunds where user is the vendor
  const user_as_vendor = await findRefundsByVendorId({ user_id });

  // Refunds where user is the buyer
  const deals_from_user_as_buyer = await Promise.all(
    user_as_buyer.map(async (deal) => {
      const partner = await findPartnerById({ user_id: deal.vendor_id });
      const product = await findProductById({ product_id: deal.product_id });
      const transaction = await findTransactionByOrderId({ order_id: deal.order_id });
      const disputes = await findDisputesAsBuyer({ order_id: deal.order_id });
      return {
        order: deal,
        partner,
        product: product[0],
        transaction,
        disputes,
      };
    })
  );

  // Refunds where user is the vendor
  const deals_from_user_as_vendor = await Promise.all(
    user_as_vendor.map(async (deal) => {
      const partner = await findPartnerById({ user_id: deal.user_id });
      const product = await findProductById({ product_id: deal.product_id });
      const transaction = await findTransactionByOrderId({ order_id: deal.order_id });
      const disputes = await findDisputesAsVendor({ order_id: deal.order_id });
      return {
        order: deal,
        partner,
        product: product[0],
        transaction,
        disputes,
      };
    })
  );

  // Combine both
  const result = [...deals_from_user_as_buyer, ...deals_from_user_as_vendor];
  return result;
}

export async function updateDeal(payload) {
  const { order_id, status, pick_up_channels } = payload;
  const response = await updateDealById({ order_id, status, pick_up_channels });
  return response;
}

export async function createDeal(payload) {
  const { buyer, product_id, stock, price, locale, vendor_id, shipping_fee, date } = payload;
  const response = await createNewDeal({
    buyer,
    product_id,
    stock,
    price,
    locale,
    vendor_id,
    shipping_fee,
    date,
  });
  return response;
}

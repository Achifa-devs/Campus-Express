const { 
    findDealById,
    createNewDeal,
    updateDealById, 
    findPartnerById,
    findDealsByUserId,
    findDealsByVendorId
} = require("../models/deals");
const { findProductById } = require("../models/product");


exports.getDeal = async function (payload) {
  const { product_id } = payload;
  const response = await findDealById({ product_id });
  return response;
};

exports.getDeals = async function (payload) {
  const { user_id } = payload;

  // Find deals where user is the buyer
  const user_as_buyer = await findDealsByUserId({ user_id });

  // Find deals where user is the vendor
  const user_as_vendor = await findDealsByVendorId({ user_id });

  // Deals where user is the buyer (partner = vendor)
  const deals_from_user_as_buyer = await Promise.all(
    user_as_buyer.map(async (deal) => {
      const partner = await findPartnerById({ user_id: deal.vendor_id });
      const product = await findProductById({ product_id: deal.product_id }); // optional
      return {
        order: deal,
        partner,
        product: product[0]
      };
    })
  );

  // Deals where user is the vendor (partner = buyer)
  const deals_from_user_as_vendor = await Promise.all(
    user_as_vendor.map(async (deal) => {
      const partner = await findPartnerById({ user_id: deal.user_id });
      const product = await findProductById({ product_id: deal.product_id }); // optional
      return {
        order: deal,
        partner,
        product: product[0]
      };
    })
  );

  // Combine both
  const result = [...deals_from_user_as_buyer, ...deals_from_user_as_vendor];

  return result;
};


exports.updateDeal = async function (payload) {
  const { order_id,status,pick_up_channels } = payload;
  const response = await updateDealById({ order_id,status,pick_up_channels });
  return response;
};

exports.createDeal = async function (payload) {
  const { buyer, product_id, stock, price, locale, vendor_id, shipping_fee, date } = payload;
  const response = await createNewDeal({ buyer, product_id, stock, price, locale, vendor_id, shipping_fee, date });
  return response;
};

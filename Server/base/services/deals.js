const { 
    findDealById,
    findDealsById,
    createNewDeal,
    updateDealById 
} = require("../models/deals");


exports.getDeal = async function (payload) {
  const { product_id } = payload;
  const response = await findDealById({ product_id });
  return response;
};

exports.getDeals = async function (payload) {
  const { user_id } = payload; 
  const response = await findDealsById({ user_id });
  return response;
};

exports.updateDeal = async function (payload) {
  const { order_id,status,stock,price,pick_up_channels } = payload;
  const response = await updateDealById({ order_id,status,stock,price,pick_up_channels });
  return response;
};

exports.createDeal = async function (payload) {
  const { buyer, product_id, stock, price, locale, vendor_id, shipping_fee, date } = payload;
  const response = await createNewDeal({ buyer, product_id, stock, price, locale, vendor_id, shipping_fee, date });
  return response;
};

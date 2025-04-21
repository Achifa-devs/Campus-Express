import { cancelRefund, confirmRefund, createRefund, deleteRefundById, findRefundById, findRefunds } from "../../repositories/refund.js";
export const getRefund = async payload => {
  const {
    refund_id
  } = payload;

  // Business logic
  const response = await findRefundById({
    refund_id
  });
  return response;
};
export const getRefunds = async payload => {
  const {
    buyer_id
  } = payload;

  // Business logic
  const response = await findRefunds({
    buyer_id
  });
  return response;
};
export const postCancelRefund = async payload => {
  const {
    refund_id
  } = payload;

  // Business logic
  const response = await cancelRefund({
    refund_id
  });
  return response;
};
export const postNewRefund = async payload => {
  const {
    buyer_id,
    order_id,
    amount,
    reason
  } = payload;

  // Business logic
  const response = await createRefund({
    buyer_id,
    order_id,
    amount,
    reason
  });
  return response;
};
export const postRemoveRefund = async payload => {
  const {
    refund_id
  } = payload;

  // Business logic
  const response = await deleteRefundById({
    refund_id
  });
  return response;
};
export const postConfirmRefund = async payload => {
  const {
    refund_id
  } = payload;

  // Business logic
  const response = await confirmRefund({
    refund_id
  });
  return response;
};
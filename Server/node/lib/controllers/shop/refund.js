import { getRefund, getRefunds, postCancelRefund, postConfirmRefund, postNewRefund, postRemoveRefund } from "../../services/shop/refund.js";
export async function GET_REFUND(req, res) {
  try {
    const refund = await getRefund(req.query);
    res.status(201).json({
      success: true,
      data: refund
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function GET_REFUNDS(req, res) {
  try {
    const refunds = await getRefunds(req.query);
    res.status(201).json({
      success: true,
      data: refunds
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function CREATE_REFUND(req, res) {
  try {
    const create_refund = await postNewRefund(req.body);
    res.status(201).json({
      success: true,
      data: create_refund
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function CANCEL_REFUND(req, res) {
  try {
    const cancel_refund = await postCancelRefund(req.body);
    res.status(201).json({
      success: true,
      data: cancel_refund
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function CONFIRM_REFUND(req, res) {
  try {
    const confirm_refund = await postConfirmRefund(req.body);
    res.status(201).json({
      success: true,
      data: confirm_refund
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function REMOVE_REFUND(req, res) {
  try {
    const remove_refund = await postRemoveRefund(req.body);
    res.status(201).json({
      success: true,
      data: remove_refund
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
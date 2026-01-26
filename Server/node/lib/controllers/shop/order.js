import { getOrder, getOrders, postCancelOrder, postConfirmOrder, postNewOrder, postRemoveOrder, postUpdateOrder } from "../../services/shop/order.js";
export async function GET_ORDER(req, res) {
  try {
    const order = await getOrder(req.query);
    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function GET_ORDERS(req, res) {
  try {
    const orders = await getOrders(req.query);
    res.status(201).json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function POST_NEW_ORDER(req, res) {
  try {
    const new_order = await postNewOrder(req.body);
    res.status(201).json({
      success: true,
      data: new_order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function CANCEL_ORDER(req, res) {
  try {
    const cancel_order = await postCancelOrder(req.body);
    res.status(201).json({
      success: true,
      data: cancel_order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function REMOVE_ORDER(req, res) {
  try {
    const remove_order = await postRemoveOrder(req.body);
    res.status(201).json({
      success: true,
      data: remove_order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function CONFIRM_ORDER(req, res) {
  try {
    const confirm_order = await postConfirmOrder(req.body);
    res.status(201).json({
      success: true,
      data: confirm_order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function UPDATE_ORDER(req, res) {
  try {
    const update_order = await postUpdateOrder(req.body);
    res.status(201).json({
      success: true,
      data: update_order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
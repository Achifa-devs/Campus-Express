import { getVendor, postLoginVendor, postNewVendor, postResetVendorEmail, postResetVendorPhone, postResetVendorPwd, postUpdateVendorProfile } from "../../services/vendor/vendor.js";
export async function GET_VENDOR(req, res) {
  try {
    const vendor = await getVendor(req.query);
    res.status(201).json({
      success: true,
      data: vendor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function REGISTER_VENDOR(req, res) {
  try {
    const new_vendor = await postNewVendor(req.body);
    res.status(201).json({
      success: true,
      data: new_vendor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function LOGIN_VENDOR(req, res) {
  try {
    const login_vendor = await postLoginVendor(req.body);
    res.status(201).json({
      success: true,
      data: login_vendor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function RESET_VENDOR_EMAIL(req, res) {
  try {
    const reset_vendor_email = await postResetVendorEmail(req.body);
    res.status(201).json({
      success: true,
      data: reset_vendor_email
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function RESET_VENDOR_PHONE(req, res) {
  try {
    const reset_vendor_phone = await postResetVendorPhone(req.body);
    res.status(201).json({
      success: true,
      data: reset_vendor_phone
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function UPDATE_VENDOR_PROFILE(req, res) {
  try {
    const update_vendor_profile = await postUpdateVendorProfile(req.body);
    res.status(201).json({
      success: true,
      data: update_vendor_profile
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function RESET_PWD(req, res) {
  try {
    const reset_pwd = await postResetVendorPwd(req.body);
    res.status(201).json({
      success: true,
      data: reset_pwd
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
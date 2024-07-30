// const { AuthorizeWalletAccess, create_bill } = require("../../transactions/roles/admins");
const { RegisterAdmin, LogAdminIn, GetAdmin, Shop, GetUsers, verify_item, DeleteProduct } = require("../controller/admin");
const { admin_authentication } = require("../middleware/admin");
const { express, parser } = require("../modules");

let admin_route = express.Router();  


admin_route.get('');
admin_route.post('');

admin_route.post('/admin.registration', parser, RegisterAdmin);
admin_route.post('/admin.login', parser, LogAdminIn);

admin_route.post('/admin', parser, GetAdmin);
admin_route.post('/admin.authentication', parser, admin_authentication);
 
admin_route.post('/admin.verify-item', parser, verify_item);


admin_route.get('/admin.users', GetUsers);
admin_route.get('/admin.shop', Shop);


// admin_route.post('/admin.authentication', parser, admin_authentication);
// admin_route.post('/admin.check', parser, check_seller);

// admin_route.post('/admin.password-reset', parser, ResetPwd);

// admin_route.post('/admin.product-upload', parser, uploadProduct);
// admin_route.post('/admin.product-update', parser, updateProduct);
// admin_route.post('/admin.registration', parser, RegisterSeller);
// admin_route.post('/admin.overview', parser, Overview);
// admin_route.post('/admin.profile-update', parser, updateSellerProfile);


// admin_route.post('/admin.wallet-data', parser, WalletData);

// admin_route.get('/admin-edited-item', GetEditedItem);
// // admin_route.post('/admin.wallet-access', parser, AuthorizeWalletAccess);
// // admin_route.post('/admin.wallet-bill', parser, create_bill);

// admin_route.post('/admin.shop', parser, Shop);

// admin_route.post('/admin.password-update', parser, updatePwd);
// admin_route.post('/admin.password-token-check', parser, CheckPwdResetToken);

// admin_route.post('/admin.orders', parser, GetSellerOrder);
// admin_route.post('/admin.inbox', parser, GetSellerInbox);

// admin_route.post('/admin.email-validation', parser, ValidateEmail);
// admin_route.post('/admin.send-email', parser, SendEmail);

admin_route.delete('/admin.delete-product', parser, DeleteProduct);

module.exports = {admin_route}


/*




*/
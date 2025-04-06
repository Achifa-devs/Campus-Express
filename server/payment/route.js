const { process_payment } = require("./controllers");
const { express, parser } = require("./modules");

let payment_route = express.Router();  


payment_route.get('');
payment_route.post('');



payment_route.post('/payment', parser, process_payment);

module.exports = {payment_route} 

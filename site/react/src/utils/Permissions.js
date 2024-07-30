
import { buyer_route } from './routes/buyer_route';
import { seller_route } from './routes/seller_route';


const rolePermission = {
    seller: seller_route,
    buyer: buyer_route
}


export default rolePermission;
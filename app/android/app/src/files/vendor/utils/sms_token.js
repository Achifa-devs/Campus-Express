import axios from 'axios';
import { generateSixDigitId } from './Id';
import { storeData } from '../../utils/AsyncStore.js';
// import { storeData } from '../AsyncStore.js.js';
export async function send_token(info) {
    let token = generateSixDigitId();
    storeData('token', token)
    let {data} = await axios.post('http://192.168.0.3:9090/vendor/send-token', {token, info});
    if (!data?.success)return;
    return true;
}
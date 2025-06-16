import axios from 'axios';
import { generateSixDigitId } from './Id';
import { storeData } from '../../utils/AsyncStore.js';
// import { storeData } from '../AsyncStore.js.js';
export async function send_token(info) {
    let token = generateSixDigitId();
    storeData('token', token)
    let {data} = await axios.post('https://cs-server-olive.vercel.app/vendor/send-token', {token, info});
    if (!data?.success)return;
    return true;
}
import axios from 'axios';
import { Alert } from 'react-native';

const BASE_URL = 'https://cs-server-olive.vercel.app';

export const save_prod = async ({ user_id, product_id }) => {
    console.log(user_id, product_id);
    const res = await axios.post(`${BASE_URL}/favourite`, {
        user_id,
        product_id
    });
    return res.data;
};

export const unsave_prod = async ({ user_id, product_id }) => {
    const res = await axios.delete(`${BASE_URL}/favourite`, {
        params: {
            user_id,
            product_id
        }
    });
    return res.data;
};

export const get_saved = async ({ user_id, product_id }) => {
    const res = await axios.get(`${BASE_URL}/favourite`, {
        params: {
            user_id,
            product_id
        }
    });
    return res.data;
};

export const get_saved_list = async ({ user_id }) => {

    const res = await axios.get(`${BASE_URL}/favourites`, {
        params: { user_id }
    });

    return res.data;
};

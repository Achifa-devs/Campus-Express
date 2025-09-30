import axios from "axios"

export function save_item (user_id, product_id) {
    return new Promise((resolve, reject) => {
        axios.post('/api/store/favourite/save', {
            user_id: user_id,
            product_id: product_id
        })
        .then((res) => {
            if(res.data.bool){
                resolve(res.data.data)
            }else{
                reject("Internal server error")
            }
        })
        .catch((err) => reject(err))
    })
}

export function unsave_item (user_id, product_id) {
    return new Promise((resolve, reject) => {
        axios.delete('/api/store/favourite/unsave', {
            params: {
                user_id: user_id,
                product_id: product_id
            }
        })
        .then((res) => {
            if(res.data.bool){
                resolve(res.data.data)
            }else{
                reject("Internal server error")
            }
        })
        .catch((err) => reject(err))
    })
}

export function fetch_saved_items (user_id) {
    return new Promise((resolve, reject) => {
        axios.get(`/api/store/favourite`, {
            params: {
                user_id: user_id
            }
        })
        .then((res) => {
            if(res.data.bool){
                resolve(res.data.data)
            }else{
                reject("Internal server error")
            }
        })
        .catch((err) => reject(err))
    })
}
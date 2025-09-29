function save_item (user_id, product_id) {
    return new Promise((resolve, reject) => {
        axios.post('/api/store/wishlist', {
            user_id: user_id,
            product_id: product_id
        })
        .then((res) => {
            if(res.data.bool){
                resolve(res.data.data)
            }else{
                reject(res.data.message)
            }
        })
        .catch((err) => reject(err))
    })
}

function unsave_item (user_id, product_id) {
    return new Promise((resolve, reject) => {
        axios.post('/api/store/wishlist', {
            user_id: user_id,
            product_id: product_id
        })
        .then((res) => {
            if(res.data.bool){
                resolve(res.data.data)
            }else{
                reject(res.data.message)
            }
        })
        .catch((err) => reject(err))
    })
}
export const save_prod = async({user_id, product_id}) => {
    const res = await fetch(`https://cs-server-olive.vercel.app/favourite`, {
    method: 'post',
    body: JSON.stringify({
        user_id,
        product_id
    })
    });
    let response = await res.json();
    return response
}

export const unsave_prod = async({user_id, product_id}) => {
    const res = await fetch(`https://cs-server-olive.vercel.app/favourite`, {
    method: 'delete',
    body: JSON.stringify({
        user_id,
        product_id
    })
    });
    let response = await res.json();
    return response
}

export const get_saved = async({user_id, product_id}) => {
    const res = await fetch(`https://cs-server-olive.vercel.app/favourite`, {
    method: 'get',
    body: JSON.stringify({
        user_id,
        product_id
    })
    });
    let response = await res.json();
    return response
}

export const get_saved_list = async({user_id}) => {
    const res = await fetch(`https://cs-server-olive.vercel.app/favourites`, {
    method: 'get',
    body: JSON.stringify({
        user_id
    })
    });
    let response = await res.json();
    return response
}
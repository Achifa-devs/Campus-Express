export const save_prod = async({buyer_id, product_id}) => {
    const res = await fetch(`https://cs-server-olive.vercel.app/favourite`, {
    method: 'post',
    body: JSON.stringify({
        buyer_id,
        product_id
    })
    });
    let response = await res.json();
    console.log("response: ", response)
    if (response?.success) {
    
    } else {
    
    }
}
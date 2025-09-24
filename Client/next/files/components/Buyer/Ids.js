
export function CE_user_id(params) {
    let user_id = window.localStorage.getItem("CE_user_id")
    // let buyer_initial = window.localStorage.getItem("CE_buyer_name_initial")
    if(user_id){
      return user_id !== '' ? user_id : null
    }else{
        return null
    }
}

export function CE_buyer_INITIAL(params) {
    let buyer_initial = window.localStorage.getItem("CE_buyer_name_initial")
    if(buyer_initial){
      return buyer_initial !== '' ? buyer_initial : null
    }else{
        return null
    }
}
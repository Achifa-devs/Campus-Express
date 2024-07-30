
export function CE_buyer_ID(params) {
    let buyer_id = window.localStorage.getItem("CE_buyer_id")
    // let buyer_initial = window.localStorage.getItem("CE_buyer_name_initial")
    if(buyer_id){
      return buyer_id !== '' ? buyer_id : null
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
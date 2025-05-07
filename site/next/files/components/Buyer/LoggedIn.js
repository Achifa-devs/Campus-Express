import BuyerLogin from "../../Authorization/Buyer.js/Login"

export function isBuyerLoggedIn(resource) {
    let user_id = window.localStorage.getItem("CE_user_id")
    // let buyer_initial = window.localStorage.getItem("CE_buyer_name_initial")
    if(user_id){
      return user_id !== '' ? {bool: true, elem: ''} : {bool: false, elem: <div className="overlay" id="overlay" > <BuyerLogin query={resource}/> </div>}
    }else{
        return {bool: false, elem: <div className="overlay" id="overlay" > <BuyerLogin query={resource}/> </div>}
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


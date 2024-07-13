import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Btn = ({subTotal,url}) => {
    let navigate = useNavigate();

    return ( 
        <>
            <button className="shadow-sm" onClick={e => navigate(`/checkout/${url}/${btoa(subTotal)}`)}>
                <span>Checkout SubTotal&nbsp; </span>
                <span><small>(&#8358;</small>{new Intl.NumberFormat('en-us').format(subTotal)})</span>
            </button>
        </>
     );
}
 
export default Btn;
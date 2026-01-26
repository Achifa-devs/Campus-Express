import { useState } from "react";

const PriceSelect = ({edit,productPrice}) => {

    return ( 
        <>
            <div className="input-cnt">
                <label htmlFor="">Price</label>
                <input min={0} defaultValue={window.localStorage.getItem('draft_price')} name='price' onInput={e => productPrice(e.target.value)} type="number" placeholder="Price"  />
            </div>
        </>
     );
}
 
export default PriceSelect;
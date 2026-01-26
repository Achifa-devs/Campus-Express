import { useEffect, useState } from "react";

const GenderSelect = ({edit,productGender}) => {

    return ( 
        <>
            <div className="input-cnt">
                <label htmlFor="">Gender</label>

                <select onInput={e => productGender(e.target.value)} name="gender" id="">
                    <option value={''}>Select Gender</option>
                    {
                        ["Male", "Female", "Unisex"].map ((item, index) => 
                            item === window.localStorage.getItem('draft_gender')
                            ?
                            <option selected key={index} value={item}>{item}</option>
                            :
                            <option key={index} value={item}>{item}</option>
                        )
                    }

                </select>
            </div>
        </>
     );
}
 
export default GenderSelect;
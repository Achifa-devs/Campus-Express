import { useState } from "react";

const ConditionSelect = ({edit,productCondition,category,subCategory}) => {


    // let [productCondition, setProductCondition] = useState('')
    return ( 
        <>
            <div className="input-cnt">
                <label htmlFor="">Condition</label>
                <select onInput={e => productCondition(e.target.value)}  name="condition" id="">
                    <option value={''}>Select Product Condition</option>

                    {
                        category === "Health/Beauty" ? ["Brand New"].map ((item, index) => 
                            item === window.localStorage.getItem('draft_condition') 
                            ?
                            <option selected key={index} value={item}>{item}</option>
                            :
                            <option key={index} value={item}>{item}</option>
                        )

                        :
 
                        subCategory === "Underwear" ? ["Brand New"].map ((item, index) => 
                            item === window.localStorage.getItem('draft_condition') 
                            ?
                            <option selected key={index} value={item}>{item}</option>
                            :
                            <option key={index} value={item}>{item}</option>
                        )
                        
                        : 
                        
                        ["Brand New", "Fairly Used", "Refurbished","Used"].map((item, index) => 
                            item === window.localStorage.getItem('draft_condition') 
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
 
export default ConditionSelect;
import { useEffect, useState } from "react";

const TypeSelect = ({edit,category,productType,typeList}) => {
    useEffect(() => {
        document.querySelector('.type').firstChild.selected = true
    }, [category])
    return ( 
        <>

            <div className="input-cnt">
                <label htmlFor="">Type</label>
                <select className="type" defaultValue={''} onInput={e => productType(e.target.value)} name="type" id="">
                    <option value={''}>Select Product Type</option>

                    {
                        typeList.map((item, index) => 
                            item === window.localStorage.getItem('draft_c_type')
                            ? 
                            <option style={{textTransform: 'capitalize'}} selected key={index} value={item}>{item}</option>
                            :
                            <option style={{textTransform: 'capitalize'}} key={index} value={item}>{item}</option>
                        )
                    }
                </select>
            </div>    
        </>
     );
}
 
export default TypeSelect;
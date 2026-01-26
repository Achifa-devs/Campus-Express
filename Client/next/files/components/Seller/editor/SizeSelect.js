import { useEffect, useState } from "react";

const SizeSelect = ({edit,productSizeSelect,cType}) => {

    let [sizeList, setSizeList] = useState([])
    useEffect(() => {
        for(let i=1; i<100; i++){
            if(i > 50){
                break;
            }else{
                setSizeList(item => [...item, i])
            }

        }

    },[])

    return ( 
        <>
            <div className="input-cnt">
                <label htmlFor="">Size</label>
                {
                    cType === 'Foot Wear'
                    ?
                    <select onInput={e => productSizeSelect(e.target.value)} name="size" id="">
                        <option value={''}>Select Size</option>
                        {
                            sizeList.map ((item, index) => 
                                item === window.localStorage.getItem('draft_size')
                                ?
                                <option selected key={index} value={item}>{item}</option>
                                :
                                <option key={index} value={item}>{item}</option>
                            )

                            
                        }

                    </select>

                    :

                    <select onInput={e => productSizeSelect(e.target.value)} name="size" id="">
                        <option value={''}>Select Size</option>
                        {
                            ["XX-Large", "X-Large", "Large", "Medium", "Small", "X-Small", "XX-Small"].map ((item, index) => 
                                item === window.localStorage.getItem('draft_size')
                                ?
                                <option selected key={index} value={item}>{item}</option>
                                :
                                <option key={index} value={item}>{item}</option>
                            )
                        }

                    </select>
                }
            </div>
        </>
     );
}
 
export default SizeSelect;
import { useEffect, useState } from "react";
import items from '../../../items.json'

const CategorySelect = ({edit,productCategory}) => {

    let [categoriesList, setCategoriesList] = useState([])
    useEffect(() => { 
        setCategoriesList(items.items.category)
    },[])
   
    
    return ( 
        <>
            <div className="input-cnt" style={{opacity: '1', pointerEvents: 'all'}}>
                <label htmlFor="">Category</label>
                <select name="category" onInput={e =>productCategory(e.target.value)} id="">
                    <option value={''}>Select A Category</option>

                    {
                        categoriesList.map((item, index) => {
                            {/* <option key={index} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</option> */}

                            return(window.localStorage.getItem('draft_category') === Object.keys(item)[0]
                            ?
                            <option selected key={index} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</option>
                            :
                            <option key={index} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</option>)
                        })
                    }
                </select>
            </div>
        </>
     );
}
 
export default CategorySelect;
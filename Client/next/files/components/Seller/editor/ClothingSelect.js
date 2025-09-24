import { useEffect, useState } from "react";

const SubCategory = ({edit,subCategory_state,productSubCategory,category,cType,gender,categoriesList}) => {
    let [footWear,setFootWear] = useState([])
    let [maleList,setMaleList] = useState([])
    let [feMaleList,setFeMaleList] = useState([])

    useEffect(() => {

        let data = categoriesList.filter(data => Object.keys(data)[0] === category)
        setFootWear(data[0]["FootWear"])
        setMaleList(data[0]["ClothingMale"])
        setFeMaleList(data[0]["ClothingFemale"])

    },[categoriesList,subCategory_state])
     
    return ( 
        <>
            <div className="input-cnt">
                <label htmlFor="">Sub Category</label>
                <select onInput={e => productSubCategory(e.target.value)} name="sub-category" id="">
                    <option value={''}>Select Sub Category</option>
                    {
                        
                        cType === 'Foot Wear'
                        ?
                            
                            footWear?.map((item, index) => 
                                item === window.localStorage.getItem('draft_sub_category')
                                ?
                                <option selected key={index} value={item}>{item}</option>
                                :
                                <option key={index} value={item}>{item}</option>
                            )


                        :

                            gender === 'Male'

                            ?

                            maleList.map((item, index) => 
                                item === window.localStorage.getItem('draft_sub_category')
                                ?
                                <option selected key={index} value={item}>{item}</option>
                                :
                                <option key={index} value={item}>{item}</option>
                            )
                            :
                            feMaleList.map((item, index) => 
                                item === window.localStorage.getItem('draft_sub_category')
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
 
export default SubCategory;
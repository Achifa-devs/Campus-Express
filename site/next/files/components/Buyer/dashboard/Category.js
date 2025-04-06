import { useEffect, useState } from "react";
import items from '../../../items.json'
import { GetItems } from "../../../api/buyer";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryTo } from "../../../redux/buyer/Category";

const Category = () => {
    let [categoriesList, setCategoriesList] = useState([])
    let {category} = useSelector(s => s.Category)

    useEffect(() => {
        setCategoriesList(items.items.category)
    },[])

    let dispatch = useDispatch()

    useEffect(() => {
        
    }, [category])


    

    return ( 
        <>
            <div className="buyer-category shadow-sm">
                <ul>

                    <li style={{borderBottom: category === 'trends' ? '1px solid orangered' : 'none'}} onClick={e => dispatch(setCategoryTo(e.target.innerHTML.toLowerCase()))}>
                        Trends
                    </li>

                   
                    {
                        categoriesList.map((item, index) => 
                            <li style={{borderBottom: category === Object.keys(item)[0].toLocaleLowerCase() ? '1px solid orangered' : 'none'}} onClick={e => dispatch(setCategoryTo(e.target.innerHTML.toLowerCase()))} key={index}>
                                {Object.keys(item)[0]}
                            </li>
                        )
                    }
                    
                </ul>
            </div>
        </>
     );
}
 
export default Category;
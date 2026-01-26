import { useEffect, useState } from "react"
import { GetSeller } from "../../../api/seller/get"
import { useSelector } from "react-redux"


const LocationSelect = ({edit,productLocale}) => {
    let [state, setState] = useState('')
    let [campus, setCampus] = useState('')
    let {sellerData} = useSelector(s=> s.sellerData);

    useEffect(() => {
        setCampus(sellerData?.campus)
        setState(sellerData?.state)
        productLocale(sellerData?.state + ',' + ' ' + sellerData?.campus)
    }, [sellerData])


    return ( 
        <>
            <div className="input-cnt">
                <label htmlFor="">Location</label>

                {/* <select onInput={e => productLocale(e.target.value)} name="condition" id="">
                    <option value={''}>Select Location</option>
                    {
                        ["Male", "Female", "Unisex"].map ((item, index) => 
                            item === edit.condition
                            ?
                            <option selected key={index} value={item}>{item}</option>
                            :
                            <option key={index} value={item}>{item}</option>
                        )
                    }
                </select> */}

                <input type="text" value={state + ',' + ' ' + campus} />
            </div>
        </>
     );
}
 
export default LocationSelect;
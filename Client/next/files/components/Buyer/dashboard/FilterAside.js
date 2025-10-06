import { useEffect, useState } from "react";
import items from '../../../items.json'
import { data, school_choices } from "../../../location";
import { useDispatch, useSelector } from "react-redux";
import '../../../styles/Buyer/FilterAside.css'

const FilterAside = ({
    applyFilter,
    ChangeCampus,
    ChangeCondition,
    ChangePrice,
    ChangeCategory,
    ChangeState,
    ChangeSubCategory,
    category,
}) => {

    let [school, setSchool] = useState([])
    let [categoriesList, setCategoriesList] = useState([])
    let [typeList, setTypeList] = useState([])

    let plans = [
        {price: 3000, title: 'Premium', description: 'Exclusive Features for you to sell', features: ['Appear on the Search List', 'Appear on Trends', 'Visible to more Buyers']}, 
        {price: 1500, title: 'Standard', description: 'Top Notch Features for you to sell', features: ['Appear on the Search List', 'Appear on Trends', 'Visible to more Buyers']},
        {price: 750, title: 'Basic', description: 'Basic Features for you to sell', features: ['Appear on the Search List', 'Appear on Trends', 'Visible to more Buyers']}, 
        {price: 0, title: 'Free', description: 'Startup Features for you to sell', features: ['Appear on the Search List', 'Appear on Trends', 'Visible to more Buyers']}]

    useEffect(() => {
        setCategoriesList(items.items.category)
    },[])

    useEffect(() => {
        let type = categoriesList.filter(item => Object.keys(item)[0] === category)[0]
        if(type){
            setTypeList(type[category])
        }
    },[category])

    let dispatch = useDispatch()
    let [minPrice, setMinPrice] = useState(0)
    let [maxPrice, setMaxPrice] = useState(0)

    function setCampusListAfterStateSelect(state) {
        setSchool([])
        let stateIndex = data.filter(item =>  item?.label?.toLowerCase() === state?.toLowerCase())
        let index = data.indexOf(stateIndex[0]);
        let campuses = Object.values(school_choices).reverse();
        index < 0 ? setSchool([]) : setSchool(campuses[index])
    }

    function handleOverlay(e) {
        let elem = document.querySelector('.buyer-overlay');
        if(elem.hasAttribute('id')){
            elem.removeAttribute('id')
        }else{
            elem.setAttribute('id', 'buyer-overlay')
        }
    }

    let [category_checked, set_category_checked] = useState(false)
    let [condition_checked, set_condition_checked] = useState(false)
    let [price_checked, set_price_checked] = useState(false)
    let [location_checked, set_location_checked] = useState(false)

    return ( 
        <>
            <div className="card border-0 shadow-sm buyer-filter" style={{
                height: 'fit-content',
                borderRadius: '10px'
            }}>
                {/* Header */}
                <div className="card-header bg-white border-bottom">
                    <h5 style={{color: '#FF4500'}} className="mb-0 text-center fw-semibold">
                        Filter Section
                    </h5>
                </div>

                {/* Filter Content */}
                <div className="card-body p-3" style={{maxHeight: '70vh', overflowY: 'auto'}}>
                    
                    {/* Category Filter */}
                    <div className="mb-4">
                        <div className="form-check d-flex align-items-center mb-2">
                            <input 
                                className="form-check-input me-2" 
                                type="checkbox" 
                                onChange={e => set_category_checked(!category_checked)}
                                style={{cursor: 'pointer'}}
                            />
                            <label className="form-check-label fw-semibold text-dark small">
                                Category
                            </label>
                        </div>
                        <select 
                            className="form-select form-select-sm mb-2" 
                            onChange={e => ChangeCategory(e.target.value)}
                        >
                            <option value={''}>Select A Category</option>
                            {categoriesList.map((item, index) => 
                                Object.keys(item)[0]?.toLowerCase() === category?.toLowerCase() ?
                                <option key={index} selected value={Object.keys(item)[0]}>
                                    {Object.keys(item)[0]}
                                </option>
                                :
                                <option key={index} value={Object.keys(item)[0]}>
                                    {Object.keys(item)[0]}
                                </option>
                            )}
                        </select>

                        <select 
                            className="form-select form-select-sm" 
                            onChange={e => ChangeSubCategory(e.target.value)}
                        >
                            <option value={''}>Select Product Type</option>
                            {typeList.map((item, index) => 
                                <option key={index} value={item}>{item}</option>
                            )}
                        </select>
                    </div>

                    {/* Condition Filter */}
                    <div className="mb-4">
                        <div className="form-check d-flex align-items-center mb-2">
                            <input 
                                className="form-check-input me-2" 
                                type="checkbox" 
                                onChange={e => set_condition_checked(!condition_checked)}
                                style={{cursor: 'pointer'}}
                            />
                            <label className="form-check-label fw-semibold text-dark small">
                                Condition
                            </label>
                        </div>
                        <select 
                            className="form-select form-select-sm" 
                            onChange={e => ChangeCondition(e.target.value)}
                        >
                            <option value={''}>Select Product Condition</option>
                            {["Brand New", "Fairly Used", "Refurbished","Used"].map((item, index) => 
                                <option key={index} value={item}>{item}</option>
                            )}
                        </select>
                    </div>

                    {/* Price Range Filter */}
                    <div className="mb-4">
                        <div className="form-check d-flex align-items-center mb-2">
                            <input 
                                className="form-check-input me-2" 
                                type="checkbox" 
                                onChange={e => set_price_checked(!price_checked)}
                                style={{cursor: 'pointer'}}
                            />
                            <label className="form-check-label fw-semibold text-dark small">
                                Price Range
                            </label>
                        </div>
                        <div className="row g-2">
                            <div className="col-6">
                                <input 
                                    type="number" 
                                    className="form-control form-control-sm" 
                                    placeholder="From..." 
                                    onChange={e => {
                                        setMinPrice(parseInt(e.target.value)); 
                                        ChangePrice([parseInt(e.target.value), maxPrice])
                                    }}
                                    defaultValue={new Intl.NumberFormat('en-us').format(minPrice)}
                                />
                            </div>
                            <div className="col-6">
                                <input 
                                    type="number" 
                                    className="form-control form-control-sm" 
                                    placeholder="To..." 
                                    onChange={e => {
                                        setMaxPrice(parseInt(e.target.value)); 
                                        ChangePrice([minPrice, parseInt(e.target.value)])
                                    }}
                                    defaultValue={new Intl.NumberFormat('en-us').format(maxPrice)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location Filter */}
                    <div className="mb-4">
                        <div className="form-check d-flex align-items-center mb-2">
                            <input 
                                className="form-check-input me-2" 
                                type="checkbox" 
                                onChange={e => set_location_checked(!location_checked)}
                                style={{cursor: 'pointer'}}
                            />
                            <label className="form-check-label fw-semibold text-dark small">
                                Location
                            </label>
                        </div>
                        <select 
                            className="form-select form-select-sm mb-2" 
                            onChange={e => {
                                ChangeState(e.target.value)
                                setCampusListAfterStateSelect(e.target.value)
                            }}
                        >
                            <option value={''}>Select State</option>
                            {data?.map((item, index) => 
                                <option key={index} value={item.label}>{item.label}</option>
                            )}
                        </select>

                        <select 
                            className="form-select form-select-sm" 
                            onChange={e => ChangeCampus(e.target.value)}
                        >
                            <option value={''}>Select Campus</option>
                            {school.map((item, index) => 
                                <option key={index} value={item.text}>{item.text}</option>
                            )}
                        </select>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="card-footer bg-white border-top p-3">
                    <div className="row g-2">
                        <div className="col-6">
                            <button 
                                className="btn btn-outline-secondary w-100"
                                onClick={e => {e.preventDefault(); handleOverlay()}}
                            >
                                Cancel
                            </button>
                        </div>
                        <div className="col-6">
                            <button 
                                style={{backgroundColor: '#FF4500'}}
                                className="btn text-white w-100 fw-semibold"
                                onClick={e => applyFilter(category_checked, price_checked, condition_checked, location_checked)}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    );
}
 
export default FilterAside;
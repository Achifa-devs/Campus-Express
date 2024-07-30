import { useEffect, useState } from "react";
import items from '../../../items.json'
import { data, school_choices } from "../../../location";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryTo } from "../../../redux/buyer_store/Category";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import '../../../styles/Buyer/FilterAside.css'
const Filterfilter = ({
    applyFilter,
    ChangeCampus,
    ChangeCondition,
    ChangePrice,
    ChangeCategory,
    ChangeState,
    ChangeSubCategory,
    category,
    // state
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
        // alert(category)
       let type = categoriesList.filter(item => Object.keys(item)[0] === category)[0]
       if(type){
            setTypeList(type[category])
       }
    },[category])

    let dispatch = useDispatch()
    let [minPrice, setMinPrice] = useState(0)
    let [maxPrice, setMaxPrice] = useState(0)
    // let [state, setstate] = useState('')

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

    

    return ( 
        <>
            <div className="buyer-filter shadow-sm" style={{
                height: 'fit-content',
                borderRadius: '10px'
            }}>
                {/* <br /> */}
                <h5 style={{fontWeight: '500', color: 'orangered', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Filter Section </h5>

                <div className="buyer-filter-cnt" style={{overflow: 'auto', height: 'auto'}}>
                    <div className="input-cnt" >
                        <div style={{height: 'fit-content', color: '#fff', width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                            <input style={{height: '20px', cursor: 'pointer', width: '20px'}} type="checkbox" name="" id="" />
                            &nbsp;
                            <label htmlFor="" style={{color: '#000', marginTop: '10px', fontWeight: '500', fontSize: 'small'}}>Category</label>
                        </div>
                        <select style={{height: '35px', width: '100%', float: 'left', padding: '5px'}} name="" onInput={e => ChangeCategory(e.target.value)} id="" >
                            <option value={''}>Select A Category</option>

                            {
                                categoriesList.map((item, index) => 
                                    

                                    Object.keys(item)[0]?.toLowerCase() === category?.toLowerCase()
                                    ?
                                    <option key={index} selected value={Object.keys(item)[0]}>{Object.keys(item)[0]}</option>
                                    :
                                    <option key={index} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</option>
                                )
                            }
                        </select>

                        <br /> 

                        <select onInput={e => ChangeSubCategory(e.target.value)} style={{height: '35px', width: '100%', float: 'left', padding: '5px'}} name="" id="">
                            <option value={''}>Select Product Type</option>

                            {
                                typeList.map((item, index) => 
                                    <option key={index} value={item}>{item}</option>
                                )
                            }
                        </select>
                    </div>

                    <div className="input-cnt" >
                        <div style={{height: 'fit-content', color: '#fff', width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                            <input style={{height: '20px', cursor: 'pointer', width: '20px'}} type="checkbox" name="" id="" />
                            &nbsp;
                            <label htmlFor="" style={{color: '#000', marginTop: '10px', fontWeight: '500', fontSize: 'small'}}>Condition</label>
                        </div>
                        <select style={{height: '35px', width: '100%', float: 'left', padding: '5px'}} onInput={e => ChangeCondition(e.target.value)} name="" id="">
                            <option value={''}>Select Product Condition</option>

                            {
                                ["Brand New", "Fairly Used", "Refurbished","Used"].map((item, index) => 
                                    <option key={index} value={item}>{item}</option>
                                )
                            }
                        </select>
                    </div>

                    <div className="input-cnt" >
                        <div style={{height: 'fit-content', color: '#fff', width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                            <input style={{height: '20px', cursor: 'pointer', width: '20px'}} type="checkbox" name="" id="" />
                            &nbsp;
                            <label htmlFor="" style={{color: '#000', marginTop: '10px', fontWeight: '500', fontSize: 'small'}}>Price Range</label>
                        </div>
                        {/* <RangeSlider min={0} max={1000000000} step={1} onInput={e => {
                            setMinPrice(e[0]); 
                            setMaxPrice(e[1]);
                            ChangePrice(e)
                        }}/> */}
                        <br />
                        <div>
                            <input style={{height: '35px', width: '40%', float: 'left'}} placeholder="From..." type="number" name="" id="" onInput={e => {setMinPrice(parseInt(e.target.value)); ChangePrice([parseInt(e.target.value), maxPrice])}} defaultValue={new Intl.NumberFormat('en-us').format(minPrice)} />
                            <input style={{height: '35px', width: '40%', float: 'right'}} placeholder="To..." type="number" name="" id=""  onInput={e => {setMaxPrice(parseInt(e.target.value)); ChangePrice([minPrice,parseInt(e.target.value)])}} defaultValue={new Intl.NumberFormat('en-us').format(maxPrice)} />
                        </div>
                    </div>

                    <div className="input-cnt" >
                        <div style={{height: 'fit-content', color: '#fff', width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                            <input style={{height: '20px', cursor: 'pointer', width: '20px'}} type="checkbox" name="" id="" />
                            &nbsp;
                            <label htmlFor="" style={{color: '#000', marginTop: '10px', fontWeight: '500', fontSize: 'small'}}>Location</label>
                        </div>
                        <select style={{height: '35px', width: '100%', float: 'left', padding: '5px'}} name="" id="" onInput={e => {
                            ChangeState(e.target.value)
                            setCampusListAfterStateSelect(e.target.value)
                        }}>
                            <option value={''}>Select State</option>

                            {
                                data?.map((item, index) => 
                                    <option key={index} value={item.label}>{item.label}</option>
                                )
                            }
                        </select>
                        <br />

                        <select style={{height: '35px', width: '100%', float: 'left', padding: '5px'}} name="" id="" onInput={e => {
                            ChangeCampus(e.target.value);
                        }}>
                            <option value={''}>Select Campus</option>

                            {
                                school.map((item, index) => 
                                    <option key={index} value={item.text}>{item.text}</option>
                                )
                            }
                        </select>
                    </div>

                    
                </div>

                <div className="buyer-filter-btn" style={{display: 'inline-block', width: '100%', justifyContent: 'space-between', padding: '10px'}}>
                    <button onClick={e => {e.preventDefault(); handleOverlay()}} style={{
                        height: '35px',
                        width: '46%',
                        float: 'left',
                        borderRadius: '10px',
                        outline: 'none',
                        padding: '10px',
                        border: 'none',
                        textAlign: 'center',
                        color: '#fff',
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        fontSize: 'medium',
                        fontWeight: '500',
                        backgroundColor: 'orangered',
                        margin: '0'
                    }}>
                        Cancel
                    </button>
                    <button onClick={applyFilter} style={{
                        height: '35px',
                        width: '46%',
                        float: 'right',
                        borderRadius: '10px',
                        outline: 'none',
                        padding: '10px',
                        border: 'none',
                        textAlign: 'center',
                        color: '#fff',
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        fontSize: 'medium',
                        fontWeight: '500',
                        backgroundColor: 'orangered',
                        margin: '0'
                    }}>
                        Apply
                    </button>
                </div>
            </div>
        </> 
     );
}
 
export default Filterfilter;
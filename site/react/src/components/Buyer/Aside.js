import { useEffect, useState } from "react";
import items from '../../items.json'
import { data, school_choices } from "../../location";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryTo } from "../../redux/buyer_store/Category";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
const BuyerAside = () => {
    let [screenWidth, setScreenWidth] = useState(0)
    let [categories, setCategories] = useState('')
    let [type, setType] = useState('')
    let [price, setPrice] = useState('')

    let [state, setState] = useState([])
    let [stateValue, setStateValue] = useState('')
    let [school, setSchool] = useState([])
    let [schoolValue, setSchoolValue] = useState('')
    let {category} = useSelector(s => s.Category)


    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

    useEffect(() => {
        setState(data)
    }, [])

   

    useEffect(() => {
        setSchool([])
        let stateIndex = data.filter(item =>  item.label.toLocaleLowerCase() === stateValue.toLocaleLowerCase())
        let index = data.indexOf(stateIndex[0]);
        let campuses = Object.values(school_choices).reverse();
        index < 0 ? setSchool([]) : setSchool(campuses[index])

    }, [stateValue])

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
       let type = categoriesList.filter(item => Object.keys(item)[0] === categories)[0]
       if(type){
            setTypeList(type[categories])
       }
    },[categories])

    let dispatch = useDispatch()

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
            <div className="buyer-aside">
                <div className="buyer-aside-cnt">
                    <h5 style={{fontWeight: '1000', color: 'orangered'}}>Filter Section </h5>
                    <div className="input-cnt" >
                        <div style={{height: 'fit-content', color: '#fff', width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                            <input style={{height: '20px', cursor: 'pointer', width: '20px'}} type="checkbox" name="" id="" />
                            &nbsp;
                            &nbsp;
                            <label htmlFor="" style={{color: '#000', fontWeight: 'bolder', fontSize: 'medium'}}>Category</label>
                        </div>
                        <select name="" onInput={e => {dispatch(setCategoryTo(e.target.innerHTML.toLowerCase())); setCategories(e.target.value)}} id="">
                            <option value={''}>Select A Category</option>

                            {
                                categoriesList.map((item, index) => 
                                    

                                    Object.keys(item)[0].toLocaleLowerCase() === category.toLocaleLowerCase()
                                    ?
                                    <option key={index} selected value={Object.keys(item)[0]}>{Object.keys(item)[0]}</option>
                                    :
                                    <option key={index} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</option>
                                )
                            }
                        </select>

                        <br />

                        <select name="" id="">
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
                            &nbsp;
                            <label htmlFor="" style={{color: '#000', fontWeight: 'bolder', fontSize: 'medium'}}>Condition</label>
                        </div>
                        <select name="" id="">
                            <option value={''}>Select Product Type</option>

                            {
                                ["Brand New", "Fairly Used", "Refurbished","Used"].map((item, index) => 
                                    <option key={index} value={item}>{item}</option>
                                )
                            }
                        </select>
                    </div>

                    <div className="input-cnt" >
                        <RangeSlider />
                        <div style={{height: 'fit-content', color: '#fff', width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                            <input style={{height: '20px', cursor: 'pointer', width: '20px'}} type="checkbox" name="" id="" />
                            &nbsp;
                            &nbsp;
                            <label htmlFor="" style={{color: '#000', fontWeight: 'bolder', fontSize: 'medium'}}>Price Range</label>
                        </div>
                        <div>
                            <input style={{height: '45px', width: '40%', float: 'left'}} placeholder="From..." type="number" name="" id="" />
                            <input style={{height: '45px', width: '40%', float: 'right'}} placeholder="To..." type="number" name="" id="" />
                        </div>
                    </div>

                    <div className="input-cnt" >
                        <div style={{height: 'fit-content', color: '#fff', width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                            <input style={{height: '20px', cursor: 'pointer', width: '20px'}} type="checkbox" name="" id="" />
                            &nbsp;
                            &nbsp;
                            <label htmlFor="" style={{color: '#000', fontWeight: 'bolder', fontSize: 'medium'}}>Location</label>
                        </div>
                        <select name="" id="" onChange={e => setStateValue(e.target.value)}>
                            <option value={''}>Select State</option>

                            {
                                state.map((item, index) => 
                                    <option key={index} value={item.label}>{item.label}</option>
                                )
                            }
                        </select>
                        <br />

                        <select name="" id="" onChange={e => setSchoolValue(e.target.value)}>
                            <option value={''}>Select Campus</option>

                            {
                                school.map((item, index) => 
                                    <option key={index} value={item.text}>{item.text}</option>
                                )
                            }
                        </select>
                    </div>
                    <br />

                    <div className="buyer-aside-btn" style={{display: 'inline-block', width: '100%', justifyContent: 'space-between'}}>
                        <button onClick={e => {e.preventDefault(); handleOverlay()}} style={{
                            height: '50px',
                            width: '46%',
                            float: 'left',
                            borderRadius: '5px',
                            outline: 'none',
                            border: 'none',
                            textAlign: 'center',
                            color: '#fff',
                            display: 'flex', 
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            fontSize: 'large',
                            fontWeight: '1000',
                            backgroundColor: 'orangered',
                            margin: '0'
                        }}>
                            Cancel
                        </button>
                        <button style={{
                            height: '50px',
                            width: '46%',
                            float: 'right',
                            borderRadius: '5px',
                            outline: 'none',
                            border: 'none',
                            textAlign: 'center',
                            color: '#fff',
                            display: 'flex', 
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            fontSize: 'large',
                            fontWeight: '1000',
                            backgroundColor: 'orangered',
                            margin: '0'
                        }}>
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default BuyerAside;
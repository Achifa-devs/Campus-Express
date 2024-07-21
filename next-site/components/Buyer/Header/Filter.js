import React, { 
    useEffect, 
    useState 
} from 'react'
import items from '../../../items.json'
import { 
    data, 
    school_choices 
} from "../../../location";
import { 
    useDispatch, 
    useSelector 
} from "react-redux"; 
import { 
    setCategoryTo 
} from "../../../redux/buyer_store/Category";
import filterSvg from '../../../public/filter-edit-svgrepo-com.svg'
import closeSvg from '../../../public/close-square-svgrepo-com (1).svg'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import '../../../styles/Buyer/FilterAside.css'

export default function Filter({
        ChangeCategory,
        ChangeSubCategory,
        ChangeCondition,
        ChangeState,
        ChangeCampus,
        ChangePrice,
        // state,
        category,
        applyFilter,
    }) {

    let [screenWidth, setScreenWidth] = useState(0)

    
    let dispatch = useDispatch();

    let [campuslist, setcampuslist] = useState([])
    let [minPrice, setMinPrice] = useState(0)
    let [maxPrice, setMaxPrice] = useState(0)
    // let [state, setState] = useState('')


    // let [categoryActive, setcategoryActive] = useState(false)
    // let [conditionActive, setconditionActive] = useState(false)
    // let [localeActive, setlocaleActive] = useState(false)
    // let [priceActive, setpriceActive] = useState(false)

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

    function setCampusListAfterStateSelect(state) {
        setcampuslist([])
        let stateIndex = data.filter(item =>  item?.label?.toLowerCase() === state?.toLowerCase())
        let index = data.indexOf(stateIndex[0]);
        let campuses = Object.values(school_choices).reverse();
        index < 0 ? setcampuslist([]) : setcampuslist(campuses[index])
    }

    let [categoriesList, setCategoriesList] = useState([])
    let [typeList, setTypeList] = useState([])


    useEffect(() => { 
        setCategoriesList(items.items.category)
    },[])

    useEffect(() => {
       let type = categoriesList.filter(item => Object.keys(item)[0] === category)[0]
       if(type){
            setTypeList(type[category])
       }
    },[category])

    function closeAside() {
        document.querySelector('.filter-overlay').removeAttribute('id');
    }


  return (
    <>
        <div className="filter-cnt" style={{height: '100%', borderTopRightRadius: '20px', borderBottomRightRadius: '20px'}}>
            <div onClick={closeAside} className="aside-close">
                <img src={closeSvg} style={{height: '30px', width: '30px'}} alt="" />
            </div>

            <div className="buyer-filter" style={{
                    height: 'calc(100% - 0px)',
                    position: 'relative',
                    borderRadius: '1.5px',
                    borderTopRightRadius: '20px', 
                    borderBottomRightRadius: '20px'
                }}>
                <div style={{textAlign: 'left', width: '100%', height: 'fit-content', fontWeight: '500', display: 'flex', flexDirection: 'column', fontSize: 'large', marginTop: '0', padding: '10px', color: '#fff', background: '#fff4e0'}}>
                    {/* <span style={{borderRadius: '5px',  width: '35px', height: '35px', color: 'orangered', display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'center'}}>
                        <img src={filterSvg} style={{height: '15px', width: '15px'}} alt="" />
                    </span> */}
                    <span>
                    {
                        
                        <>
                        
                            &nbsp;
                            {/* &nbsp; */}
                            <span style={{fontSize: 'small', cursor: 'pointer', color: '#FF4500'}}>Filter Panel</span>
                        </>
                    }
                    </span>
                </div>

                <div className="buyer-filter-cnt " style={{overflow: 'auto', height: '80vh'}}>
                    {/* <br /> */}
                    {/* <br /> */}
                    <div className="input-cnt" >
                        <div style={{height: 'fit-content', color: '#fff', width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                            {/* <input style={{height: '15px', cursor: 'pointer', width: '15px'}} type="checkbox" defaultChecked onInput={ChangeCategoryActive(!activeData[0])} name="category" id="category" /> */}
                            &nbsp;
                            <label htmlFor="category" style={{color: '#FF4500', marginTop: '6px', fontWeight: '400', fontFamily: 'Times New Roman', fontSize: 'small'}}>Category</label>
                        </div>
                        <select style={{height: '35px', width: '100%', float: 'left', padding: '5px'}} name="" onInput={e => 
                                {
                                    ChangeCategory(e.target.value)
                                    dispatch(setCategoryTo(e.target.value))
                                }
                            } id="">
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

                        {/* <br />  */}

                        <select style={{height: '35px', width: '100%', float: 'left', padding: '5px'}} onInput={e => ChangeSubCategory(e.target.value)} name="" id="">
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
                            {/* <input style={{height: '15px', cursor: 'pointer', width: '15px'}} type="checkbox" defaultChecked onInput={ChangeConditionActive(!activeData[1])} name="condition" id="condition" /> */}
                            &nbsp;
                            <label htmlFor="condition" style={{color: '#FF4500', marginTop: '6px', fontWeight: '400', fontFamily: 'Times New Roman', fontSize: 'small'}}>Condition</label>
                        </div>
                        <select onInput={e => ChangeCondition(e.target.value)}  style={{height: '35px', width: '100%', float: 'left', padding: '5px'}} name="" id="">
                            <option value={''}>Select Condition</option>

                            {
                                ["Brand New", "Fairly Used", "Refurbished","Used"].map((item, index) => 
                                    <option key={index} value={item}>{item}</option>
                                )
                            }
                        </select>
                    </div>

                    <div className="input-cnt" >
                        <div style={{height: 'fit-content', color: '#fff', width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                            {/* <input style={{height: '15px', cursor: 'pointer', width: '15px'}} type="checkbox" defaultChecked onInput={ChangePriceActive(!activeData[2])} name="price" id="price" /> */}
                            &nbsp;
                            <label htmlFor="price" style={{color: '#FF4500', marginTop: '6px', fontWeight: '400', fontFamily: 'Times New Roman', fontSize: 'small'}}>Price Range</label>
                        </div>
                        <RangeSlider min={0} max={1000000000} step={1} onInput={e => {
                            setMinPrice(e[0]); 
                            setMaxPrice(e[1]);
                            ChangePrice(e)
                            
                            
                            }}/>
                        <br />
                        <div>
                            <input style={{height: '35px', width: '40%', float: 'left'}} placeholder="From..." type="text" name="" id="" onInput={e => {setMinPrice(parseInt(e.target.value)); ChangePrice([parseInt(e.target.value), parseInt(maxPrice)])}} value={new Intl.NumberFormat('en-us').format(parseInt(minPrice))} />

                            <input style={{height: '35px', width: '40%', float: 'right'}} placeholder="To..." type="text" onInput={e => {setMaxPrice(parseInt(e.target.value)); ChangePrice([parseInt(minPrice),parseInt(e.target.value)])}} value={new Intl.NumberFormat('en-us').format(maxPrice)} name="" id="" />
                        </div>
                    </div>

                    <div className="input-cnt" >
                        <div style={{height: 'fit-content', color: '#fff', width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                            {/* <input style={{height: '15px', cursor: 'pointer', width: '15px'}} type="checkbox" defaultChecked onInput={ChangeLocationActive(!activeData[3])} name="locale" id="locale" /> */}
                            &nbsp;
                            <label htmlFor="locale" style={{color: '#FF4500', marginTop: '6px', fontWeight: '400', fontFamily: 'Times New Roman', fontSize: 'small'}}>Location</label>
                        </div>
                        <select style={{height: '35px', width: '100%', float: 'left', padding: '5px'}} name="" id="" onInput={e => {
                            ChangeState(e.target.value); 
                            setCampusListAfterStateSelect(e.target.value)
                        }}>
                            <option value={''}>Select State</option>

                            {
                                data.map((item, index) => 
                                    <option key={index} value={item.label}>{item.label}</option>
                                )
                            }
                        </select>
                        <br />

                        <select style={{height: '35px', width: '100%', float: 'left', padding: '5px'}} name="" id="" onInput={e => ChangeCampus(e.target.value)}>
                            <option value={''}>Select Campus</option>

                            {
                                campuslist.map((item, index) =>  
                                    <option key={index} value={item.text}>{item.text}</option>
                                )
                            }
                        </select>
                    </div>

                    
                </div>

                <div className="buyer-filter-btn" style={{display: 'flex', height: '100px', width: '100%', justifyContent: 'space-between', alignItems: 'flex-end', padding: '10px', position: 'absolute', bottom: '0'}}>
                    <button onClick={e => { document.querySelector('.filter-overlay').removeAttribute('id')}} style={{
                        height: '35px',
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
                        borderRadius: '5px',
                        outline: 'none',
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

        </div>
    </>
  )
}

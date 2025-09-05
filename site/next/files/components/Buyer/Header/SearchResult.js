import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import searchSvg from '../../../assets/search-svgrepo-com.svg'

const SearchResult = ({searchTop,searchLeft,searchDisplay,searchWidth}) => {
    let {
        SearchList
    } = useSelector(s => s.SearchList)

    let [screenWidth, setScreenWidth] = useState(0)
    
    
    let [searchInputWidth, setSearchInputWidth] = useState(0)
    let [searchBtnWidth, setSearchBtnWidth] = useState(0)

    let [searchRes, setSearchRes] = useState([])
    useEffect(() => {
        setSearchRes(SearchList)
    // console.log(searchInputWidth)

    }, [SearchList])

    // useEffect(() => {
    //     let width = window.innerWidth;
    //     setScreenWidth(width)
  
        
        
    // }, [])
  

    
    return (   
        <>

            <div onClick={e => {
                document.querySelector('.buyer-search-overlay').removeAttribute('id')
            }} className="buyer-search-overlay" style={{ display: searchDisplay}}>
                <div className="buyer-result shadow-lg" style={{left: `${searchLeft}px`, overflow: 'auto', top: `${10}px`, height: '500px', position: 'relative', width: `${searchWidth - 20}px`, padding: '5px', background: '#fff'}}>
                    <ul style={{margin: '0', padding: '0', color: '#000'}}>
                        
                    {
                        searchRes?.length > 0
                        ?
                        searchRes?.map((item, index) => 
                            <li style={{
                                height: 'auto',
                                width: '100%',
                                padding: '10px', 
                                borderLeft: '1px solid #FF4500',  
                                marginBottom: '10px',
                            }} className="shadow-sm" onClick={e => window.location.href=(`/store/product/${item[0]?.product_id}`)} key={index}>
                                <span style={{fontWeight: '500'}}></span>
                                &nbsp;
                                &nbsp; 
                                <span >{item?.title}</span>
                            </li>
                        )

                        :

                        <div style={{
                        height: 'calc(100vh - 200px)', 
                        width: '100%',
                        top: '200px',
                        display: 'flex', 
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        fontSize: 'large',
                        // background: 'red',
                        fontWeight: 'bold', 
                        color: '#FF4500',
                    }}>
                        <img src={searchSvg.src} style={{height: '50px', width: '50px'}}  alt="" />
                            <br />
                        <div>
                            Search Result Will Appear Here
                        </div>
                    </div>
                    }
                    </ul>
                </div>
            </div>
            
        </>
     );
}
 
export default SearchResult;
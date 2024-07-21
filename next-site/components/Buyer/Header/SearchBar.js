import '../../../styles/Buyer/small-screen.css'
import filterSvg from '../../../public/filter-edit-svgrepo-com.svg'
import { useEffect, useState } from 'react';
// import { setBuyerJsxTo } from '../redux/buyer/BuyerOverlayJsx';
import { useDispatch } from 'react-redux';
// import { GetSearchWord } from '../api/buyer';
import '../../../styles/search.css'
import { useNavigate } from 'react-router-dom';
import { setSearchListTo } from '../../../redux/buyer_store/SearchList';
import { GetSearchWord } from '../../../api/buyer/get';

const SearchBar = ({updateSearchText}) => {
  let [searchResultElem, setSearchResultElem] = useState('')

  let [searchChar, setSearchChar] = useState('')

  let [activeJsx, setActiveJsx]= useState(null)
  function handleOverlay(e) {
      let elem = document.querySelector('.buyer-overlay');
      if(elem.hasAttribute('id')){
        elem.removeAttribute('id')
      }else{
        elem.setAttribute('id', 'buyer-overlay')
      }
    }

    function openFilter() {
        document.querySelector('.filter-overlay').setAttribute('id', 'filter-overlay')
      }

      // let navigate = useNavigate()

  let BtnStyles = {
      height: '50px',
      width: '20%',
      borderTopRightRadius: '10px',
      borderBottomRightRadius: '10px',
      borderTopLeftRadius: '0px',
      borderBottomLeftRadius: '0px',
      outline: 'none',
      border: 'none',
      float: 'left',
      color: '#fff',
      fontSize: 'small',
      fontWeight: '500',
      backgroundColor: 'orangered',
      margin: '0'
  }

  useEffect(() => {
    async function getData() {
      if(searchChar !== '' && searchChar !== ' '){ 
        try {
           let result = await GetSearchWord(searchChar)
           dispatch(setSearchListTo(result))
           
        } catch (error) {
           console.log(error)
        }
   
       }
    }
    getData()
    
  }, [searchChar])

  let dispatch = useDispatch()

    return ( 
        <>
          {
            searchResultElem
          }
          <div style={{margin: '0 10px 0 10px'}}>
            <div className="input-cnt" style={{height: '70px', width: '80%', padding: '5px', display: 'inline-block', background: '#fff', margin: '0', float: 'left'}}>
                <input onFocus={e =>  navigate('/search')} onBlur={e => {
                  if(e.target !== e.currentTarget){
                    navigate('/')
                  }
                }} onInput={e => setSearchChar(e.target.value)} style={{width: '80%', float: 'left',margin: '0',borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px', background: 'rgb(255, 244, 224)'}} type="search" name="" placeholder="What Are You Looking For..." id="" />
                <button style={BtnStyles}>Search</button>
            </div>

            <div onClick={e => openFilter(e)} data-btn='filter' style={{height: '70px', width: '20%', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: '#fff', fontSize: 'small', margin: '0', float: 'right'}}>
                <div>
                    <img src={filterSvg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px'}} alt="" />
                </div>

                <div style={{color: '#FF4500'}}>Filter</div>
            </div>
          </div>

          {/* <br /> */}
        </>
     ); 
}
 
export default SearchBar;
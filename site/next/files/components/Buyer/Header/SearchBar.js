import '../../../styles/Buyer/small-screen.css'
import filterSvg from '../../../assets/filter-edit-svgrepo-com.svg'
import { useEffect, useState } from 'react';
// import { setBuyerJsxTo } from '../redux/buyer/BuyerOverlayJsx';
import { useDispatch } from 'react-redux';
// import { GetSearchWord } from '../api/buyer';
import '../../../styles/search.css'
import { useNavigate } from 'react-router-dom';
import { setSearchListTo } from '@/redux/buyer_store/SearchList';
import { usePathname } from 'next/navigation';
import { GetSearchWord } from '@/app/api/buyer/get';

const SearchBar = ({updateSearchText}) => {
  let [searchResultElem, setSearchResultElem] = useState('')
  let [searchChar, setSearchChar] = useState('')
  let [activeJsx, setActiveJsx]= useState(null)
  let dispatch = useDispatch()
  let pathname = usePathname()


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


  let BtnStyles = {
      height: '55px',
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

    return ( 
        <>
          {
            searchResultElem
          }
          <div className="shadow-sm" style={{margin: '0 5px 0 5px', position: 'sticky', top: '70px'}}>
            <div className="input-cnt shadow-sm" style={{height: 'auto', width: '100%', padding: '5px', display: 'inline-block', background: '#fff', margin: '0', float: 'left'}}>
                <input  onFocus={e =>  pathname.split('/').splice(-1)[0] !== 'search' ? window.location.href=('/search') : ''} onBlur={e => {
                  if(e.target !== e.currentTarget){
                    window.location.href=('/')
                  }
                }} onInput={e => setSearchChar(e.target.value)} style={{width: '80%', float: 'left',margin: '0',borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px', background: 'rgb(255, 244, 224)', height: '55px'}} type="search" name="" placeholder="What Are You Looking For..." id="" />
                <button style={BtnStyles}>Search</button>
            </div>

           
          </div>

          {/* <br /> */}
        </>
     ); 
}
 
export default SearchBar;
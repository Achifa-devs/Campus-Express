import { useEffect, useState } from "react";
import filterSvg from '../../../assets/filter-edit-svgrepo-com.svg'
import deleteSvg from '../../../assets/delete-svgrepo-com (1).svg'
// import dayjs from 'dayjs'
import greetPlugin from 'dayjs-greet'
import { useLocation, useNavigate } from "react-router-dom";
import usePath from "../../../hooks/usePath";
import { useDispatch, useSelector } from "react-redux";
import { DeleteItem } from "../../../api/seller/delete";
import { ifError } from "assert";
import { setDeleteListTo } from "../../../redux/seller_store/delete_list";

 
const Header = () => {

    let {
        sellerData
    } = useSelector(s=> s.sellerData);
    let {
        delete_list
    } = useSelector(s=> s.delete_list);
    let dispatch= useDispatch()

    let [deleteCnt, setDeleteCnt] = useState(false)
    let navigate = useNavigate()
    let location = useLocation()

    let path = usePath()
    // dayjs.extend(greetPlugin)
    

    let [activeHead, setActiveHead] = useState('') 

    useEffect(() => {
      delete_list.length > 0
      ?
      setDeleteCnt(true)
      :
      setDeleteCnt(false)

    }, [delete_list])
    
   

    useEffect(() => {

        let path = location.pathname.split('/').splice(-1)[0].split('.').splice(-1)[0]
        if(path === ''){
            setActiveHead(<h4 style={{fontFamily: 'cursive', textTransform: 'capitalize'}}> {sellerData?.fname} {sellerData?.lname}</h4>)
        }else if(path === 'editor'){
            setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Sell</h4>)
        }else if(path === 'inbox'){
            setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Inbox</h4>)
        }else if(path === 'shop'){
            setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Listing</h4>)
        }
        else if(path === 'orders'){
        //     setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Orders</h4>)
        // }else if(path === 'settings'){ 
            setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Settings</h4>)
        }else if(path === 'wallet'){
            setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Wallet</h4>)
        }else if(path === 'profile'){
            setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Profile</h4>)
        }
    }, [location])

    
    return ( 
        <>
            <div className="seller-header shadow-sm" style={{
                width: location.pathname.split('/').splice(-1)[0] === 'seller.signup' || location.pathname.split('/').splice(-1)[0] === 'seller.login' || location.pathname.split('/').splice(-1)[0] === 'seller.reset-password' ? '100vw' : '',
                color: '#fff',
                textAlign: 'center',
                alignItems: 'center',
                display: 'flex',
                padding: '0',
                position: 'sticky',
                backgroundColor: '#fff',
                top: '0',
                fontWeight: '500',
                background: 'orangered',
                zIndex: '1000',
                backgroundImage: 'url(../../../images/download (5).jpeg)',
                backgroundClip: 'content-box',
                backgroundSize: 'contain'
            }}>

                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',

                    background: 'orange',
                    width: '100%',
                    height: '100%',
                    zIndex: '2000',
                    padding: '10px',
                    display: deleteCnt ? 'flex' : 'none',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                }}>
                    <button onClick={async(e) => {
                        let overlay = document.querySelector('.overlay')
                        overlay.setAttribute('id', 'overlay');          
                        let response = await  DeleteItem(delete_list)
                        console.log(response)
                        if(response.bool){
                            document.querySelector('.listing-overlay').removeAttribute('id')
                            let list = [...document.querySelectorAll('.ads-card')]
                            list.map((data,index) => {
                                let id = data.dataset?.id;
                                response.ids.forEach(item => {
                                    if(item === id){
                                        list[index]?.remove();
                                        if(index+1===response.ids.length){
                                            document.querySelector('.overlay').removeAttribute('id')
                                        }
                                        let newList = delete_list.filter(item => item  !== id)
                                        dispatch(setDeleteListTo(newList))
                                    }
                                })
                            })
                            


                        }
                    }} style={{
                        padding: '10px',
                        background: '#FF4500',
                        width: 'auto',
                        position: 'relative',
                        height: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <span>
                            <img src={deleteSvg} style={{
                                height: '18px', 
                                width: '18px', 
                                color: '#fff',
                                fontSize: 'medium',
                            }} alt="" />
                        </span>
                        &nbsp;
                        {/* &nbsp; */}
                        <span style={{fontWeight: '400'}}>Delete</span>
                    </button>
                </div>
                <span>
                    <h2 style={{margin: '0 10px 0 10px', textTransform: 'capitalize'}}>{activeHead}</h2>
                </span>

                {
                    location.pathname.split('/').splice(-1)[0] === 'seller.shop' 
                    ?
                    <>
                        
                        <div className="dropdown" style={{
                            position: 'absolute',
                            right: '10px',
                            top: '12px'
                        }}>
                            <a className="btn btn-danger dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{background: 'orangered'}}>
                                <img src={filterSvg} style={{
                                    height: '20px', 
                                    width: '20px', 
                                    color: '#fff',
                                    position : 'absolute',
                                    right: '20px',
                                    top: '20px', 
                                    fontSize: 'medium',
                                }} alt="" />
                                Filter
                            </a>

                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Active</a></li>
                                <li><a className="dropdown-item" href="#">Inactive</a></li>
                                <li><a className="dropdown-item" href="#">Pending</a></li>
                            </ul>
                        </div>
                    </>
                    :
                    ''
                }

                {
                    location.pathname.split('/').splice(-1)[0] !== 'seller.signup' || location.pathname.split('/').splice(-1)[0] !== 'seller.login' || location.pathname.split('/').splice(-1)[0] !== 'seller.reset-password'
                    ?  
                    ''
                    : 
                    <span onClick={e=> path === 'signup' || path === 'login' ? navigate(`/seller.${path === 'signup' ? 'login' : 'signup'}`) : ''} 
                    style={{
                        color: 'orangered',
                        cursor: 'pointer',
                        float: 'right',
                        background: 'rgb(255,244,224)',
                        fontSize: 'small',
                        padding: '10px',
                        borderRadius: path === 'signup' || path === 'login' ? '5px' : '50%',
                        display: path === 'signup' || path === 'login' ? 'flex' : 'none'
                    }}>
                        {
                            path === 'signup' || path === 'login'
                            ?
                                <span 
                                style={{
                                    textTransform: 'capitalize'
                                }}>{path === 'signup' ? 'Login' : 'Signup'}</span>
                            : 

                            ''
                        }
                    </span>
                } 

               

            </div>

            
        </> 
     );
}
export default Header;                                                                                                       
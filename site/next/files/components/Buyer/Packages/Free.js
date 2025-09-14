// import { useEffect, useState } from "react";
// import img from '../../assets/download (3).jpeg'
// import locationSvg from '../../assets/location-svgrepo-com-1.svg'
// import timeSvg from '../../assets/clock-svgrepo-com.svg'
// import saveSvg from '../../assets/save-svgrepo-com.svg'
// import orderSvg from '../../assets/order-svgrepo-com (1).svg'
// import conditionSvg from '../../assets/condition-point-svgrepo-com.svg'
// import { useNavigate } from "react-router-dom";
// import cartSvg from '../../assets/cart-shopping-fast-svgrepo-com.svg'
// import filterSvg from '../../assets/filter-edit-svgrepo-com.svg'
// import { AddItemToCart, DeleteItemFromCart, GetItems, SaveItem, UnSaveItem } from "../../../api/buyer";
// import Thumbnail from "../Thumbnail";
// import { useDispatch, useSelector } from "react-redux";
// import { setCartTo } from "../../../redux/buyer/Cart";
// import { setSaveTo } from "../../../redux/buyer/Save";

// const Home = () => {
//     let {Cart} = useSelector(s => s.Cart)
//     let {Save} = useSelector(s => s.Save)

//     let [screenWidth, setScreenWidth] = useState(0)
//     let [items, setItems] = useState([])

//     let navigate = useNavigate()

//     useEffect(() => {
//         let width = window.innerWidth;
//         setScreenWidth(width)
//     }, [])

//     useEffect(() => {
//         GetItems()
//         .then((result) => {
//             setItems(result)
//         })
//         .catch(err => console.log(err))

//         console.log(Cart)
//     }, [])


//     let BtnStyles = {
//         height: screenWidth > 480 ? '60px' : '40px',
//         width: '100%',
//         borderRadius: '5px',
//         outline: 'none',
//         border: 'none',
//         float: 'right',
//         color: '#fff',
//         fontSize: 'small',
//         fontWeight: '500',
//         backgroundColor: 'orangered',
//         margin: '0'
//     }
//     let dispatch = useDispatch()

//     function AddToCart(e,product_id) {
//         e.target.disabled = true;

//         let cartList = [...Cart];
//         let duplicateSearch = cartList.filter(item => item.product_id === product_id)
//         if(cartList.length > 0){
//             if(duplicateSearch.length > 0){
//                 let newList = cartList.filter(item => item !== duplicateSearch[0])
//                 //dispatch(setCartTo(newList))
//                 DeleteItemFromCart(product_id, window.localStorage.getItem('CE_user_id'))
//                 .then((result) => {
//                     dispatch(setCartTo(result))
//                     e.target.disabled = false;
//                 })
//                 .catch((err) => {
//                     console.log(err)
//                 })
//             }else{
//                 dispatch(setCartTo([...Cart, product_id]))
//                 AddItemToCart(product_id, window.localStorage.getItem('CE_user_id'))
//                 .then((result) => {
//                     dispatch(setCartTo(result))
//                     e.target.disabled = false;
//                 })
//                 .catch((err) => {
//                     console.log(err)
//                 })
//             }
//         }else{
//             AddItemToCart(product_id, window.localStorage.getItem('CE_user_id'))
//             .then((result) => {
//                 dispatch(setCartTo(result))
//                 e.target.disabled = false;
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//         }
//     }

//     function Saver(e,product_id) {
//         e.target.disabled = true;

//         let saveList = [...Save];
//         let duplicateSearch = saveList.filter(item => item.product_id === product_id)
//         if(saveList.length > 0){
//             if(duplicateSearch.length > 0){
//                 // let newList = saveList.filter(item => item !== duplicateSearch[0])
//                 // dispatch(setSaveTo(newList))
//                 UnSaveItem(product_id, window.localStorage.getItem('CE_user_id'))
//                 .then((result) => {
//                     console.log(result)
//                     dispatch(setSaveTo(result))
//                     e.target.disabled = false;
//                 })
//                 .catch((err) => {
//                     console.log(err)
//                 })
//             }else{
                
//                 SaveItem(product_id, window.localStorage.getItem('CE_user_id'))
//                 .then((result) => {
//                     console.log(result)

//                     dispatch(setSaveTo(result))
//                     e.target.disabled = false;
//                 })
//                 .catch((err) => {
//                     console.log(err)
//                 })
//             }
//         }else{
//             SaveItem(product_id, window.localStorage.getItem('CE_user_id'))
//             .then((result) => {
//                 dispatch(setSaveTo(result))
//                 e.target.disabled = false;
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//         }
//     }

//     return ( 
//         <>
//             <div className="buyer-dashboard-body">

//                 { 
//                     items.map((item) => 
//                         <div className="cols" >
//                             <div className="card" >
//                                 <span  style={{background: 'orangered',display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute',color: '#000', borderRadius: '5px', top: screenWidth > 400 ? '15px' : '8px', left: screenWidth > 400 ? '15px' : '8px', padding: '2.5px'}}>
//                                     <span  style={{background: 'orangered',color: 'orangered', padding: '0'}}>
//                                         <img src={locationSvg} style={{height: screenWidth  > 480 ? '15px' : '8px', width: screenWidth  > 480 ? '20px' : '10px', marginBottom: '5px'}} alt="" />

//                                     </span>

//                                     <span  style={{background: 'orangered',color: '#fff', padding: '0',  fontSize: screenWidth > 480 ? 'x-small' : 'xx-small', fontWeight: '500'}}>
//                                         UNIZIK, Awka
//                                     </span>
//                                 </span>
//                                 <Thumbnail product_id={item.product_id} />

//                                 <div className="card-body">
                                    
//                                     {
//                                         screenWidth > 479
//                                         ?
//                                         <h6 onClick={e => navigate(`/product/${item.product_id}`)} >{item.title}</h6>
//                                         : 
//                                         <h3 onClick={e => navigate(`/product/${item.product_id}`)} >{item.title}</h3>
//                                     }

//                                     <hr  />
                                    
//                                     {
//                                         screenWidth > 479
//                                         ?
//                                         <h4 onClick={e => navigate(`/product/${item.product_id}`)} style={{marginBottom: '10px', fontWeight: '700'}}>&#8358;{
//                                             new Intl.NumberFormat('en-us').format(item.price)
//                                         }</h4>
//                                         : 
//                                         <h6 onClick={e => navigate(`/product/${item.product_id}`)} style={{marginBottom: '10px', fontWeight: '700'}}>&#8358;{new Intl.NumberFormat('en-us').format(item.price)}</h6>
//                                     }

//                                     <div onClick={e => navigate(`/product/${item.product_id}`)} style={{display: 'flex',background: '#fff', color: 'orangered',  alignItems: 'center', padding: '0'}}>
//                                     <span  style={{background: '#fff', color: '#000', borderRadius: '5px', top: '20px', left: '20px', padding: '5px'}}>
//                                         <span  style={{background: '#fff',color: 'orangered', padding: '0'}}>
//                                             <img src={conditionSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />

//                                         </span>
//                                         &nbsp;

//                                         <span  style={{background: '#fff',color: 'rgb(98, 98, 98)', padding: '0',  fontSize: 'small', fontWeight: '500'}}>
//                                             {item.condition}
//                                         </span>
//                                     </span>
                                        
                                        
//                                     </div>

//                                     <button onClick={e => Saver(e,item.product_id)} style={{position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', right: '5px', bottom: '35px', background: '#fff', color: '#626262', height: 'fit-content', width: 'fit-content'}}>
//                                         <img src={saveSvg} style={{height: '35px', width: '35px', position: 'relative',  margin: 'auto'}} alt="" />
//                                         <section style={{marginTop: '-8px'}}>
//                                             {[...Save].filter(savedItem => savedItem.product_id === item.product_id)[0] ? 'Unsave' : 'Save'}
//                                         </section>
//                                     </button>

//                                     {/*<div style={{position: 'absolute', right: '5px', bottom: '5px', fontSize: 'small', background: '#fff', color: '#626262'}}>
//                                         <span>
//                                             <img src={orderSvg} style={{height: '20px', width: '20px', marginBottom: '3px'}} alt="" />

//                                         </span>
//                                         &nbsp;
//                                         <span>
//                                             20 Orders
//                                         </span>
//                 </div>*/}
//                                 </div>

//                                 <button style={BtnStyles} onClick={e => AddToCart(e,item.product_id)}>

//                                     <span>
//                                         <img src={cartSvg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px',marginRight: '5px'}} alt="" />
//                                     </span>
//                                     <span>{[...Cart].filter(cart => cart.product_id === item.product_id)[0] ? 'Remove From Cart' : 'Add To Cart'}</span>
//                                 </button>
//                                 {/*<br />*/} 

//                                 {/*<div className="card-footer">
//                                     <img src={img} style={{height: '30px', width: '30px', borderRadius: '10px'}} alt="" />

//                                     <div style={{height: 'fit-content', width: 'fit-content', position: 'absolute', left: '40px', bottom: '5px', fontWeight: '800', fontSize: 'small'}} >Jacob.N.N</div>

//                                     <div style={{position: 'absolute', right: '5px', bottom: '5px', color: '#626262', fontSize: 'small', fontWeight: '500'}}>
//                                         <span>
//                                             <img src={timeSvg} style={{height: '20px', width: '20px', marginBottom: '3px'}} alt="" />

//                                         </span>
//                                         &nbsp;
//                                         <span>
//                                             2 days ago
//                                         </span>
//                                     </div>
//         </div>*/}

//                             </div>
//                         </div> 
//                     )
//                 }

               
                
//             </div>

            

//         </>
//      );
// }
 
// export default Home;
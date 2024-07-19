import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FavouriteSummary = ({Total, Method, Items}) => {

    // let meta = {
    //     immediate_purchase: window.location.pathname.split('/').length > 4 ? true : false,
    //     ce_id: buyer.buyer_id,
    //     cart: {unit: parseInt(window.location.pathname.split('/')[4].split('-')[1]), product_id: atob(window.location.pathname.split('/')[2])},
    // }
    let location = useLocation();

    let [immediate_check, set_immediate_check] = useState('')

    useEffect(() => {set_immediate_check(location.pathname)}, [location])

    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)},[]);
    function handleDeposit() {let overlay = document.querySelector('.overlay');overlay.setAttribute('id', 'overlay')};
    
    
    return ( 

        <>
            <div className="overlay" style={{padding: '20px'}} onClick={e => e.target === document.querySelector('.overlay') ? e.currentTarget.removeAttribute('id'): ''}>
                {
                    Method
                }
            </div>

            <div className="buyer-checkout-cnt" style={{display: screenWidth > 759 ? 'flex' :'none', width: '400px', margin: '0 20px 0 20px', padding: '0'}}>

                <div style={{borderBottom: "none"}}>
                    <span>Favourite Summary</span>
                </div>

                <div>
                    <small style={{float: "left"}}>Total Items</small>
                    <small style={{float: "right"}}> 
                        {Items?.length}</small>
                </div> 


                <div style={{height: "80px"}}>
                    <button className="shadow-sm" >
                        <span>Favourite SubTotal&nbsp; </span>
                        <span><small>(₦</small>{
                            Items.reduce((accumulator, currentObject) => parseInt(accumulator) + parseInt(currentObject.saved_item[0].price), 0)
                            })</span>
                    </button>
                </div>
                
            </div>

                {
                    screenWidth > 759
                ?

                    ''
                :
                    <div style={{
                        height: 'auto',
                        width: '100%',
                        padding: '10px',
                        position: 'absolute',
                        bottom: '0', 
                        left: '0',
                        background: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <button style={{position: 'relative', background: '#FF4500', color: '#fff'}}  className="shadow-sm" >
                            <span>Favourite SubTotal&nbsp; </span>
                            <span><small>(&#8358; </small>{new Intl.NumberFormat('en-us').format(Total)})</span>
                        </button>
                    </div>
                

                }
        </>
     );
}
 
export default FavouriteSummary;
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../../../styles/Seller/overlay.css' 
import Card from "./Card";
import items from '../../../items.json'
import { GetOverview } from "../../../api/seller/get";
import sellSvg from '../../../assets//sell-svgrepo-com.svg'
import { useSelector } from "react-redux";

const Home = () => {

    let [screenWidth, setScreenWidth] = useState(0)
    let navigate = useNavigate() 
    let location = useLocation()
    let {
        sellerData
    }=useSelector(s=> s.sellerData)
 
    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width) 
    }, [])

    let [total_sold, set_total_sold] = useState('...')
    let [total_for_sale, set_total_for_sale] = useState('...')
    let [total_unsold, set_total_unsold] = useState('...') 
    let [total_reported, set_total_reported] = useState('...')

    useEffect(() => {
        let params = location.search.split('=').splice(-1)[0]
        let overlay = document.querySelector('.overlay')
        if(params !== 'first_login'){
            overlay.setAttribute('id', 'overlay');
            GetOverview(window.localStorage.getItem("CE_seller_id"))
            .then((result) => {
                set_total_for_sale(result.total_sale)
                set_total_reported(result.total_reported)
                set_total_sold(result.total_sold)
                set_total_unsold(result.total_unsold)
                overlay.removeAttribute('id')
            })
            .catch((err) => {
                console.log(err)
            })
        }
       
    }, [])

    function setUpShop() {
        fetch('http://192.168.24.146:9090/seller.shop-setup', {
            method: 'post',
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(
                {
                   seller_id: window.localStorage.getItem('CE_seller_id')
                }
            )
        })
        .then(async(result) => {
            let response = await result.json();
            if(response){
                setUpWallet()
            }
        })
        .catch((err) => { 
            console.log('error--: ',err)
        })
    }

    function setUpWallet() {
        fetch('http://192.168.24.146:9090/seller.wallet-setup', {
            method: 'post',
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(
                {
                   seller_id: window.localStorage.getItem('CE_seller_id'),
                   phone: sellerData.phone
                } 
            )
        })
        .then(async(result) => {
            let response = await result.json();
            if(response){
                let overlay = document.querySelector('.overlay')
                overlay.removeAttribute('id')
                window.location.href=('/seller')

            }
        })
        .catch((err) => { 
            console.log('error--: ',err)
        })
    }

    useEffect(() => {
        console.log(sellerData)
        if(sellerData !== null){
            const urlParams = new URLSearchParams(location.search.split('?')[1]);
            const status = urlParams.get('status');
            // let params = location.search.split('=').splice(-1)[0]
            if(status === 'first_login'){
                let overlay = document.querySelector('.overlay')
                overlay.setAttribute('id', 'overlay');
                setUpShop()
            }
        }
    }, [sellerData])

   
    return (  
        <>

            <div className="overlay">
                <div className="loader">
                </div>
            </div>
            
            <div className="seller-home" style={{position: 'relative'}}>
                <div style={{padding: '10px', borderRadius: '5px', display: screenWidth > 760 ? 'none' : 'flex',  background: '#FF4500', color: '#fff', fontSize: 'large', position: 'fixed', right: '15px', bottom: '100px'}} onClick={e => navigate(`/seller.editor`) }>
                    <span>Sell</span>
                    &nbsp;
                    <span>
                        <img src={sellSvg} style={{height: '25px', width: '25px'}} alt="" />
                    </span>
                </div>
                <div className="seller-home-overview">

                    <ul>

                        <li style={{
                            fontSize: 'unset'
                        }}>
                            <h1>{total_for_sale}</h1>
                            <div><h6>Total Products For Sale </h6></div>

                        </li>

                        <li style={{
                            fontSize: 'unset'
                        }}> 
                            <h1>{total_sold}</h1>

                            <div><h6>Total Products Sold</h6></div>
                        </li>

                        <li style={{
                            fontSize: 'unset'
                        }}>
                            <h1>{total_unsold}</h1>
                            <div><h6>Total Products Unsold</h6></div>

                        </li>

                        <li > 
                            <div><h3>{total_reported}</h3></div>
                            <div><h6>Total Products Reported</h6></div>

                        </li>
                        
                       
                    </ul> 

                </div>

                

            </div>

            
        </>
     );
}
 
export default Home; 
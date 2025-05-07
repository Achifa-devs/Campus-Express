import edit from '../../assets/edit-svgrepo-com.svg'
import deleteSvg from '../../assets/delete-svgrepo-com (1).svg'
import { useEffect, useState } from 'react'
import jsAgo from 'js-ago'
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import Thumbnail from '../../components/Seller/Thumbnail'
import { useNavigate } from 'react-router-dom'
import '../../styles/Seller/overlay.css' 
import Body from '../../components/Seller/Ads.js/Body'
import SellerLayout from '../../layout/Seller'
import { GetItems } from '../../api/seller/get';
import { DeleteItem } from '../../api/seller/delete';
// import Inventory from '../../components/Seller/Ads.js/Inventory';

const Shop = () => {
    let navigate = useNavigate()
    let [Items, setItems] = useState([])
    let [loaderText, setLoaderText] = useState('Loading...')


    useEffect(() => {

        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
        GetItems(window.localStorage.getItem("CE_user_id"))
        .then((result) => { 
            setItems(result)
            overlay.removeAttribute('id')
            result.length < 1 
            ?
            setLoaderText('No item for sale, click here to start selling')
            :
            setLoaderText('')
        })
        .catch((err) => {
            console.log(err)
        }) 
    }, [])

    function DeleteProduct(e,product_id) {
        let overlay = document.querySelector('.overlay')
        //overlay.setAttribute('id', 'overlay');
        DeleteItem(window.localStorage.getItem('CE_user_id'),product_id)
        .then((result) => {
            console.log(result)
            // e.target.disabled = false;
            overlay.removeAttribute('id')
            navigate('/seller/shop')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return ( 
        <>
            <div className="overlay">
                <div className="loader">
                </div>
            </div>

            <div className="seller-main">
                <SellerLayout>

                    <div className="seller-libs" style={{ padding: '10px', flexDirection: 'row', justifyContent: 'flex-start'}}>
                    {

                        <Body cards={Items} />
                    } 

                    
                    </div> 
                </SellerLayout>

            </div>
        </>
     );
} 


 
export default Shop;
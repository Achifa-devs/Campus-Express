import '../../styles/Seller/x-large-screen.css'
import '../../styles/Seller/large-screen.css'
import '../../styles/Seller/medium-screen.css'
import '../../styles/Seller/small-screen.css'
import SellerLayout from "../../layout/Seller";
import TopView from "../../components/Seller/Profile/TopView";
import Body from "../../components/Seller/Profile/Body";
import { useEffect, useState } from 'react';
import { GetSellerPhoto, GetSellerWallet, GetShop } from '../../api/seller/get';
import { useSelector } from 'react-redux';
import userPhoto from '../../assets/svgrepo-com (2).svg'

const Me = () => {

    let {sellerData} = useSelector(s=> s.sellerData);
    let [shop, setShop] = useState('')

    let [photo, setPhoto] = useState(userPhoto)
    let [userData, setUserData] = useState()
    let [sellerWallet, setSellerWallet] = useState('')

    useEffect(() => {
        setUserData(sellerData)
        async function getPhoto(){
          let result = await GetSellerPhoto(window.localStorage.getItem('CE_user_id'))
          if(result?.file === 'null'){
              setPhoto(userPhoto)
          }else{
              setPhoto(result?.file)
          }
        }
        getPhoto()
      }, [sellerData])
  
      useEffect(() => {
        async function getPhoto(){
          let result = await GetSellerWallet(window.localStorage.getItem('CE_user_id'))
          if(result){
              setSellerWallet(result)
          }
        }
        getPhoto()
      }, [])
    
      useEffect(() => {
        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
        async function getShop() {
          let shop = await GetShop(window.localStorage.getItem("CE_user_id"))
          setShop(shop)
          overlay.removeAttribute('id')
        }
        getShop()
    
      }, [])
    return ( 
        <>

            <div className="notice-cnt" style={{margin: 'auto'}}>
                <span style={{margin: "0 15px 0 .5px"}}></span>
                <button className="notice-cnt-btn" style={{width: '40px', height: '30px', background: 'red', borderRadius: '2px', fontWeight: '500', fontSize: 'small'}}>
                    close
                </button>
            </div>

            
            <SellerLayout>
                <div className="seller-main">
                
                    <div className="seller-profile-cnt" style={{height: '100%'}}>

                        <TopView  photo={photo} userData={userData} />
                        <Body sellerWallet={sellerWallet} userData={userData} shop={shop} />
                        
                    </div>

                </div>
            </SellerLayout>
        </>
     );
}
 
export default Me;
import React, { 
  useEffect, 
  useRef, 
  useState 
} from 'react'
import items from '../../../items.json'
import '../../../styles/Seller/editOverlay.css'
import Reviews from './Reviews'
import { 
  GetItems,
  GetReviews, 
  // GetSeller, 
  GetShop, 
  GetSoldItems 
} from '../../../api/seller/get'
import { 
  UpdateInventory, 
  UpdateShop, 
  UpdateShopDesc, 
  UpdateShopTitle
} from '../../../api/seller/update'

import { 
  SendEmail, 
  SendSMS 
} from '../../../api/seller/post'
import Flw from '../../Payments/Flw'
import { useFlutterwave } from 'flutterwave-react-v3'
import Inventory from './Inventory'
import ItemsSold from './ItemsSold'
import Summary from './Summary'
import CoinComp from './Coin'
import University from './University'
import ShopRent from './ShopRent'
import Verification from './Verification'
import 'draft-js/dist/Draft.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function ContactEdit({email,phone,seller_id, name}) {
 

  return(
    <div className="profile-edit">
      <div className="seller-input-cnt">
          <section style={{width: '100%'}}>
              <label htmlFor="">Verify Email </label>

              <input type="text" value={email} />
              <br />
              <button onClick={e =>  SendEmail(email, seller_id, name)} style={{padding: '5px', height: 'fit-content'}}>Send verification link to this email</button>
              
          </section>
          
      </div>

      <div className="seller-input-cnt">
          <section style={{width: '100%'}}>
              <label htmlFor="">Verify Phone </label>
              <input type="text" value={phone} />
              <br />
              <button onClick={e => SendSMS(phone, seller_id, name)} style={{padding: '5px', height: 'fit-content'}}>Send verification link to this phone</button>

              
          </section>
          
      </div>

      {/* <div className="btn-cnt">
        <button>Cancel</button>
      </div> */}

    </div>
  )
}

function Coin({email,phone,seller_id, name}) {

  let [price, setPrice] = useState('')
  useEffect(() => {
    console.log(email,phone)
  },[price])

  const config = {
    public_key: 'FLWPUBK-502f1f73c8abf430f161a528241c198a-X',
    tx_ref: Date.now(),
    amount: parseInt(price) + 45,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
        email: email,
        phone_number: phone,
        name: name,
        ce_id: seller_id
    },
    customizations: {
    title: 'Campus Express',
    description: 'Campus Coin Purchase',
    logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);
  return(<div className="profile-edit" style={{background: '#FF4500'}}>

    <h2 style={{width: '100%', textAlign: 'center', color: '#fff', fontSize: '3.5vh', fontWeight: '500'}}>Campus Coin Exchange</h2>

    <div className="seller-input-cnt">
        <section style={{width: '100%'}}>
          <p style={{color: '#fff', padding: '10px', borderRadius: '5px', width: '100%', border: '1px solid #FF4500', padding: '10px 0 10px 0', fontWeight: '400'}}>Exchange Coin For Cash</p>

          <select name="" id="" style={{background: '#efefef'}}>
            {
              
              [<span>&#8358;100 for 10 Coin</span>, <span>&#8358;900 for 20 Coin</span>, <span>&#8358;1400 for 30 Coin</span>, <span>&#8358;1900 for 40 Coin</span>, <span>&#8358;2400 for 50 Coin</span>, <span>&#8358;2900 for 60 Coin</span>, <span>&#8358;3400 for 70 Coin</span>, <span>&#8358;3900 for 80 Coin</span>, <span>&#8358;4400 for 90 Coin</span>, <span>&#8358;4900 for 100 Coin</span>, <span>&#8358;5400 for 120 Coin</span>, <span>&#8358;5900 for 130 Coin</span>, <span>&#8358;6400 for 140 Coin</span>, ].map(item => 
                <option value="">{
                  item
                }</option>
              )
            }
          </select>

          <br />

          <button style={{border: '1px solid #fff'}}>
            Exchange Coin Now
          </button>
        </section>
        
    </div>

    {/* <div className="btn-cnt">
      <button>Cancel</button>
    </div> */}

    </div>)
}


export default function Body({userData}) {
  const [soldItems, setSoldItems] = useState([]);
  let [reviews, setReviews] = useState([])
  let [shop, setShop] = useState('')
  let [TotalSold, setTotalSold] = useState('0')
  let [TotalEarned, setTotalEarned] = useState('0')
  let [activeJsx, setActiveJsx] = useState('')
  // let [userData, setUserData] = useState('')


  useEffect(() => {
    let overlay = document.querySelector('.overlay')
    overlay.setAttribute('id', 'overlay');
    async function getShop() {
      let shop = await GetShop(window.localStorage.getItem("CE_seller_id"))
      setShop(shop)
      overlay.removeAttribute('id')
    }
    getShop()

  }, [])

  useEffect(() => {
    
    async function getReviews() {
      let reviews = await GetReviews(window.localStorage.getItem("CE_seller_id"))
      setSoldItems(reviews)
    }
    getReviews()
   
  }, [shop])


  function updateActiveJsx(data) {
    setActiveJsx(data)
  }


   
  return (
    <>
      <div className="edit-overlay" onClick={e => {
        if(e.target === document.querySelector('.edit-overlay')){
          document.querySelector('.edit-overlay').removeAttribute('id')
        }
      }}>

        {
          activeJsx
        }

      </div>
      <div className="overlay">
        <div className="loader">
        </div>
      </div>
      <div className="seller-profile-right shadow-sm"> 

        <div className="seller-profile-basics">
          
          <Summary TotalEarned={TotalEarned} TotalSold={TotalSold} />
          <br />

          <CoinComp updateActiveJsx={updateActiveJsx} Coin={Coin} userData={userData} shop={shop} />
          <br />

          <Verification userData={userData} ContactEdit={ContactEdit} updateActiveJsx={updateActiveJsx} />
          <br />

          <University userData={userData} />

        </div>

        <div className="seller-profile-others">
          <ItemsSold soldItems={soldItems} title={'History'}/>
          <ItemsSold soldItems={soldItems} title={'Orders'} />
          <ItemsSold soldItems={soldItems} title={'Carts'} />
          {/* <Inventory updateActiveJsx={updateActiveJsx} shop={shop} InvetoryEdit={InvetoryEdit} /> */}
          <Reviews reviews={reviews} />
        </div>

          
      </div>
    </>
  )
} 

import React, { useEffect, useRef, useState } from 'react'
import SettingsAside from '../../components/Seller/Settings/SettingsAside'
import SellerLayout from '../../layout/Seller'
import SettingsMain from '../../components/Seller/Settings/SettingsMain'
import '../../styles/Seller/setttings.css'
import '../../styles/Seller/overlay.css' 
import '../../styles/settings.css';
import editSvg from '../../assets/edit-svgrepo-com.svg'
import userPhoto from '../../assets/user-rounded-svgrepo-com.svg'

import bankList from '../../bank.json' 
import { useLocation } from 'react-router-dom'
import { GetSellerPhoto } from '../../api/seller/get'
import { data, school_choices } from '../../location'
import { UpdateSellerProfile } from '../../api/seller/update'
import { openNotice } from '../../reusable.js/notice'
import { ValidateBank } from '../../api/seller/post'
import { useSelector } from 'react-redux'

export default function Settings() {
    let [screenWidth, setScreenWidth] = useState(0)

    let location = useLocation()

    return (
        <>
            <SellerLayout >

                <div className="seller-main" style={{
                    background: '#fff4e0',
                    padding: '10px', 
                    height: 'calc(100vh - 70px)',
                    display: 'flex',
                    margin: '0',
                    overflow: 'auto',
                    alignItems: 'center', 
                    justifyContent: 'center'
                }}>
                    {
                        location.pathname.split('/').splice(-1)[0].split('.').splice(-1)[0] === 'notice'
                        ?
                        <>
                            <Notice />
                        </>
                        :
                        location.pathname.split('/').splice(-1)[0].split('.').splice(-1)[0] === 'profile'
                        ?
                        <>
                            <Profile />
                        </>
                        :
                        location.pathname.split('/').splice(-1)[0].split('.').splice(-1)[0] === 'payments'
                        ?
                        <>
                            <Payments />
                        </>
                        :
                        location.pathname.split('/').splice(-1)[0].split('.').splice(-1)[0] === 'verification'
                        ?
                        <>
                            <Verification />
                        </>
                        :
                        ''

                    }
                </div>
               
            </SellerLayout>
        </>
    )
}

function Profile() {

    let [screenWidth, setScreenWidth] = useState(0)

    let {sellerData} = useSelector(s=> s.sellerData);
    let [selectedPhoto, setSelectedPhoto] = useState('null');

    useEffect(() => {
        async function getPhoto(){
          let result = await GetSellerPhoto(window.localStorage.getItem('CE_seller_id'))
          if(result.file === 'null'){
                setPhoto(userPhoto)
                setSelectedPhoto('')
            }else{
                setPhoto(result?.file)
                setSelectedPhoto(result?.file)
            }

        }
        getPhoto()
    }, [])

    useEffect(() => {
        let newWidth = window.innerWidth;
        setScreenWidth(newWidth);
        // console.log(data)
    },[])

    let [fname, setFname] = useState(sellerData?.fname)
    let [lname, setLname] = useState(sellerData?.lname)
    let [state, setState] = useState(sellerData?.state)
    let [campus, setCampus] = useState(sellerData?.campus)
    let [photo, setPhoto] = useState(userPhoto)
    let [campusLocaleList, setCampusLocaleList] = useState([]);
   
    let UpdateProfile = () => {
        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
        UpdateSellerProfile(fname,lname,state,campus,window.localStorage.getItem('CE_seller_id'),selectedPhoto)
        .then((result) => result ? overlay.removeAttribute('id') : '')
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        setCampusLocaleList([])
        let stateIndex = data.filter(item =>  item.label?.toLowerCase() === state?.toLowerCase())
        let index = data.indexOf(stateIndex[0]); 
        let campuses = Object.values(school_choices).reverse();
        // console.log(campuses[index])
        index < 0 ? setCampusLocaleList([]) : setCampusLocaleList(campuses[index])

    }, [state])
    
    let handleImage = () => {
        let f = document.querySelector("#coverphoto");

        [...f.files].map(item => {
            let typeCheck = item.type.split('/')[0];
            let type = typeCheck === 'image' ? 'img' : typeCheck === 'video' ? 'mp4' : ''
            
            if(type === 'mp4') {
                openNotice("Only Photo Can Be Uploaded Here")
                
            }else{
                let reader = new FileReader({type: 'image/*'});

                reader.onload = (result) => {
                    let img = reader.result;
                    setPhoto(img);
                    setSelectedPhoto(img)

                }   
                reader.readAsDataURL(item);
            }

            
        })
         
        // getImage([[...f.files][0],[...f.files][0].type,[...f.files][0].size,[...f.files][0].name])
    } 

    return(
        <>
           {/* <SellerLayout> */}
           <div className="overlay">
                <div className="loader">
                </div>
            </div>
            <div className="seller-profile-setup" style={{width: 'fit-content', height: 'fit-content', marginTop: '-5px'}}>
                {/* <h4>Profile Settings</h4> */}
 
                <form action="">

                    <div className="seller-input-cnt" style={{position: 'relative'}}>
                        <input id='coverphoto' style={{background: '#f9f9f9', display: 'none'}} onChange={handleImage}  type="file" />
                        <div style={{height: '120px', width: '120px', position: 'relative', borderRadius: '50%', background: '#fff4e0'}}>

                            <img src={photo}  style={{height: '100%', width: '100%', borderRadius: '50%'}} alt="" />


                            <label style={{position: 'absolute', height: '30px', width: '30px', border: 'none', right: '5px', borderRadius: '50%', top: '10px', background: '#FF4500'}} htmlFor="coverphoto">
                                <img src={editSvg}  style={{height: '30px', width: '30px'}} alt="" />
                            </label>
                        </div>
                        

                    </div>

                    <br />

                
                    <div className="seller-input-cnt">
                        <section>
                            <label htmlFor="">FirstName</label>
                            <input style={{background: '#f9f9f9'}}  defaultValue={sellerData ? sellerData.fname : ''} onInput={e => setFname(e.target.value)} placeholder='FirstName...' type="text" />
                        </section>
                        <section>
                            <label htmlFor="">LastName</label>
                            <input style={{background: '#f9f9f9'}} defaultValue={sellerData ? sellerData.lname : ''} onInput={e => setLname(e.target.value)}  placeholder='LastName...' type="text" />
                        </section>
                    </div>


                    <div className="seller-input-cnt">
                        <section style={{width: '70%'}}>
                            <label htmlFor="">Email</label>
                            <input style={{background: '#f9f9f9'}} value={sellerData ? sellerData.email : ''} placeholder='Email...' type="text" />
                        </section>
                        {/* <section style={{width: '30%'}}>
                            <button style={{fontSize: 'small', background: '#5b42f3'}}>Change</button>
                        </section> */}
                    </div>

                    <div className="seller-input-cnt">
                        <section style={{width: '70%', float: 'left'}}>
                            <label htmlFor="">Phone</label>
                            <input style={{background: '#f9f9f9'}} value={sellerData ? sellerData.phone : ''}  placeholder='Phone Number...' type="number" />
                        </section>
                        {/* <section style={{width: '30%'}}>
                            <button style={{fontSize: 'small', background: '#5b42f3'}}>Change</button>
                        </section> */}
                    </div>

                    
                

                    <div className="seller-input-cnt">
                        <section style={{width: '100%'}}>
                            <label htmlFor="">State </label>
                            <select style={{background: '#f9f9f9'}}  onInput={e => setState(e.target.value)}  name="" id="">
                                <option defaultValue="">Select State</option>
                                {
                                    data.map((item,index) =>  
                                        item.label === sellerData?.state
                                        ?
                                            <option selected defaultValue={item.label}>{item.label}</option>
                                        :
                                            <option defaultValue={item.label}>{item.label}</option>
                                    )
                                }
                            </select>
                        </section>
                        
                    </div>

                    <div className="seller-input-cnt">
                        <section style={{width: '100%'}}>
                            <label htmlFor="">Campus </label>
                            <select style={{background: '#f9f9f9'}} onInput={e => setCampus(e.target.value)}  name="" id="">
                                <option defaultValue="">Select Campus</option>
                                {
                                    campusLocaleList.map((item,index) => 

                                        item.text === sellerData.campus 
                                        ?
                                            <option selected defaultValue={item.text}>{item.text}</option>
                                        : 
                                            <option defaultValue={item.text}>{item.text}</option>
                                    )
                                }
                            </select>
                        </section>
                        
                    </div>


                
                    <div className="seller-input-cnt">
                        
                        <button style={{background: '#FF4500'}} onClick={e => {e.preventDefault(); UpdateProfile();}}>Update</button>
                        
                    </div>

                        
                        
                </form>
            </div>
           {/* </SellerLayout> */}
        </>
    )
}

function Verification() {

    let [passport, setPassport] = useState('')

    let handleImage = () => {
        let f = document.querySelector("#seller-passport");

        console.log(f.files[0])
        let item = f.files[0]
        let typeCheck = item.type.split('/')[0];
        let type = typeCheck === 'image' ? 'img' : typeCheck === 'video' ? 'mp4' : ''
        
        if(type === 'mp4') {
            openNotice("Only Photo Can Be Uploaded Here")
            
        }else{
            let reader = new FileReader({type: 'image/*'});

            reader.onload = (result) => {
                let img = reader.result;
                setPassport(img)
                console.log(img)

            }   
            reader.readAsDataURL(item);
        }
         
        // getImage([[...f.files][0],[...f.files][0].type,[...f.files][0].size,[...f.files][0].name])
    } 
    return(
        <>
            <div className='seller-settings-id-verification'>
                <div className="seller-profile-setup" style={{width: 'fit-content', height: 'fit-content'}}>
                    {/* <h4>Profile Settings</h4> */}

                    <form action="">

                    
                        <div className="seller-input-cnt">
                            <section style={{width: '100%'}}>
                                <label htmlFor="">Passport</label>
                                <input onChange={handleImage} id='seller-passport' style={{display: 'none', background: '#f9f9f9'}} placeholder='Email...' type="file" />
                                <div className="seller-verification-passport-cnt">
                                    <div className="seller-verification-passport" >

                                        {
                                            passport === ''
                                            ?
                                            ''
                                            :
                                            <img src={passport} style={{height: '100%', margin: '0', position: 'relative', width: '250px', left: '0', borderRadius: '5px'}} alt="" />
                                        }
                                        
                                    </div>

                                    <label htmlFor="seller-passport" style={{width: '250px', height: '50px', background: 'orangered', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}>
                                        {
                                            passport === ''
                                            ?
                                            'Upload Passport'
                                            :
                                            'Change Passport'
                                        }
                                    </label>


                                </div>
                            </section>
                        
                        </div>

                        <div className="seller-input-cnt">
                            <section style={{width: '100%'}}>
                                <label htmlFor="">NIN</label>
                                <input style={{background: '#f9f9f9'}} placeholder='NIN...' type="text" />
                            </section>
                        
                        </div>

                    

                        <div className="seller-input-cnt">
                            
                            <button style={{background: '#FF4500'}} onClick={e => {e.preventDefault();}}>Verify</button>
                            
                        </div>

                            
                            
                    </form>
                </div>
            </div>,
        </>
    )
}

function Payments() {

    let AcctNum = useRef('')
    let BankCode = useRef('')

    let Beneficiary = useRef('')
    return(
        <>
            <div className='seller-settings-id-verification'>
            <div className="seller-profile-setup" style={{width: 'fit-content', height: 'fit-content'}}>
                {/* <h4>Profile Settings</h4> */}

                    <form action="">


                        <div className="seller-input-cnt">
                            <section style={{width: '100%'}}>
                                <label htmlFor="">Account Number</label>
                                <input style={{background: '#f9f9f9'}} onInput={e => AcctNum.current=(e.target.value)} placeholder='Enter Account Number Here...' type="text" />
                            </section>
                            {/* <section style={{width: '30%'}}>
                                <button style={{fontSize: 'small', background: '#5b42f3'}}>Change</button>
                            </section> */}
                        </div>

                        <div className="seller-input-cnt">
                            <section style={{width: '100%'}}>
                                <label htmlFor="">Bank</label>
                                <select onInput={e => BankCode.current=(e.target.value)} name="" id="">
                                    <option defaultValue="">Select Bank</option>
                                    {
                                        bankList.map(item => <option defaultValue={item.code}>{item.name}</option>)
                                    }
                                </select>
                            </section>
                            {/* <section style={{width: '30%'}}>
                                <button style={{fontSize: 'small', background: '#5b42f3'}}>Change</button>
                            </section> */}
                        </div>

                        <div className="seller-input-cnt">
                            <section style={{width: '100%'}}>
                                <label htmlFor="">Beneficiary</label>
                                <div style={{width: '100%'}} className='seller-bank-name'>
                                    {
                                        Beneficiary.current
                                    }
                                </div>
                            </section> 
                            {/* <section style={{width: '30%'}}>
                                <button style={{fontSize: 'small', background: '#5b42f3'}}>Change</button>
                            </section> */}
                        </div>


                        <div className="seller-input-cnt">
                            
                            <button style={{background: '#FF4500'}} onClick={async(e) => {
                                e.preventDefault()
                                let acctNum = AcctNum.current
                                let Bank = BankCode.current
                                // alert(Bank)
                            
                            fetch('http://192.168.24.146:9090/bank-verification', {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({acctNum, Bank}),
                                
                            })
                            .then(async(result) => {
                                let data =  await result.json()
                                document.querySelector('.seller-bank-name').innerHTML = data.name
                            })
                            }}>Verify</button>
                            
                        </div>
        
                            
                            
                    </form>
                </div>
            </div>
        </>
    )
}

function Notice() {
    return(
        <>
            <div className='seller-settings-id-verification'>
                <div className="seller-profile-setup" style={{width: 'fit-content', height: 'fit-content'}}>
                    {/* <h4>Profile Settings</h4> */}

                    <form action="">


                        <div className="seller-input-cnt" style={{display: 'block', padding: '10px'}}>
                            <section style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <label htmlFor="">Email Notification</label>
                                <input style={{height: '25px', width: '25px', background: '#f9f9f9'}} placeholder='NIN...' type="checkbox" />
                                
                            </section>
                            <div style={{background: '#f9f9f9', borderRadius: '10px', padding: '10px', fontSize: 'small'}}>
                                You will receive notification in your email.
                            </div>
                        </div>

                        <div className="seller-input-cnt" style={{display: 'block', padding: '10px'}}>
                            <section style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <label htmlFor="">SMS Notification</label>
                                <input style={{height: '25px', width: '25px', background: '#f9f9f9'}} placeholder='NIN...' type="checkbox" />
                            
                            </section>
                            <div style={{background: '#f9f9f9', borderRadius: '10px', padding: '10px', fontSize: 'small'}}>
                                You will receive notification in your SMS.
                            </div>
                        
                        </div>

                        <div className="seller-input-cnt" style={{display: 'block', padding: '10px'}}>
                            <section style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <label htmlFor="">WhatsApp Notification</label>
                                <input style={{height: '25px', width: '25px', background: '#f9f9f9'}} placeholder='NIN...' type="checkbox" />
                                
                            </section>
                            <div style={{background: '#f9f9f9', borderRadius: '10px', padding: '10px', fontSize: 'small'}}>
                                You will receive notification in your WhatsApp.
                            </div>
                        
                        </div>

                    

                        <div className="seller-input-cnt">
                            
                            <button style={{background: '#FF4500'}} onClick={e => {e.preventDefault();}}>Verify</button>
                            
                        </div>

                            
                            
                    </form>
                </div>
            </div>
        </>
    )
}

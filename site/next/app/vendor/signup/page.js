"use client"
import { useEffect, useRef, useState } from 'react';
import 'react-phone-input-2/lib/style.css'
import './styles/xx-large.css'
import './styles/x-large.css'
import './styles/large.css'
import './styles/medium.css'
import './styles/small.css'
import logoSvg from '@/files/assets/default.svg'
import { seller_overlay_setup } from '@/files/reusable.js/overlay-setup';
import axios from 'axios';
import shortid from 'shortid';
import { open_notice } from '@/files/reusable.js/notice';
import { useSelector } from 'react-redux';


const Signup = () => {
    let [screenWidth, setScreenWidth] = useState(0) 
    let {
        user_id
    }=useSelector(s=>s.user_id);

    useEffect(() => {
        setScreenWidth(window.innerWidth)
        console.log("user_id: ", user_id)
    },[user_id])


    let [logo, setLogo] = useState('');
    let [name, setName] = useState('');
    let [summary, setSummary] = useState('');
    let [address1, setAddress1] = useState('');
    let [address2, setAddress2] = useState('');
    let [address3, setAddress3] = useState('');

    const validation = useRef(false);
   
    let book = useRef({
        name: false,
        logo: false,
        address1: false,
        address2: false,
        address3: false
    })

    function addErrMssg(err,pElem) {
            
        let check = pElem.querySelector('.err-mssg');
        if(check){
            pElem.querySelector('.err-mssg').remove()
            let div = document.createElement('div');
            div.className = 'err-mssg';
            // console.log(err)
            if(err.length > 0 ){
                div.innerHTML = err[0].mssg;
                pElem.append(div)
                

            }else{
                
                let check = pElem.querySelector('.err-mssg');

                if(check){
                    pElem.querySelector('.err-mssg').remove()
                }
            }
            
            
        }else{

            let div = document.createElement('div');
            div.className = 'err-mssg';
            // console.log(err)

            if(err.length !== 0 ){
                div.innerHTML = err[0].mssg;
                pElem.append(div)
                

            }else{
                
                let check = pElem.querySelector('.err-mssg');

                if(check){
                    pElem.querySelector('.err-mssg').remove()
                }
            }
        }
     
    }

    let Registration = (e) => {
        

        Validation();
        console.log(book)
        Object.values(book.current).filter(item => item !== true).length > 0 ? validation.current = false : validation.current = true;

        if (validation.current) {
            e.target.disabled = true;

            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            fetch('/api/vendor/create-shop', {
                method: 'post',
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({name,logo,address1,address2,address3,summary,user_id})
            })
            .then(async(result) => {
                let response = await result.json();
                console.log(response)
                if(response.bool){
                    window.location.href = '/vendor/shop'
                }else{
                    seller_overlay_setup(false, '')
                    overlay.removeAttribute('id');
                    open_notice(true, 'Error occured, try again.')
                    e.target.disabled = false;
                }
            })
            .catch((err) => {
                seller_overlay_setup(false, '')
                e.target.disabled = false;
            })
            
        }else{
            
        }
    }

    function Validation() {
        let inputs = [...document.querySelectorAll('input')]

        inputs.map(async(item) => {
            if(item.type === 'text'){

                if(item.name === 'shop_name'){

                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty'}
                    let length = item.value.length > 3 ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please shop name must be at least 3 letters.'}
                    let specialCharFree = /^[a-zA-Z]+$/.test(item.value.trim()) ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please enter only alphabets.'}
                    let errs = [empty,length,specialCharFree];
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement);
                    let list =errs.filter(item => item.mssg !== '')

                    list.length > 0 ? book.current.name = false : book.current.name = true
                    
                }else if(item.name.toLowerCase() === 'address1'){

                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty'}
                    let length = item.value.length > 3 ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please address (1) must be at least 3 letters.'}
                    // let specialCharFree = /^[a-zA-Z]+$/.test(item.value.trim()) ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please enter only alphabets.'}

                    let errs = [empty,length];
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
                    let list =errs.filter(item => item.mssg !== '')

                    list.length > 0 ? book.current.address1 = false : book.current.address1 = true

                }else if(item.name.toLowerCase() === 'address2'){

                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty'}
                    let length = item.value.length > 3 ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please address (2) must be at least 3 letters.'}
                    // let specialCharFree = /^[a-zA-Z]+$/.test(item.value.trim()) ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please enter only alphabets.'}

                    let errs = [empty,length];
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
                    let list =errs.filter(item => item.mssg !== '')

                    list.length > 0 ? book.current.address2 = false : book.current.address2 = true

                }else if(item.name.toLowerCase() === 'address3'){

                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty'}
                    let length = item.value.length > 3 ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please address (3) must be at least 3 letters.'}
                    // let specialCharFree = /^[a-zA-Z]+$/.test(item.value.trim()) ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please enter only alphabets.'}

                    let errs = [empty,length];
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
                    let list =errs.filter(item => item.mssg !== '')

                    list.length > 0 ? book.current.address3 = false : book.current.address3 = true

                }
                
            } else {
                let errs = [logo !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please upload logo'}]
                addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement.parentElement);
                let list =errs.filter(item => item.mssg !== '')

                list.length > 0 ? book.current.logo = false : book.current.logo = true
               
            }
        })

    }

    const uploadToServer = async (file) => {
        try {
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            const formData = new FormData();
            formData.append('file', file); // Directly append the file object for web
            formData.append('productId', shortid.generate(10)); // Directly append the file object for web
    
            const response = await axios.post('http://192.168.213.146:9090/upload', formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.data.success && response.data.data.url) {
                // Create a preview URL for the image
                const previewUrl = URL.createObjectURL(file);
                // setLogo(previewUrl);
                
                // If you also need to keep the server URL:
                setLogo(response.data.data.url);
                
                overlay.removeAttribute('id');
            }
        } catch (err) {
            console.error('Upload failed:', err);
            overlay.removeAttribute('id');
            throw err; // Re-throw the error for handling in the calling function

        }
    };
    
    const deleteFromServer = async (url) => {
        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
        try {
        //   setIsLoading(true);
          const response = await axios.post('http://192.168.213.146:9090/delete', {
            url
          });
    
          if (response.data && response.data.data.result === "ok") {
            setLogo('')
            overlay.removeAttribute('id');
          }
        } catch (err) {
          console.error('Delete failed:', err.message);
          overlay.removeAttribute('id');
        }
    };


    return ( 
        <>
            <div className="overlay" >
                <div className="loader">
                </div>
            </div>
           
            <div className="seller-signup">
                <h6 style={{background: 'orangered', color: '#fff', padding: '10px', marginBottom: '-2px', marginTop: '0', height: 'auto', width: screenWidth > 480 ? 'auto' : '100%', textAlign: 'center'}}>Vendor Center</h6>

                <section className='seller-signup-cnt'>
                    
                    <div className="left">

                        <img src={logoSvg.src} style={{height: '100%', width: '100%'}} alt="" />



                    </div>
                    <div className="right">
                        <div  className="head-cnt">
                            Create Shop
                        </div>
                        <form action="">
                            <div className="seller-input-cnt" style={{ flexDirection: 'column', height: '140px' }}>
                                <label htmlFor="">Shop Logo</label>
                                
                                <div 
                                className="logo-upload-container"
                                style={{
                                    height: '120px',
                                    width: '100px',
                                    borderRadius: '5px',
                                    border: '1px solid #FF4500',
                                    backgroundColor: '#f9f9f9',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    ':hover': {
                                    borderColor: '#FF6347',
                                    backgroundColor: '#f0f0f0'
                                    }
                                }}
                                >
                                    <input 
                                        onChange={e => {
                                            // console.log(e.target.files[0])
                                            uploadToServer(e.target.files[0])
                                        }}
                                        type="file"
                                        id="logo"
                                        accept="image/*"
                                        name='logo'
                                        style={{ display: 'none' }}
                                    />
                                    {
                                        logo === ''
                                        ?
                                        <label 
                                            htmlFor="logo"
                                            style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#FF4500',
                                            fontWeight: '500',
                                            fontSize: '14px',
                                            cursor: 'pointer'
                                            }}
                                        >
                                            Add Logo
                                        </label>
                                        :
                                        <>
                                            <button style={{
                                                position: 'absolute',
                                                top: '10px',
                                                width: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '20px',
                                                padding: '0px',
                                                right: '10px',
                                                background: 'red',
                                                borderRadius: '5px'
                                            }} onClick={e => {
                                                e.preventDefault();
                                                deleteFromServer(logo);
                                            }}>x</button>
                                            <img src={logo} style={{height: '100%', width: '100%'}} />
                                        </>
                                    }
                                </div>
                            </div>
                            

                            <div className="seller-input-cnt" style={{flexDirection: 'column'}}>
                                <label htmlFor="">Shop Name</label>
                                <input style={{background: '#efefef', width: '100%'}} name='shop_name' onInput={e => setName(e.target.value)}  placeholder='Shop Name' type="text" />
                            </div>


                            <div className="seller-input-cnt" style={{display: 'flex', flexDirection: 'column', height: 'fit-content'}}>
                                <label htmlFor="" style={{height: '20%', background: '#fff'}}>Shop Description (Optional)</label>
                                <textarea onInput={e => setSummary(e.target.value)} style={{resize: 'none', height: '80%', borderRadius: '5px'}} rows={10} name="" id="" placeholder='Describe your shop details here. e.g: At "Lorex" Shop we sell female wig and also advertise vacant lodge.'></textarea>
                            </div>

                            <div style={{width: '100%', flexDirection: 'column'}} className="seller-input-cnt">
                                <label htmlFor="">Address1 (Town) e.g: Ifite-Awka...</label>
                                <input style={{background: '#efefef'}} name='Address1' onInput={e => {setAddress1(e.target.value)}} className='Address1'  placeholder='Address (Town) e.g: Ifite-Awka...' type="text" />
                            </div>

                            <div style={{width: '100%', flexDirection: 'column'}} className="seller-input-cnt">
                                <label htmlFor="">Address2 (Street | Bus Stop) e.g: Yahoo junction...</label>
                                <input style={{background: '#efefef'}} name='Address2' onInput={e => {setAddress2(e.target.value)}} className='Address2'  placeholder='Address (Street | Bus Stop) e.g: Yahoo junction...' type="text" />
                            </div>

                            <div style={{width: '100%', flexDirection: 'column'}} className="seller-input-cnt">
                                <label htmlFor="">Address3 (Lodge Name) e.g: Novena Lodge...</label>
                                <input style={{background: '#efefef'}} name='Address3' onInput={e => {setAddress3(e.target.value)}} className='Address3'  placeholder='Address (Lodge Name) e.g: Novena Lodge...' type="text" />
                            </div>

                           

                        </form>
                    
                        <div className='btn-cnt'>
                            <button style={{background: '#ff4500', color: '#fff'}} onClick={e => {e.preventDefault(); Registration(e)}}>Register New Shop</button>
                            
                        </div>

                    </div>

                </section>

            </div>
        </>
     );
}
 
export default Signup;
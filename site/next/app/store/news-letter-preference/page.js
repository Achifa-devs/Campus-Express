"use client"
import React, { useEffect, useState } from 'react'
import '@/app/store/news-letter-preference/styles/xx-large.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'

import { setAccessoryTo } from "@/redux/buyer_store/Aceessories";

export default function NewsLetterPreference() {
    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {setScreenWidth(window.innerWidth)},[]);
    let [items, setItems] = useState([1,2,3])
    let dispatch = useDispatch()

    let {
        user_id 
    } = useSelector(s => s.user_id);
    useEffect(() => {
        // axios.get('https://cs-node.vercel.app/addresses', {params: {id: user_id}})
        // .then(({data})=>{
        //     setItems(data)
        // })
        // .catch(error=>{
        //     console.log(error)
        // })

    },[])
  return (
    <>
        <div className='news-letter-card' style={{width: screenWidth > 760 ? 'calc(100vw - 350px)' : '100%', float: 'right', padding: '10px 40px'}}>
        
            <div className="news-letter-card-cnt" style={{justifyContent: 'flex-start', overflow: 'none', width: '100%', alignItems: 'flex-start', height: '100%'}}>
            <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <span>Newsletter Preferences</span>
                <button style={{display: screenWidth > 760 ? 'none' : 'flex'}} onClick={e=> dispatch(setAccessoryTo(0))}>Back</button>

            </h6>

                <div style={{justifyContent: 'flex-start', width: '100%', overflow: 'auto', alignItems: 'flex-start', height: '100%', background: '#FFF', padding: '10px'}}>
                    <section >
                        <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center'}}>Subscribe To</h6>

                        <div className='input-cnt' style={{display: 'flex', alignItems: 'center', justifyContent: 'left', flexDirection: 'row-reverse'}}>
                            <label>Daily News Letter For Me</label>
                            &nbsp;                        &nbsp;
                            <input name='options' style={{background: '#efefef', height: '18px', width: '18px'}} type='radio' />
                        </div>

                        <div className='input-cnt' style={{display: 'flex', alignItems: 'center', justifyContent: 'left', flexDirection: 'row-reverse'}}>
                            <label>Weekly News Letter For Me</label>
                            &nbsp;                        &nbsp;
                            <input name='options' style={{background: '#efefef', height: '18px', width: '18px'}} type='radio' />
                        </div>

                        <div className='input-cnt' style={{display: 'flex', alignItems: 'center', justifyContent: 'left', flexDirection: 'row-reverse'}}>
                            <label>Bi-Weekly News Letter For Me</label>
                            &nbsp;                        &nbsp;
                            <input name='options' style={{background: '#efefef', height: '18px', width: '18px'}} type='radio' />
                        </div>


                        <div className='input-cnt' style={{display: 'flex', alignItems: 'center', justifyContent: 'left', flexDirection: 'row-reverse'}}>
                            <label>I Dont Want To Receive Daily Newsletters</label>
                            &nbsp;                        &nbsp;
                            <input name='options' style={{background: '#efefef', height: '18px', width: '18px'}} type='radio' />
                        </div>
                    </section>

                    <hr />

                    <div className='input-cnt' style={{display: 'flex', alignItems: 'center', justifyContent: 'left', flexDirection: 'row-reverse'}}>
                        <label>I agree to Campus Spheres Privacy and Cookie Policy. You can unsubscribe from newsletters at any time.</label>
                        &nbsp;                        &nbsp;
                        <input name='options' style={{background: '#efefef', height: '18px', width: '18px'}} type='checkbox' />
                    </div>

                    <br />

                    <button>Save</button>
                    &nbsp;                        &nbsp;
                    <button>Unsubscribe from all communications</button>
                </div>
            </div>

        
        </div>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import '../../../styles/adsCard.css'
import '../../../styles/Seller/listing.css'
import { useNavigate } from 'react-router-dom'
import Thumbnail from '../Thumbnail';
import locationSvg from '../../../assets/location-svgrepo-com-1.svg'

import conditionSvg from '../../../assets/condition-point-svgrepo-com.svg'
import ItemImages from '../../../redux/buyer_store/ItemImages';
import { DeleteItem } from '../../../api/seller/delete';
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteListTo } from '../../../redux/seller_store/delete_list';

export default function Card({item,index}) {
    let navigate = useNavigate();
    let dispatch= useDispatch()
    let {delete_list} = useSelector(s=> s.delete_list);
   

    function handleListing() {
        document.querySelector('.listing-overlay').setAttribute('id', 'listing-overlay')
        // navigate(`/product?product_id=${item.product_id}`)
    }

    useEffect(() => {
      let list = document.querySelectorAll('.ads-card');
    //   let selected_card = list?.filter((item) => item.children[0].children[0]);
    //   console.log(selected_card)
    }, [])
  return (
    
    <>
        <div className="listing-overlay" onClick={
            (e)=>{
                if(e.target === document.querySelector('.listing-overlay')){
                    document.querySelector('.listing-overlay').removeAttribute('id')
                }
            }
        }>
            <div className="listing-cnt">
                {/* <div style={{width: '100%', textAlign: 'left', display: 'flex'}}>
                    <div className="input-cnt" style={{width: '35px', height: '35px', textAlign: 'left'}}>
                        <input type="checkbox" name="" id="" />
                        <span>Mark This Item If Sold</span>
                    </div>
                </div> */}
                <div className="listing-card-top">
                    <div className="listing-thumbnail-cnt">
                        <Thumbnail product_id={item.product_id} />
                    </div>

                    <div className="listing-title-cnt">
                        {item.title}
                        {/* <div style={{width: '100', color: 'orange', position: 'absolute', bottom: '0', fontSize: 'small', textAlign: 'center', marginTop: '20px', background: '#fff4e0', padding: '5px'}}>Please Delete This Item If It's Not Available</div> */}


                    </div>

                </div>

                <div className="listing-card-desc" style={{width: '100%', textAlign: 'left'}}>
                    {
                        item.description.length > 0
                        ?
                        item.description
                        :
                        <div style={{width: '100%', textAlign: 'left'}}>No Description For This Item</div>
                    }
                </div>

                <div className="listing-card-btn">
                    <button onClick={e => navigate(`/seller.editor?product_id=${item.product_id}`)}>
                        <span>Edit</span>
                        <span></span>
                    </button>
                    <button  onClick={async(e) => { 
                            let overlay = document.querySelector('.overlay')
                            overlay.setAttribute('id', 'overlay');          
                            let response = await  DeleteItem([item.product_id])
                            if(response.bool){
                                document.querySelector('.listing-overlay').removeAttribute('id')
                                let list = [...document.querySelectorAll('.ads-card')]
                                list.map((data,index) => {
                                    let id = data.dataset?.id;
                                    response.ids.forEach(item => {
                                        if(item === id){
                                            list[index]?.remove();
                                            document.querySelector('.overlay').removeAttribute('id')
                                        }
                                    })
                                })
                                


                        }
                        }
                    }>
                        <span>Delete</span>
                        <span></span>
                    </button>
                </div>


            </div>
        </div>

        <div className="ads-card"  style={{
            border: item.state.state === 'active' ? '1px solid green' : '1px solid red',
            justifyContent: 'left',height: 'auto',position: 'relative'
        }} data-id={
            item.product_id
        } >

            <div data-id={
            item.product_id
        } className='select-box' style={{height: '20px', cursor: 'pointer', width: '20px', position: 'absolute', right: '5px', top: '5px',zIndex: '1000'}}>
                <input type="checkbox" onInput={e => {
                    if(e.target.checked){
                        dispatch(setDeleteListTo([...delete_list,e.target.name]))
                    }else{
                        let newList = delete_list.filter(item => item  !== e.target.name)
                        dispatch(setDeleteListTo(newList))
                    }
                }} style={{cursor: 'pointer'}} name={item.product_id} id="" />
            </div>
            <div class="top-section" style={{height: '100px', borderRadius: '10px', margin: '0'}}>
                <div onClick={handleListing} style={{height: '100px', borderRadius: '10px', margin: '0'}}>
                    {
                        item
                        ?
                        <Thumbnail product_id={item.product_id} />
                        :
                        ''
                   }
                </div>
            </div>
            <div class="bottom-section" onClick={handleListing} style={{margin: '0'}}>
                <span class="title" style={{fontSize: 'small', textAlign: 'left'}}>
                    {item.title}
                </span>
                <div class="row row1" style={{margin: '8px 0 0 0', padding: '0px'}}>
                    
                    <div class="item">
                    <span class="big-text">{item.views}</span>
                    <span class="regular-text">Views</span>
                    </div>
                    <div class="item">
                    <span class="big-text">{item?.shares}</span>
                    <span class="regular-text">Shares</span>
                    </div>
                </div>
                <div style={{background: item.state.state === 'active' ? 'green' : 'red',padding: '8px', borderRadius: '6px'}}>
                    <section style={{fontSize: 'small', fontWeight: '500', textAlign: 'left', color: '#fff',}}>
                        <div>
                            This item is {
                                item.state.state
                            } {
                                item.state.state !== 'active'
                                ?
                                `because it's 

                                ${item.state.reason}`

                                :
                                ''
                            }
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import SellerLayout from '../../layout/Seller'
import MessageHead from '../../components/Seller/Message/SmallScreen/MessageList/MessageHead'
import { GetChat } from '../../api/seller/get'

export default function Messages() {

    let [item, setItem] = useState([1,3,4,5,6,7,8,9])

    useEffect(() => {
        GetChat(window.localStorage.getItem('CE_user_id'))
        .then((result) => setItem(result.data))
        .catch((err) => err) 
       
     }, [])
  return (
    <>
        <SellerLayout>
            <div className="seller-messages">
                <div className="seller-client-list">    
                    {
                        item.map((item, index) => {
                            return(
                                <MessageHead data={item} index={index} />
                            )
                        })
                    }
                </div>
            </div>
        </SellerLayout>
    </>
  )
}

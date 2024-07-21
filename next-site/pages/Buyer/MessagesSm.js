import React, { useEffect, useState } from 'react'
// import { get_chat } from '../../api/buyer'
// import MessageHead from '../../components/Buyer/Message/SmallScreen/MessageList/MessageHead'
import BuyerLayout from '../../layout/Buyer'
import MessageHead from '../../components/Buyer/Message/SmallScreen/MessageList/MessageHead'
import { useLocation, useNavigate } from 'react-router-dom'
import { GetChatRooms } from '../../api/buyer/get'

export default function MessagesSm() {

    let [room, setRoom] = useState([])

    let [roomData, setRoomData] = useState('')
    let [activeRoom, setActiveRoom] = useState('')

    useEffect(() => {
        

        try {
            async function getData(params) {
                let result = await GetChatRooms(window.localStorage.getItem('CE_buyer_id'))
                setRoom(result)
            }
            getData()
        } catch (error) {
            console.log(error)
        }
    }, [])

  

    
    
  return (
    <>
        <BuyerLayout>
            <div className="seller-messages" style={{
                height: 'calc(100% - 80px)'
            }}>
                <div className="seller-client-list">    
                    {
                        room?.map((item, index) => {
                            return(
                                <MessageHead data={item} index={index} />
                            )
                        })
                    }
                </div>
            </div>
        </BuyerLayout>
    </>
  )
}

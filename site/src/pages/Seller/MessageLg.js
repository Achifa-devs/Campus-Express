import React, { useEffect, useState } from 'react'
import MessageHead from '../../components/Seller/Message/LargeScreen/MessageList/MessageHead'
import RoomBody from '../../components/Seller/Message/LargeScreen/MessageRoom/RoomBody'
import SellerLayout from '../../layout/Seller'
import RoomHead from '../../components/Seller/Message/LargeScreen/MessageRoom/RoomHead'
import RoomPanel from '../../components/Seller/Message/LargeScreen/MessageRoom/RoomPanel'
import { GetChatRooms } from '../../api/seller/get'
import { useLocation } from 'react-router-dom'

export default function MessageLg() {
    let [room, setRoom] = useState([])

    let [item, setItem] = useState([])
    let [roomData, setRoomData] = useState('')
    let [activeRoom, setActiveRoom] = useState('')

    let location = useLocation()

    function setRoomId(data) {
        setRoomData(data)
        let result = item.filter(item => item.mssg.mssg_id === data);
        setActiveRoom(result[0]);
    }

    useEffect(() => {

        try {
            async function getData() {
                let result = await GetChatRooms(window.localStorage.getItem('CE_seller_id'))
                setItem(result)
                // console.log(result)

                let path = location.pathname.split('/').splice(-1)[0].split('-')[0] === 'CE'
                if(path){
                    let response = result.filter(item => item?.buyer_data?.buyer_id === location.pathname.split('/').splice(-1)[0]);  
                    setRoomData(response[0]?.mssg?.mssg_id);
                    setActiveRoom(response[0]);
                }
            }
            getData()
        } catch (error) {
            console.log(error)
        }

       
    }, [])

  return (
    <>
        <SellerLayout>
            <div style={{
                width: 'calc(100% - 200px)',
                float: 'right',
                padding: '10px',
                background: '#fff4e0',
                height: 'calc(100vh - 70px)'
            }}>
                <div className="seller-messages">

                    <div className="seller-client-list">
                        {
                            item?.length > 0 
                            ?
                            item.map((item,index) => <MessageHead index={index} setRoomId={setRoomId} data={item} />)
                            : 
                            ''
                        }
                    </div>
                    
                </div>

                <div className="seller-chat-room">
                    {
                        Object.keys(activeRoom).length > 0 
                        ?
                            <>
                                <RoomHead activeRoom={activeRoom} />

                                <RoomBody activeRoom={activeRoom} />

                                <RoomPanel />
                            </>
                        :
                        ''
                    }
            
                </div>
            </div>
        </SellerLayout>
    </>
  )
}

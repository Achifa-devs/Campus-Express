import React, { useEffect, useState } from 'react'
import MessageHead from '../../components/Buyer/Message/LargeScreen/MessageList/MessageHead'
import RoomBody from '../../components/Buyer/Message/LargeScreen/MessageRoom/RoomBody'
import BuyerLayout from '../../layout/Buyer'
import ListHead from '../../components/Buyer/Message/LargeScreen/MessageList/ListHead'
import RoomHead from '../../components/Buyer/Message/LargeScreen/MessageRoom/RoomHead'
import RoomPanel from '../../components/Buyer/Message/LargeScreen/MessageRoom/RoomPanel'
import { socket } from '../../socket'
import { useLocation, useNavigate, useParams, useRoutes } from 'next/link'
import { GetChat, GetChatRooms } from '../../api/buyer/get'

export default function MessageLg() {
    let [room, setRoom] = useState([])

    let [roomData, setRoomData] = useState('')
    let [activeRoom, setActiveRoom] = useState('')

    let navigate = useNavigate();
    let location = useLocation()

    function setRoomId(data) {
        setRoomData(data)
        let result = room.filter(item => item.mssg.mssg_id === data);
        setActiveRoom(result[0]);
    }

    useEffect(() => {

        try {
            async function getData() {
                let result = await GetChatRooms(window.localStorage.getItem('CE_user_id'))
                setRoom(result)
                // console.log(result)

                let path = location.pathname.split('/').splice(-1)[0].split('-')[0] === 'CE'
                if(path){
                    let response = result.filter(item => item?.buyer_data?.user_id === location.pathname.split('/').splice(-1)[0]);  
                    setRoomData(response[0]?.mssg?.mssg_id);
                    setActiveRoom(response[0]);
                }
            }
            getData()
        } catch (error) {
            console.log(error)
        }

       
    }, [])

  

    let [chatList, setChatList] = useState([])
    let [chatHead, setChatHead] = useState([])
    let [chat, set_chat] = useState([])
    let [selected_head, set_selected_head] = useState()

    useEffect(() => {
        let searchParams = new URLSearchParams(location.search)
        try {
          async function getData() {
            let result = await GetChat(searchParams.get('room'))
            let chat_box = result;
            let heads = []
            console.log(chat_box)
            chat_box.map(item => heads.push({id: item.user_id, name: item.buyer_name}))
            setChatHead(heads)
            setChatList(chat_box)
          }

          getData()
        } catch (error) {
          console.log(error)
        }
    }, [])

    useEffect(() => {
        let r = chatList.filter(item => item.user_id === selected_head)[0]
        console.log(chatList)
        if(r !== undefined) {
            set_chat(r?.mssg)
            console.log(r)
        }
        // 
    }, [selected_head])

  return ( 
    <>
        {/* <SellerLayout> */}
            <div className="seller-messages">
                <ListHead />

                <div className="seller-client-list">
                    {
                        room?.map((item, index) => <MessageHead setRoomId={setRoomId} data={item} index={index} /> )
                    }
                </div>
                 
            </div>

            <div className="seller-chat-room">
                {

                    roomData !== '' 
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
        {/* </SellerLayout> */}
    </>
  )
}

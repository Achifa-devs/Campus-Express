import React, { useEffect, useState } from 'react'
import RoomHead from '../../components/Buyer/Message/SmallScreen/MessageRoom/RoomHead'
import RoomBody from '../../components/Buyer/Message/SmallScreen/MessageRoom/RoomBody'
import RoomPanel from '../../components/Buyer/Message/SmallScreen/MessageRoom/RoomPanel'
import { useLocation } from 'next/link'
import { GetChat } from '../../api/buyer/get'

export default function MessageRoom({}) {
    let [chatList, setChatList] = useState([])
    let [chatHead, setChatHead] = useState([])
    let [chat, set_chat] = useState([])
    let [selected_head, set_selected_head] = useState()

  let location = useLocation()

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

    function SetHeadId(data) {set_selected_head(data)}
  return (
    <>
        <RoomHead />

        <RoomBody chat={chat} />

        <RoomPanel />
    </>
  )
}

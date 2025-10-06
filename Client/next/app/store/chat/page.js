"use client"
import React, { useEffect, useState } from 'react'
import '@/app/store/chat/styles/xx-large.css'
import '@/app/store/chat/styles/x-large.css'
import '@/app/store/chat/styles/large.css'
import '@/app/store/chat/styles/medium.css'
import '@/app/store/chat/styles/small.css'



import { usePathname } from 'next/navigation'
import Aside from '@/files/components/Buyer/Message/LargeScreen/Aside'
export default function Chat() {
    let [screenWidth, setScreenWidth] = useState(0)

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])


    let [room, setRoom] = useState([])

    let [roomData, setRoomData] = useState('')
    let [activeRoom, setActiveRoom] = useState('')

    let location = usePathname()

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
                if (path) {
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
                chat_box.map(item => heads.push({ id: item.user_id, name: item.buyer_name }))
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
        if (r !== undefined) {
            set_chat(r?.mssg)
            console.log(r)
        }
        // 
    }, [selected_head])
    return (
        <>

            {
                screenWidth > 760 &&
                <>
                    <Aside />
                </>
            }
        </>
    )
}

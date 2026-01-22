"use client"
import React, { useEffect, useState } from 'react'
import '@/app/store/chat/styles/xx-large.css'
import '@/app/store/chat/styles/x-large.css'
import '@/app/store/chat/styles/large.css'
import '@/app/store/chat/styles/medium.css'
import '@/app/store/chat/styles/small.css'
import ChatRoom from '@/files/components/Buyer/Message/SmallScreen/ChatRoom'






export default function Room() {

    let [screenWidth, setScreenWidth] = useState(0)

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

    return(
        <>
            {
                screenWidth < 760 &&
                <>
                    <ChatRoom />
                </>
            }
        </>
    )
}
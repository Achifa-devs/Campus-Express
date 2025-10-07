import React, { use, useEffect, useState } from 'react'
import './style.css'
import { useSelector } from 'react-redux';
import { useSocket } from '@/socket_context';
import js_ago from 'js-ago';
import userSvg from '@/files/assets/user-rounded-svgrepo-com.svg'
import Image from 'next/image';

export default function Aside() {

  const socket = useSocket();

  const {
    buyer_info
  } = useSelector(s => s?.buyer_info)

  const [chatList, setChatList] = useState([]);


  useEffect(() => {

    if (!socket) return;

    console.log("Socket instance in Aside:", socket);

    get_chat_heads();
    socket.on("message", (msg) => {
      console.log("New message:", msg);
    });


    return () => socket.off("message");
  }, [socket]);

  function get_chat_heads () {
    socket.emit('get_all_messages', { user_id: buyer_info?.user_id }, (response) => {
      if (response.success) {
        console.log("Chat list received:", response.messages);
        setChatList(response.messages);
      } else {
        console.error("Failed to fetch chat list:", response.error);
      }
    });

  }

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      get_chat_heads()
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
    };

  }, [socket]);

  return (
    <>
      <div className='chat-aside-cnt'>
        <div className='aside-header'>
          <p>My Campus Chat List</p>
        </div>

        <ul id='chat-heads-cnt'>
          

          {
            chatList && chatList.map((item, index) => 
            
              <li id='chat-head' key={index}>
                <div id='left' style={{padding: '10px', borderRadius: '50%', background: '#fff4e0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Image src={
                    item.partner?.photo ? item.partner?.photo : userSvg.src
                  } width={35} height={35} style={{objectFit: 'cover', borderRadius: '50%'}} alt='Placeholder' />
                </div>
                
                <div id='right'>
                  <div className='top'>
                    <span style={{width: '70%', fontSize: 'small', fontWeight: 'bold'}}>{item.partner?.fname} {item.partner?.lname}</span>
                    <span style={{width: 'auto', fontSize: 'small', color:'#000'}}>{js_ago(new Date(item.lastMessage.created_at))}</span>
                  </div>
                  <div className='btm'>
                    <span style={{width: '70%', fontSize: 'smaller'}}>{item.lastMessage.sender_id === buyer_info?.user_id ? 'You: ' : ''}{item.lastMessage?.content}</span>
                    <span style={{width: 'fit-content', padding: '2.5px 8px', height: 'fit-content', fontSize: 'small', background: '#FF4500', borderRadius: '10px', color: '#fff'}}>5</span>
                  </div>
                </div>
              </li>
            
            )
          }
        
        </ul>
      </div>

      
    </>
  )
}

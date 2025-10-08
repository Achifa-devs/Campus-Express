import React, { useEffect, useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '@/socket_context';
import js_ago from 'js-ago';
import userSvg from '@/files/assets/user-rounded-svgrepo-com.svg'
import Image from 'next/image';
import { set_partner_to } from '@/redux/chat_room';
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup';

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
    buyer_overlay_setup(true, "Fetching chats...")
    socket.emit('get_all_messages', { user_id: buyer_info?.user_id }, (response) => {
      if (response.success) {
        console.log("Chat list received:", response.messages);
        setChatList(response.messages);
        buyer_overlay_setup(false, "Fetching chats...")

      } else {
        console.error("Failed to fetch chat list:", response.error);
        buyer_overlay_setup(false, "Fetching chats...")

      }
    });

  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    socket.on('message', (msg) => {
      get_chat_heads();
    })

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

  let [screenWidth, setScreenWidth] = useState(0)
  
  useEffect(() => {
    let width = window.innerWidth;
    setScreenWidth(width)
  }, [])
  
  return (
    <>
      <div className='chat-aside-cnt'>
        <div className='aside-header'>
          <p>My Campus Chat List</p>
        </div>

        <ul id='chat-heads-cnt'>
          

          {
            chatList.map((item, index) => 
            
              {
                return(item.partner  ?
                <li id='chat-head' key={index} onClick={() => {
                  // setCurrentChat(item);
                  dispatch(set_partner_to(item.partner));
                  
                }}>
                  <div id='left' style={{padding: item.partner.photo ? '0px' : '10px', borderRadius: '50%', background: '#fff4e0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
                      {
                        item?.unread === 0 ? ''
                        :
                        <>
                          <span style={{width: 'fit-content', padding: '2.5px 8px', height: 'fit-content', fontSize: 'small', background: '#FF4500', borderRadius: '10px', color: '#fff'}}>5</span>
                        </>
                      }
                    </div>
                  </div>
                </li>
                : <></>)
              }
            
            )
          }
        
        </ul>
      </div>

      
    </>
  )
}

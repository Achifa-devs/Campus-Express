import React, { use, useEffect } from 'react'
import './style.css'
import sendSvg from '@/files/assets/send-message-svgrepo-com.svg'
import { useSocket } from '@/socket_context'
import { useSelector } from 'react-redux';
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup';
import userSvg from '@/files/assets/user-rounded-svgrepo-com.svg'
import Image from 'next/image';

export default function ChatRoom() {

    const socket = useSocket();

    const { partner } = useSelector(s => s?.partner);





    const [message, setMessage] = React.useState([])
    const [newMessage, setNewMessage] = React.useState('');

    useEffect(() => {
        if (partner) {
            const chatBody = document.querySelector('.chat-room-body');
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }, [message]);



    function get_chats () {

        buyer_overlay_setup(true, "Loading chats...");
        socket.emit('get_room_messages', { receiver_id: partner.user_id }, (response) => {
            if (response.success) {
                console.log("Chat room received:", response.messages);

                const msg = response.messages.map((msg) => {

                    const new_mssg = {};
                    if (msg.sender_id === partner.user_id) {
                        new_mssg.type = 'received';
                        new_mssg.text = msg.content;
                        const date = new Date(msg.created_at);
                        new_mssg.timestamp = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    } else {
                        new_mssg.type = 'sent';
                        new_mssg.text = msg.content;
                        const date = new Date(msg.created_at);
                        new_mssg.timestamp = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    }

                    return new_mssg;
                })

                console.log("Refined messages:", msg);
                setMessage(msg);
                buyer_overlay_setup(false, "");
            } else {
                console.error("Failed to fetch chat room:", response.error);
                buyer_overlay_setup(false, "");

            }
        });

    }

    useEffect(() => {
    
        if (!socket) return;
    
        console.log("Socket instance in Aside:", socket);
    
        if (partner) {
            get_chats()
        };
        socket.on("message", (msg) => {
          console.log("New message:", msg);
        });
    
    
        return () => socket.off("message");
    }, [socket, partner]);
    useEffect(() => {
        if (!socket) return;
    
        socket.on("connect", () => {
          if (partner) {
            get_chats()
          };
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
    
    }, [socket, partner]);

    // function handleNewMessage() {
    //     if (newMessage.trim() !== '') {
    //         const newMsg = {
    //             id: message.length + 1,
    //             type: 'sent',
    //             text: newMessage,
    //             timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    //         };
    //         setMessage(prevArr => [...prevArr, newMsg]);
    //         setNewMessage('');
    //     }
    // }

    return (
        <>
            <div className='chat-room-cnt'>
                {
                
                    partner &&


                    <>
                        <div className='chat-room-header'>
                                <div id='left'>
                                    <span style={{padding: '10px', borderRadius: '50%', background: '#fff4e0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <Image height={25} width={25} src={partner.photo ? partner.photo : userSvg.src} style={{objectFit: 'cover', borderRadius: '50%'}} alt='Placeholder' />
                                    </span>
                                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px', color: '#fff'}}>
                                        <span>{partner.fname} {partner.lname}</span>
                                        <span style={{fontSize: 'small'}}>Active 2hrs ago</span>
                                    </div>
                                </div>

                                <div id='right'>
                                    
                                </div>
                        </div>

                        <div className='chat-room-body'>
                            {message && message.map((msg) => (
                                <div key={msg.id} className={`${msg.type} `}>
                                    <p>{msg.text}</p>
                                    <span>{msg.timestamp}</span>
                                </div>
                            ))}
                        </div>

                        <div className='chat-room-footer expanded'>
                            <textarea placeholder='Type a message...' value={newMessage} onChange={(e) => setNewMessage(e.target.value)}></textarea>
                            <button className='send-button' onClick={() => handleNewMessage()}>
                                <img src={sendSvg.src} alt='Send' style={{height: '20px', width: '20px', objectFit: 'contain'}} />
                            </button>
                        </div>
                    </>
                    
                }

            </div>
        </>
    )
}

import React, { use, useEffect, useState } from 'react'
import './style.css'
import sendSvg from '@/files/assets/send-message-svgrepo-com.svg'
import { useSocket } from '@/socket_context'
import { useSelector } from 'react-redux';
import { buyer_overlay_setup } from '@/files/reusable.js/overlay-setup';
import userSvg from '@/files/assets/user-rounded-svgrepo-com.svg'
import Image from 'next/image';
import Card from '../Card';
import { open_notice } from '@/files/reusable.js/notice';

export default function ChatRoom() {

    const socket = useSocket();

    const { partner } = useSelector(s => s?.partner);
    const { buyer_info } = useSelector(s => s?.buyer_info);

    const [message, setMessage] = React.useState([])
    const [newMessage, setNewMessage] = React.useState('');

    function containsPhoneNumber(text) {
        // Match any sequence of 10 or 11 digits, not part of a longer number
        const phoneRegex = /\b\d{10,11}\b/;
        return phoneRegex.test(text);
    }

    useEffect(() => {
        if (partner) {
            const chatBody = document.querySelector('.chat-room-body');
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }, [message]);


    useEffect(() => {
        if (socket && partner) {
            message.map(msg => {
                if (msg.type === 'received' && msg.seen !== ' ✓✓') {
                    socket.emit('message_seen', { conversation_id: msg.room_id });
                }
            })
        }
    }, [partner, socket, message]);

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
                        new_mssg.product_id = msg.media_url;
                        const date = new Date(msg.created_at);
                        new_mssg.timestamp = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        new_mssg.room_id = msg.conversation_id;
                    } else {
                        new_mssg.type = 'sent';
                        new_mssg.text = msg.content;
                        new_mssg.product_id = msg.media_url;
                        new_mssg.seen = msg.status.status === 'seen' ? ' ✓✓' : msg.status.status === 'sent' ? ' ✓' : '';
                        const date = new Date(msg.created_at);
                        new_mssg.timestamp = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        new_mssg.room_id = msg.conversation_id;

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

    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
    
        if (!socket) return;
    
        console.log("Socket instance in Aside:", socket);
    
        if (partner) {
            socket.emit('join_room', { otherUserId: partner.user_id });
            get_chats()
        };

        socket.on('is_typing', ({user_id}) => {
            // alert(JSON.stringify(user_id))
            if (buyer_info.user_id !== user_id) {
                setIsTyping(true)
            }
        })
        socket.on('not_typing', ({user_id}) => {
            if (buyer_info.user_id !== user_id) {
                setIsTyping(false)
            }
        })

        

        socket.on("message", (msg) => {
            if (msg.sender_id === partner.user_id) {
                const newMsg = {
                    id: message.length + 1,
                    type: 'received',
                    // seen: ' sending...',
                    text: msg.content,
                    timestamp: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessage(prevArr => [...prevArr, newMsg]);
                // setNewMessage('');
                const chatBody = document.querySelector('.chat-room-body');
                chatBody.scrollTop = chatBody.scrollHeight;

                socket.emit('message_seen', { conversation_id: msg.conversation_id });
            }
        });

        socket.on('message_seen', ({ result }) => {
            if (buyer_info.user_id === result.sender_id) {
                setMessage(prevArr => {
                    const updatedArr = [...prevArr];
                    updatedArr[updatedArr.length - 1].seen = ' ✓✓';
                    return updatedArr;
                });
            }
        })
    
    
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

    function handleNewMessage() {
        const isValidText = containsPhoneNumber(newMessage)
        if (!isValidText) {
            if (newMessage.trim() !== '') {
                const newMsg = {
                    id: message.length + 1,
                    type: 'sent',
                    seen: ' sending...',
                    text: newMessage,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessage(prevArr => [...prevArr, newMsg]);
                setNewMessage('');
                // receiver_id, content, media_url, message_type, created_at
                socket.emit('send_message', { receiver_id: partner.user_id, content: newMsg.text, media_url: null, message_type: 'text', created_at: new Date() }, (response) => {
                    if (response.success) {
                        // console.log("Message sent successfully:", response.message);
                        setMessage(prevArr => {
                            const updatedArr = [...prevArr];
                            updatedArr[updatedArr.length - 1].seen = ' ✓';
                            return updatedArr;
                        });
                    } else {
                        console.error("Failed to send message:", response.error);
                    }
                });
                const chatBody = document.querySelector('.chat-room-body');
                chatBody.scrollTop = chatBody.scrollHeight;
            }
        }else{
            open_notice(true, "Your message contains a phone number which is not allowed.");
            setTimeout(() => {
                open_notice(true, "All business-related communications must take place within this chat, in accordance with platform policy.");
            }, 6200);
        }
    }

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
                                    {
                                        isTyping && <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px', color: '#fff'}}>
                                            <span>{partner.fname} {partner.lname}</span>
                                            <span style={{fontSize: 'small'}}>Typing ...</span>
                                        </div>
                                    }
                                    {
                                        !isTyping &&
                                        <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px', color: '#fff'}}>
                                            <span>{partner.fname} {partner.lname}</span>
                                            <span style={{fontSize: 'small'}}>Active 2hrs ago</span>
                                        </div>
                                    }
                                </div>

                                <div id='right'>
                                    
                                </div>
                        </div>

                        <div className='chat-room-body'>
                            <div style={{textAlign: 'center', marginBottom: '10px', fontSize: 'small', color: '#000', padding: '10px', background: '#FFA50', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <p>
                                    ⚠️ <br />
                                    Hey there! To keep our community safe, we monitor all chat messages for security reasons. Please don’t share your phone number or personal contact info — it helps protect everyone from scams and fraud. Let’s keep all conversations right here on the platform for your safety!
                                </p>
                            </div>
                            {message && message.map((msg) => (
                                    !msg.product_id ?
                                    (
                                        <div key={msg.id} className={`${msg.type} `}>
                                            <p>{msg.text}</p>
                                            <span>{msg.timestamp}{msg?.seen}</span>
                                        </div>
                                    )
                                    : 
                                    (
                                        <div key={msg.id} className={`${msg.type} `} style={{borderRadius: '4px'}}>
                                            <Card product_id={msg.product_id} />
                                            <p>{msg.text}</p>
                                            <span>{msg.timestamp}{msg?.seen}</span>
                                        </div>
                                    )
                            ))}
                        </div>

                        <div className='chat-room-footer expanded'>
                            <textarea placeholder='Type a message...' value={newMessage} 
                            onFocus={e => {
                                socket.emit('is_typing', {partner_id:  partner.user_id, isTyping: true})
                            }} 
                            onBlur={e => {
                                socket.emit('not_typing', {partner_id:  partner.user_id, isTyping: false})
                            }} onChange={(e) => setNewMessage(e.target.value)}></textarea>
                            <button className='send-button' onClick={() => handleNewMessage()}>
                                <img src={sendSvg.src} alt='Send' style={{height: '20px', width: '20px', objectFit: 'contain'}} />
                            </button>
                        </div>
                    </>
                    
                }

                {
                    !partner && <NoChatSelected />
                }

            </div>
        </>
    )
}


const NoChatSelected = () => {
    return (
        <></>
    );
};

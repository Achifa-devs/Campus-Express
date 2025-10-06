import React, { use, useEffect } from 'react'
import './style.css'
import sendSvg from '@/files/assets/send-message-svgrepo-com.svg'
export default function ChatRoom() {

    const [message, setMessage] = React.useState([
        {id: 1, type: 'received', text: 'Hello! How can I help you today?', timestamp: '10:00 AM'},
        {id: 2, type: 'sent', text: 'I have a question about my order.', timestamp: '10:01 AM'},
        {id: 3, type: 'received', text: 'Sure! What seems to be the issue?', timestamp: '10:02 AM'},
        {id: 4, type: 'sent', text: 'I received the wrong item.', timestamp: '10:03 AM'},
        {id: 5, type: 'received', text: 'I apologize for the inconvenience. Can you provide your order number?', timestamp: '10:04 AM'},
        {id: 6, type: 'sent', text: 'Yes, it is #12345.', timestamp: '10:05 AM'},
        {id: 7, type: 'received', text: 'Thank you. I will look into this for you.', timestamp: '10:06 AM'},
        {id: 8, type: 'received', text: 'In the meantime, is there anything else I can assist you with?', timestamp: '10:07 AM'},
        {id: 9, type: 'sent', text: 'No, that is all for now. Thank you!', timestamp: '10:08 AM'},
        {id: 10, type: 'received', text: 'You\'re welcome! Have a great day!', timestamp: '10:09 AM'},
    ])
    const [newMessage, setNewMessage] = React.useState('');

    useEffect(() => {
        const chatBody = document.querySelector('.chat-room-body');
        chatBody.scrollTop = chatBody.scrollHeight;
    }, [message]);

    function handleNewMessage() {
        if (newMessage.trim() !== '') {
            const newMsg = {
                id: message.length + 1,
                type: 'sent',
                text: newMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessage(prevArr => [...prevArr, newMsg]);
            setNewMessage('');
        }
    }

    return (
        <>
            <div className='chat-room-cnt'>
                <div className='chat-room-header'>
                        <div id='left'>
                            <span>
                                <img src={'https://res.cloudinary.com/daqbhghwq/image/upload/v1757403785/IMG-20250809-WA0017_ili5nn.jpg'} style={{height: '50px', width: '50px', objectFit: 'cover', borderRadius: '50%'}} alt='Placeholder' />
                            </span>
                            <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px', color: '#fff'}}>
                                <span>Akpulu Fabian.C</span>
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

            </div>
        </>
    )
}

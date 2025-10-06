import React from 'react'
import './style.css'
export default function Aside() {
  return (
    <>
      <div className='chat-aside-cnt'>
        <div className='aside-header'>
          <p>My Campus Chat List</p>
        </div>

        <ul id='chat-heads-cnt'>
          <li id='chat-head'>
            <div id='left'>
              <img src={'https://res.cloudinary.com/daqbhghwq/image/upload/v1757403785/IMG-20250809-WA0017_ili5nn.jpg'} style={{height: '50px', width: '50px', objectFit: 'cover', borderRadius: '50%'}} alt='Placeholder' />
            </div>
            
            <div id='right'>
              <div className='top'>
                <span style={{width: '70%', fontSize: 'small', fontWeight: 'bold'}}>Akpulu Fabian.F</span>
                <span style={{width: '20%', fontSize: 'small', color: true ? 'green' : 'red'}}>{true ? 'Online' : 'Offline'}</span>
              </div>
              <div className='btm'>
                <span style={{width: '70%', fontSize: 'smaller'}}>Hello!</span>
                <span style={{width: 'fit-content', padding: '2.5px 8px', height: 'fit-content', fontSize: 'small', background: '#FF4500', borderRadius: '10px', color: '#fff'}}>5</span>
              </div>
            </div>
          </li>
        
        </ul>
      </div>

      
    </>
  )
}

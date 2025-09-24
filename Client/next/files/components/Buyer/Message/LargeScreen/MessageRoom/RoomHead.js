import js_ago from 'js-ago'
import React from 'react'

export default function RoomHead({activeRoom}) {

  return (
    <>
      <div className="seller-chat-header">
        <section style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '100%',
          padding: '10px'
        }}>
            <div style={{
                height: '50px',
                width: '50px',
                borderRadius: '50%',
                float: 'left',
                background: '#ff4e80',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5vh',
                fontWeight: '500',
                margin: '0 20px 0 0'
            }}>
                {
                  activeRoom?.seller_data?.fname.split('')[0]
                } 
                .
                {
                  activeRoom?.seller_data?.lname.split('')[0]
                }
            </div>

            <div className="seller-client-list-chat-log" style={{position: 'relative', height: '100%'}}>
              <div style={{height: '100%', display: 'flex', flexDirection: 'column', padding: '10px 0 10px 0', position: 'relative', justifyContent: 'space-between', width: '100%', textAlign: 'left'}}>
                  <span style={{fontSize: 'medium', fontWeight: '500'}}>{activeRoom.seller_data.fname} {activeRoom.seller_data.lname}</span>
                  <span style={{fontSize: 'small',}}>{(activeRoom.seller_data.isactive) ? <small style={{fontWeight: '500', color: 'green'}}>Online</small> : <small style={{fontWeight: '500', color: 'red'}}>Offline</small>}</span>   
              </div>
            </div>
        </section>
      </div>
    </>
  )
}

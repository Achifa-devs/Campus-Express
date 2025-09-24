import React from 'react'
import Mssg from '../../Mssg'

export default function RoomBody({chat}) {
  // console.log(chat)
  return (
    <>
      <div className="seller-chat-body">

        <div className="seller-chat-box">
          {
            chat?.map((item, index) => 
              <div key={index} className="seller-chat-cnt" style={{float: 'left', textAlign: 'left'}}>
                <section id='sellerChatMate' style={{float: 'left', textAlign: 'left'}}>
                    <Mssg mssg_id={item.message_id} />
                </section>
              </div> 
            )
          }
        </div> 
      </div>
    </>
  )
}

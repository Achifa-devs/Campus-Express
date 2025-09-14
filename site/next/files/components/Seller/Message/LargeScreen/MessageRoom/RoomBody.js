import React, { useEffect } from 'react'
import { GetChat } from '../../../../../api/seller/get'

export default function RoomBody({activeRoom}) {

  useEffect(() => {
    try {
      async function getData() {
        let result = await GetChat(activeRoom.room)
        console.log(result)
      }
      getData()
    } catch (error) {
      console.log(error)
    }
  }, [activeRoom])
  
  return (
    <>
        <div className="seller-chat-body">

        </div>
    </>
  )
}

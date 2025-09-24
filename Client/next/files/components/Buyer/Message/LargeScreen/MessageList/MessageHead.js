import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../../../../../socket'
import js_ago from 'js-ago'

export default function MessageHead({data, index, setRoomId}) {
    let [screenWidth, setScreenWidth] = useState(0)

    useEffect(() => { 
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])
    let navigate = useNavigate()
  return (
    <>
        <section key={index} onClick={e => screenWidth > 760 ? setRoomId(data.mssg.mssg_id) : navigate('/seller.messages.room')}>
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
                fontWeight: '500'
            }}>
                {
                    data?.seller_data?.fname.split('')[0]
                } 
                .
                {
                    data?.seller_data?.lname.split('')[0]
                }
            </div>

            <div className="seller-client-list-chat-log">
                <div style={{height: '50%', display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left'}}>
                    <span style={{fontSize: 'medium', fontWeight: '500'}}>{data.seller_data.fname} {data.seller_data.lname}</span>
                    {/* <span style={{fontSize: 'small', position: 'absolute', right: '15px'}}>{js_ago(new Date(data?.mssg?.date))}</span>    */}
                </div>
                <div style={{height: '50%', display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left'}}>
                    <span>{data.mssg.mssg}</span>
                    <span style={{fontSize: 'small', height: '20px', width: '20px', position: 'absolute', right: '15px', fontWeight: '500', borderRadius: '50%', background: 'orangered', color: '#fff', textAlign: 'center'}}>2</span>  
                </div>
            </div>
        </section>
    </>
  )
}

 
// buyer_data
// : 
// {id: 1, fname: 'Akpulu', lname: 'Chinedu', user_id: 'CE-751620', email: 'akpulufabian@gmail.com', …}
// mssg
// : 
// {id: 16, mssg_id: 'c033e3', mssg: 'Hi', date: 'Fri Mar 08 2024 19:42:11 GMT+0100 (West Africa Standard Time)'}
// room
// : 
// "0abf71"

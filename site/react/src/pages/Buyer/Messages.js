import React, { useEffect, useState } from 'react'
import MessageLg from './MessageLg';
import MessagesSm from './MessagesSm';

export default function Messages() {

    let [screenWidth, setScreenWidth] = useState(0)
    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

  return (
    <>
        {
            screenWidth > 760
            ?
            <MessageLg />
            :
            <MessagesSm />
        }
    </>
  )
}

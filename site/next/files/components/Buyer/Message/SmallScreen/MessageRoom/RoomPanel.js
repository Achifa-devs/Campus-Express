import React, { useState } from 'react'
import mssgSvg from '../../../../../assets/messages-svgrepo-com (1).svg'
export default function Panel() {

    let [mssg,set_mssg] = useState('')

    

  return (
    <>
         <div className="seller-chat-tools" style={{display: 'flex', background: '#fff', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', left: '0', padding: '5px', bottom: '0', width: '99.9%', margin: 'auto'}}>
            <textarea onInput={e => set_mssg(e.target.value)} name="" style={{width: '70%', height: '100%', resize: 'none', padding: '10px 20px 10px 20px', outline: 'none', fontSize: 'large', fontWeight: '400', background: '#f9f9f9', borderRadius: '2px', outline: 'none', border: 'none'}} placeholder='Message...'></textarea>
            <button onClick={''} style={{float: 'right', width: '50px', height: '40px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', outline: 'none', border: 'none'}}>  
                <img src={mssgSvg} style={{height: '20px', width: '20px', }} alt="" />
            </button>
        </div>
    </>
  )
}

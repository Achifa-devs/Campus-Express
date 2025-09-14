import js_ago from 'js-ago'
import React from 'react'

export default function InboxItem({data}) {
  return (
    <>
        <div className='inbox-card-data'>
            <div className='inbox-card-data-top'>
                  <div id='left'><b># {data?.action_id}</b></div>
                <div id='right'>
                    <button>View Details</button>
                </div>
            </div>
            <div className='inbox-card-data-mid'>
                <div>
                    <h6>{data?.subject}</h6>
                </div>
                <div>
                    <small>{data?.message_content}</small>
                </div>
            </div>
            <div className='inbox-card-data-btm'>
                <div className=''>
                    {js_ago(new Date(data?.created_at))}
                </div>
            </div>
        </div>
    </>
  )
}

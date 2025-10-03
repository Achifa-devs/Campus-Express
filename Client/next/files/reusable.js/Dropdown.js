import React from 'react'
import Ellipsis from '@/files/assets/ellipsis-svgrepo-com.svg'
import Image from 'next/image'
export default function Dropdown({list}) {
    return (
        <>
            <div className="btn-group">
                <button type="button" className="btn dropdown-toggle" style={{background: '#FF4500'}} data-bs-toggle="dropdown" aria-expanded="false">
                    {/* <img src={Ellipsis} style={{height: '20px', width: '20px'}} /> */}
                </button>
                <ul className="dropdown-menu">
                    {
                        list.map((item, index) => {
                            return(
                                <li key={index}><a className="dropdown-item" href=''>{item.title}</a></li>
                            )
                        })
                    }
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Separated link</a></li>
                </ul>
            </div>
        </>
    )
}

import React from 'react'
import './styles/xxl.css'
import logo from "../../public/ic_notification.png"
export default function page() {
  const listStyles = {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'nowrap'
  
  };

  const linkStyles = {
    color: '#000', 
    textDecoration: 'none',
    flexWrap: 'nowrap',
    padding: '10px',
    margin: '20px 10px'
  };
  return (
    <div>
      <header>
        <img src={logo.src} style={{ height: '100px', width: '100px' }} alt="" />
        <div className="input-cnt">
            <input type="search" name="" placeholder='What are you searching for' id="" />
            <button>Search</button>
        </div>
        <h1 style={{color: '#fff', fontSize: '4vh', fontWeight:  '500'}}>About dorm deals</h1>
      </header>
      <section >
        <div className="header ">
          Overview
        </div>
        <ul className='overview'>
          <li className='overview-links'><a href="#one">dorm deals Origination</a></li>
          <li className='overview-links'><a href="#two">dorm deals Purpose</a></li>
          <li className='overview-links'><a href="#three">dorm deals Target Audience</a></li>
          <li className='overview-links'><a href="#four">dorm deals Accomplishment</a></li>
          <li className='overview-links'><a href="#five">dorm deals Mission And Vision</a></li>
          <li className='overview-links'><a href="#six">dorm deals Community</a></li>
        </ul>
      </section>
      <section className='content'>

        <section id='one'>
          <div className="sub-header">
            dorm deals Origination
          </div>
          <article>

          </article>
        </section>


        <section id='two'>
          <div className="sub-header">
            dorm deals Purpose
          </div>
          <article>
          
          </article>
        </section>

        <section id='three'>
          <div className="sub-header">
            dorm deals Target Audience
          </div>
          <article>
          
          </article>
        </section>


        <section id='four'>
          <div className="sub-header">
            dorm deals Accomplishment
          </div>
          <article>
          
          </article>
        </section>


        <section id='five'>
          <div className="sub-header">
            dorm deals Mission And Vision
          </div>
          <article>
          
          </article>
        </section>


        <section id='six'>
          <div className="sub-header">
            dorm deals Community
          </div>
          <article>
          
          </article>
        </section>

      </section>
    </div>
  )
}

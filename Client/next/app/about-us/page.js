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
        <h1 style={{color: '#fff', fontSize: '4vh', fontWeight:  '500'}}>About Campus Sphere</h1>
      </header>
      <section >
        <div className="header ">
          Overview
        </div>
        <ul className='overview'>
          <li className='overview-links'><a href="#one">Campus Sphere Origination</a></li>
          <li className='overview-links'><a href="#two">Campus Sphere Purpose</a></li>
          <li className='overview-links'><a href="#three">Campus Sphere Target Audience</a></li>
          <li className='overview-links'><a href="#four">Campus Sphere Accomplishment</a></li>
          <li className='overview-links'><a href="#five">Campus Sphere Mission And Vision</a></li>
          <li className='overview-links'><a href="#six">Campus Sphere Community</a></li>
        </ul>
      </section>
      <section className='content'>

        <section id='one'>
          <div className="sub-header">
            Campus Sphere Origination
          </div>
          <article>

          </article>
        </section>


        <section id='two'>
          <div className="sub-header">
            Campus Sphere Purpose
          </div>
          <article>
          
          </article>
        </section>

        <section id='three'>
          <div className="sub-header">
            Campus Sphere Target Audience
          </div>
          <article>
          
          </article>
        </section>


        <section id='four'>
          <div className="sub-header">
            Campus Sphere Accomplishment
          </div>
          <article>
          
          </article>
        </section>


        <section id='five'>
          <div className="sub-header">
            Campus Sphere Mission And Vision
          </div>
          <article>
          
          </article>
        </section>


        <section id='six'>
          <div className="sub-header">
            Campus Sphere Community
          </div>
          <article>
          
          </article>
        </section>

      </section>
    </div>
  )
}

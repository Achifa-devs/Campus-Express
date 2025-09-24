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
        <h1 style={{color: '#fff', fontSize: '4vh', fontWeight:  '500'}}>Campus Sphere Help Center</h1>
      </header>
      <section >
        <div className="header ">
          Overview
        </div>
        <ul className='overview'>
          <li className='overview-links'><a href="#one">How to shop on Campus Sphere?</a></li>
          <li className='overview-links'><a href="#two">How to sell on Campus Sphere?</a></li>
          <li className='overview-links'><a href="#three">Delivery options and timelines</a></li>
          <li className='overview-links'><a href="#four">How to return a product on Campus Sphere?</a></li>
          {/* <li className='overview-links'><a href="two">Corporate and bulk purchases</a></li> */}
          <li className='overview-links'><a href="#five">Report a Product</a></li>
          <li className='overview-links'><a href="#six">Dispute Resolution Policy</a></li>
          <li className='overview-links'><a href="#seven">Return Policy</a></li>
        </ul>
      </section>
      <section className='content'>

        <section id='one'>
          <div className="sub-header">
            How to shop on Campus Sphere?
          </div>
          <article>

          </article>
        </section>


        <section id='two'>
          <div className="sub-header">
            How to sell on Campus Sphere?
          </div>
          <article>
          
          </article>
        </section>

        <section id='three'>
          <div className="sub-header">
            Delivery options and timelines
          </div>
          <article>
          
          </article>
        </section>


        <section id='four'>
          <div className="sub-header">
            How to return a product on Campus Sphere?
          </div>
          <article>
          
          </article>
        </section>


        <section id='five'>
          <div className="sub-header">
            Report a Product
          </div>
          <article>
          
          </article>
        </section>


        <section id='six'>
          <div className="sub-header">
            Dispute Resolution Policy
          </div>
          <article>
          
          </article>
        </section>


        <section id='seven'>
          <div className="sub-header">
            Return Policy
          </div>
          <article>
          
          </article>
        </section>

      </section>
    </div>
  )
}

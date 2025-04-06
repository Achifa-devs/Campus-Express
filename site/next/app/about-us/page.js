"use client"
import React, { useEffect } from 'react'
import './styles/xx-large.css'
import './styles/x-large.css'
import './styles/large.css'
import './styles/medium.css'
import './styles/small.css'

export default function About() {

    useEffect(() => {
    }, [])
  return (
    <>
      <header>
        <section>
           <h4 style={{color: '#FF4500'}}>About Us</h4>
        </section>

        <section>
            <ul>
                <li>Our Vision</li>
                <li>Campus Express Today</li>
                <li>Our Mission</li>
                <li>Our History</li>
            </ul>
        </section>
      </header>

      <main>
        <div style={{background: '#f9f9f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column'}}>
            <section>
                
            </section>
            <section style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '100%', padding: '40px 80px'}}>
                <div style={{
                    height: '100px',
                    width: '100px',
                    borderRadius: '5px', 
                    background: '#fff'
                }}></div>
                <div style={{
                    height: '100px',
                    width: '100px',
                    borderRadius: '5px', 
                    background: '#fff'
                }}></div>
                <div style={{
                    height: '100px',
                    width: '100px',
                    borderRadius: '5px', 
                    background: '#fff'
                }}></div>
                <div style={{
                    height: '100px',
                    width: '100px',
                    borderRadius: '5px', 
                    background: '#fff'
                }}></div>
            </section>
        </div>

        <br />
        <br />

        <div style={{background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', position: 'relative', borderRadius: '8px'}}>
            <div style={{background: 'transparent', padding: '40px'}}>
                <img src="https://res.cloudinary.com/daqbhghwq/image/upload/v1725628310/KE_W19_LP_About_Us_03_bztpbq.png" alt="" />
                <h4 style={{background: 'transparent', fontSize: 'small'}}>Campus Express Today In A NutShell</h4>
            </div>

            <section style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '100%', padding: '10px 80px'}}>

                <div style={{
                    height: 'auto',
                    width: '200px',
                    borderRadius: '5px', 
                    background: '#fff',
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <div style={{textAlign: 'center', fontSize: 'small', borderRadius: '50%', background: '#fff4e0', height: '150px', display: 'flex', alignItems: 'center', width: '150px', padding: '10px'}}>
                        6,000 Products Availble
                    </div>
                    <div style={{textAlign: 'left', fontSize: 'small', height: 'auto', display: 'flex', alignItems: 'center', width: '200px', padding: '10px'}}>
                        Campus Express offers the widest assortment at an unbeatable price
                    </div>
                </div>
                <div style={{
                    height: 'auto',
                    width: '200px',
                    borderRadius: '5px', 
                    background: '#fff',
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <div style={{textAlign: 'center', fontSize: 'small', borderRadius: '50%', background: '#fff4e0', height: '150px', display: 'flex', alignItems: 'center', width: '150px', padding: '10px'}}>
                        3 States, Nigerian
                    </div>
                    <div style={{textAlign: 'left', fontSize: 'small', height: 'auto', display: 'flex', alignItems: 'center', width: '200px', padding: '10px'}}>
                        The Pan Nigerian Online Commerce
                    </div>
                </div>
                <div style={{
                    height: 'auto',
                    width: '200px',
                    borderRadius: '5px', 
                    background: '#fff',
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <div style={{textAlign: 'center', fontSize: 'small', borderRadius: '50%', background: '#fff4e0', height: '150px', display: 'flex', alignItems: 'center', width: '150px', padding: '10px'}}>
                        Over 100 Active Vendors
                    </div>
                    <div style={{textAlign: 'left', fontSize: 'small', height: 'auto', display: 'flex', alignItems: 'center', width: '200px', padding: '10px'}}>
                        Naija Safest Online Mall For Campus Student
                    </div>
                </div>

                <div style={{
                    height: 'auto',
                    width: '200px',
                    borderRadius: '5px', 
                    background: '#fff',
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <div style={{textAlign: 'center', fontSize: 'small', borderRadius: '50%', background: '#fff4e0', height: '150px', display: 'flex', alignItems: 'center', width: '150px', padding: '10px'}}>
                        #2 Ecommerce Site, S.E, Nig
                    </div>
                    <div style={{textAlign: 'left', fontSize: 'small', height: 'auto', display: 'flex', alignItems: 'center', width: '200px', padding: '10px'}}>
                        Over 100 MOnthly Visitors
                    </div>
                </div>
                

            </section>

            <section style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '100%', padding: '40px 80px'}}>

                <div style={{
                    height: 'auto',
                    width: '200px',
                    borderRadius: '5px', 
                    background: '#fff',
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <div style={{textAlign: 'center', fontSize: 'small', borderRadius: '50%', background: '#fff4e0', height: '150px', display: 'flex', alignItems: 'center', width: '150px', padding: '10px'}}>
                        0 Commercial Events
                    </div>
                    <div style={{textAlign: 'left', fontSize: 'small', height: 'auto', display: 'flex', alignItems: 'center', width: '200px', padding: '10px'}}>
                        Discover the Events Changing Nigeria&apos;s Campus Commerce
                    </div>
                </div>

            </section>

        </div>

        <br />
            
        <div style={{background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'column', position: 'relative', borderRadius: '8px'}}>
            <div style={{background: 'transparent', padding: '40px'}}>
                <img src="https://res.cloudinary.com/daqbhghwq/image/upload/v1725628310/KE_W19_LP_About_Us_06_e58maf.png" alt="" />
                <h5 style={{background: 'transparent', fontSize: 'small'}}>Campus Express History</h5>
            </div>

           
            <section style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '100%', padding: '10px 40px'}}>

                <ul style={{listStyleType: 'disc'}}>
                    <li style={{fontSize: 'small', margin: '0 0 8px 0'}}>Year 2023</li>
                    <li style={{fontSize: 'small', margin: '0 0 8px 0'}}>
                        <ol style={{listStyleType: 'numbers'}}>
                            <li style={{fontSize: 'small'}}>2023: U-COMMERCE LIMITED Launch Campus Express In Enugu, Anambra and Ogun</li>
                        </ol>
                    </li>

                    <br />

                    <li style={{fontSize: 'small', margin: '0 0 8px 0'}}>Year 2024</li>
                    <li style={{fontSize: 'small', margin: '0 0 8px 0'}}>
                        <ol style={{listStyleType: 'numbers'}}>
                            <li style={{fontSize: 'small', margin: '0 0 8px 0'}}>2024: Campus Express Records 100 New Vendors</li>
                            <li style={{fontSize: 'small', margin: '0 0 8px 0'}}>2024: Campus Express Records Sales Up To Half A Million</li>
                        </ol>
                    </li>
                </ul>
            </section>

        </div>

        <div>
            
        </div>
      </main>
    </>
  )
}

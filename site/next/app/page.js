
"use client"
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import StructuredData from './StructuredData';
import './styles/xx-large.css';
import './styles/x-large.css';
import './styles/large.css';
import './styles/medium.css';
import './styles/small.css';

export default function Page() {
  const { buyer_info } = useSelector(s => s.buyer_info);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const handleCategoryClick = (uri) => {
    // const isAuth = buyer_info && buyer_info !== 'null' && buyer_info !== 'undefined';
    window.location.href = uri;
  };

  return (
    <>
      
      <div className="home">
        {/* Hero Section */}
        <div className="hero-section">
          <div id="left">
            <h1>
              Introducing Your Online Campus Marketplace
            </h1>
             <h4 style={{
              textAlign: 'center',
              color: '#4B5563',
              fontSize: '18px',
              lineHeight: '1.6',
              maxWidth: '800px',
              margin: '20px auto',
              padding: '0 20px',
              fontWeight: '400',
              fontStyle: 'italic'
            }}>
              The next-generation platform revolutionizing campus commerce. Our innovative solutions are designed to empower students and vendors with smarter, faster, and more secure ways to buy, sell, and connect across campus communities.
            </h4>
            
            <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '40px 0',
                  gap: '20px'
                }}
              >
                {[
                  { uri: '/store/category/Lodge & Accomodation', title: 'Lodge & Accomodation', icon: '🏠', color: '#FF6B6B' },
                  { uri: '/store/category/Services', title: 'Services', icon: '🛠️', color: '#4ECDC4' },
                  { uri: '/store/category/Appliances', title: 'Appliances', icon: '🔌', color: '#45B7D1' },
                  { uri: '/store/category/Mobile Phones', title: 'Mobile Phones', icon: '📱', color: '#A78BFA' },
                  { uri: '/store/category/Laptops', title: 'Laptops', icon: '💻', color: '#F9A8D4' },
                  { uri: '/store/category/Fashion & Clothing', title: 'Fashion & Clothing', icon: '👕', color: '#F472B6' },
                  { uri: '/store/category/Study Materials', title: 'Study Materials', icon: '📚', color: '#FBBF24' },
                  { uri: '/store/', title: 'Explore More', icon: '🔍', color: '#818CF8' },
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      width: 'calc(25% - 20px)',
                      minWidth: '120px',
                      marginBottom: '20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease'
                    }}
                    onClick={(e) => {
                      // let isAuth = buyer_info !== null && buyer_info !==undefined && buyer_info !== 'null' && buyer_info !=='undefined' && buyer_info !== '' ? true : false
                      //  isAuth?
                      //   : window.location.href = '/login'
                      window.location.href = `${item.uri}`
                    }}
                    
                  >
                    <div
                      style={{
                        height: '80px',
                        width: '80px',
                        margin: '0 auto 10px',
                        borderRadius: '50%',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: item.color,
                        color: 'white',
                        fontSize: '30px'
                      }}
                    >
                      {item.icon}
                    </div>
                    <p style={{
                      margin: 0,
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '14px'
                    }}>
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>

             
            </div>

          </div>
          <div id="right">
            {/* Download Buttons with App Store Logos */}
            <div className="download-section">
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '15px',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}>
                <b>Get the Campus Sphere App</b>
              </h4>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.ucommerce.campussphere" 
                  className="download-button"
                  style={{
                    backgroundColor: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 15px 8px 12px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png" 
                    alt="Google Play"
                    style={{
                      height: '28px',
                      width: 'auto'
                    }}
                  />
                </a>
                
                <a 
                  href="https://apps.apple.com/us/app/campus-sphere/idYOUR_APP_ID" 
                  className="download-button"
                  style={{
                    backgroundColor: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 15px 8px 12px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1200px-Download_on_the_App_Store_Badge.svg.png" 
                    alt="App Store"
                    style={{
                      height: '28px',
                      width: 'auto'
                    }}
                  />
                </a>
              </div>
              
              <p style={{
                marginTop: '15px',
                fontSize: '12px',
                color: '#666',
                fontStyle: 'italic'
              }}>
                Also available as <a href="https://github.com/Achifa-devs/Campus-Express/releases/tag/v1.0.2" style={{color: '#FF4500'}}>APK download</a>
              </p>
            </div>

            {/* Android Simulator */}
            <div className="emulator-frame">
              <div className="emulator-screen">
                <img 
                  src="https://res.cloudinary.com/daqbhghwq/image/upload/v1746781312/Screenshot_2025-05-09-09-59-58-066_com.ucommerce.campussphere_emobo3.jpg" 
                  alt="App Screenshot" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '22px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />

        {/* <div className="roles-section">
          
        </div> */}

        <div className="vision-section">
          <div className='vision-header'>
            <div class="logo">Campus Sphere</div>
            <div class="tagline">Bridging the gap between students and vendors</div>
          </div>
          <div class="vision-card">
              <h2>Our Vision</h2>
              <p>&quot;To be the leading platform that empowers students and campus vendors by bridging gaps and creating a seamless marketplace experience.&quot;</p>
          </div>
          <div class="mission-section">
            <h2>Our Mission</h2>
            
            <div class="mission-grid">
              <div class="mission-card">
                  <div class="mission-icon">①</div>
                  <h3>End Information Asymmetry</h3>
                  <p>To end information asymmetry between campus vendors and customers, ensuring that everyone has access to the right information at the right time.</p>
              </div>
              
              <div class="mission-card">
                  <div class="mission-icon">②</div>
                  <h3>Secure Transactions</h3>
                  <p>To improve security through escrow services, providing a safe and trustworthy transaction environment for all users.</p>
              </div>
              
              <div class="mission-card">
                  <div class="mission-icon">③</div>
                  <h3>Vendor Visibility</h3>
                  <p>To improve the visibility of vendors&quot; ads to customers across Nigerian campuses, maximizing their reach and opportunities for growth.</p>
              </div>
            </div>
          </div>

          <br />
          <br />
          <br />
         <div className='video-statement'>
            <video
              src="https://res.cloudinary.com/daqbhghwq/video/upload/v1742848836/6a28cdee-b6c5-42c6-91a5-a432019a5d0e/541FAq0Zn%7C6a28cdee-b6c5-42c6-91a5-a432019a5d0e.mp4"
              style={{
                objectFit: 'cover'
              }}
              controls
            />

            <div style={{
              height: '100%',
              padding: '2rem',
              backgroundColor: '#FF4500',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h4 style={{
                fontSize: '1.5rem',
                color: '#fff',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Welcome to Campus Sphere
              </h4>
              <p style={{
                color: '#fff',
                lineHeight: '1.6',
                fontSize: '1rem'
              }}>
                Campus Sphere is revolutionizing campus commerce by connecting students with trusted vendors in a seamless digital marketplace. 
                Our platform eliminates information gaps, ensures secure transactions, and empowers campus entrepreneurs to thrive.
                <br/><br/>
                In this video, you&quot;ll discover how we&quot;re transforming campus economies across Nigeria - from streamlined vendor-student interactions 
                to our innovative escrow payment system that guarantees safety for all transactions.
                <br/><br/>
                Join thousands of students and vendors who are already experiencing the future of campus commerce.
              </p>
            </div>
          </div>
        </div>

        <div className="team-section">
          <div class="team-header">
            <h1>Meet Our Team</h1>
            <p style={{
              textAlign: 'center',
              color: '#fff',
              fontSize: '18px',
              lineHeight: '1.6',
              maxWidth: '800px',
              margin: '20px auto',
              padding: '0 20px',
              fontWeight: '400',
              fontStyle: 'italic'
            }}>The passionate individuals building CampusConnect to bridge the gap between students and campus vendors across Nigeria.</p>
          </div>
          
          <div class="founder-section">
            
            <div class="team-grid">
              <div class="team-card founder-card">
                <img src="https://res.cloudinary.com/daqbhghwq/image/upload/v1746981002/1742973114382_ldrmy5.jpg" alt="Founder" class="team-img" />
                <div class="team-info">
                  <span class="team-role founder-role">Founder & CEO</span>
                  <h3 class="team-name">Akpulu Fabian</h3>
                  <p class="team-title">Product Vision & Strategy | Software Design & Engineering</p>
                  <p class="team-bio">Serial entrepreneur with 5+ years experience in building e-commerce platforms across Africa.</p>
                  {/* <div class="social-links">
                    <a href="#" class="social-link">in</a>
                    <a href="#" class="social-link">tw</a>
                    <a href="#" class="social-link">ig</a>
                  </div> */}
                </div>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>
    </>
  );
}

// Styles object for cleaner JSX
const styles = {
  subtitle: {
    textAlign: 'center',
    color: '#4B5563',
    fontSize: '18px',
    lineHeight: '1.6',
    maxWidth: '800px',
    margin: '20px auto',
    padding: '0 20px',
    fontWeight: '400',
    fontStyle: 'italic'
  },
  categoriesContainer: {
    padding: '20px', 
    maxWidth: '1200px', 
    margin: '0 auto'
  },
  categoryCard: {
    width: 'calc(25% - 20px)',
    minWidth: '120px',
    marginBottom: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  },
  categoryIcon: {
    height: '80px',
    width: '80px',
    margin: '0 auto 10px',
    borderRadius: '50%',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '30px'
  },
  categoryTitle: {
    margin: 0,
    fontWeight: '600',
    color: '#374151',
    fontSize: '14px'
  },
  downloadTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '15px',
    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
  },
  downloadButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap'
  },
  downloadButton: {
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 15px 8px 12px',
    borderRadius: '6px',
    textDecoration: 'none',
    transition: 'transform 0.2s ease'
  },
  appBadge: {
    height: '28px',
    width: 'auto'
  },
  appPreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '22px'
  }
};
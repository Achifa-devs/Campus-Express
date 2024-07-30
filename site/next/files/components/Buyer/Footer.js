import React from 'react';
import WhatsAppSvg from '@/files/assets/whatsapp-whats-app-svgrepo-com.svg'
import tweeterSvg from '@/files/assets/twitter-svgrepo-com (2).svg'
import fbSvg from '@/files/assets/facebook-1-svgrepo-com (1).svg'
import igSvg from '@/files/assets/instagram-1-svgrepo-com (1).svg'
import ytSvg from '@/files/assets/youtube-color-svgrepo-com (1).svg'
import flwSvg from '@/files/assets/Full-Flutterwave-New-Logo-2022 (1).svg'
const footerStyles = {
  backgroundColor: 'rgb(49, 49, 51)',
//   height: '400px',
  position : 'relative',
  padding: '0',
  color: '#333',
  textAlign: 'center',
};

const topFooter = {
  width: '100%',
  margin: 'auto',
  display: 'flex',
  height: '240px',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  flexDirection: 'row',
  padding: '40px',
  fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
  // backgroundColor: '#FF4500',
  borderRadius: '20px',
  color: '#fff'

};


const containerStyles = {
  backgroundColor: 'rgb(100, 100, 100)',
  width: '100%',
  margin: 'auto',
  fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  flexDirection: 'row',
  padding: '40px',
  // backgroundColor: '#FF4500',
};

const sectionStyles = {
  flex: 1,
  minWidth: '200px',
  marginBottom: '20px',
};

const sectionTitleStyles = {
  fontWeight: 'bold',
  marginBottom: '15px',
  textAlign: 'left'
};

const listStyles = {
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'nowrap'

};

const listItemStyles = {
  marginBottom: '2.5px',
  float: 'left',
  fontSize: 'small',
  color: '#efefef', 
  flexWrap: 'nowrap',
  fontWeight: '500'
};

const linkStyles = {
  color: '#007bff',
  color: '#efefef', 
  textDecoration: 'none',
  flexWrap: 'nowrap'

};

const socialIconStyles = {
  marginRight: '10px',
  width: '24px',
  height: '24px',
};

const bottomFooterStyles = {
  textAlign: 'center',
  padding: '10px 0',
  backgroundColor: 'rgb(100, 100, 100)',
  borderTop: '1px solid #dee2e6',
};

const Footer = () => {
  return (
    <footer style={footerStyles}>
      <div style={topFooter}>

        <section style={{display: 'flex', width: '33.3%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column'}}>
          <h4 style={{fontSize: '4vh'}}>Campus Express</h4>
        </section>

        <section style={{display: 'flex', width: '33.3%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column'}}>
          <h6>New To Campus Express</h6>
          <small style={{marginBottom: '10px'}}>Subscribe to our newsletter to get updates on our latest offers!</small>
          
          <div style={{display: 'flex', width: '33.3%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginBottom: '10px'}}>
            <div className="input-cnt"> 
              <input type="text" style={{height: '40px', width: '200px', padding: '10px'}} name="" id="" />
            </div>

            &nbsp;
            &nbsp;

            <div style={{display: 'flex', width: '33.3%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row'}}>
              <button style={{height: '40px', width: '60px'}}>Male</button>
              &nbsp;
              &nbsp;
              <button style={{height: '40px', width: '60px'}}>Female</button>
            </div>

          </div>
          <div className="input-cnt" style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>
            <input type="checkbox" style={{height: '20px', width: '20px'}} name="" id="terms" />
            &nbsp;
            &nbsp;
            <label style={{padding: '0', margin: '0'}} htmlFor="terms">
              <small style={{fontSize: 'x-small', textAlign: 'left', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', padding: '0', margin: '0'}}>I agree to Jumia’s Privacy and Cookie Policy. You can unsubscribe from newsletters at any time.</small>
            </label>
          </div> 

        </section>

        <section style={{width: '33.3%'}}>

        </section>
      </div>
      <div style={containerStyles}>
        {/* Customer Service Section */}
        <div style={sectionStyles}>
          <h4 style={sectionTitleStyles}>Customer Service</h4>
          <ul style={listStyles}>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Help Center</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Contact Us</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Chat With Us</a></li>
            {/* <li style={listItemStyles}><a href="/" style={linkStyles}>Return Policy</a></li> */}
          </ul>

          <h4 style={sectionTitleStyles}>Useful Links</h4>
          <ul style={listStyles}>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Service Center</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>How to shop on Jumia?</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Delivery options and timelines</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>How to return a product on Jumia?</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Corporate and bulk purchases</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Report a Product</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Dispute Resolution Policy</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Returns & Refund Timeline</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Return Policy</a></li>
          </ul>

          
        </div>

        {/* Quick Links Section */}
        <div style={sectionStyles}>
          <h4 style={sectionTitleStyles}>About Campus Express</h4>
          <ul style={listStyles}>
            <li style={listItemStyles}><a href="/" style={linkStyles}></a>About us</li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Buying Safety Center</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Delivery</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Campus Express Return Policy</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Terms and Conditions</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Privacy Notice</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Jumia Payment Information Guidelines</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Official Stores</a></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        
        <div style={sectionStyles}>
          <h4 style={sectionTitleStyles}>Make Money On Campus Express</h4>
          <ul style={listStyles}>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Sell On Campus Express</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Become A Campus Express Affiliate</a></li>
          </ul>
        </div>

        <div style={sectionStyles}>
          <h4 style={sectionTitleStyles}>Campus Express International</h4>
          <ul style={listStyles}>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Campus Express Nigeria</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Campus Express Ghana</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Campus Express Niger</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Campus Express Cameroun</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Campus Express Senegal</a></li>
          </ul>
          
        </div>
      </div>

      <div style={containerStyles}>
        <div>
          <div>
            <h4 style={{color: '#fff'}}>Join Us On</h4>
          </div>
          <ul style={{
            listStyleType: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            margin: '0',
            padding: '0',
            alignItems: 'center'
          }}>
            <li style={{width: '40px'}}>
              <img src={fbSvg.src} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
            </li>
            <li style={{width: '40px'}}>
              <img src={tweeterSvg.src} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
            </li>
            <li style={{width: '40px'}}>
              <img src={WhatsAppSvg.src} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
            </li>
            <li style={{width: '40px'}}>
              <img src={igSvg.src} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
            </li>
            <li style={{width: '40px'}}>
              <img src={ytSvg.src} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
            </li>
          </ul>
        </div>

        <div>
          <div>
          <h4 style={{color: '#fff'}}>Payment Methods</h4>
          </div>
          
          <ul style={{
            listStyleType: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            margin: '0',
            padding: '0',
            alignItems: 'center'
          }}>
            
            <li style={{width: '40px'}}>
              <img src={flwSvg.src} style={{height: '125px', width: '125px', position: 'relative', margin: '0'}} alt="" />
            </li>
          </ul>
        </div>
      </div>

      <div style={bottomFooterStyles}>
        <p style={{ margin: 0, color: '#fff'}}>&copy; 2024 Campus Express. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

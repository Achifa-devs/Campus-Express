import React, { useEffect, useState } from 'react';
import WhatsAppSvg from '@/files/assets/whatsapp-whats-app-svgrepo-com.svg'
import tweeterSvg from '@/files/assets/twitter-svgrepo-com (2).svg'
import fbSvg from '@/files/assets/facebook-1-svgrepo-com (1).svg'
import igSvg from '@/files/assets/instagram-1-svgrepo-com (1).svg'
import ytSvg from '@/files/assets/youtube-color-svgrepo-com (1).svg'
import flwSvg from '@/files/assets/paystack-2.svg'
import { useSelector } from 'react-redux';

const Footer = () => {

  let [screenWidth, setScreenWidth] = useState(0)
  useEffect(() => {
    let width = window.innerWidth;
    // alert(width)
    setScreenWidth(width)
  }, [])

  const footerStyles = {
  backgroundColor: 'rgb(49, 49, 51)',
  // height: '400px',
  position : 'relative',
  padding: '0',
  color: '#333',
  textAlign: 'center',
};

const topFooter = {
  width: '100%',
  margin: 'auto',
  display: 'flex',
  height: screenWidth > 760 ? '240px' : 'auto',
  flexWrap: screenWidth > 760 ? 'nowrap' : 'wrap',
  justifyContent: 'space-between',
  flexDirection: screenWidth > 760 ? 'row' : 'column',
  padding: screenWidth > 760 ? '40px' : '10px',
  alignItems: 'flex-start',
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
  marginBottom: '5px',
  textAlign: 'left',
  color: '#fff'
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
  cursor: 'pointer',
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



  let {buyer_info} = useSelector(s => s.buyer_info)
 
  return (
    <footer style={footerStyles}>
      <div style={topFooter}>

        <section style={{display: 'flex', width: screenWidth > 760 ? '25%' : '100%', justifyContent:  screenWidth > 760 ? 'flex-start' : 'center', alignItems: 'center', flexDirection: 'row', marginBottom: screenWidth > 760 ? '0px' : '10px'}}>
          <img src={'https://res.cloudinary.com/daqbhghwq/image/upload/c_thumb,w_200,g_face/v1724852529/448223033_380994008307411_3052806854721458949_n_fbxqpk.jpg'} style={{height: screenWidth > 760 ? '55px' : '45px', width: screenWidth > 760 ? '55px' : '45px', borderRadius: '5px'}}  alt="" />

            &nbsp;
            &nbsp;

          <small style={{fontSize: '3.5vh'}}><b>Campus Sphere</b></small>
        </section>

        <section style={{display: 'flex', width: screenWidth > 760 ? '25%' : '100%', justifyContent: screenWidth > 760 ? 'flex-start' : 'center', alignItems: screenWidth > 760 ? 'flex-start' : 'center', flexDirection: 'column'}}>
          <h6>New To Campus Sphere</h6>
          <small style={{marginBottom: '10px'}}>Subscribe to our newsletter to get updates on our latest offers!</small>
          
          <div style={{display: 'flex', width: screenWidth > 760 ? '33.3%' : '100%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginBottom: '10px'}}>
            <div className="input-cnt" style={{margin: '0', backgroundColor: 'transparent'}}> 
              <input type="text" style={{height: '40px', width: '200px', padding: '10px', borderRadius: '2.5px 2.5px 2.5px 2.5px', backgroundColor: '#fff'}} name="" placeholder='Enter Email Address...' defaultValue={buyer_info?.email} id="" />
            </div>

            &nbsp;
            &nbsp;

            <div style={{display: 'flex', width:'33.3%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row'}}>
              <button style={{height: '40px', width: '60px', padding: '0px 5px', borderRadius: '2.5px 2.5px 2.5px 2.5px'}}>Male</button>
              &nbsp;
              &nbsp;
              <button style={{height: '40px', width: '60px', padding: '0px 5px', borderRadius: '2.5px 2.5px 2.5px 2.5px'}}>Female</button>
            </div>

          </div>
          <div className="input-cnt" style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', backgroundColor: 'inherit'}}>
            <input type="checkbox" style={{height: '20px', width: '20px'}} name="" id="terms" />
            &nbsp;
            &nbsp;
            <label style={{padding: '0', margin: '0'}} htmlFor="terms">
              <small style={{fontSize: 'x-small', textAlign: 'left', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', padding: '0', margin: '0'}}>I agree to Campus Sphere’s Privacy and Cookie Policy. You can unsubscribe from newsletters at any time.</small>
            </label>
          </div> 

        </section>

        <section style={{display: 'flex', width: screenWidth > 760 ? '25%' : '100%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column'}}>
          <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row', marginBottom: '0px'}}>

            <button>
              <img src={'https://res.cloudinary.com/daqbhghwq/image/upload/c_thumb,w_200,g_face/v1724852529/448223033_380994008307411_3052806854721458949_n_fbxqpk.jpg'} style={{height: screenWidth > 760 ? '25px' : '25px', width: screenWidth > 760 ? '25px' : '25px', borderRadius: '5px'}}  alt="" />
            </button>
            &nbsp;
            &nbsp;
            <div style={{display: 'flex', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', marginBottom: '10px'}}>
              <small><b>Download Campus Sphere Free App</b></small>
              <small style={{marginBottom: '10px'}}>Get access to exclusive offers!</small>
            </div>

          </div>

          <div style={{display: 'flex', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginBottom: '10px'}}>

            <div style={{display: 'flex', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row'}}>
              <div style={{display: 'flex', width: '45%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row'}}>
                <button style={{height: '25px', width: '28px', padding: '0px 5px', borderRadius: '2.5px 2.5px 2.5px 2.5px'}}></button>

                &nbsp;
                &nbsp;
                <div style={{display: 'flex', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column'}}>
                  <div style={{fontSize: 'xx-small'}}>Download On The</div>
                  <div style={{fontSize: 'x-small'}}>Apple Store</div>
                </div>
              </div>
              {/* &nbsp;
              &nbsp; */}
              <div style={{display: 'flex', width: '45%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row'}}>
                <button style={{height: '25px', width: '28px', padding: '0px 5px', borderRadius: '2.5px 2.5px 2.5px 2.5px'}}></button>
                &nbsp;
                &nbsp;
                <div style={{display: 'flex', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column'}}>
                  <div style={{fontSize: 'xx-small'}}>Get It On</div>
                  <div style={{fontSize: 'x-small'}}>Google Play</div>
                </div>
              </div>
            </div>

          </div>

        </section>


      </div>
      <div style={containerStyles}>
        {/* Customer Service Section */}
        <div style={sectionStyles}>
          <h4 style={sectionTitleStyles}>Customer Service</h4>
          <ul style={listStyles}>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Contact Us</a></li>
            <li style={listItemStyles}><a href="/help-center" style={linkStyles}>Help Center</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Chat With Us</a></li>
          </ul>
          
        </div>

        {/* Quick Links Section */}
        <div style={sectionStyles}>
          <h4 style={sectionTitleStyles}>About Campus Sphere</h4>
          <ul style={listStyles}>
            <li style={listItemStyles}><a href="/about-us" style={linkStyles}></a>About us</li>
            <li style={listItemStyles}><a href="/privacy-policy" style={linkStyles}>Privacy policy</a></li>
            <li style={listItemStyles}><a href="/terms-of-use" style={linkStyles}>Terms and Conditions</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Campus Sphere Return Policy</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Campus Sphere Payment Information Guidelines</a></li>
            {/* <li style={listItemStyles}><a href="/" style={linkStyles}>Official Stores</a></li> */}
          </ul>
        </div>

        {/* Quick Links Section */}
        
        <div style={sectionStyles}>
          <h4 style={sectionTitleStyles}>Make Money On Campus Sphere</h4>
          <ul style={listStyles}>
            <li style={listItemStyles}><a href="/vendor/shop" style={linkStyles}>Sell On Campus Sphere</a></li>
            {/* <li style={listItemStyles}><a href="/" style={linkStyles}>Become A Campus Sphere Affiliate</a></li> */}
          </ul>
        </div>

        <div style={sectionStyles}>
          <h4 style={sectionTitleStyles}>Campus Sphere International</h4>
          <ul style={listStyles}>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Campus Sphere Nigeria</a></li>
            {/* <li style={listItemStyles}><a href="/" style={linkStyles}>Campus Sphere Ghana</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Campus Sphere Niger</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Campus Sphere Cameroun</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Campus Sphere Senegal</a></li> */}
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
          <br/>
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
              <img src={'https://static.cdnlogo.com/logos/p/27/paystack.svg'} style={{height: '75px', width: '75px', position: 'relative', margin: '0'}} alt="" />
            </li>
          </ul>
        </div>
      </div>

      <div style={bottomFooterStyles}>
        <p style={{ margin: 0, color: '#fff'}}>&copy; 2024 Campus Sphere. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

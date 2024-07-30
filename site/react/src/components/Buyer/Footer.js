import React from 'react';

const footerStyles = {
  backgroundColor: '#fff',
//   height: '400px',
  position : 'relative',
  padding: '20px',
  color: '#333',
  textAlign: 'center',
};

const containerStyles = {
  width: '100%',
  margin: 'auto',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  flexDirection: 'row',
  padding: '40px',
  backgroundColor: '#FF4500',
  borderRadius: '20px'
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
  fontSize: 'medium',
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
  borderTop: '1px solid #dee2e6',
};

const Footer = () => {
  return (
    <footer style={footerStyles}>
      <div style={containerStyles}>
        {/* About Us Section */}
        <div style={sectionStyles}>
          <h4 style={sectionTitleStyles}>About Campus Express</h4>
          <p style={{textAlign: 'left', padding: '0'}}>Campus Express is your trusted platform for all your on-campus shopping needs, providing a secure and reliable marketplace for students.</p>
          <br />
          <br />

          <h3 style={{textAlign: 'left', padding: '0', fontSize: 'large', fontWeight: '500'}}>Address</h3>
          <br />

          <ul style={listStyles}>
            <li style={listItemStyles}>No 195 ifite-road</li>
            <li style={listItemStyles}>Ifite-Awka</li>
            <li style={listItemStyles}>Awka, Anambra state</li>
            <li style={listItemStyles}>Nigeria</li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div style={sectionStyles}>
          <h4 style={sectionTitleStyles}>Customer Service</h4>
          <ul style={listStyles}>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Help Center</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Contact Us</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>FAQs</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Return Policy</a></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div style={sectionStyles}>
          <h4 style={sectionTitleStyles}>Buying On Campus Express</h4>
          <ul style={listStyles}>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Buying Safety Center</a></li>
            <li style={listItemStyles}><a href="/sll" style={linkStyles}>Delivery</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Campus Express Return Policy</a></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div style={sectionStyles}>
          <h4 style={sectionTitleStyles}>Make Money On Campus Express</h4>
          <ul style={listStyles}>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Sell With Us</a></li>
            <li style={listItemStyles}><a href="/" style={linkStyles}>Become A Campus Express Affiliate</a></li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div style={sectionStyles}>
          <h4 style={sectionTitleStyles}>Contact Us</h4>
          <ul style={listStyles}>
            <li style={listItemStyles}>Email: <a href="mailto:support@campusexpress.com" style={linkStyles}>campusexpress@outlook.com</a></li>
            <li style={listItemStyles}>Phone: <a href="tel:+1234567890" style={linkStyles}>+234 8032639894</a></li>
          </ul>
          
        </div>
      </div>
      <div style={bottomFooterStyles}>
        <p style={{ margin: 0 }}>&copy; 2024 Campus Express. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

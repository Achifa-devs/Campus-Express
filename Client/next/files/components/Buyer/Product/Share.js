import React from 'react'

import WhatsAppSvg from '@/files/assets/whatsapp-whats-app-svgrepo-com.svg'
import tweeterSvg from '@/files/assets/twitter-svgrepo-com (2).svg'
import fbSvg from '@/files/assets/facebook-1-svgrepo-com (1).svg'

export default function Share({role,item,url,activeImg}) {
  return (
    <>
      <section style={{fontWeight: '500', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: '10px', position: 'relative', width: '100%',}}>
            <small style={{fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>Share With Your Friends</small>

            <ul>
                <li onClick={e => {
                    // const url = window.location.href;
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=Check out this product on Campus Sphere ${encodeURIComponent(window.location.href)}`, '_blank');
                }} style={{border: 'none', padding: '0',cursor: 'pointer'}}>
                    <img src={fbSvg.src} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
                </li>

                <li onClick={e => {
                    // const url = window.location.href;
                    const twitterUrl = `https://twitter.com/intent/tweet?&text=Check out this product on Campus Sphere ${encodeURIComponent(window.location.href)}`;
                    window.open(twitterUrl, '_blank');
                }} style={{border: 'none', padding: '0',cursor: 'pointer'}}>
                    <img src={tweeterSvg.src} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
                </li>

                <li onClick={async e => {
                    const whatsappUrl = `whatsapp://send?text=Check out this product on Campus Sphere ${encodeURIComponent(window.location.href)}`;
                    window.open(whatsappUrl, '_blank');

                }} style={{border: 'none', padding: '0', cursor: 'pointer'}}>
                    <img src={WhatsAppSvg.src} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
                </li>

            </ul>

            
        </section>
    </>
  )
}

import React from 'react'

import WhatsAppSvg from '../../../assets/whatsapp-whats-app-svgrepo-com.svg'
import tweeterSvg from '../../../assets/twitter-svgrepo-com (2).svg'
import fbSvg from '../../../assets/facebook-1-svgrepo-com (1).svg'

export default function Share({role,item,url,activeImg}) {
  return (
    <>
      <section style={{fontWeight: '500', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: '10px', position: 'relative', width: '100%',}}>
            <small>Share With Your Friends</small>

            <ul>
                <li onClick={e => {
                    // const url = window.location.href;
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${item.title} \n\n\n${item.description} \n\n\nPrice: ₦${new Intl.NumberFormat('en-us').format(item.price)} \n\n\n ${url}`)}&picture=${encodeURIComponent(activeImg)}`, '_blank');
                }} style={{border: 'none', padding: '0',cursor: 'pointer'}}>
                    <img src={fbSvg} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
                </li>

                <li onClick={e => {
                    // const url = window.location.href;
                    const twitterUrl = `https://twitter.com/intent/tweet?&text=${encodeURIComponent(`${item.title} \n\n\n${item.description} \n\n\nPrice: ₦${new Intl.NumberFormat('en-us').format(item.price)} \n\n\n ${url}`)}&image=${'https://res.cloudinary.com/daqbhghwq/image/upload/v1721492091/IMG-20231006-WA0001_sycjwm.jpg'}`;
                    window.open(twitterUrl, '_blank');
                }} style={{border: 'none', padding: '0',cursor: 'pointer'}}>
                    <img src={tweeterSvg} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
                </li>

                <li onClick={async e => {
                    // const url = window.location.href;

                    const shareBase64ImageToWhatsApp = async (base64ImageData, title, description) => {
                        try {
                        // const imageUrl = await uploadImageToCloudinary(base64ImageData);
                        // const message = description.length > 0 ? `${title}\n\nDescription:  \n${description} \n ${url}` : `${title} \n ${url}`;
                        const encodedMessage = encodeURIComponent(`${item.title} \n\n\n${item.description} \n\n\nPrice: ₦${new Intl.NumberFormat('en-us').format(item.price)} \n\n\n ${url}`);

                        const whatsappUrl = `whatsapp://send?text=${encodedMessage}`;

                        // Open WhatsApp with the share URL
                        window.open(whatsappUrl, '_blank');
                        } catch (error) {
                        console.error('Error uploading image or sharing to WhatsApp:', error);
                        }
                    };

                    await shareBase64ImageToWhatsApp(activeImg, item.title, item.description);
                    }} style={{border: 'none', padding: '0', cursor: 'pointer'}}>
                    <img src={WhatsAppSvg} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
                </li>

            </ul>

            
        </section>
    </>
  )
}

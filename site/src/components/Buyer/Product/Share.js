import React from 'react'

import WhatsAppSvg from '../../../assets/whatsapp-whats-app-svgrepo-com.svg'
import tweeterSvg from '../../../assets/twitter-svgrepo-com (2).svg'
import fbSvg from '../../../assets/facebook-1-svgrepo-com (1).svg'

export default function Share({role,item,activeImg,metaImg}) {
  return (
    <>
      <section style={{fontWeight: '500', display: role === 0 ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-end', padding: '10px', position: 'relative', width: '100%',}}>
            <small>Share With Your Friends</small>

            <ul>
                <li onClick={e => {
                    const url = window.location.href;
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(item.title)}&description=${encodeURIComponent(item.description)}&picture=${encodeURIComponent(activeImg)}`, '_blank');
                }} style={{border: 'none', padding: '0',cursor: 'pointer'}}>
                    <img src={fbSvg} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
                </li>

                <li onClick={e => {
                    const url = window.location.href;
                    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(item.title)}&image=${metaImg}`;
                    window.open(twitterUrl, '_blank');
                }} style={{border: 'none', padding: '0',cursor: 'pointer'}}>
                    <img src={tweeterSvg} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
                </li>

                <li onClick={e => {
                    const url = window.location.href;
                    const shareBase64ImageToWhatsApp = (base64ImageData, title, description) => {
// Convert Base64 image data to a Blob
                        const byteCharacters = atob(base64ImageData.split(',')[1]);
                        const byteArrays = [];
                        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                            const slice = byteCharacters.slice(offset, offset + 512);
                            const byteNumbers = new Array(slice.length);
                            for (let i = 0; i < slice.length; i++) {
                            byteNumbers[i] = slice.charCodeAt(i);
                            }
                            const byteArray = new Uint8Array(byteNumbers);
                            byteArrays.push(byteArray);
                        }
                        const blob = new Blob(byteArrays, { type: 'image/jpeg' });
                        const message = description.length > 0 ? `${title}\n\nDescription:  \n${description} \n ${url}` : `${title} \n ${url}`;
                        const encodedMessage = encodeURIComponent(message);
                        const imageUrl = URL.createObjectURL(blob);
                        console.log(imageUrl)
                        const whatsappUrl = `whatsapp://send?text=${encodedMessage}%20${`https://ce-app-server.vercel.app/share-image?product_id=${item.product_id}`}`;

                        // Open WhatsApp with the share URL
                        window.open(whatsappUrl, '_blank');


                    }
                    shareBase64ImageToWhatsApp(activeImg, item.title, item.description)


                
                }} style={{border: 'none', padding: '0',cursor: 'pointer'}}>
                    <img src={WhatsAppSvg} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
                </li>
            </ul>

            
        </section>
    </>
  )
}

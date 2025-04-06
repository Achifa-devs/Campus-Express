import { open_notice } from '@/files/reusable.js/notice';
import { seller_overlay_setup } from '@/files/reusable.js/overlay-setup';
import { video } from '@cloudinary/url-gen/qualifiers/source';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function File({
    uploadImageFiles,
    imgids,
    index,
    product_id,
    upload_response,
    type,
    thumbnail
}) {
    let [src, set_src] = useState('');

    useEffect(() => {
        let file = window.localStorage.getItem(`file-${index}`);
        if (file) {
            set_src(file)
        } else {
            set_src(imgids?.url === thumbnail ? '' : imgids?.url)
            console.log("imgids: ", imgids?.secure_url, thumbnail)
        }
    }, [imgids])

   
    
  return (
    <div key={index} className="img-cnt" style={{width: '45%', margin: '5px 0px'}}>
        
        {
            src === '' || src === undefined
            ?
            <>
                <input onChange={async(e) => {
                    // setImgFile(item => [...item, e.target.files[0]])
                    if(e.target.files[0]?.size <= 15 * 1024 * 1024){
                        let response = await uploadImageFiles(e.target.files[0], product_id);
                        console.log('response', response)
                        if (response.status === 200) {
                            let url = response.data.url;
                            seller_overlay_setup(false, '')

                            set_src(url)
                            window.localStorage.setItem(`file-${index}`, url)
                        } else {
                            e.target.value = ''
                        }
                        upload_response(response,index)
                    }else {
                        open_notice(true, 'File should not exceed 15MB (File too large)')
                    }
                }} style={{display: 'none'}} type="file" accept="image/*,video/*" name="samples-images" id="image1" />
                <label htmlFor="image1">
                    <div>+</div> 
                    <div>File</div>
                </label>
            </>
            :
            <>
                <div key={index} className='img-cnt' style={{width: '100%', margin: '0px 0px'}}>
                    <div  style={{position: 'relative',height: '100%', width: '100%'}}>
                        <div  onClick={e => { 
                            // alert(imgids.current[index])
                            seller_overlay_setup(true, `Deleting file...`)
                                
                            axios.post('https://ce-server.vercel.app/seller.file-delete', {
                                // id:imgids.current[index],product_id
                                url: src,
                                type: 'null'
                            })
                            .then(response => {
                                console.log('Upload successful', response);
                                set_src('')
                                seller_overlay_setup(false, '')
                                open_notice(true, 'deleted file successfully.')

                                // let list = img_list.filter((item, i) => i !== index);
                                // deletePhoto(list, index);

                                // return response;
                            })
                            .catch(error => {
                                console.error('Upload failed', error);
                                seller_overlay_setup(false, '')
                                open_notice(true, 'file was not deleted successfully.')
                                // return error
                            });


                        }} className="delete-sample-img" style={{position: 'absolute', cursor: 'pointer', top: '5px', right: '5px', color: '#fff', background: 'red', zIndex: '1000', width: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2.5px', height: '20px'}}>x</div>
                        {
                            (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(src?.split('.').pop().toLowerCase())) ? 
                             <img style={{ height: '100%', width: '100%' }} src={src} alt="" />
                             : (['mp4', 'mov', 'avi', 'webm', 'mkv'].includes(src?.split('.').pop().toLowerCase()))  ? 
                             <video controls style={{ height: '100%', width: '100%' }} src={src} />
                             : 
                             open_notice(true, 'Unsupported format')
                        }
                    </div>
                </div>
            </>
        }
    </div>
  )
}

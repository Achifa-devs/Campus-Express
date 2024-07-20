import { useEffect, useRef, useState } from "react";
// import { getImage } from "../../../Functions/imageToSvg";
import { openNotice } from "../../../Functions/notice";
import xSvg from '../../../assets/cancel-svgrepo-com.svg'
const EditorVideoStore = ({edit,deleteVideo,productVideos,videos,category}) => {

    let [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        setScreenWidth(window.innerWidth);

    },[])

    let handleVideo = () => {
        let f = document.querySelector("#vidfile");
        let existingFilesCount = videos.length; // Assume this is the number of already uploaded files
        const maxFiles = 3;
        [...f.files].map((item,index) => {
            
            let totalFilesCount = existingFilesCount + index + 1; // Calculate the total number of files
 
            if (totalFilesCount > maxFiles) {
                openNotice("You can only upload a max of 5 photos");
                return;
            }

            let typeCheck = item.type.split('/')[0];
            let type = typeCheck === 'image' ? 'img' : typeCheck === 'video' ? 'mp4' : ''
            
            if(type === 'mp4') {
                let reader = new FileReader({type: 'video/*'});

                reader.onload = (result) => {
                    let vid = reader.result;
                    productVideos(vid);

                }   
                reader.readAsDataURL(item);
                
            }else{
                openNotice("Only Video Can Be Uploaded Here")
            }

            
        })
         
        // getImage([[...f.files][0],[...f.files][0].type,[...f.files][0].size,[...f.files][0].name])
    } 

    return ( 
        <>
            <div className="notice-cnt">
                <span style={{margin: "0 15px 0 .5px"}}>Only Videos can be uploaded</span>
                <button className="notice-cnt-btn" style={{width: '40px', height: '30px', background: 'red', borderRadius: '2px', fontWeight: '500', fontSize: 'small'}}>
                    close
                </button>
            </div>

            <div style={{width: '100%', marginBottom: '0px', borderRadius: '10px'}}>
                
                <input type="file" name="video"  style={{display: 'none'}} id="vidfile" onChange={handleVideo} />

                <div className="seller-shop-samples shadow-sm">
                                
                    
                    <label htmlFor="vidfile" style={{height: '100%', margin: '0 5px 0 5px', background: '#FF4500',cursor: 'pointer', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', padding: '20px', borderRadius: '10px', textAlign: 'center'}}>

                        {/* <img src={xSvg} style={{height: '40px', width: '40px'}} alt="" /> */}
                        <small style={{color: '#fff', textAlign: 'center'}}>Upload Video</small>

                    </label>
                    

                    <section className='seller-product-image-cnt' style={{flexShrink: '0'}}>
                    
                        {
                            videos.length > 0 ? videos.map((item, index) => 
                            
                                <div key={index} style={{position: 'relative', padding: '0', height: '100%', display: 'inline-block', flexShrink: '0'}}>
                                    <div onClick={e => { 
                                        let list = videos.filter((item, i) => i !== index);
                                        deleteVideo(list);

                                    }} className="delete-sample-img" style={{position: 'absolute', cursor: 'pointer', top: '5px', right: '5px', color: '#fff', background: 'red', zIndex: '1000', width: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2.5px', height: '20px'}}>x</div>
                                    
                                    {
                                        <video src={item} key={index} style={{height: '100%', width: screenWidth > 480 ? '200px' : '100px', background: '#fff', margin: '0 5px 0 5px', flexShrink: '0', borderRadius: '5px', position: 'relative'}} alt="" autoPlay controls></video>
                                    }

                                </div>   
                            )
                            : 
                            ''
                        }


                        
                    </section>
                </div>
            </div>
        </>
     );
}
 
export default EditorVideoStore;
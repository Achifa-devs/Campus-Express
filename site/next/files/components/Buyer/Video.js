import { useEffect, useState } from 'react';
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 

const Video = ({thumbnail_id,height}) => {
    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    }, [])

    
    return ( 
        <>
           

            <video onClick={e => window.location.href=(`/product/${product_id}`)} src={thumbnail_id} style={{height: `${height ? height : '150px'}`, width: '100%', borderRadius: '2px', display: 'table', margin: '0 auto', position: 'relative'}}controls></video>
        </>
     );
}
 
export default Video;
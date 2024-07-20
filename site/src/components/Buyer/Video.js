// 

import { useEffect, useState } from 'react';
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import { useNavigate } from 'react-router-dom';
import { GetProductThumbnail, GetProductVideo } from '../../api/buyer/get';
 

const Video = ({product_id,folder}) => {
    let [img, set_img] = useState(imgSvg);
    let [uris, set_uris] = useState([]);
    let navigate = useNavigate()

    let [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    }, [])

    async function fetchData() {
        let result = await GetProductVideo(product_id,folder)

        if(result){
            result.map(item => set_uris(uri=>[...uri, item.secure_url]) )
        }
    }
  
    useEffect(() => {
        try {
            fetchData()
        } catch (error) {
            console.log(error)
        }
    },[product_id]) 

    useEffect(() => {
        try {
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }, [])
   
    return ( 
        <>
            <video src={uris[0]} autoPlay controls style={{height: '100%', width: '100%', borderRadius: '10px', display: 'table', margin: '0 auto', position: 'relative', objectFit: 'cover'}}></video>
           
        </>
     );
}
 
export default Video;

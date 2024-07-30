import { useEffect, useState } from 'react';
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import { useNavigate } from 'react-router-dom';
import { GetProductThumbnail } from '@/app/api/buyer/get';
// import { GetProductThumbnail } from '../../api/buyer/get';
 

const Thumbnail = ({product_id,title}) => {
    let [img, set_img] = useState(imgSvg);
    let [uris, set_uris] = useState([]);

    let [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    }, [])

    async function fetchData() {
        let result = await GetProductThumbnail(product_id,title?.trim())
        if(result){
            result.map(item => set_uris(uri=>[...uri, item.secure_url]) )
        }
    }
    useEffect(() => {
        set_img(uris[0])
    },[uris])

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
            <img loading='lazy' onClick={e => window.location.href=(`/product/${product_id}`)} src={img} style={{height: '150px', width: '100%', borderRadius: '2px', display: 'table', margin: '0 auto', position: 'relative'}} alt="" />
        </>
     );
}
 
export default Thumbnail;
import { useEffect, useState } from 'react';
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import { useNavigate } from 'react-router-dom';
import { GetProductThumbnail } from '../../api/buyer/get';
 

const Thumbnail = ({product_id,title}) => {
    let [img, set_img] = useState(imgSvg);
    let [uris, set_uris] = useState([]);
    let navigate = useNavigate()

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
            <img loading='lazy' onClick={e => window.location.href=(`/${product_id}`)} src={img} style={{height: screenWidth > 480 ? '140px' : '120px', width: '100%', borderRadius: '10px', display: 'table', margin: '0 auto', position: 'relative'}} alt="" />
        </>
     );
}
 
export default Thumbnail;
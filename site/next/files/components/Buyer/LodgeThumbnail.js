import { useEffect, useState } from 'react';
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import { GET_PRODUCT_THUMBNAIL } from '../../api/buyer';
import { useNavigate } from 'next/link';
 
const LodgeThumbnail = ({product_id}) => {

    let [img, set_img] = useState(imgSvg);
    let navigate = useNavigate()

    let [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    }, [])
  
    useEffect(() => {
        GET_PRODUCT_THUMBNAIL(product_id)
        .then((result) => {
            set_img(result.file)
        })
        .catch((err) => {
            console.log(err);
        })
    },[])
    return ( 
        <>
            <img onClick={e => navigate(`/product/${product_id}`)} src={img} style={{height: '100%', width: '100%', borderRadius: '5px', display: 'table', margin: '0 auto'}} alt="" />
        </>
     );
}
 
export default LodgeThumbnail;
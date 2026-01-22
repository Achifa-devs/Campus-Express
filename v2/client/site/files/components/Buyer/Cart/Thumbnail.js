import { useEffect, useState } from 'react';
import imgSvg from '../../../assets/image-svgrepo-com (4).svg'; 
import { 
    useNavigate 
} from 'react-router-dom';
import { 
    GetProductThumbnail 
} from '@/app/api/buyer/get';
 

const Thumbnail = ({product_id}) => {
    let [img, set_img] = useState(imgSvg);
    let navigate = useNavigate()

    let [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    }, [])
  
    useEffect(() => { 
        try {
            let result = GetProductThumbnail(product_id)
            set_img(result.file)
        } catch (error) {
            console.log(error)
        }
    },[])

    return ( 
        <>
            <img onClick={e => navigate(`/product/${product_id}`)} src={img} style={{height: screenWidth > 480 ? '140px' : '120px', width: '30%', borderRadius: '5px', display: 'table', margin: '0 auto'}} alt="" />
        </>
     );
}
 
export default Thumbnail;
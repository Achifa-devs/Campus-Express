import img from '../../assets/download (3).jpeg'
import { useEffect, useState } from 'react'
import jsAgo from 'js-ago'
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import { SHOP } from '../../../api/seller';
import Thumbnail from '../Thumbnail';
import RmBtn from './RmBtn';
import Body from './Body';

const History = () => {
    let [Items, setItems] = useState([])
    let [activeImg, setActiveImg] = useState(imgSvg)
    let [product_id, set_product_id] = useState()

    useEffect(() => {
        
        SHOP("CE-d7571f")
        .then((result) => { 
            setItems(result)
        })
        .catch((err) => {
            console.log(err)
        })

        
    }, [])
    return ( 
        <>
            <div className="buyer-history">
               {
                Items.map((item, index) => {
                    return(
                        <div key={index} className="buyer-history-card shadow-sm">
                            <Thumbnail product_id={product_id} />
                            <RmBtn />

                            <Body item={item} />
                        </div>


                    )
                })
               }
            </div>
        </>
     );
}


 
export default History;
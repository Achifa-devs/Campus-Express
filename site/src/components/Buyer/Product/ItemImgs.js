import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setItemImagesTo } from "../../../redux/buyer_store/ItemImages";
import imgSvg from '../../../assets/image-svgrepo-com (4).svg'; 
import { setActiveImgTo } from "../../../redux/buyer_store/ActiveImg";
import { GetItemImages, GetProductThumbnail } from "../../../api/buyer/get";

const ItemImgs = ({product_id,title}) => {
    let dispatch = useDispatch()
    let [img, set_img] = useState(imgSvg);
    let [uris, set_uris] = useState([]);

    let {ItemImages} = useSelector(s => s.itemImages)
    // let [imageList, setImageList] = useState([])
    let {ActiveImg} = useSelector(s => s.ActiveImg)

    async function fetchData() {
        let result = await GetProductThumbnail(product_id,title?.trim())
        if(result){
            result.map(item => set_uris(uri=>[...uri, item.secure_url]) )
            dispatch(setItemImagesTo(result.map(item => item.secure_url)));
            console.log(result)
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

   

    // useEffect(() => {
    //     try {
    //         async function getData() {
    //             let result = await GetItemImages(product_id)
    //             if(result?.length > 0){
    //                 setImageList(result)
    //                 dispatch(setItemImagesTo(result));
    //             }
    //         }
    //         getData()
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }, [])

    let handleActiveImg = i => {
        dispatch(setActiveImgTo(i))
    }

    return ( 
        <>
            <div className="img-list-cnt">
                {
                    uris.map((item, index) => {
                        return(
                            <div key={index} style={{border: ActiveImg === index ? '2px solid orangered': 'none', cursor: 'pointer', height: '50px', width: '50px', backgroundImage: `url(${item.file})`, backgroundRepeat: 'no-repeat', backgroundSize: '50px 50px', backgroundPosition: 'center'}} onClick={e => handleActiveImg(index)}>
                                <img src={item} style={{height: '100%', width: '100%', borderRadius: '5px'}} alt="" loading="lazy" />
                            </div>
                        )
                    })
                }
                
            </div>
        </>
     );
}
 
export default ItemImgs;
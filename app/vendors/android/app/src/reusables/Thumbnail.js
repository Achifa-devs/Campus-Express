import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { GetProductThumbnail } from '../store/apis/buyer/get';
 

const Thumbnail = ({product_id,title,br}) => {
    let [img, set_img] = useState('');
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
        console.log(uris)
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
            <Image 
                source={{uri: img}}
                style={{height: '100%', width: '100%', borderRadius: br}}
            />
        </> 
     );
}
 
export default Thumbnail;
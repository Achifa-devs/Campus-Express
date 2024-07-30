import { useEffect, useState } from 'react';

const Mssg = ({mssg_id}) => {
    let [text, set_text] = useState('');

    let [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    }, [])
  
    useEffect(() => {
        // get_mssg(mssg_id)
        // .then(({data}) => {
        //     console.log(data)

        //     set_text(data.message)
        // })
        // .catch((err) => {
        //     console.log(err);
        // })
    },[]) 

    // onClick={e => navigate(`/product/${product_id}?seller_id=${seller_id}`)}

    return ( 
        <>
            <p>{text}</p>
        </>
     );
}
 
export default Mssg;
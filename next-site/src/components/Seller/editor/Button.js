import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadBtn = ({update,handleForm}) => {
    let [screenWidth, setScreenWidth] = useState(0)
 
    let navigate = useNavigate() 
 
    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width) 
    }, [])
    
    return ( 
        <>
            <div className="seller-upload-btn " style={{
                    width: '100%',
                    padding: '10px',
                    background: '#fff',
                    height: '80px',
                    position: screenWidth > 760 ? 'relative' : 'fixed',
                    bottom: '0',
                    left: '0'
                }}>
                    {/* <div className="seller-item-preview-cnt">

                    </div> */} 
                <button onClick={e => handleForm(e)} style={{width: '100%', height: '55px', marginTop: '5px', borderRadius: '4px', padding: '0', background: 'orangered', outline: 'none', border: 'none', color: '#fff'}}>
                    <div>{update ? 'Update' : 'Upload'}</div>
                </button>

            </div>
        </>
     );
}
 
export default UploadBtn;
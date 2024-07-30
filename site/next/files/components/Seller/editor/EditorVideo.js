import { useEffect, useState } from "react";

const EditorVideo = ({edit,productVideo,videoActive}) => {
    let [titleCount, setTitleCount] = useState(0)
    let [Title,setTitle] = useState('')

    useEffect(() => {
        setTitleCount(Title.length)
    }, [Title])

    return ( 
        <>
            <div className="input-cnt" style={{width: '100%', position: 'relative', padding: '0', marginBottom: '10px'}}>
                {/* <label htmlFor="">Description</label> */}
                
                <textarea defaultValue={window.localStorage.getItem('draft_description') !== null && window.localStorage.getItem('draft_description') !== undefined ? window.localStorage.getItem('draft_description') : ''} maxLength={650} name='description' onInput={e =>{
                    // productDescription(e.target.value)
                    // setvideoActive(e.target.value.length)
                }} placeholder="Description" style={{borderBottom: '2px solid orangered'}} className="seller-shop-desc shadow-sm"></textarea>
                <div style={{height: 'fit-content', position: 'absolute', right: '10px', fontSize: 'small', bottom: '5px'}}>{videoActive}/650</div>
            </div>
            {/* <div style={{textAlign: 'left', width: '100% ', margin: '6px 0 0 5px ', display: videoActive ? 'flex': 'none'}} className="editor-err-mssg">Description must contain at least 10 words</div> */}
        </>
    );
}
 
export default EditorVideo;
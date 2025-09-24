import { useEffect, useState } from "react";
// import video from '../../../assets/Guide To Generate YouTube API For Music Bot(720P_HD).mp4'
const Video = () => {
    let [h, seth] = useState(0)

    useEffect(() => {
        let w = document.querySelector('video').clientWidth;
        seth(w)
    }, [])

    return ( 
        <>
            <video autoPlay style={{width: '45%', height: `${h/2}px`}}>
                {/* <source src={video}></source> */}
            </video>
        </>
     );
}
 
export default Video; 
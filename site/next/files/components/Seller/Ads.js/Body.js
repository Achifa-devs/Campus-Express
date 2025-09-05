import { useEffect, useState } from "react";
import Card from "./Card";
import emptySvg from '../../../assets/empty-white-box-svgrepo-com.svg'
import { Link } from "next/link";

const Body = ({cards}) => {
    return ( 
        <>
            {
                cards?.length > 0
                ?
                cards.map((item, index) => 
                
                <Card item={item} index={index} />)
                :

                <section style={{
                    height: 'calc(100vh - 100px)', 
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}>
                    <img src={emptySvg} style={{
                        height: '90px',  
                        width: '90px', 
                        position: 'relative',
                        
                        fontSize: 'medium',
                    }} alt="" />

                    <div style={{color: '#FF4500',fontFamily: 'sans-serif', fontWeight: '800'}}>You Have'nt Uploaded Any Item Yet</div>
                    <Link to={'/seller.editor'} style={{color: 'orange',fontFamily: 'sans-serif', fontWeight: '500'}}>Click Here To Start Listing Your Items Now</Link>
                </section>
            
            } 
        </>
     );
}
 
export default Body;


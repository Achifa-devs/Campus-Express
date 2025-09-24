import { useState } from 'react';
import '../../../styles/floating.css'
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux'

const FloatingMenu = ({list,right,top,visible,getSelectedOption,setDisplay}) => {
    let pathname = usePathname();
    
    return ( 
        <>
            <div className="floating-cnt shadow-sm" style={{left: `${right - 90}px`, top: `${top + 50}px`, display: visible, overflow: 'auto', flexDirection: 'column', height: getSelectedOption === 'categories' ? '80%' : 'fit-content', width: getSelectedOption === 'categories' ? '300px' : '200px'}}>
                <ul style={{height: 'fit-content', flexDirection: 'column', width: '100%'}}>
                    {
                        list.map((item,index) =>  
                            index === list.length -1 && getSelectedOption !== 'categories'
                            ?
                            <>
                                <div style={{borderBottom: '.5px solid #FF4500', width: '100%', margin: '7px 0px'}}></div>
                                    <li style={{  color: '#fff', background: '#FF4500'}} onClick={e => {
                                        getSelectedOption === 'categories' ?
                                        window.location.href = `/store/category/${item?.txt}`
                                        : 
                                        window.location.href=`/store/${item?.uri}`;
                                        setDisplay('none');
                                    }}>
                                    <span>
                                        <img src={item.svg.src} style={{height: '20px', width: '20px'}} alt="" />
                                    </span>
                                    &nbsp;
                                    &nbsp;
                                    <span style={{fontSize: 'small'}}>
                                        {item.txt}
                                    </span>
                                </li>
                            </>
                            :
                            <li onClick={e => {
                                    getSelectedOption === 'categories' ?
                                    window.location.href = `/store/category/${item?.txt}`
                                    : 
                                    window.location.href=`/store/${item?.uri}`;
                                    setDisplay('none');
                                }} >
                                <span>
                                    <img src={item.svg.src} style={{height: '20px', width: '20px'}} alt="" />
                                </span>
                                &nbsp;
                                &nbsp;

                                <span style={{fontSize: 'small'}}>
                                    {item.txt}
                                </span>
                            </li>

                        )
                    }
                </ul>
            </div>
        </>
     );
}
 
export default FloatingMenu;
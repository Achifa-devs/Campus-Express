import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setAccessoryTo } from "@/redux/buyer_store/Aceessories";
import { useRouter } from 'next/navigation';
// import { setAccessoryMenuTo } from "@/redux/buyer_store/AccessoryMenu";

const AsideMenu = ({}) => {

    let pathname = usePathname()
    let dispatch = useDispatch()
    let router = useRouter();
    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)},[]);
    
    let list = [
        // {name: 'Orders', svg: '', uri: 'orders'},
        {name: 'Inbox', svg: '', uri: 'inbox'},
        {name: 'Favourites', svg: '', uri: 'favourites'},
        // {name: 'Followed Sellers', svg: '', uri: 'following'},
        // {name: 'Recently Viewed', svg: '', uri: 'history'},
        // {name: 'Refunds', svg: '', uri: 'refunds'}
    ]

    let acct = [
        {name: 'Account Management', svg: '', uri: 'account-managements'},
        // {name: 'Address Book', svg: '', uri: 'address-book'},
        // {name: 'News Letter Preference', svg: '', uri: 'news-letter-preference'}
    ]
    return ( 

        <>
            <div className="menu-card-aside" style={{float: 'left', padding: screenWidth > 1200 ? '10px 0px 0px 40px' : '10px 0px 0px 10px'}}>

                <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', fontSize: 'medium', width: '100%', background: '#fff', fontWeight: '500', display: 'flex', alignItems: 'center', fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue'"}}>My Campus Sphere Account</h6>

                <div className="menu-confirmation" style={{width: '100%'}}>
                    <div className="menu-confirmation-cnt" style={{width: '100%'}}>
                        <ul>
                            {
                                list.map((item,index) => 
                                    <li key={index} onClick={e=> {
                                            screenWidth > 760 
                                            ?
                                            window.location.href=`/store/${item.uri.toLowerCase()}`
                                            :
                                            (
                                                (dispatch(setAccessoryTo(1)))
                                                // (dispatch(setAccessoryMenuTo(item.uri.toLowerCase())))
                                                
                                                   
                                            )
                                        }} style={{ 
                                        height: '50px', 
                                        width: '100%', 
                                        fontWeight: '400', 
                                        display: 'flex', 
                                        alignItems: 'center'}}>
                                        <span></span>
                                        <span>{item.name}</span>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className="menu-confirmation-cnt" style={{width: '100%'}}>
                        <ul>
                            {
                                acct.map((item,index) => 
                                    <li key={index} onClick={e=> {
                                            screenWidth > 760
                                            ?
                                            (item.uri === 'account-managements' ? window.open('/store/account-managements', '_blank') : window.location.href=`/store/${item.uri.toLowerCase()}`) 
                                            :
                                            (dispatch(setAccessoryTo(1)))
                                            // (dispatch(setAccessoryMenuTo(item.uri.toLowerCase())))
                                            
                                        }} style={{ 
                                        height: '50px', 
                                        width: '100%', 
                                        fontWeight: '400', 
                                        display: 'flex', 
                                        alignItems: 'center'}}>
                                        <span></span>
                                        <span>{item.name}</span>
                                    </li>
                                )
                            }
                        </ul>
                        
                    </div>
                    <div className="menu-confirmation-cnt" style={{padding: '10px 10px', width: '100%'}}>
                        <button>
                            Logout
                        </button>
                    </div>
                    
                </div>

            </div>

        </>
     );
}
 
export default AsideMenu;
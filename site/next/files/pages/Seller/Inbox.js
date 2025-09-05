import { useEffect, useState } from "react";
import { useNavigate } from "next/link";
import '../../styles/Seller/overlay.css' 
import InboxCard from "../../components/Seller/inbox/InboxCard";

const Inbox = () => {
    let [inboxList, setInboxList] = useState([])
    let [loaderText, setLoaderText] = useState('Loading...')

    useEffect(() => {
        let overlay = document.querySelector('.overlay')
        //overlay.setAttribute('id', 'overlay');
        // GetSellerInbox()
        // .then(({data}) => {
        //     setInboxList(data)
        //     overlay.removeAttribute('id')
        //     data.length < 1 
        //     ?
        //     setLoaderText('No item for sale, click here to start selling')
        //     :
        //     setLoaderText('')
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
    },[])
    return ( 
        <>
            <div className="overlay" >
                <div className="loader">
                </div>
            </div>

            <div className="seller-main">
                {
                    inboxList.length > 0
                    ?
                    <InboxCard inboxList={inboxList} />
                    :
                    <>
                        <br />
                        <br />
                    
                        <small style={{color: 'orangered'}}>{loaderText}</small>
                    </>

                }
            </div>
        </>
     );
}
 
export default Inbox;
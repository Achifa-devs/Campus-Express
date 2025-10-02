import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../../../styles/Buyer/cancelOrderOverlay.css'
import { usePathname } from "next/navigation";
import '../../../styles/Buyer/Alert.css'
import axios from "axios";
import { useSelector } from "react-redux";
import { buyer_overlay_setup } from "@/files/reusable.js/overlay-setup";
const OrderTrackerSummary = ({order, Method, updateJsx, activeJsx}) => {

    // let meta = {
    //     immediate_purchase: window.location.pathname.split('/').length > 4 ? true : false,
    //     ce_id: buyer.user_id,
    //     cart: {unit: parseInt(window.location.pathname.split('/')[4].split('-')[1]), product_id: atob(window.location.pathname.split('/')[2])},
    // }
    let pathname = usePathname();
    let {
        user_id 
    } = useSelector(s => s.user_id);

    let [immediate_check, set_immediate_check] = useState('')

    useEffect(() => {set_immediate_check(pathname)}, [pathname])

    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)},[]);
    function handleDeposit() {let overlay = document.querySelector('.overlay');overlay.setAttribute('id', 'overlay')};
    
    function handleCancelOrder() {
        let overlay = document.querySelector('.cancel-order-overlay')
        overlay.setAttribute('id', 'cancel-order-overlay');
    }

    function handleConfirmOrder() {
        let overlay = document.querySelector('.confirm-order-overlay')
        overlay.setAttribute('id', 'confirm-order-overlay');
    }
    
    return (  

        <>
            
        </>
     );
}
 
export default OrderTrackerSummary;
import { useEffect, useState } from "react";
import filterSvg from '../../../assets/filter-edit-svgrepo-com.svg'
import deleteSvg from '../../../assets/delete-svgrepo-com (1).svg'
// import dayjs from 'dayjs'
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { DeleteItem } from "../../../api/seller/delete";
// import { setDeleteListTo } from "../../../redux/seller_store/delete_list";
import { usePathname } from "next/navigation";

 
const Header = () => {

    
    return ( 
        <>
            <div className="seller-header shadow-sm" style={{
                width: pathname.split('/').splice(-1)[0] === 'seller.signup' || pathname.split('/').splice(-1)[0] === 'seller.login' || pathname.split('/').splice(-1)[0] === 'seller.reset-password' ? '100vw' : '',
                color: '#fff',
                textAlign: 'center',
                alignItems: 'center',
                display: 'flex',
                padding: '0',
                position: 'sticky',
                backgroundColor: '#fff',
                top: '0',
                fontWeight: '500',
                background: 'orangered',
                zIndex: '1000',
                backgroundImage: 'url(../../../images/download (5).jpeg)',
                backgroundClip: 'content-box',
                backgroundSize: 'contain'
            }}>


            </div>

            
        </> 
     );
}
export default Header;                                                                                                       
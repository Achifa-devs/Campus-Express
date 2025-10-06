// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from 'react-redux'
// import { setAccessoryTo } from "@/redux/buyer_store/Aceessories";
// import { useRouter } from 'next/navigation';

// const AsideMenu = ({}) => {
//     let pathname = usePathname()
//     let dispatch = useDispatch()
//     let router = useRouter();
//     let [screenWidth, setScreenWidth] = useState(0);
    
//     useEffect(() => {
//         const handleResize = () => setScreenWidth(window.innerWidth);
//         handleResize(); // Set initial value
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const list = [
//         { name: 'Inbox', uri: 'inbox' },
//         { name: 'Favourites', uri: 'favourites' },
//     ];

//     const acct = [
//         { name: 'Account Management', uri: 'account-managements' },
//     ];

//     const handleNavigation = (item) => {
//         if (screenWidth > 760) {
//             if (item.uri === 'account-managements') {
//                 window.open('/store/account-managements', '_blank');
//             } else {
//                 window.location.href = `/store/${item.uri.toLowerCase()}`;
//             }
//         } else {
//             dispatch(setAccessoryTo(1));
//             // dispatch(setAccessoryMenuTo(item.uri.toLowerCase()));
//         }
//     };

//     const handleLogout = () => {
//         // Add your logout logic here
//         console.log('Logout clicked');
//     };

//     return (
//         <div className={`card border-0 shadow-sm h-100 ${screenWidth > 1200 ? 'ps-5' : 'ps-3'}`}>
//             {/* Header */}
//             <div className="card-header bg-white border-bottom py-3">
//                 <h6 className="mb-0 fw-semibold text-dark" style={{
//                     fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
//                     fontSize: '1.1rem'
//                 }}>
//                     My Campus Sphere Account
//                 </h6>
//             </div>

//             {/* Menu Content */}
//             <div className="card-body p-0">
//                 {/* Main Menu Items */}
//                 <div className="border-bottom">
//                     <ul className="list-unstyled mb-0">
//                         {list.map((item, index) => (
//                             <li 
//                                 key={index}
//                                 className="border-bottom"
//                                 style={{borderColor: '#efefef !important'}}
//                             >
//                                 <button
//                                     className="btn btn-link text-decoration-none text-dark w-100 text-start px-3 py-3 d-flex align-items-center hover-menu-item"
//                                     onClick={() => handleNavigation(item)}
//                                     style={{
//                                         fontWeight: '400',
//                                         fontSize: '0.95rem'
//                                     }}
//                                 >
//                                     <span className="flex-grow-1">{item.name}</span>
//                                     <i className="fas fa-chevron-right text-muted small"></i>
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 {/* Account Management Items */}
//                 <div className="border-bottom">
//                     <ul className="list-unstyled mb-0">
//                         {acct.map((item, index) => (
//                             <li 
//                                 key={index}
//                                 className="border-bottom"
//                                 style={{borderColor: '#efefef !important'}}
//                             >
//                                 <button
//                                     className="btn btn-link text-decoration-none text-dark w-100 text-start px-3 py-3 d-flex align-items-center hover-menu-item"
//                                     onClick={() => handleNavigation(item)}
//                                     style={{
//                                         fontWeight: '400',
//                                         fontSize: '0.95rem'
//                                     }}
//                                 >
//                                     <span className="flex-grow-1">{item.name}</span>
//                                     <i className="fas fa-chevron-right text-muted small"></i>
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 {/* Logout Button */}
//                 <div className="p-3">
//                     <button
//                         className="btn btn-outline-danger w-100 fw-semibold py-2"
//                         onClick={handleLogout}
//                     >
//                         <i className="fas fa-sign-out-alt me-2"></i>
//                         Logout
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AsideMenu;
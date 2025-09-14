// import { useState, useEffect } from 'react';
// import { usePaystackPayment } from 'react-paystack';
// import { GetBuyer } from '../../api/buyer';
// const PayStack = ({price,product_id,user_id,stock}) => {

//     let [fname, setFname] = useState('loading')
//     let [lname, setLname] = useState('loading')
//     let [email, setEmail] = useState('loading')
//     let [phone, setPhone] = useState('loading')

//     let meta = {
//         immediate_purchase: window.location.pathname.split('/').length > 4 ? true : false,
//         cart: {unit: parseInt(window.location.pathname.split('/')[4].split('-')[1]), product_id: atob(window.location.pathname.split('/')[2])},
//     }

//     useEffect(() => {
//         GetBuyer(window.localStorage.getItem('CE_user_id'))
//         .then((result) => {
//             setFname(result.fname)
//             setLname(result.lname)
//             setEmail(result.email)
//             setPhone(result.phone) 
//         })   
//         .catch(err => console.log(err))

//         setAmount(price)
//     },[])
    
//     let [amount, setAmount] = useState(`${price}`)

//     const config = {
//         reference: (new Date()).getTime().toString(),
//         email: "akpulufabian@gmail.com", 
//         amount: amount + '00', //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
//         publicKey: 'pk_live_c8a885e2b4bda68ee5940a527431030c4b32f6dd',
        
//         metadata: {
//             user_id: `${window.localStorage.getItem("CE_user_id")}`,
//             amount: amount,
//             firstname: fname,
//             lastname: lname,
//             phone: phone,
//             email: email,
//             cart: window.location.pathname.split('/').length > 4 ? meta : '',
//         }
//     };
    
//     // you can call this function anything
//     const onSuccess = (reference) => {
//       // Implementation for whatever you want to do with reference and after success call.
//       console.log(reference);
//     };
  
//     // you can call this function anything
//     const onClose = () => {
//       // implementation for  whatever you want to do when the Paystack dialog closed.
//       console.log('closed')
//     }

//     const initializePayment = usePaystackPayment(config);

//     return ( 
//         <>
        
//             <form id="paymentForm">

//                 <h5 style={{color: 'orangered'}}>Deposit Form</h5>
                
                
//                 <div className="seller-input-cnt">
//                     <section>
//                         <label htmlFor="">FirstName</label>
//                         <input readOnly value={fname} placeholder='FirstName...' type="text" />
//                     </section>
//                     <section>
//                         <label htmlFor="">LastName</label>
//                         <input readOnly value={lname}  placeholder='LastName' type="text" />
//                     </section>
//                 </div>

//                 <div className="seller-input-cnt">
//                     <section style={{width: '100%'}}>
//                         <label htmlFor="">Amount</label>
//                         <input readOnly value={`${new Intl.NumberFormat('en-us').format(price)}.00`}  placeholder='Amount...' type="text" />
//                     </section>
                    
//                 </div>
//                 <div className="seller-input-cnt">
//                     <section style={{width: '100%'}}>
//                         <label htmlFor="">Email</label>
//                         <input readOnly value={email}  placeholder='Email...' type="text" />
//                     </section>
                    
//                 </div>
//                 <div className="seller-input-cnt">
//                     <section style={{width: '100%'}}>
//                         <label htmlFor="">Phone</label>
//                         <input readOnly value={phone}  placeholder='Phone...' type="text" />
//                     </section>
                    
//                 </div>
               
//                 <div className="seller-input-cnt">
                            
//                     <button style={{width: '45%'}} onClick={e => {e.preventDefault(); initializePayment(onSuccess, onClose)}}>Pay</button>

//                     <button style={{width: '45%'}} onClick={e => {
//                         e.preventDefault();
//                         let overlay = document.querySelector('.seller-overlay');
//                         overlay.removeAttribute('id')
//                     }}>Cancel</button>
                    
//                 </div>
//             </form>

//         </>
//      );
// }
 
// export default PayStack;
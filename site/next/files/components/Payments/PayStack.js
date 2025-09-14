// import { useState } from 'react';
// import { usePaystackPayment } from 'react-paystack';
// const PayStack = ({price,type}) => {

//     let [fname, setFname] = useState('')
//     let [lname, setLname] = useState('')
//     let [email, setEmail] = useState('')
//     let [phone, setPhone] = useState('')
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
//                         <input  onInput={e => setFname(e.target.value)} placeholder='FirstName...' type="text" />
//                     </section>
//                     <section>
//                         <label htmlFor="">LastName</label>
//                         <input onInput={e => setLname(e.target.value)}  placeholder='LastName' type="text" />
//                     </section>
//                 </div>

//                 <div className="seller-input-cnt">
//                     <section style={{width: '100%'}}>
//                         <label htmlFor="">Amount</label>
//                         <input value={`${new Intl.NumberFormat('en-us').format(price)}.00`}  placeholder='Amount...' type="text" />
//                     </section>
                    
//                 </div>
//                 <div className="seller-input-cnt">
//                     <section style={{width: '100%'}}>
//                         <label htmlFor="">Email</label>
//                         <input onInput={e => setEmail(e.target.value)}  placeholder='Email...' type="text" />
//                     </section>
                    
//                 </div>
//                 <div className="seller-input-cnt">
//                     <section style={{width: '100%'}}>
//                         <label htmlFor="">Phone</label>
//                         <input onInput={e => setPhone(e.target.value)}  placeholder='Phone...' type="text" />
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
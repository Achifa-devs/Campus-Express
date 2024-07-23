import { useEffect, useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { GetBuyer } from '../../../api/buyer';
const PayStack = ({amt}) => {

    let [fname, setFname] = useState('')
    let [lname, setLname] = useState('')
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState('')

    useEffect(() => {
        GetBuyer(window.localStorage.getItem('CE_buyer_id'))
        .then((result) => {
            setFname(result.fname)
            setLname(result.lname)
            setEmail(result.email)
            setPhone(result.phone)
        })
        .catch(err => console.log(err))
    },[])

    const config = {
        reference: (new Date()).getTime().toString(),
        email: "akpulufabian@gmail.com",
        amount: amt + '00', //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: 'pk_live_c8a885e2b4bda68ee5940a527431030c4b32f6dd',
        
        metadata: {
            seller_id: `${window.localStorage.getItem("CE_seller_id")}`,
            amount: amt,
            firstname: fname,
            lastname: lname,
            phone: phone,
            email: email
        }
    };
    
    // you can call this function anything
    const onSuccess = (reference) => {
      // Implementation for whatever you want to do with reference and after success call.
      console.log(reference);
    };
  
    // you can call this function anything
    const onClose = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      console.log('closed')
    }

    const initializePayment = usePaystackPayment(config);

    return ( 
        <>
            <form id="paymentForm">

                <h5 style={{color: 'orangered'}}>Deposit Form</h5>
                
                
                <div className="seller-input-cnt">
                    <section>
                        <label htmlFor="">FirstName</label>
                        <input value={fname} placeholder='FirstName...' type="text" />
                    </section>
                    <section>
                        <label htmlFor="">LastName</label>
                        <input value={lname}  placeholder='LastName' type="text" />
                    </section>
                </div>

                <div className="seller-input-cnt">
                    <section style={{width: '100%'}}>
                        <label htmlFor="">Amount</label>
                        <input value={new Intl.NumberFormat('en-us').format(amt)}  placeholder='Amount...' type="text" />
                    </section>
                    
                </div>
                <div className="seller-input-cnt">
                    <section style={{width: '100%'}}>
                        <label htmlFor="">Email</label>
                        <input value={email}  placeholder='Email...' type="text" />
                    </section>
                    
                </div>
                <div className="seller-input-cnt">
                    <section style={{width: '100%'}}>
                        <label htmlFor="">Phone</label>
                        <input value={phone}  placeholder='Phone...' type="text" />
                    </section>
                    
                </div>
               
                <div className="seller-input-cnt">
                            
                    <button onClick={e => {e.preventDefault(); initializePayment(onSuccess, onClose)}}>Pay</button>
                    
                </div>
            </form>

        </>
     );
}
 
export default PayStack;
import { useEffect, useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { socket } from '../../socket';
import '../../styles/Buyer/login.css'

const Withdrawal = ({balance}) => {

    
    
    let [validAcct, setValidAcct] = useState(false)
    let [data, setdata] = useState(0)
    let [bank, setBank] = useState('')
    let [acctNum, setAcctNum] = useState('')
    let [amount, setAmount] = useState('0.00')
    let [withdrwawalAmount, setwithdrwawalAmount] = useState('0.00')
    let [acctName,setAcctName] = useState(<div className="Authloader" style={{background: '#fff'}}></div>)

    function Withdraw(params) {
        // if(withdrwawalAmount >= 150){
        //     if(withdrwawalAmount < amount && validAcct){
        //         Transfer(withdrwawalAmount,acctNum,bank,acctName)
        //         .then((result) => {
                    
        //         })
        //         .catch((err) => {
                    
        //         })
        //     }
        // }
        alert('Please try again later, thanks')
    }

   
    // you can call this function anything
  

    return ( 
        <>
        
            <form id="paymentForm">

                <h5 style={{color: 'orangered'}}>Order Form</h5>
                

                <div className="seller-input-cnt">
                    <section style={{width: '100%'}}>
                        <label htmlFor="">Amount Availble</label>
                        <h4>&#8358; {new Intl.NumberFormat('en-us').format(balance)}</h4>
                    </section>
                    
                </div>
                
                <div className="seller-input-cnt">
                    <section style={{width: '100%'}}>
                        <label htmlFor="">Amount</label>
                        <input value={`${new Intl.NumberFormat('en-us').format(balance)}.00`}   placeholder='Amount...' type="text" />
                    </section>
                    
                </div>

                {/* <div className="seller-input-cnt">
                    <section style={{width: '100%'}}>
                        <label htmlFor="">Account Number</label>
                        <input style={{width: '100%'}} onInput={e => setAcctNum(e.target.value)}  placeholder='Account Number...' type="text" />
                    </section>
                </div> */}


                
               
                <div className="seller-input-cnt">
                            
                    <button style={{width: '45%'}} onClick={e => {e.preventDefault(); Withdraw()}}>Order</button>

                    <button style={{width: '45%'}} onClick={e => {
                        e.preventDefault();
                        let overlay = document.querySelector('.seller-overlay');
                        overlay.removeAttribute('id')
                    }}>Cancel</button>
                    
                </div>
            </form>

        </>
     );
}
 
export default Withdrawal;
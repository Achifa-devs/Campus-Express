import { useEffect, useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { socket } from '../../socket';
import bankData from './bank.json'
// import { Transfer, bankVerification } from '../../api/seller';
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

                <h5 style={{color: 'orangered'}}>Withdrawal Form</h5>
                

                <div className="seller-input-cnt">
                    <section style={{width: '100%'}}>
                        <label htmlFor="">Amount Availble</label>
                        <h4>{balance}</h4>
                    </section>
                    
                </div>
                
                <div className="seller-input-cnt">
                    <section style={{width: '100%'}}>
                        <label htmlFor="">Amount</label>
                        <input onInput={e => setwithdrwawalAmount(e.target.value)}  placeholder='Amount...' type="number" />
                    </section>
                    
                </div>

                <div className="seller-input-cnt">
                    <section style={{width: '100%'}}>
                        <label htmlFor="">Account Number</label>
                        <input style={{width: '100%'}} onInput={e => setAcctNum(e.target.value)}  placeholder='Account Number...' type="text" />
                    </section>

                    
                    
                </div>


                <div className="seller-input-cnt">
                    <section style={{width: '100%'}}>
                        {/* <label htmlFor="">Account Number</label> */}
                        {/* <input onInput={e => setBank(e.target.value)}  placeholder='Bank Name' type="text" /> */}
                        <select onInput={e => setBank(e.target.value)} name="" id="">
                            <option value="">Select Bank</option>
                            {
                                bankData.map(item => 
                                    <option value={item.code}>{item.name}</option>
                                    
                                )
                            }
                        </select>
                    </section>

                    <section>
                        <button onClick={e => {
                            // e.target.disabled = true
                            setdata(1);
                            setAcctName(<div className="Authloader" style={{background: '#fff'}}></div>)
                            e.preventDefault();
                            // bankVerification(acctNum,bank)
                            // .then((result) => {
                            //     console.log(result)
                            //     if(result.data.status === 'success'){
                            //         setAcctName(result.data.data.account_name)
                            //         setValidAcct(true)
                            //         // console.log(data.account_name)
                            //     }else{
                            //         setAcctName('Account Details Not Found')
                            //         setValidAcct(false)

                            //     }
                            // })
                            // .catch(err => console.log(err))
                        }}>Verify</button>
                    </section>
                    
                </div>

                <div style={{height: '50px', marginBottom: '20px', width: '90%', margin: 'auto', border: '1px solid #efefef', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', background: 'orangered', color: '#fff', borderRadius: '5px', display: !data ? 'none' : 'flex'}}>
                    {
                        acctName
                    }
                </div>
               
                <div className="seller-input-cnt">
                            
                    <button style={{width: '45%'}} onClick={e => {e.preventDefault(); Withdraw()}}>Withdraw</button>

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
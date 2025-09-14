import { useEffect, useState } from "react"
import { GetBuyer } from "../../api/buyer/get"
// import { CreateOrder, GetBuyer } from "../../api/buyer"

const CEStack = ({price,product_id}) => {
    
    let [fname, setFname] = useState('loading')
    let [lname, setLname] = useState('loading')
    let [email, setEmail] = useState('loading')
    let [phone, setPhone] = useState('loading')
    let [buyerId, setBuyerId] = useState('loading')

    useEffect(() => {
        GetBuyer(window.localStorage.getItem('CE_user_id'))
        .then((result) => {
            setFname(result.fname)
            setLname(result.lname)
            setEmail(result.email)
            setPhone(result.phone)
            setBuyerId(result.user_id)
        })   
        .catch(err => console.log(err))
    },[])

    return ( 
        <>
 
            <form id="paymentForm">

                <h5 style={{color: 'orangered'}}>Deposit Form</h5>


                <div className="seller-input-cnt">
                    <section>
                        <label htmlFor="">FirstName</label>
                        <input readOnly value={fname} placeholder='FirstName...' type="text" />
                    </section>
                    <section>
                        <label htmlFor="">LastName</label>
                        <input readOnly value={lname}  placeholder='LastName' type="text" />
                    </section>
                </div>

                <div className="seller-input-cnt">
                    <section style={{width: '100%'}}>
                        <label htmlFor="">Amount</label>
                        <input readOnly value={`${new Intl.NumberFormat('en-us').format(price)}.00`} placeholder='Amount...' type="text" />
                    </section>
                     
                </div> 
                <div className="seller-input-cnt">
                    <section style={{width: '100%'}}>
                        <label htmlFor="">Email</label>
                        <input readOnly value={email} placeholder='Email...' type="text" />
                    </section>
                    
                </div>
                <div className="seller-input-cnt">
                    <section style={{width: '100%'}}>
                        <label htmlFor="">Phone</label>
                        <input readOnly value={phone}  placeholder='Phone...' type="text" />
                    </section>
                     
                </div>

                <div className="seller-input-cnt">
                            
                    <button onClick={e => {
                        e.preventDefault(); 
                        // CreateOrder({fname,lname,email,phone,amount:price,wallet:'wallets'},window.localStorage.getItem('CE_user_id'))
                        // .then((result) => {
                            
                        // })
                        // .catch((err) => {
                            
                        // })
                    }}>Pay</button>
                    
                </div>
            </form>
        </>
     );
}
 
export default CEStack;
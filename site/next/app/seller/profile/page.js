import React from 'react'
import '@/app/seller/profile/styles/xx-large.css'
export default function Profile() {
  return (
    <>
      <div className="seller-profile">
        <div className="seller-profile-cnt">

            <div className="top">
                <section>
                    <h3>
                    Welcome to Campus Express! Let’s take your shop live!
                    </h3>
                    <h6>Complete all the sections below to take your shop live.</h6>
                </section>
            </div>

            <div className="summary">
                <div>
                    <div>
                        Shop Information
                    </div>
                    <hr />
                    <div>
                        pending
                    </div>
                </div>

                <div>
                    <div>
                        Shipping Information
                    </div>
                    <hr />
                    <div>
                        pending
                    </div>
                </div>

                <div>
                    <div>
                        Payment Information
                    </div>
                    <hr />
                    <div>
                        pending
                    </div>
                </div>
            </div>

            {
                <PaymentInfo />
            } 
        </div>

      </div>
    </>
  )
}



function PaymentInfo() {
    return(
        <>
            <div className="mid">

                <section>
                    <h3>
                        Preferred payment option
                    </h3>
                    <h6>Select the payment method, if applicable, of your choice, and ensure to provide all required details. We'll review the validity of your documents upon submission.</h6>
                </section>

                <section style={{display: 'flex', alignItems: 'center', padding: '0 0 0 20px', margin: '20px 0px'}}>
                
                    <input style={{height: '20px', width: '20px'}} type="radio" checked id="" />
                    &nbsp;
                    &nbsp;
                    <label htmlFor="">Bank Account</label>

                </section>

                <div className="input-cnt">
                    <label htmlFor="">Bank Account Number</label>
                    <input type="text" placeholder="Bank Account Number" id="" />
                </div>

                <div className="input-cnt">
                    <label htmlFor="">Bank Account Number</label>
                    <input type="text" placeholder="Bank Account Number" id="" />
                </div>


                <div className="input-cnt">
                    <label htmlFor="">Bank Name</label>

                    <select placeholder="" id="">
                        <option value=""></option>
                    </select>
                </div>

                <div className="input-cnt">
                    <label htmlFor="">Beneficiary</label>
                    <input type="text" placeholder="Beneficiary" id="" />
                </div>
            </div>
        </>
    )
}

function ShippingInfo() {
    return(
        <>
            <div className="mid">

                <section>
                    <h3>
                        Shipping Information
                    </h3>
                    <h6>Please choose your preferred method of communucation and your shipping address</h6>
                </section>

                <div className="input-cnt">
                    <label htmlFor="">Shipping Zone</label>
                    <input type="text" placeholder="Shipping Zone" id="" />
                </div>
            </div>

            <div className="btm">
                <section>
                    <h3>
                        Shipping Information
                    </h3>
                    <h6>Please provide the address from where you prefer to ship your products
                    </h6>
                </section>


                <div className="input-cnt">
                    <label htmlFor="">Address 1</label>
                    <input type="text" placeholder="Address 1" id="" />
                </div>

                <div className="input-cnt">
                    <label htmlFor="">Address 2</label>
                    <input type="text" placeholder="Address 2" id="" />
                </div>


                <div className="input-cnt">
                    <label htmlFor="">Address 3</label>
                    <input type="text" placeholder="Address 3" id="" />
                </div>

                <div className="input-cnt">
                    <label htmlFor="">Address 4</label>
                    <input type="text" placeholder="Address 4" id="" />
                </div>

                <hr />
                <section>
                    <div className="input-cnt">
                        <label htmlFor="">City/Region</label>

                        <select placeholder="" id="">
                            <option value=""></option>
                        </select>
                    </div>
                    <div className="input-cnt">
                        <label htmlFor="">State</label>

                        <select placeholder="" id="">
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="input-cnt">
                        <label htmlFor="">Country</label>

                        <select placeholder="" id="">
                            <option value=""></option>
                        </select>
                    </div>
                </section>


                <section>
                    <h3>
                        Return Address
                    </h3>
                    <h6>Please provide details of your customer support. These details will be used to adrress product issues by customers</h6>
                </section>

            

                <div className="input-cnt">
                    <label htmlFor="">Address 1</label>
                    <input type="text" placeholder="Address 1" id="" />
                </div>

                <div className="input-cnt">
                    <label htmlFor="">Address 2</label>
                    <input type="text" placeholder="Address 2" id="" />
                </div>


                <div className="input-cnt">
                    <label htmlFor="">Address 3</label>
                    <input type="text" placeholder="Address 3" id="" />
                </div>

                <div className="input-cnt">
                    <label htmlFor="">Address 4</label>
                    <input type="text" placeholder="Address 4" id="" />
                </div>

                <section>
                    <div className="input-cnt">
                        <label htmlFor="">City/Region</label>

                        <select placeholder="" id="">
                            <option value=""></option>
                        </select>
                    </div>
                    <div className="input-cnt">
                        <label htmlFor="">State</label>

                        <select placeholder="" id="">
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="input-cnt">
                        <label htmlFor="">Country</label>

                        <select placeholder="" id="">
                            <option value=""></option>
                        </select>
                    </div>
                </section>

            </div>
        </>
    )
}

function ShopInfo() {
    return(
        <>
            <div className="mid">

                <section>
                    <h3>
                        Account Details
                    </h3>
                    <h6>Your Seller Account Information</h6>
                </section>

                <div className="input-cnt">
                    <label htmlFor="">Firstname</label>
                    <input type="text" placeholder="Firstname" id="" />
                </div>

                <div className="input-cnt">
                    <label htmlFor="">Lastname</label>
                    <input type="text" placeholder="Lastname" id="" />
                </div>

                <div className="input-cnt">
                    <label htmlFor="">Email</label>
                    <input type="text" placeholder="Email" id="" />
                </div>  

                <div className="input-cnt">
                    <label htmlFor="">Phone</label>
                    <input type="text" placeholder="Phone" id="" />
                </div>

                <div className="input-cnt">
                    <label htmlFor="">Gender</label>
                    <select placeholder="" id="">
                        <option value=""></option>
                    </select>
                </div>

                <section>
                    <div className="input-cnt">
                        <label htmlFor="">State</label>
                        <select placeholder="State" id="">
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="input-cnt">
                        <label htmlFor="">Campus</label>
                        <select placeholder="Campus" id="">
                            <option value=""></option>
                        </select>
                    </div>
                </section>

            </div>

            <div className="btm">
            <section>
                <h3>
                    Shop Details
                </h3>
                <h6>Manage your shop on Campus Express from below</h6>
            </section>

            <div className="input-cnt">
                <label htmlFor="">Shop Name</label>
                <input type="text" placeholder="Shop Name" id="" />
            </div>

            <section>
                <h3>
                    Communication Details
                </h3>
                <h6>Choose the contact preference for communications from Jumia. We'll send communications and contact you on the details below</h6>
            </section>

            <div className="input-cnt">
                <label htmlFor="">Contact Name</label>
                <input type="text" placeholder="Contact Name" id="" />
            </div>

            <div className="input-cnt">
                <label htmlFor="">Contact Phone</label>
                <input type="text" placeholder="Contact Phone" id="" />
            </div>

            <div className="input-cnt">
                <label htmlFor="">Contact Email</label>
                <input type="text" placeholder="Contact Email" id="" />
            </div>


            <section>
                <h3>
                    Customer Care Details
                </h3>
                <h6>Please provide details of your customer support. These details will be used to adrress product issues by customers</h6>
            </section>

            <div className="input-cnt">
                <label htmlFor="">Customer Care Name</label>
                <input type="text" placeholder="Customer Care Name" id="" />
            </div>

            <div className="input-cnt">
                <label htmlFor="">Customer Care Phone</label>
                <input type="text" placeholder="Customer Care Phone" id="" />
            </div>

            <div className="input-cnt">
                <label htmlFor="">Customer Care Email</label>
                <input type="text" placeholder="Customer Care Email" id="" />
            </div>

            <div className="input-cnt">
                <label htmlFor="">Address 1</label>
                <input type="text" placeholder="Address 1" id="" />
            </div>

            <div className="input-cnt">
                <label htmlFor="">Address 2</label>
                <input type="text" placeholder="Address 2" id="" />
            </div>


            <div className="input-cnt">
                <label htmlFor="">Address 3</label>
                <input type="text" placeholder="Address 3" id="" />
            </div>

            <div className="input-cnt">
                <label htmlFor="">Address 4</label>
                <input type="text" placeholder="Address 4" id="" />
            </div>

            <section>
                <div className="input-cnt">
                    <label htmlFor="">City/Region</label>

                    <select placeholder="" id="">
                        <option value=""></option>
                    </select>
                </div>
                <div className="input-cnt">
                    <label htmlFor="">State</label>

                    <select placeholder="" id="">
                        <option value=""></option>
                    </select>
                </div>

                <div className="input-cnt">
                    <label htmlFor="">Country</label>

                    <select placeholder="" id="">
                        <option value=""></option>
                    </select>
                </div>
            </section>

            </div>
        </>
    )
}
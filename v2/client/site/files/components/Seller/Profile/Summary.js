import React from 'react'
import ellipsisSvg from '../../../assets/filter-edit-svgrepo-com.svg'

export default function Summary({CashOut,userData,updateActiveJsx,sellerWallet}) {
  return (
    <>
      <div className="seller-profile-verification">
        <img src={ellipsisSvg} style={{
          height: '20px',
          width: '20px',
          position: 'absolute',
          right: '10px',
          top: '10px',
          transform: 'rotate(90deg)',
          cursor: 'pointer'
        }} alt="" onClick={e => {
        document.querySelector('.edit-overlay').setAttribute('id', 'edit-overlay')
        updateActiveJsx(<CashOut user={`${userData}`} />)
        
      }} />
        <div><b>Amount Earned</b></div>

        <div>
          {/* <div>ID: Verified</div> */}
          <div>Balance: &#8358; {
            new Intl.NumberFormat('en-us').format(sellerWallet?.wallet_balance)
            
          }</div>
          {/* <div>Student: False</div> */}
        </div>

      </div>
    </>
  )
}

import { useEffect, useState } from 'react';
import '../../../styles/settings.css';
import ellipsisSvg from '../../../assets/filter-edit-svgrepo-com.svg'


const Verification = ({userData,ContactEdit,updateActiveJsx}) => {

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
                updateActiveJsx(<ContactEdit email={userData?.email} phone={userData?.phone} name={`${userData?.fname} ${userData?.lname}`} user_id={userData?.user_id} />)
                
                }} />
                <div><b>Verification</b></div>

                <div>
                    {/* <div>ID: Verified</div> */}
                    <div>Email: {
                    userData?.isemailverified ? 'Verified' : 'Not Verified'
                    }</div>
                    <div>Phone Number: {
                    userData?.isphoneverified ? 'Verified' : 'Not Verified'
                    }</div>
                    {/* <div>Student: False</div> */}
                </div>
          </div>
        </>
     );
}
 
export default Verification;
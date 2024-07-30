import '../../../styles/settings.css';
import ellipsisSvg from '../../../assets/filter-edit-svgrepo-com.svg'

const AdsComp = ({shop,Ads,updateActiveJsx}) => {
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
              updateActiveJsx(<Ads shop={shop} />)
              
            }} />
              <div><b>Ads Promotion</b></div>

              <div>
                {/* <div>ID: Verified</div> */}
                <div style={{textTransform: 'capitalize'}}>{(shop?.subscription)?(shop?.subscription).package:'...'}: {
                  (shop?.subscription)?(shop?.subscription).price:'...'
                }</div>
                
                {/* <div>Student: False</div> */}
              </div>
          </div>
        </>
     );
}
 
export default AdsComp;
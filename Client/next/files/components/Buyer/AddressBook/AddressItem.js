import React, { useEffect, useState } from 'react'
import Thumbnail from '../Thumbnail'
import js_ago from 'js-ago'
import deleteSvg from '../../../assets/delete-svgrepo-com (1).svg'
import editSvg from '../../../assets/edit-svgrepo-com.svg'

export default function AddressItem({item,index}) {
  let [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {setScreenWidth(window.innerWidth)},[]);

return (
  <> 
    <div key={index} className="address-card-data">
      <div className="address-card-data-cnt">
        
        <div className="body-cnt">
          <div className="body-cnt-top">
            <p style={{margin: '5px 0px'}}>Akpulu Chinedu Fabian</p>
          </div>
          
          <div className="body-cnt-mid">
            <small>B-bus stop, 195-ifite road, ifite-awka, Awka, Anambra state.</small>

            <small>AWKA TOWN, Anambra</small>

            <small>+234 8032639894</small>
          </div>

          
          <div className="body-cnt-btm">
            <div>
              <button>Set as default</button>
            </div> 

            <div>
              <span style={{cursor: 'pointer'}}>
                <img src={deleteSvg.src} style={{height: '20px', width: '20px'}} />
              </span>

              <span style={{cursor: 'pointer'}}>
                <img src={editSvg.src} style={{height: '30px', width: '30px', margin: '0 0 -5px 10px'}} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)
}

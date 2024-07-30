import React from 'react'
import Select from 'react-select';
export default function LodgeAmenities({amenities, deleteAmenities, productAmenities}) {

    
  return (
    <>
        <div className="input-cnt">
            <label htmlFor="">Lodge Facilities</label>

            <div style={{
                height: 'auto',
                width: '100%',
                background: '#f9f9f9',
                borderRadius: '5px',
                padding: '10px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                marginBottom: '10px'
            }}>
                {
                    amenities.map((item) => 
                        <div style={{
                            flexShrink: '0', 
                            padding: '5px 10px 5px 10px',
                            borderRadius: '5px',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            margin: '5px',
                            background: '#FF4500',
                            color: '#fff',
                            cursor: 'pointer'
                        }}>
                            <span>{item}</span>
                            &nbsp;
                            &nbsp;
                            <span>
                                <button onClick={deleteAmenities(item)} className="notice-cnt-btn" style={{width: '25px', height: '25px', background: '#fff4e0', borderRadius: '2px', color: 'red', fontWeight: '1000', fontSize: 'small'}}>
                                    x
                                </button>
                            </span>
                        </div>
                    )
                }
            </div>
            <select onInput={e => productAmenities(e.target.value)}  name="condition" id="">
                <option value={''}>Select Lodge Facilities</option>

                {
                    ['Water', 'Wardrope', 'PVC', 'Tiled', 'Balcony', 'Open-Kitchen', 'Indoor-Kitchen'].map((item, index) => 
                        item === window.localStorage.getItem('draft_c_type')
                        ? 
                        <option style={{textTransform: 'capitalize'}} selected key={index} value={item}>{item}</option>
                        :
                        <option style={{textTransform: 'capitalize'}} key={index} value={item}>{item}</option>
                    )
                }
            </select>
        </div>
    </>
  )
}

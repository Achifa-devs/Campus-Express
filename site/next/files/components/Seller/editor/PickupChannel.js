import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { UpdatePickupChannel } from "../../../api/buyer/update"
import { openNotice } from "../../../reusable.js/notice"

export default function PickupChannel({updateLocation,title,edit,order_data}) {
  const{sellerData} = useSelector(s=>s.sellerData)
    useEffect(() => {
        setState(edit?.locale?.split(',')[0])
        setCity(edit?.locale?.split(',')[1])
        setTown(edit?.locale?.split(',')[2])
        setAddress1(edit?.locale?.split(',')[3])
        setAddress2(edit?.locale?.split(',')[4])
        setAddress3(edit?.locale?.split(',')[5])
        setAddress4(edit?.locale?.split(',')[6])
    }, [edit])
  
    let [state, setState] = useState('')
    let [town, setTown] = useState('')
    let [city, setCity] = useState('')
    let [address1, setAddress1] = useState('')
    let [address2, setAddress2] = useState('')
    let [address3, setAddress3] = useState('')
    let [address4, setAddress4] = useState('')
    let [fee, setFee] = useState(0)
  
    function addLocation() {
       
      let res = ({locale: [state,city,address1,address2,address3,address4].map(item=>item).join(', '), fee: fee})
      updateLocation(res)
      rmLocation()
       
    }

    async function editPickupChannel() {
        let response = await UpdatePickupChannel({
            seller_id: sellerData?.seller_id, 
            product_id: order_data?.product_id, 
            pickup_channel:  {
                locale: [state,city,town,address1,address2,address3,address4].map(item=>item).join(', '), 
                index: edit?.index,
                fee: fee
            }
        })
        if(response.bool){
            updateLocation(response.locale)
        }
    }
  
    function rmLocation() {
        let overlay = document.querySelector('.location-overlay')
        overlay.removeAttribute('id');
    }
  
    return( 
        <>
           
            <div style={{background: '#fff', width: 'fit-content', padding: '10px', position: 'relative', height: '80%', borderRadius: '10px'}}>
              <h2 style={{padding: '10px', color: '#FF4500', fontWeight: '500'}}><u>Input Your {title} </u></h2>
                <section style={{padding: '10px', overflow: 'auto', height: 'calc(100% - 100px)'}}>
                    <div className="input-cnt">
                        <label htmlFor="">State</label>
                        <input onInput={e => setState(e.target.value)} defaultValue={edit?.locale?.split(',')[0]} type="text" name="" id="" />
                    </div>
  
                    <div className="input-cnt">
                        <label htmlFor="">City</label>
                        <input onInput={e => setCity(e.target.value)} defaultValue={edit?.locale?.split(',')[1]} type="text" name="" id="" />
                    </div>
  
                    <div className="input-cnt">
                        <label htmlFor="">Town</label>
                        <input onInput={e => setTown(e.target.value)} defaultValue={edit?.locale?.split(',')[2]} type="text" name="" id="" />
                    </div>
  
                    <div className="input-cnt">
                        <label htmlFor="">Address 1(Street Name)</label>
                        <input onInput={e => setAddress1(e.target.value)} defaultValue={edit?.locale?.split(',')[3]} type="text" name="" id="" />
                    </div>
  
                    <div className="input-cnt">
                        <label htmlFor="">Address 2(Bus Stop/Junction)</label>
                        <input onInput={e => setAddress2(e.target.value)} defaultValue={edit?.locale?.split(',')[4]} type="text" name="" id="" />
                    </div>
  
                    <div className="input-cnt">
                        <label htmlFor="">Address 3(building land mark)</label>
                        <input onInput={e => setAddress3(e.target.value)} defaultValue={edit?.locale?.split(',')[5]} type="text" name="" id="" />
                    </div>
  
                    <div className="input-cnt">
                        <label htmlFor="">Address 4(Extra Info)</label>
                        <input onInput={e => setAddress4(e.target.value)} defaultValue={edit?.locale?.split(',')[5]} type="text" name="" id="" />
                    </div>

                    <div className="input-cnt">
                      <label htmlFor="">Inspection Fee</label>
                      <input onInput={e => setFee(e.target.value)} defaultValue={edit?.locale?.split(',')[5]} type="number" name="" id="" />
                    </div>
  
                    
                </section>
                
  
                <div style={{display: 'flex', alignItems: 'center', fontWeight: '500', padding: '10px', fontSize: '20', justifyContent: 'space-between', flexDirection: 'row', background: '#fff', position: 'absolute', bottom: '0', left: '0', width: '100%'}}>
                    <button onClick={e => {
                        edit
                        ?
                        editPickupChannel()
                        :
                        addLocation()
                    }} style={{width: '48%'}}>{
                        edit
                        ?
                        'Update'
                        :
                        'Add'
                    }</button>
                    <button onClick={e => rmLocation()} style={{width: '48%'}}>Cancel</button>
                </div>
            </div>
        </> 
    )
  }
import React, {
  useEffect,
  useState
} from 'react'
import {
  Alert,
  Dimensions,
  ScrollView,
  View
} from 'react-native'
import {
  useSelector
} from 'react-redux'
import Card from '../../components/Inventory/Card'
import UploadBtn from '../../components/Sell/UploadBtn'
// import Card from '../../components/Listing/Card'
// import UploadBtn from '../../components/Home/UploadBtn'

export default function Listing() {
  let { user } = useSelector(s => s.user)
  let [server_err, set_server_err] = useState(false)
  let [list, set_list] = useState([])
  let screenHeight = Dimensions.get('window').height;
      
  useEffect(() => {
    // if (user) {
      console.log(user)
      get_list_data()
    // } 
  },[user])

  function get_list_data() {
    fetch(`http://192.168.75.146:9090/vendor/products?user_id=CE-2b04fb`, {
      headers: {
        "Content-Type": "Application/json"
      }
    })
    .then(async(result) => {
      let response = await result.json()
      set_list(response)
    })
    .catch((err) => {
      set_server_err(!true)
      Alert.alert('Network error, please try again.')
      console.log(err)
    })
  }
  return (
    <>
      <ScrollView style={{
        height: '100%', width: '100%', padding: 0, margin: 0
      }}>  
        {
          list.length > 0
          ?
            list.map((item, index) => <Card data={item} index={index}  />)
          : 
          <View style={{
            height: screenHeight, width: '100%', padding: 0, margin: 0,
            display: 'flex',
            // alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
            <UploadBtn />
          </View> 
        }
      </ScrollView>
    </>
  )
}



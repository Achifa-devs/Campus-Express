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
import { getData } from '../../../utils/AsyncStore.js'
import { useNavigation } from '@react-navigation/native'
// import Card from '../../components/Listing/Card'
// import UploadBtn from '../../components/Home/UploadBtn'

export default function Listing() {
  let [server_err, set_server_err] = useState(false)
  let [list, set_list] = useState([])
    const navigation = useNavigation()
  
  let screenHeight = Dimensions.get('window').height;
  useEffect(() => {
      
    (async function getUser(params) {
      let user = await getData('user');
      const id = JSON.parse(user)
      get_list_data(id?.user_id)
    })()
  }, []);

  function get_list_data(id) {
    fetch(`https://cs-server-olive.vercel.app/vendor/products?user_id=${id}`, {
      headers: {
        "Content-Type": "Application/json"
      }
    })   
    .then(async(result) => {
      let response = await result.json()
      set_list(response?.data)
      console.log('response: ', response)
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
            <UploadBtn navigation={navigation} />
          </View> 
        }
      </ScrollView>  
    </>
  )
}



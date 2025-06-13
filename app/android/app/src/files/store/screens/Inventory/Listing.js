import React, {
  useEffect,
  useState
} from 'react'
import {
  Alert,
  Dimensions,
  ScrollView,
  View,TouchableOpacity,Text,
  StyleSheet
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
import Icon from 'react-native-vector-icons/Ionicons';

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
          <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7} // Smooth press effect
            onPress={() => {navigation.navigate('user-new-listing')}}
          >
            <View style={styles.content}>
              <Icon name="folder-open" size={120} color="#FF4500" />
              <Text style={styles.text}>Click here to upload your property</Text>
            </View>
          </TouchableOpacity>
        }
      </ScrollView>  
    </>
  )
}


const screenHeight = Dimensions.get('screen').height
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: screenHeight*0.7, 
    padding: 0,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff', // Add a background color
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#FF4500', // Better readability
    textAlign: 'center',
  },
});

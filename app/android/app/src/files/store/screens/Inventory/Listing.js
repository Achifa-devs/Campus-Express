import React, {
  useEffect,
  useState,
  useCallback
} from 'react'
import {
  Alert,
  Dimensions,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  RefreshControl,
  ActivityIndicator
} from 'react-native'
import {
  useSelector
} from 'react-redux'
import Card from '../../components/Inventory/Card'
import UploadBtn from '../../components/Sell/UploadBtn'
import { getData } from '../../../utils/AsyncStore.js'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';

export default function Listing() {
  let [server_err, set_server_err] = useState(false)
  let [list, set_list] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const navigation = useNavigation()
  const { user } = useSelector(s => s.user);
  let screenHeight = Dimensions.get('window').height;

  // Fetch data function
  const get_list_data = useCallback((id) => {
    setRefreshing(true)
    fetch(`https://cs-server-olive.vercel.app/vendor/products?user_id=${id}`, {
      headers: {
        "Content-Type": "Application/json"
      }
    })   
    .then(async(result) => {
      let response = await result.json()
      set_list(response?.data)
      console.log('response: ', response)
      setRefreshing(false)
    })       
    .catch((err) => {
      set_server_err(!true)
      Alert.alert('Network error, please try again.')
      console.log(err)
      setRefreshing(false)
    })
  }, [])

  // Initial load
  useEffect(() => {
    get_list_data(user?.user_id)
  }, [get_list_data, user?.user_id]);

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      get_list_data(user?.user_id)
    }, [get_list_data, user?.user_id])
  )

  let [deleting, set_deleting] = useState(false);
  function updateDeleting(data) {
    set_deleting(data)
  }

  // Pull-to-refresh handler
  const onRefresh = useCallback(() => {
    get_list_data(user?.user_id)
  }, [get_list_data, user?.user_id])

  return (
    <>
      {deleting && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color="#FF4500" />
        </View>
      )}
      <ScrollView 
        style={{
          height: '100%', 
          width: '100%', 
          padding: 0, 
          margin: 0
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >  
        {
          list.length > 0
          ?
            list.map((item, index) => <Card updateDeleting={updateDeleting} data={item} index={index} key={index} />)
          : 
          <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
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
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#FF4500',
    textAlign: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
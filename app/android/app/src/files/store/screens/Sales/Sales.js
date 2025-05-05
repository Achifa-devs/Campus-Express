import React, {
  useEffect,
  useState
} from 'react'
import {
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import {
  useSelector
} from 'react-redux'
import {
  Text
} from 'react-native'
import numeral from 'numeral';
import js_ago from 'js-ago'
import {
  useNavigation
} from '@react-navigation/native'
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.
import OrderHead from '../../components/Sales/OrdeHead';
import OrderContent from '../../components/Sales/OrderContent';

export default function Sales() {
  let navigation = useNavigation()    
  
  let {
    user
  } = useSelector(s => s.user)
  let [server_err, set_server_err] = useState(false)
  
  useEffect(() => {
    if (user) {
     get_list_data()
    }
  },[user])
  const [tableData, setTableData] = useState([]);

  

  function get_list_data() {
    fetch(`http://192.168.105.146:3000/api/vendor/orders?seller_id=${user?.seller_id}`, {
      headers: {
        "Content-Type": "Application/json"
      }
    })
    .then(async(result) => {
        
      let response = await result.json()
      response.data.map(item => { 
        setTableData(res => [...res, [
          <Image height={40} width={'60%'} style={{ marginLeft: 10 }} borderRadius={5} source={{ uri: item?.product?.thumbnail_id }} />,
          `₦${numeral(item?.order?.price).format('0.a')}`,
          item?.order?.havepaid ? 'Yes' : 'No',
          js_ago(new Date(item?.order?.date)),
          <TouchableOpacity style={{ height: 30, marginLeft: 5, paddingLeft: 5, paddingRight: 5, paddingTop: 2.5, paddingBottom: 2.5, display: 'flex', justifyContent: 'center', flexDirection: 'row', borderRadius: 3.5, width: 'auto', backgroundColor: '#1E90FF', alignItems: 'center', marginRight: 5 }} onPress={()=>navigation.navigate('user-order-room', {order: item?.order, product: item?.product})}><Text style={{ color: '#fff', fontSize: 12, marginRight: 4 }}>View</Text><Ionicons name={'open-outline'} size={20} color={'#fff'} /></TouchableOpacity>
        ]])
      }) 

    })
    .catch((err) => {
      set_server_err(!true)
      Alert.alert('Network error, please try again.')
      console.log(err)
    })
  }

  return (
    <>
      <OrderHead />
      <ScrollView>      
        <OrderContent tableData={tableData} />
      </ScrollView> 
    </>
  )
}

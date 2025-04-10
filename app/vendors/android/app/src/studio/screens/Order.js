import React, { useEffect, useState } from 'react'
import OrderCard from '../components/Order/OrderCard'
import { Alert, Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Text } from 'react-native-gesture-handler'
import { Table, Row, Rows } from 'react-native-table-component';
import numeral from 'numeral';
import js_ago from 'js-ago'
import { useNavigation } from '@react-navigation/native'
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.

export default function Order() {
  let navigation = useNavigation()    
  
  let [review, set_review] = useState('')
  let { user } = useSelector(s => s.user)
  let [server_err, set_server_err] = useState(false)
  let [list, set_list] = useState([])
  const tableHead = ['Product', 'Price', 'Paid', 'Date', 'Action'];
  const [tableData, setTableData] = useState([]);
  let [buyer, set_buyer] = useState('')
  
  useEffect(() => {
    if (user) {
     get_list_data()
    }
  },[user])

  function get_list_data() {
    fetch(`https://ce-server.vercel.app/seller.orders?seller_id=${user?.seller_id}`, {
      headers: {
        "Content-Type": "Application/json"
      }
    })
    .then(async(result) => {
        
      let response = await result.json()
      response.map(item => {
        setTableData(res => [...res, [
          <Image height={40} width={'60%'} style={{ marginLeft: 10 }} borderRadius={5} source={{ uri: item?.product?.thumbnail_id }} />,
          `₦${numeral(item?.order?.price).format('0.a')}`,
          item?.order?.havepaid ? 'Yes' : 'No',
          js_ago(new Date(item?.order?.date)),
          <TouchableOpacity style={{ height: 40, marginLeft: 5, paddingLeft: 5, paddingRight: 5, paddingTop: 2.5, paddingBottom: 2.5, display: 'flex', justifyContent: 'center', flexDirection: 'row', borderRadius: 3.5, width: 'auto', backgroundColor: '#1E90FF', alignItems: 'center', marginRight: 5 }} onPress={()=>navigation.navigate('user-order-room', {order: item?.order, product: item?.product})}><Text style={{ color: '#fff', fontSize: 12, marginRight: 4 }}>View</Text><Ionicons name={'open-outline'} size={20} color={'#fff'} /></TouchableOpacity>
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
      <View>
        <Table >      
          <Row style={{ backgroundColor: '#fff', height: 40, borderBottomWidth: 2, borderBottomColor: '#efefef' }} data={tableHead} textStyle={{ textAlign: 'center', color: '#000' }} />
        </Table>
       
      </View> 
      <ScrollView>      
        <Table >        
          <Rows data={tableData} style={{backgroundColor: '#fff', height: 70, borderBottomWidth: 2, borderBottomColor: '#efefef'}} textStyle={{ textAlign: 'center', color: '#000' }} />
        </Table>
       
      </ScrollView> 
    </>
  )
}

import React from 'react'
import { 
  Image,
  StyleSheet,
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Table, Row, Rows } from 'react-native-table-component';


export default function OrderHead({ order, product }) {
    const tableHead = ['Product', 'Price', 'Paid', 'Date', 'Action'];
    
    let navigation = useNavigation()    
    return (
      <>
        <View>
          <Table >      
            <Row style={{ backgroundColor: '#fff', height: 40, borderBottomWidth: 2, borderBottomColor: '#efefef' }} data={tableHead} textStyle={{ textAlign: 'center', color: '#000' }} />
          </Table>
          
        </View> 
      </>
    )
}


const styles = StyleSheet.create({
    orderCardCnt:{
      height: 140,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#fff',
    },
    orderCntLeft:{
      height: '100%',
      width: '30%',
      padding: 0,
      backgroundColor: '#fff',
      marginBottom: 5
    },
    orderCntRight:{
      height: '100%',
      width: '70%',
      paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fff',
      marginBottom: 5
    },
    orderCntRightTop:{
      height: '70%',
      width: '100%',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundColor: '#fff',
      marginBottom: 5
    },
    orderCntRightBtm:{
      height: '30%',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 0,
      backgroundColor: '#fff',
      marginBottom: 5
    }
  });

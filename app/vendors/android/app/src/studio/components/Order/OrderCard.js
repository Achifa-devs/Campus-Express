import React from 'react'
import { 
  Image,
  StyleSheet,
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native'
import OrderTitle from './OrderTitle';
import OrderStatus from './OrderStatus';
import OrderId from './OrderId';
import { useNavigation } from '@react-navigation/native';
import js_ago from 'js-ago';
import numeral from 'numeral';


export default function OrderCard({order, product}) {
    let navigation = useNavigation()    
    return (
        <>
            <TouchableOpacity onPress={()=>navigation.navigate('user-order-room')} style={styles.orderCardCnt}>
                <View style={styles.orderCntLeft}>
                   <Image height={'100%'} width={'100%'} borderRadius={5} source={{uri: product?.thumbnail_id}} />
                </View>

                <View style={styles.orderCntRight}>

                    <View style={styles.orderCntRightTop}>
                        <View>
                          <Text numberOfLines={2}
                            ellipsizeMode="tail" style={{fontSize: 16, fontWeight: '500', color: '#000'}}>{product?.title}</Text>
                        </View>

                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                          <Text style={{fontSize: 15, padding: 0, fontWeight: '500', color: '#000'}}>₦{new Intl.NumberFormat('en-us').format(order?.price)}</Text>
                          {/* <Text style={{ fontSize: 11, padding: 0, fontWeight: '600', color: order?.havepaid ? '#FF4500' : '#FF4500', marginTop: 0 }}>  - {order?.havepaid ? 'Payment made' : 'Pending payment'}</Text> */}
                        </View>
                        
                    </View>
                    
                    <View style={styles.orderCntRightBtm}>
                        <View style={{paddingLeft: 6, paddingRight: 6, paddingTop: 4, paddingBottom: 4, borderRadius: 5, backgroundColor: '#FF4500'}}>
                          <Text
                            style={{fontSize: 10, fontWeight: '500', color: '#fff'}}>{order?.stock} unit ordered</Text>
                        </View>

                        <View>
                            <Text numberOfLines={2}
                            ellipsizeMode="tail" style={{fontSize: 12, fontWeight: '500', color: '#000'}}>{order?.date ? js_ago(new Date(order?.date)) : ''}</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity> 
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

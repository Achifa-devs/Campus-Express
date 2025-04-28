import React from 'react'
import { 
    Image,
    StyleSheet,
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native'
import OrderTitle from './OrderTitle';
import Date from './OrderDate';
import OrderStatus from './OrderStatus';
import OrderId from './OrderId';
import { useNavigation } from '@react-navigation/native';
import Thumbnail from '../../utils/Thumbnail';
import js_ago from 'js-ago';

export default function OrderCard({data}) {
    let navigation = useNavigation()    
    return (
        <>
            <TouchableOpacity onPress={()=>navigation.navigate('order-room')} style={styles.orderCardCnt}>
                <View style={styles.orderCntLeft}>
                    <Image style={{height: '100%', width: '100%'}} source={{uri: data.thumbnail_id}} />
                </View>

                <View style={styles.orderCntRight}>

                    <View style={styles.orderCntRightTop}>
                        <View>
                            <Text numberOfLines={2}
                            ellipsizeMode="tail" style={{fontSize: 16, color: '#000'}}>{data.title}</Text>
                        </View>

                        <View>
                            <Text style={{fontSize: 10, color: '#000'}}>{data.state.state}</Text>
                            
                        </View>
                    </View>
                    
                    <View style={styles.orderCntRightBtm}>
                        <View>
                            <Text style={{ fontSize: 10, color: '#000' }}>{data.campus}-{(data.others).condition}</Text>
                        </View>

                        <View>
                            <Text style={{fontSize: 10, color: '#000'}}>{data.date ? js_ago(new Date(data.date)) : ''}</Text>
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
      marginBottom: 5
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
      padding: 8,
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

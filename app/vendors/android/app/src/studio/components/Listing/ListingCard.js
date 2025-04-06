import React from 'react'
import { 
    StyleSheet,
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native'
import OrderTitle from './ListingTitle';
import Date from './ListingDate';
import OrderStatus from './ListingStatus';
import { useNavigation } from '@react-navigation/native';

export default function ListingCard() {
    let navigation = useNavigation()    
    return (
        <>
            <TouchableOpacity onPress={()=>navigation.navigate('order-room')} style={styles.orderCardCnt}>
                <View style={styles.orderCntLeft}>
                
                </View>

                <View style={styles.orderCntRight}>

                    <View style={styles.orderCntRightTop}>
                        <View>
                            <OrderTitle />
                        </View>

                    </View>
                    
                    <View style={styles.orderCntRightBtm}>
                        <View>
                            <OrderStatus />
                        </View>

                        <View>
                            <Date />
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

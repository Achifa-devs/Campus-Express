import React, { useState } from 'react'
import { 
    Image,
    Share,
    StyleSheet,
    Text, 
    TouchableOpacity, 
    Vibration, 
    View 
} from 'react-native'
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.

import { useNavigation } from '@react-navigation/native';
import CardHead from './CardHead';
import CardContent from './CardContent';
import CardAnalytics from './CardAnalytics';

export default function Card({ data, index }) {
  let [deleted, set_deleted] = useState(false)
  
  function updateDelete(data) {
    set_deleted(data)
  }
    let navigation = useNavigation()    
    return (
        <>
            {
                !deleted &&
                <View key={index} onPress={() => navigation.navigate('order-room')} style={styles.listCardCnt}>
                    <View style={styles.listCntTop}> 
                        <CardHead data={data} />
                    </View>
                    
                    <TouchableOpacity style={styles.listCntMid}>
                        <CardContent data={data} />
                    </TouchableOpacity>

                    <View style={styles.listCntBtm}>
                        <CardAnalytics updateDelete={updateDelete} data={data} />
                    </View>

                </View> 
            }
        </>
    )
}


const styles = StyleSheet.create({
    listCardCnt:{
      height: 'auto',
      width: '100%',
      
    //   padding: 10,
      backgroundColor: '#fff',
      marginBottom: 2.5
    },
    listCntTop:{
      height: 45,
      padding: 8,
      width: '100%',
        // padding: 5,
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundColor: '#fff'
    },
    listCntBtm:{
      height: 50,
      width: '100%',
      padding: 8,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    listCntMid:{
      height: 100,
      width: '100%',
      padding: 0,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fff',
      marginBottom: 0
    }
  });

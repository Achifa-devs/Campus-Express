import React from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import OrderRoomTop from '../components/OrderRoom/OrderRoomTop'
import OrderRoomBtm from '../components/OrderRoom/OrderRoomBtm';
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.

export default function OrderRoom({route}) {
  const { order, product, buyer } = route.params;
  let screenHeight = Dimensions.get('window').height;


  return (
    <>
      {/* <View style={[styles.orderRoom, {height: screenHeight - 55}]}> */}

        <ScrollView style={{height: '100%'}}>
          <View style={{height: 'auto'}}>
              <OrderRoomTop order={order} buyer={buyer} product={product} /> 
          </View>

          <View style={{height: 'auto'}}>
              <OrderRoomBtm order={order} buyer={buyer} product={product}/>
          </View>

        </ScrollView>
      {/* </View> */}
    </>
  )
}


const styles = StyleSheet.create({
    orderRoom:{
      width: '100%',
    //   display: 'flex',
    //   flexDirection: 'column',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   padding: 10,
      backgroundColor: '#fff',
    }
  });

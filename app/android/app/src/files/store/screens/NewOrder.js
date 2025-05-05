import React, { useState } from 'react'
// import OrderCard from '../components/Order/OrderCard'
import DeliverySetup from '../components/NewOrder/DeliverySetup'
import Want from '../components/NewOrder/Want'
import Specs from '../components/NewOrder/Specs'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import OrderCard from '../components/NewOrder/OrderCard'

export default function NewOrder() {
    let screenHeight = Dimensions.get('window').height;
  let { data } = useRoute()?.params
  let [ units, setUnits ]= useState(1);
  function updateUnits(data) {
    setUnits(data)
  }
  return (
    <>
      <View>
        <ScrollView style={{
          width: '100%',
          height: screenHeight - 120,
          backgroundColor: '#efefef',
          padding: 5,

          position: 'relative'
        }}
        contentContainerStyle={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
          <OrderCard data={data} />
          <Want data={data} updateUnits={updateUnits} units={units} />
            {/* <DeliverySetup /> */}
            {/* <Specs /> */}
            <View style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 8,
              backgroundColor: '#FFF',
              alignItems: 'center', marginTop: 10,
    borderRadius: .5,
              //   borderRadius: 7,
              justifyContent: 'space-between',
            }}>
              <View style={{
                height: 'auto',
                width: '100%',
                padding: 0,
                // padding: 8,
                // marginBottom: 2.5,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: .5,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                backgroundColor: '#fff'
              }}>
                <Text style={{marginBottom: 10, fontSize: 17, color: '#000', fontWeight: '900'}}>Campus Sphere Assurance</Text>
                <View style={{marginBottom: 10, fontSize: 17, color: '#000'}}>
                  <View>
                    <View></View>
                    <Text style={{marginBottom: 0, fontSize: 14, color: '#000', fontWeight: '600'}}>Secured Payments</Text>
                  </View>
                  <Text style={{fontSize: 12, color: '#1f1f1f', padding: 5}}>
                    Payments is secured with Escrow Services
                  </Text>
                </View>
                <View style={{marginBottom: 10, fontSize: 17, color: '#000'}}>
                  <View>
                    <View></View>
                    <Text style={{marginBottom: 0, fontSize: 14, color: '#000', fontWeight: '600'}}>Security And Privacy</Text>
                  </View>
                  <Text style={{fontSize: 12, color: '#1f1f1f', padding: 5}}>
                    We respect your privacy so your personal details are safe
                  </Text>
                </View>
                <View style={{marginBottom: 10, fontSize: 17, color: '#000'}}>
                  <View>
                    <View></View>
                    <Text style={{marginBottom: 0, fontSize: 14, color: '#000', fontWeight: '600'}}>Buyer Protection</Text>
                  </View>
                  <Text style={{fontSize: 12, color: '#1f1f1f', padding: 5}}>
                    Get your money back if your order is'nt delivered by estimated date or if you are not satisfied with your order
                  </Text>
                </View>
              </View>
            </View>
        </ScrollView>

        
      </View>
      <View style={styles.btm}>
        <TouchableOpacity onPress={e=> navigation.navigate('user-new-order', {product_id: data?.product_id})} style={[styles.btn, {width: '100%', backgroundColor: '#FF4500'}]}>
          <Text style={{fontSize: 15, color: '#fff'}}>Create Order Now {new Intl.NumberFormat('en-us').format(0.95 * parseInt(data?.price))}</Text>
        </TouchableOpacity>    
      </View>
    </>
  )
}


const styles = StyleSheet.create({
    btm:{
        height: 65,
        padding: 0,
        width: '100%',

        marginLeft: 0, 
        marginRight: 0,
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 0,
        backgroundColor: '#fff'
    },

    btn:{
        height: '100%',
        color: '#fff',
        borderRadius: 5,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    
  });

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function BalanceValue() {
  return (
    <>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        
        <Text style={styles.BalanceValue}>
           <Text style={{fontSize: 15, width: '10%', color: '#fff'}}>&#8358;</Text> 0.00
        </Text>
      </View>
    </>
  )
}




const styles = StyleSheet.create({
    BalanceValue: {
      height: '100%',
      width: '80%',
      fontSize: 40,
      color: '#fff',
        textAlign: 'center',
    },
    
  });
  
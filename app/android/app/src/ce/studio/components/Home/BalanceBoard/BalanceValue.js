import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function BalanceValue() {
  return (
    <>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
        <Text style={{fontSize: 15, width: '10%', left: 0, bottom: 10, color: '#000'}}>
            &#8358;
        </Text>
        <Text style={styles.BalanceValue}>
            0.00
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
      color: '#000',
        textAlign: 'left',
    },
    
  });
  
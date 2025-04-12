import React from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'

export default function Price() {
    let screenWidth = Dimensions.get('window').width;

  return (
    <>
      <View style={[styles.price, {width: '100%'}]}>
        <Text style={{paddingLeft: 0, marginBottom: 8, color: '#000', fontSize: 14, fontWeight: '500'}}>Price</Text>
        
        <View style={{width: '100%', marginBottom: 10}}>
            <TextInput keyboardType='numeric' placeholder='Enter Product Price Here' style={styles.input} multiline={true} verticalAlign='top' />
        </View> 
        <Text style={{paddingLeft: 10, marginBottom: 5, color: 'red'}}>Error</Text>
      </View>
    </>
  )
}



const styles = StyleSheet.create({
    price:{
        height: 'auto',
        padding: 0,
        display: 'flex',
        alignItems: 'Flex-start',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 0,
        backgroundColor: '#fff'
    },

    input:{
        maxHeight: 150,
        minHeight: 60, 
        padding: 10,
        width: '100%',
        backgroundColor: '#f9f9f9',
        color: '#000',
        fontSize: 15,
        borderRadius: 5,
        position: 'relative', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    
  });

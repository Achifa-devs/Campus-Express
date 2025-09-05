import React from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'

export default function Title() {
    let screenWidth = Dimensions.get('window').width;

  return (
    <>
      <View style={[styles.title, {width: '100%'}]}>
        <Text style={{paddingLeft: 0, marginBottom: 8, color: '#000', fontSize: 14, fontWeight: '500'}}>Title</Text>
        
        <View style={{width: '100%', marginBottom: 10}}>
            <TextInput placeholder='Enter Product Title Here' style={styles.input} multiline={true} verticalAlign='top' />
        </View> 
        <Text style={{paddingLeft: 10, marginBottom: 0, color: 'red'}}>Error</Text>
      </View>
    </>
  )
}



const styles = StyleSheet.create({
    title:{
        height: 'auto',
        // padding: 0,
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
        // marginBottom: 0,
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

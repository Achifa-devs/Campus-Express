import React from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'

export default function Description() {
    let screenWidth = Dimensions.get('window').width;

  return (
    <>
      <View style={[styles.description, {width: '100%'}]}>
        <Text style={{paddingLeft: 0, marginBottom: 8, color: '#000', fontSize: 14, fontWeight: '500'}}>Description (Optional)</Text>
        
        <View style={{width: '100%', marginBottom: 10}}>
            <TextInput textAlignVertical='top' placeholder='Write A Brief Description About The Item Here' style={styles.input} multiline={true} verticalAlign='top' />
        </View> 
        <Text style={{paddingLeft: 10, color: 'red'}}>Error</Text>
      </View>
    </>
  )
}



const styles = StyleSheet.create({
    description:{
        height: 'auto',
        padding: 0,
        display: 'flex',
        alignItems: 'Flex-start',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
        // marginBottom: 5,
        backgroundColor: '#fff'
    },

    input:{
        maxHeight: 200,
        minHeight: 150, 
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

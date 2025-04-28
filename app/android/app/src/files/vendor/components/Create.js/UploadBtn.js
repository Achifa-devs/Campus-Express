import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function UploadBtn({setUploadToTrue}) {
    
  return (
    <>
        <View style={styles.btm}>
            <TouchableOpacity  onPress={e=> setUploadToTrue(true)} style={[styles.btn, {width: '78%', backgroundColor: '#FF4500'}]}>
                <Text style={{fontSize: 15, color: '#fff'}}>Upload Now</Text>
            </TouchableOpacity>    
            
            <TouchableOpacity  style={[styles.btn, {width: '18%', backgroundColor: 'rgb(0, 0, 0)', pointerEvents: 'none', opacity: .5}]}>
                <Text style={{fontSize: 10, color: '#fff'}}>Draft</Text>
            </TouchableOpacity>
        </View>
    </>
  )
}



const styles = StyleSheet.create({
    btm:{
        height: 65,
        padding: 0,
        marginLeft: 5, 
        marginRight: 5,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#fff'
    },

    btn:{
        height: '100%',
        color: '#fff',
        borderRadius: 15,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    
  });
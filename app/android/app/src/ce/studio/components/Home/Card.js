import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ActionBtn from './buttons/actionBtn';
export default function Card() {
  let screenWidth = Dimensions.get('window').width;

  return (
    <>
        <View style={[
            styles.card,
            {width: '100%'}
        ]}>
            <View style={{height: '100%', borderRadius: 15,borderWidth: 1,borderColor: '#FF4500'}}>

                <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center',borderRadius: 15}}>
                    <View style={{width: '30%'}}>

                    </View>
                    <View style={{width: '70%'}}>
                        <Text style={{fontSize: 16, padding: 8, color: '#000', textDecorationStyle: 'dashed'}}>
                            Bulid Your Business For <Text style={{fontSize: 13}}>&#8358;</Text>700 Only
                        </Text> 
                    </View>
                </View>
            
                <ActionBtn />
            </View>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    card:{
        height: 160,
        padding: 0,
        
        padding: 8,
        marginBottom: 5,
        backgroundColor: '#fff'
    },

    cardTop:{
        height: 100,
        width: '100%',
        backgroundColor: '#efefef',
        borderRadius: 15,
        padding: 0,
        position: 'relative',

        marginBottom: 5
    },

    cardBtm:{
        height: 140,
        width: '100%',
        padding: 0,
        marginBottom: 5,
        backgroundColor: '#fff',
        borderRadius: 15,

    },

    
  });
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ActionBtn from './buttons/actionBtn';
import BalanceLabel from './BalanceBoard/BalanceLabel';
import BalanceVisibility from './BalanceBoard/BalanceVisibility';
import BalanceValue from './BalanceBoard/BalanceValue';
import Currency from './BalanceBoard/Currency';
import AddMoney from './BalanceBoard/AddMoney';
import Svg, { Path } from 'react-native-svg';
import { getData } from '../../utils/AsyncStore.js';
export default function Engagement({navigation}) {
  let screenWidth = Dimensions.get('window').width;
  
  return (
    <>
      <View style={{padding: 10}}>
          

        <TouchableOpacity style={[
          styles.card,
          {width: '100%'}
        ]} onPress={e => navigation.navigate('user-new-listing', {update: false})}> 
        <View>
          <Svg width="45px" height="45px" viewBox="0 0 1024 1024" class="icon"  version="1.1" ><Path d="M220.5 245.4c-32.8 32.8-55.1 73.2-65.2 117.3h16.5c18.8-75.3 75.1-135.9 148-160.7v-16.9c-37.1 11.6-71 32-99.3 60.3z" fill="#fff" /><Path d="M959.9 540.8c0 113.6-92.1 205.8-205.7 205.9H590.9v-44h163.3c43.2 0 83.8-16.9 114.3-47.4 30.6-30.6 47.4-71.2 47.4-114.5 0-43.2-16.8-83.9-47.4-114.4S797.2 379 754 379c-11.5 0-22.8 1.2-33.8 3.5-15 3.2-29.4 8.4-42.8 15.7-1-15.4-3.3-30.7-6.8-45.6v-0.1c-3.6-15.6-8.6-30.8-14.9-45.7-14.4-33.9-34.9-64.4-61.1-90.6-26.2-26.2-56.6-46.7-90.6-61.1-35.1-14.8-72.4-22.4-110.9-22.4s-75.8 7.5-110.9 22.4c-33.9 14.3-64.4 34.9-90.6 61.1-26.2 26.2-46.7 56.7-61.1 90.6-14.9 35.1-22.4 72.4-22.4 110.9s7.5 75.8 22.4 110.9c14.3 33.9 34.9 64.4 61.1 90.6 26.2 26.2 56.7 46.7 90.6 61.1 35.1 14.8 72.4 22.4 110.9 22.4h39.7v44h-41C210.7 746 64.1 599 64.1 417.7c0-181.7 147.3-329 329-329 154.6 0 284.3 106.6 319.5 250.3v0.1c13.4-2.7 27.2-4.2 41.4-4.2 113.7 0.1 205.9 92.2 205.9 205.9z" fill="#fff" /><Path d="M692.9 636.1h-22.6L519.8 485.6v449.6h-16V485.8L353.4 636.1h-22.6l181-181z" fill="#fff" /></Svg>
        </View>
        <Text style={{fontSize: 25, color: '#fff', textAlign: 'center'}}>Click Here To Upload New Product Now.</Text>
            
        </TouchableOpacity>
      </View>
    </> 
  )
}

const styles = StyleSheet.create({
    card:{
        height: 150,
        padding: 10,
        // marginLeft: 5, 
        // marginRight: 5,
        borderRadius: 6,
        display: 'flex', 
        justifyContent: 'center', 
    flexDirection: 'column',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        padding: 8,
        borderColor: '#FF4500',
        marginBottom: 5,
        backgroundColor: '#FF4500'
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
    BalanceLeftBoard:{
        width: '100%',
        height: '100%',
        display: 'flex',
        // flex: 1,
        flexDirection: 'column',
        // backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    
      },
    
      BalanceRightBoard:{
        width: '100%',
        height: '60%',
        display: 'flex',
        // flex: 1,
        marginBottom: 20,
        flexDirection: 'row',
        // backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    
     
      },
    
      
      BalanceLabel:{
        width: '100%',
        height: '20%',
        display: 'flex',
        // backgroundColor: '#000',
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
      },
    
    
      BalanceBoard: {
        height: 150,
        borderRadius: 15,
        width: '100%', 
        borderRadius: 5,
        backgroundColor: '#FF4500',
        display: 'flex', 
        padding: 20,
        fontFamily: 'serif',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: 10
      },
    
    
    
      PrimaryService: {
        height: 90,
        borderRadius: 15,
        width: '100%', 
        borderRadius: 5,
        backgroundColor: '#fff',
        display: 'flex', 
        // padding: 20,
        fontFamily: 'serif',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginBottom: 15
      },
    
      PrimaryServiceBox: {
        height: 90,
        width: '25%', 
        borderRadius: 15,
        borderRadius: 5,
        backgroundColor: '#fff',
        display: 'flex', 
        padding: 10,
        fontFamily: 'serif',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // marginBottom: 5
      },
    
    
      SecondaryService: {
        height: 'auto',
        borderRadius: 15,
        width: '100%', 
        borderRadius: 5,
        backgroundColor: '#fff',
        display: 'flex', 
        // padding: 20,
        fontFamily: 'serif',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15
      },
    
      SecondaryServiceBox: {
        height: 90,
        width: '25%', 
        borderRadius: 15,
        flexShrink: 0,
        borderRadius: 5,
        backgroundColor: '#fff',
        display: 'flex', 
        padding: 10,
        fontFamily: 'serif',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // marginBottom: 5
      }
      
    
  });
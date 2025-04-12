import React from 'react'
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import ChatHead from '../components/Message/MessageRoom/ChatHead';

export default function Message() {
  let screenHeight = Dimensions.get('window').height;

  return (
    <>
     <ScrollView style={[styles.mssgCnt,{
            height: screenHeight - 55
        }]}>

        <ChatHead />

      </ScrollView> 
    </>
  )
}


const styles = StyleSheet.create({
    mssgCnt:{
        height: 'auto',
        width: '100%',
        padding: 0,
        marginBottom: 5
    }
  });
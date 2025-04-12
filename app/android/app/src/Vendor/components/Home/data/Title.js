import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function Title({title}) {
  return (
    <>
      <View style={styles.card}>
        <Text 
            numberOfLines={2}
            ellipsizeMode="tail">
            {title}
        </Text>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
    card:{
        height: 'auto',
        width: '100%',
        padding: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        padding: 8,
        // marginBottom: 2.5,
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

    
  });

import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SaveBtn from './buttons/saveBtn'
import Title from './data/Title';
import Cost from './data/Cost';
import ActionBtn from './buttons/actionBtn';
export default function Card() {
  let screenWidth = Dimensions.get('window').width;

  return (
    <>
        <View style={[
            styles.card,
            {width: (screenWidth * 0.50) - 18}
        ]}>
            <View style={styles.cardTop}>
                <SaveBtn />

                <View >

                </View>
            </View>

            <View style={styles.cardBtm}>
                <Title />
                <Cost />
                <ActionBtn />
            </View>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    card:{
        height: 260,
        padding: 0,
        marginLeft: 5, 
        borderRadius: 15,
        marginRight: 5,
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
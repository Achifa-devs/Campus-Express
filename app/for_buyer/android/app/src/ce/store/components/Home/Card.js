import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SaveBtn from './buttons/saveBtn'
import Title from './data/Title';
import Cost from './data/Cost';
import ActionBtn from './buttons/actionBtn';
import Thumbnail from '../../../reusables/Thumbnail';
import { useNavigation } from '@react-navigation/native';
export default function Card({item}) {
    let screenWidth = Dimensions.get('window').width;
    let navigation = useNavigation()
  return (
    <>
        <View style={[
            styles.card,
            {width: (screenWidth * 0.50) - 18}
        ]}>
            <View style={styles.cardTop}>
                {/* <SaveBtn /> */}
 
                <TouchableOpacity onPress={e=> navigation.navigate('user-product', {product_id: item.product_id})}>
                    <Thumbnail br={15} product_id={item.product_id} title={item.title} />
                </TouchableOpacity> 
            </View>

            <View style={styles.cardBtm}>
                <TouchableOpacity onPress={e=> navigation.navigate('user-product', {product_id: item.product_id})}><Title title={item.title} /></TouchableOpacity>
                <TouchableOpacity onPress={e=> navigation.navigate('user-product', {product_id: item.product_id})}><Cost cost={item.price} /></TouchableOpacity>
                <ActionBtn cost={item.price} />
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
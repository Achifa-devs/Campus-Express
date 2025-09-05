import React, { useState } from 'react'
import { 
    Image,
    Share,
    StyleSheet,
    Text, 
    TouchableOpacity, 
    Vibration, 
    View 
} from 'react-native'
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.
import js_ago from 'js-ago';


export default function CardHead({data}) {
  return (
    <>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Ionicons  name={'time-outline'} size={20} color={'#000'} />
                
            <Text style={{fontSize: 12, fontWeight: '500' , color: '#000', marginLeft: 2.5}}>{data?.date ? js_ago(new Date(data?.date)) : ''}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{ fontSize: 17, color: data?.state?.state === 'active' ? 'green' : 'red', fontWeight: '500'}}>{data?.state?.state}</Text>
                <TouchableOpacity style={{ height: '90%', marginLeft: 15, paddingLeft: 5, paddingRight: 5, paddingTop: 2.5, paddingBottom: 2.5, display: 'flex', justifyContent: 'center', flexDirection: 'row', borderRadius: 3.5, width: 'auto', backgroundColor: '#1E90FF', alignItems: 'center' }} onPress={e => {
                    navigation.navigate('user-new-listing', {update: true})
            }}>
                <Text style={{color: '#fff', fontSize: 12, marginRight: 5}}>Edit</Text>
                <Ionicons  name={'create-outline'} size={20} color={'#fff'} />
            </TouchableOpacity>
        </View>
    </>
  )
}

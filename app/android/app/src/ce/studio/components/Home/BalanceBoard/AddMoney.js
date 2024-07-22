import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

export default function AddMoney() {
  let navigation = useNavigation()
  return (
    <>
        <TouchableOpacity onPress={e => navigation.navigate('user-deposit')}>
            <View></View>
            <Text>Add Money</Text>
        </TouchableOpacity>
    </>
  )
}

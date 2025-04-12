import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

export default function AddMoney() {
  let navigation = useNavigation()
  return (
    <>
      <TouchableOpacity>
          <Text style={{fontSize: 14, color: '#000', fontWeight: '800'}}>Add Money</Text>
      </TouchableOpacity>
    </>
  )
}

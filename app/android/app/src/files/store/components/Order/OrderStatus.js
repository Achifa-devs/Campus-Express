import React from 'react'
import { 
    Text, 
    View 
} from 'react-native'

export default function OrderStatus({status}) {
  return (
    <>
        <View>
            <Text style={{fontSize: 10, color: '#000'}}>{status}</Text>
        </View>
    </>
  )
}

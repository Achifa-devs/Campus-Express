import React from 'react'
import { 
    Text, 
    View 
} from 'react-native'

export default function OrderTitle({title}) {
  return (
    <>
        <View>
            <Text numberOfLines={2}
            ellipsizeMode="tail" style={{fontSize: 16, color: '#000'}}>{title}</Text>
        </View>
    </>
  )
}

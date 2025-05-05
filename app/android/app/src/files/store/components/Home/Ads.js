import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  // Import Ionicons from react-native-vector-icons

export default function Ads() { 
  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#FFF', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5 }}>
      <TouchableOpacity style={{ marginHorizontal: 10, alignItems: 'center' }}> 
        <Icon name="bed" size={20} color="#FF4500" />  
        <Text style={{ fontSize: 14 }}>Lodges</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginHorizontal: 10, alignItems: 'center' }}>
        <Icon name="construct" size={20} color="#FF4500" />  
        <Text style={{ fontSize: 14 }}>Services</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginHorizontal: 10, alignItems: 'center' }}>
        <Icon name="newspaper" size={20} color="#FF4500" />  
        <Text style={{ fontSize: 14 }}>News</Text>
      </TouchableOpacity>
    </View>
  );
}
